import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('RolePermission', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
  }, {
    tableName: 'role_permissions',
    timestamps: false,
    indexes: [{ unique: true, fields: ['RoleId', 'PermissionId'] }]
  });
};
