DROP TABLE likes;

CREATE TABLE likes (
  lid SERIAL PRIMARY KEY,
  vid INTEGER REFERENCES visitors(vid),
  tid INTEGER REFERENCES tells(tid),
  UNIQUE(vid, tid)
);