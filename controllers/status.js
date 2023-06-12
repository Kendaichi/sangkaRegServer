import express from "express";
import { db } from "../server.js";

const router = express.Router();

router.post("/checkStatus", (req, res) => {
  const { email } = req.body;
  const q =
    "SELECT * FROM Registration r INNER JOIN UserInformation u ON r.userinfo = u.id WHERE u.email = ?";

  db.query(q, [email], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    // Check if registration exists and approved is 1
    else {
      return res.json(data);
    }
  });
});

export default router;
