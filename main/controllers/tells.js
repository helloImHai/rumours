var express = require("express");
var router = express.Router();
var pool = require("../db");

/*
    TELLS ROUTES SECTION
*/

router.get("/tells", (req, res, next) => {
  pool.query(
    `SELECT * FROM tells ORDER BY date_answered DESC`,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.get("/tell", (req, res, next) => {
  const tellId = req.query.tellId;

  pool.query(`SELECT * FROM tells WHERE tid=$1`, [tellId], (q_err, q_res) => {
    if (q_err) {
      console.log(q_err.message);
      res.status(400);
      return res.json(`Bad tell id: ${tellId}`);
    }

    if (q_res.rows.length == 0) {
      res.status(400);
      return res.json(`tell with id ${tellId} does not exist`);
    }

    res.json(q_res.rows[0]);
  });
});

router.delete("/tell", (req, res) => {
  const tellId = req.query.tellId;
  pool.query(
    `DELETE FROM tells WHERE tid=$1 RETURNING *`,
    [tellId],
    (q_err, q_res) => {
      if (q_err) {
        console.log(q_err.message);
        res.status(400);
        return res.json(`Bad tell id: ${tellId}`);
      }

      if (q_res.rows.length == 0) {
        res.status(400);
        return res.json(`tell with id ${tellId} does not exist`);
      }
      res.json(q_res.rows[0]);
    }
  );
});

router.post("/new", (req, res, next) => {
  const question = sanitize(req.body.question);

  if (req.body.question.length > 280) {
    res.status(400);
    res.json(`Question is too long`);
  }

  const values = [question];
  pool.query(
    `INSERT INTO tells(question) VALUES($1)`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

router.put("/answer", (req, res, next) => {
  const tellId = req.body.tellId;
  const values = [sanitize(req.body.answer), req.body.tellId];
  pool.query(
    `UPDATE tells SET answer = $1, date_answered = NOW()
              WHERE tid = $2 RETURNING *`,
    values,
    (q_err, q_res) => {
      if (q_err) {
        console.log(q_err.message);
        res.status(400);
        return res.json(`Bad tell id: ${tellId}`);
      }

      if (q_res.rows.length == 0) {
        res.status(400);
        return res.json(`tell with id ${tellId} does not exist`);
      }
      res.json(q_res.rows[0]);
    }
  );
});

function sanitize(str) {
  // return str.replace(/'/g, "''");
  return str;
}

module.exports = router;
