// backend/Models/User.js
module.exports = (sequelize, DataTypes) => {
  const Clients = sequelize.define('Clients', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: true
  });

  return Clients;
};
