// backend/Models/User.js
module.exports = (sequelize, DataTypes) => {
  const Salery = sequelize.define('Salery', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
     employeeId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    employeeName: {
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

  return Salery;
};
