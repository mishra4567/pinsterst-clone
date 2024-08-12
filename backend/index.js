import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT;
//  using middlewares
app.use(express.json());
app.use(cookieParser());

// importing routes
import userRouts from "./routes/userRouts.js";

//using routes
app.use("/api/user", userRouts);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
