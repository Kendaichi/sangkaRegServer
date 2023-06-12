import express from "express";

import { db } from "../server.js";

const router = express.Router();

router.get("/messages", (req, res) => {
  const q = "SELECT * FROM Messages";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

router.post("/messages", (req, res) => {
  const q = "INSERT INTO Messages (`name`, `email`, `message`) VALUES (?)";
  const value = [req.body.name, req.body.email, req.body.message];

  db.query(q, [value], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("Message Sent");
    }
  });
});

export default router;
