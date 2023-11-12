import prisma from '../lib/db';

const getTenants = async (_req, res) => {
  try {
    const tenants = await prisma.tenant.findMany({
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

    return res.status(200).json({ tenants });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOwners = async (_req, res) => {
  try {
    const owners = await prisma.owner.findMany({
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

    return res.status(200).json({ owners });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verifyOwner = async (req, res) => {
  try {
    const ownerId = parseInt(req.params.ownerId) || null;
    const ownerStatus = req.body.ownerStatus || null;

    if (
      !ownerId ||
      !ownerStatus ||
      (ownerStatus !== 'APPROVED' && ownerStatus !== 'REJECTED')
    ) {
      return res.status(400).json({ message: 'Invalid owner information' });
    }

    const owner = await prisma.owner.update({
      where: {
        owner_id: parseInt(ownerId),
      },
      data: {
        status: ownerStatus,
      },
    });
    return res.status(200).json({ owner });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verifyCoworkingSpace = async (req, res) => {
  try {
    const spaceId = parseInt(req.params.spaceId) || null;
    const spaceStatus = req.body.spaceStatus || null;

    if (
      !spaceId ||
      !spaceStatus ||
      (spaceStatus !== 'APPROVED' && spaceStatus !== 'REJECTED')
    ) {
      return res.status(400).json({ message: 'Invalid space information' });
    }

    const coworkingSpace = await prisma.coworkingSpace.update({
      where: {
        space_id: parseInt(spaceId),
      },
      data: {
        status: spaceStatus,
      },
    });
    return res.status(200).json({ coworkingSpace });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getTenants, getOwners, verifyOwner, verifyCoworkingSpace };
