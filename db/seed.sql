TRUNCATE TABLE tells;
TRUNCATE TABLE visitors;

INSERT INTO tells(question, answered, answer, date_answered)
VALUES ('what''s your name?', TRUE, 'I''m Hai', NOW());

INSERT INTO tells(question, answered, answer, date_answered)
VALUES ('how old are you?', TRUE, 'As of 2020, I''m 22', NOW());

INSERT INTO tells(question)
VALUES ('how old are you?');

INSERT INTO visitors(key)
VALUES('hello');