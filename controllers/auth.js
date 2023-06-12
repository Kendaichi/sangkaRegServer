import express from "express";
import jwt from "jsonwebtoken";
import { db, transporter } from "../server.js";

const router = express.Router();

//For Login
router.post("/check-email", (req, res) => {
  const { email } = req.body;

  // Perform backend validation logic here
  const q = "SELECT * FROM Users WHERE email = ?";
  db.query(q, [email], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    // Check if email exists
    if (data.length === 0) {
      return res.json({ exists: false });
    } else {
      return res.json({ exists: true });
    }
  });
});

// For otpVerification
const otpMap = new Map();

// Function to generate a random OTP
function generateOTP() {
  const otpLength = 6;
  const digits = "0123456789";

  let otp = "";
  for (let i = 0; i < otpLength; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }

  return otp;
}

router.post("/send-otp", (req, res) => {
  const { email } = req.body;

  // Generate OTP
  const otp = generateOTP();

  const mailOptions = {
    from: "franclloyddagdag2130@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      return res.status(500).json({ sent: false, error: "Failed to send OTP" });
    }
    console.log("Email sent:", info.response);

    otpMap.set(email, otp);

    return res.json({ sent: true, otp });
  });
});

router.post("/verify-otp", (req, res) => {
  const { email, code } = req.body;

  if (otpMap.has(email)) {
    const otp = otpMap.get(email);

    if (code === otp) {
      otpMap.delete(email);

      const token = jwt.sign({ email }, "hehesamplehehe");

      return res.json({ verified: true, token });
    }
  }
  return res.json({ verified: false });
});

router.post("/checkUser", (req, res) => {
  const { email } = req.body;
  const q = "SELECT * FROM UserInformation where email = ?";

  db.query(q, [email], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    // Check if email exists
    if (data.length === 0) {
      return res.json({ exists: false });
    } else {
      return res.json({ exists: true });
    }
  });
});

export default router;
