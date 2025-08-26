// backend/Models/User.js
module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define('Income', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
     clientid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clientname: {
      type: DataTypes.STRING,
      allowNull: false
    },
     Creditdebit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ammount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: true
  });

  return Income;
};
