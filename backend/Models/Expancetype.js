// backend/Models/User.js
module.exports = (sequelize, DataTypes) => {
  const Expancetype = sequelize.define('Expancetype', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
     expancetype: {
      type: DataTypes.STRING,
      allowNull: false
    },
     status: {
      type: DataTypes.STRING,
      allowNull: false
    },
   
  }, {
    timestamps: true
  });

  return Expancetype;
};
