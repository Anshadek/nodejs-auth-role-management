import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('RefreshToken', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    token: { type: DataTypes.STRING, unique: true, allowNull: false },
    revoked: { type: DataTypes.BOOLEAN, defaultValue: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false }
  }, {
    tableName: 'refresh_tokens',
    timestamps: true
  });
};
