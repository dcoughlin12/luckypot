const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/dashboard/events/:userId/", (req, res) => {
    const values = [parseInt(req.params.userId, 10)];
    db.query(
      `
      SELECT DISTINCT events.id AS id,
      events.owner_id AS owner_id,
      events.name AS event_name, 
      events.date AS date, 
      events.address AS address,
      events.post_code AS post_code,
      events.city AS city,
      events.province AS province
      FROM guest_details
      JOIN events ON events.id = guest_details.event_id
      JOIN items ON events.id = items.event_id
      JOIN users ON users.id = guest_details.user_id
      WHERE events.id IN(SELECT event_id
      FROM guest_details
      WHERE user_id = $1);
      `,
      values
    )
      .then((data) => {
        console.log(data.rows);
        let events = data.rows;
        res.json(events);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });

  router.get("/dashboard/users/:userId/", (req, res) => {
    const values = [parseInt(req.params.userId, 10)];
    db.query(
      `
      SELECT DISTINCT events.id AS event_id,
       users.id AS id,
       users.first_name AS first_name, 
       users.last_name AS last_name,
       events.date AS timestamp,
       users.email AS email, 
       users.avatar_url AS avatar_url
       FROM guest_details
       JOIN events ON events.id = guest_details.event_id
       JOIN items ON events.id = items.event_id
       JOIN users ON users.id = guest_details.user_id
       WHERE events.id IN(SELECT event_id
       FROM guest_details
       WHERE user_id = $1);
    `,
      values
    )
      .then((data) => {
        const users = data.rows;
        console.log(data.rows);
        res.json(users);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });

  router.get("/dashboard/items/", (req, res) => {
    db.query(
      `
      SELECT ITEMS.*
      FROM ITEMS
      JOIN CATEGORIES ON ITEMS.category_id = CATEGORIES.id
      JOIN GUEST_ITEMS ON ITEMS.id = GUEST_ITEMS.item_id
      JOIN USERS ON USERS.id = GUEST_ITEMS.guest_id;
      `
    )
      .then((data) => {
        const items = data.rows;
        console.log(data.rows);
        res.json(items);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });

  router.get("/dashboard/messages/", (req, res) => {
    db.query(
      `
          SELECT id, event_id, user_id, message, date AS timestamp 
          FROM event_messages;
          `
    )
      .then((data) => {
        const messages = data.rows;
        console.log(data.rows);
        res.json(messages);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });

  router.put("/dashboard/present/", (req, res) => {
    const values = [req.body.present, req.body.user_id, req.body.event_id];
    // console.log("REQ.BODY: ", req.body);
    db.query(
      `
            UPDATE guest_details SET present = $1 WHERE user_id = $2 AND event_id = $3 RETURNING *;
            `,
      values
    )
      .then((data) => {
        const presentStatus = data.rows;
        res.json(presentStatus);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });

  router.get("/dashboard/present/:user_id/:event_id", (req, res) => {
    const values = [req.params.user_id, req.params.event_id];
    db.query(
      `
      SELECT present FROM guest_details WHERE user_id = $1 AND event_id = $2;`,
      values
    )
      .then((data) => {
        console.log("DATA FROM SERVER", data);
        res.json(data.rows);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });

  return router;
};
