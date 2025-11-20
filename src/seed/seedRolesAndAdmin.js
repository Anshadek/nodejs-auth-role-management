import dotenv from 'dotenv';
dotenv.config();

import { sequelize, Role, User } from '../models/index.js';
import bcrypt from 'bcryptjs';

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'Admin@123';

const run = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const [adminRole] = await Role.findOrCreate({ where: { name: 'admin' } });
    const [managerRole] = await Role.findOrCreate({ where: { name: 'manager' } });
    const [userRole] = await Role.findOrCreate({ where: { name: 'user' } });

    let admin = await User.findOne({ where: { email: ADMIN_EMAIL } });
    if (!admin) {
      const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
      admin = await User.create({ name: 'Default Admin', email: ADMIN_EMAIL, password: hashed });
      await admin.addRole(adminRole);
      console.log('Default admin created:', ADMIN_EMAIL, 'password:', ADMIN_PASSWORD);
    } else {
      console.log('Admin already exists:', ADMIN_EMAIL);
      await admin.addRole(adminRole);
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
