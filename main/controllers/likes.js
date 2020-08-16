var express = require("express");
var router = express.Router();
var pool = require("../db");

router.get("/liked", (req, res, next) => {
  const { tellId, visitorId } = req.query;

  pool.query(
    `select count(*) as total, (select count(*) as liked from likes where tid = $1 and vid = $2)
  from likes
  where tid = $1;`,
    [tellId, visitorId],
    (q_err, q_res) => {
      if (q_err || q_res.rows.error) {
        res.status(400);
        return res.json(`Bad tell id: ${tellId}, visitor id: ${visitorId}`);
      }

      res.json(q_res.rows[0]);
    }
  );
});

router.delete("/unlike", (req, res, next) => {
  const { tellId, visitorId } = req.query;
  pool.query(
    `delete from likes where tid = $1 and vid = $2 returning *`,
    [tellId, visitorId],
    (q_err, q_res) => {
      if (q_err || q_res.rows.error || q_res.rows.length == 0) {
        res.status(400);
        return res.json(`Bad tell id: ${tellId}, visitor id: ${visitorId}`);
      }
      res.json(q_res.rows[0]);
    }
  );
});

router.post("/like", (req, res, next) => {
  const { tellId, visitorId } = req.body;

  pool.query(
    `INSERT INTO likes(tid, vid) VALUES ($1, $2) RETURNING *`,
    [tellId, visitorId],
    (q_err, q_res) => {
      if (q_err || q_res.rows.error || q_res.rows.length == 0) {
        res.status(400);
        return res.json(`Bad tell id: ${tellId}, visitor id: ${visitorId}`);
      }

      res.json(q_res.rows[0]);
    }
  );
});

module.exports = router;
