import express from "express";
import mysql from "mysql";
import cors from "cors";
import nodemailer from "nodemailer";

import authRouter from "./controllers/auth.js";
import messageRouter from "./controllers/messages.js";
import registrationRouter from "./controllers/registration.js";
import statusRouter from "./controllers/status.js";
import eventRouter from "./controllers/events.js";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sangkaDB",
});

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "franclloyddagdag2130@gmail.com",
    pass: "oggtvsfdjzzdypyl",
  },
});

app.get("/", (req, res) => {
  res.json("Hello from backend!");
});

// For Messages
app.use("/message", messageRouter);

// auth
app.use("/authentication", authRouter);

//For Registration
app.use("/register", registrationRouter);

// For Profile
app.use("/status", statusRouter);

app.use("/events", eventRouter);

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});

export { db, transporter };
