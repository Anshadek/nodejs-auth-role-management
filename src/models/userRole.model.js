import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('UserRole', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
  }, {
    tableName: 'user_roles',
    timestamps: false,
    indexes: [{ unique: true, fields: ['UserId', 'RoleId'] }]
  });
};
