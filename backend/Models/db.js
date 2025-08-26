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
db.User = require("./User.js")(sequelize, Sequelize);
db.Employee = require("./Employee.js")(sequelize, Sequelize);
db.Clients = require("./Clients.js")(sequelize, Sequelize);
db.Income = require("./Income.js")(sequelize, Sequelize);
db.Expancetype = require("./Expancetype.js")(sequelize, Sequelize);
db.Expance = require("./Expance.js")(sequelize, Sequelize);
db.Salery = require("./Salery.js")(sequelize, Sequelize);


module.exports = db;
