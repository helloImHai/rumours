var express = require("express");
var router = express.Router();
var pool = require("../db");

router.get("/", (req, res, next) => {
  pool.query(`SELECT count(*) FROM visitors`, (q_err, q_res) => {
    if (q_err) {
      res.status(400);
      return res.json(q_err.message);
    }
    res.json(q_res.rows[0]);
  });
});

router.post("/", (req, res, next) => {
  pool.query(
    `INSERT INTO visitors(key) VALUES('no key') RETURNING vid`,
    (q_err, q_res) => {
      if (q_err) {
        res.status(400);
        return res.json(q_err.message);
      }
      res.json(q_res.rows[0]);
    }
  );
});

module.exports = router;
