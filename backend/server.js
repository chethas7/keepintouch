import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
