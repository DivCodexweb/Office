// backend/Models/User.js
module.exports = (sequelize, DataTypes) => {
  const Expance = sequelize.define('Expance', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
     expanceid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expancename: {
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

  return Expance;
};
