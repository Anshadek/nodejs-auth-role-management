import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
  }, {
    tableName: 'roles',
    timestamps: false
  });
};
