import { User, Role } from '../models/index.js';

export const getUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email', 'createdAt'],
    include: { model: Role, attributes: ['name'], through: { attributes: [] } }
  });
  res.json(users);
};
