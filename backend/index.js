const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = require('./Models/db');
const sequelize = db.sequelize;

const userRoutes = require('./Routes/UserRouts');
const UserEmployee = require('./Routes/UserEmployee');
const UserClients = require('./Routes/UserClients');
const Userincoms = require('./Routes/Userincoms');
const ExpanceRoute = require('./Routes/ExpanceRoute');
const DashboardRouts = require('./Routes/DashboardRouts');
app.use('/api/users', userRoutes);
app.use('/api/employees', UserEmployee);
app.use('/api/clients', UserClients);
app.use('/api/incoms', Userincoms);
app.use('/api/expance', ExpanceRoute);
app.use('/api/dashboard', DashboardRouts);

const PORT = process.env.PORT || 5000;

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Proper startup
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected successfully");

    await sequelize.sync({ alter: true, logging: false });
    console.log("✅ Database synced");

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ DB sync error:", err);
    process.exit(1); // crash if DB not working
  }
})();
