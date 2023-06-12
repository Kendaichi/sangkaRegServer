import express from "express";
import { db } from "../server.js";

const router = express.Router();

router.get("/getEvents", (req, res) => {
  db.query(
    "SELECT category, GROUP_CONCAT(event_name) AS events FROM Events GROUP BY category",
    (error, results) => {
      if (error) {
        console.error("Error retrieving events:", error);
        res.status(500).json({ error: "Failed to retrieve events" });
      } else {
        const eventsByCategory = results.reduce((acc, event) => {
          const { category, events } = event;
          acc[category] = events.split(",");
          return acc;
        }, {});
        res.json(eventsByCategory);
      }
    }
  );
});

export default router;
