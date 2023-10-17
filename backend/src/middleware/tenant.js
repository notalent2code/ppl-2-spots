import jwt from 'jsonwebtoken';
import constants from '../config/constants';

export const verifyTenant = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, constants.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      if (decoded.userType !== 'TENANT')
        return res.status(403).json({ message: 'Tenant access denied' });
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
