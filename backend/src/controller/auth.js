import jwt from 'jsonwebtoken';
import prisma from '../lib/db';
import constants from '../config/constants';
import AuthValidator from '../validator/auth';
import ClientError from '@/error/ClientError';
import sendForgotPasswordEmail from '@/util/send-email';
import Joi from 'joi';

// Register user
const register = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Invalid body' });
    }

    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phoneNumber,
      userType,
    } = AuthValidator.validateRegisterPayload(req.body);

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await Bun.password.hash(password);

    let user;
    const userData = {
      email,
      password_hash: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      user_type: userType,
    };

    if (userType === 'TENANT') {
      const defaultAvatarURL = `${constants.API_DOMAIN}/static/avatar/default-avatar.png`;

      user = await prisma.user.create({
        data: {
          ...userData,
          tenant: {
            create: {
              avatar_url: defaultAvatarURL,
            },
          },
        },
        include: {
          tenant: true,
        },
      });
    } else if (userType === 'OWNER') {
      user = await prisma.user.create({
        data: {
          ...userData,
          owner: {
            create: {},
          },
        },
        include: {
          owner: true,
        },
      });
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    if (user) {
      delete user.password_hash;
      res.status(201).json({ message: 'User created successfully', user });
    }
  } catch (error) {
    if (error instanceof ClientError) {
      return res.status(error.code).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Invalid body' });
    }

    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await Bun.password.verify(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userId = user.user_id;
    const userType = user.user_type;

    const accessToken = jwt.sign(
      {
        userId,
        userType,
      },
      constants.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '30m',
      }
    );

    const refreshToken = jwt.sign(
      {
        userId,
        userType,
      },
      constants.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );

    await prisma.user.update({
      where: {
        user_id: userId,
      },
      data: {
        refresh_token: refreshToken,
      },
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true, // Uncomment this line if you are using HTTPS
    });

    res.status(200).json({
      message: 'Login success',
      firstName: user.first_name,
      userId,
      userType,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout user
const logout = async (req, res) => {
  try {
    delete req.headers['authorization'];

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(204).json({ message: 'No token provided' });

    const user = await prisma.user.findFirst({
      where: {
        refresh_token: refreshToken,
      },
    });

    const token = user.refresh_token;

    if (!token) return res.status(204).json({ message: 'No token provided' });

    const userId = user.user_id;

    await prisma.user.update({
      where: {
        user_id: userId,
      },
      data: {
        refresh_token: null,
      },
    });

    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logout success' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Refresh token
const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).send('Access denied');

    const user = await prisma.user.findFirst({
      where: {
        refresh_token: refreshToken,
      },
    });

    const token = user.refresh_token;

    if (!token) return res.status(403).send('Invalid token');

    jwt.verify(token, constants.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).send('Invalid token');
      const accessToken = jwt.sign(
        {
          userId: decoded.userId,
          userType: decoded.userType,
        },
        constants.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
      );
      res.status(200).json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = Joi.attempt(req.body.email, Joi.string().email().required());

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
      },
      constants.RESET_TOKEN_SECRET,
      { expiresIn: '30m' }
    );

    await prisma.passwordReset.create({
      data: {
        email,
        token: resetToken,
      },
    });

    const emailInfo = await sendForgotPasswordEmail(email, resetToken);

    if (!emailInfo) {
      return res.status(500).json({ message: 'Error sending email' });
    }

    return res.status(200).json({
      message: 'Reset password email sent',
      infoId: emailInfo.messageId,
      resetToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken, password, confirmPassword } =
      AuthValidator.validateResetPasswordPayload(req.body);

    const decoded = jwt.verify(resetToken, constants.RESET_TOKEN_SECRET);

    const isTokenExists = await prisma.passwordReset.count({
      where: {
        email: decoded.email,
      },
    });

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (!isTokenExists) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const hashedPassword = await Bun.password.hash(password);

    const userPromise = prisma.user.update({
      where: {
        user_id: decoded.userId,
      },
      data: {
        password_hash: hashedPassword,
      },
    });

    const resetPromise = prisma.passwordReset.deleteMany({
      where: {
        email: decoded.email,
      },
    });

    await prisma.$transaction([userPromise, resetPromise]);

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { register, login, logout, refreshToken, forgotPassword, resetPassword };
