import sequelize from '../config/database.js';
import UserModel from './user.model.js';
import RoleModel from './role.model.js';
import PermissionModel from './permission.model.js';
import UserRoleModel from './userRole.model.js';
import RolePermissionModel from './rolePermission.model.js';
import RefreshTokenModel from './refreshToken.model.js';

const User = UserModel(sequelize);
const Role = RoleModel(sequelize);
const Permission = PermissionModel(sequelize);
const UserRole = UserRoleModel(sequelize);
const RolePermission = RolePermissionModel(sequelize);
const RefreshToken = RefreshTokenModel(sequelize);

/* Associations */
// User <-> Role through UserRole
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });

// Role <-> Permission through RolePermission
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'roleId' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permissionId' });

// RefreshToken -> User
RefreshToken.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(RefreshToken, { foreignKey: 'userId' });

export {
  sequelize,
  User,
  Role,
  Permission,
  UserRole,
  RolePermission,
  RefreshToken
};
