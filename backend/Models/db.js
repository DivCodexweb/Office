const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",  // ya postgres/sqlite jo use karna ho
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models import karo
db.User = require("./User")(sequelize, Sequelize);
db.Employee = require("./Employee")(sequelize, Sequelize);
db.Clients = require("./Clients")(sequelize, Sequelize);
db.Income = require("./Income")(sequelize, Sequelize);
db.Expancetype = require("./Expancetype")(sequelize, Sequelize);
db.Expance = require("./Expance")(sequelize, Sequelize);
db.Salery = require("./Salery")(sequelize, Sequelize);


module.exports = db;
