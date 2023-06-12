import express from "express";
import { db } from "../server.js";

const router = express.Router();

router.post("/userInformation", (req, res) => {
  const q =
    "INSERT INTO UserInformation (`name`, `course`, `year`, `address`, `email`, `birthdate`, `contact`,`idNum`, `experience`) VALUES (?)";

  const value = [
    req.body.name,
    req.body.course,
    req.body.year,
    req.body.address,
    req.body.email,
    req.body.birthdate,
    req.body.contact,
    req.body.idnum,
    req.body.experience,
  ];

  db.query(q, [value], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      // Get the auto-generated user_id
      const userId = data.insertId;

      // Insert registration data into the Registration table
      const q =
        "INSERT INTO Registration (`userinfo`, `eventname`) VALUES (?, ?)";
      const values = [userId, req.body.event];

      db.query(q, values, (err, data) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json("Data Added Successfully");
        }
      });
    }
  });
});

export default router;
