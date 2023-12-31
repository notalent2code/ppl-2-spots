import prisma from '../lib/db';
import fs from 'fs';
import path from 'path';
import constants from '../config/constants';
import TenantValidator from '@/validator/tenant';

const tenantProfile = async (req, res) => {
  const userId = req.user.userId;

  const tenant = await prisma.tenant.findUnique({
    where: {
      user_id: parseInt(userId),
    },
    include: {
      user: {
        select: {
          email: true,
          first_name: true,
          last_name: true,
          phone_number: true,
        },
      },
    },
  });

  return tenant;
};

// Get tenant profile
const getTenantProfile = async (req, res) => {
  try {
    const tenant = await tenantProfile(req, res);
    if (req.user.userId !== tenant.user_id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    return res.status(200).json({ tenant });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update tenant profile
const updateTenantProfile = async (req, res) => {
  try {
    const { email, firstName, lastName, phoneNumber } =
      TenantValidator.validateTenantUpdatePayload(req.body);
    const avatarFileName = req.file ? req.file.filename : null;

    let avatarURL;

    if (avatarFileName) {
      avatarURL = `${constants.API_DOMAIN}/static/avatar/${avatarFileName}`;
    }

    let updatedTenant = await tenantProfile(req, res);

    if (req.user.userId !== updatedTenant.user_id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (!updatedTenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    if (
      updatedTenant.avatar_url !==
        `${constants.API_DOMAIN}/static/avatar/default-avatar.png` &&
      avatarFileName
    ) {
      const oldAvatar = updatedTenant.avatar_url.split('/static/avatar/')[1];
      fs.unlinkSync(path.join(__dirname, `../../static/avatar/${oldAvatar}`));
    }

    if (email && email !== updatedTenant.user.email) {
      const emailExist = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (emailExist) {
        return res.status(400).json({ message: 'Email already exist' });
      }
    }

    if (phoneNumber && phoneNumber !== updatedTenant.user.phone_number) {
      const phoneExist = await prisma.user.findUnique({
        where: {
          phone_number: phoneNumber,
        },
      });

      if (phoneExist) {
        return res.status(400).json({ message: 'Phone number already exist' });
      }
    }

    updatedTenant = await prisma.tenant.update({
      where: {
        tenant_id: updatedTenant.tenant_id,
      },
      data: {
        avatar_url: avatarURL || updatedTenant.avatar_url,
        user: {
          update: {
            email: email || updatedTenant.user.email,
            first_name: firstName || updatedTenant.user.first_name,
            last_name: lastName || updatedTenant.user.last_name,
            phone_number: phoneNumber || updatedTenant.user.phone_number,
          },
        },
      },
      include: {
        user: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
            phone_number: true,
          },
        },
      },
    });

    return res.status(200).json({ tenant: updatedTenant });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getTenantProfile, updateTenantProfile };
