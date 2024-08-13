import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});

const app = express();
const port = process.env.PORT;
//  using middlewares
app.use(express.json());
app.use(cookieParser());

// importing routes
import userRouts from "./routes/userRouts.js";
//import pin routs
import pinRouts from "./routes/pinRoutes.js";

//using routes
app.use("/api/user", userRouts);
//using pin routes
app.use("/api/pin", pinRouts);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
