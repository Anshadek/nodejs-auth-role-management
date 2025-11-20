import { User, Role } from '../models/index.js';

export const authorize = (...allowedRoles) => {
  return async (req, res, next) => {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findByPk(userId, { include: Role });
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const roleNames = user.Roles.map(r => r.name);
    const has = roleNames.some(r => allowedRoles.includes(r));
    if (!has) return res.status(403).json({ message: 'Forbidden' });

    next();
  };
};
