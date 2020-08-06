TRUNCATE TABLE tells;

INSERT INTO tells(question, answered, answer, date_answered)
VALUES ('what''s your name?', TRUE, 'I''m Hai', NOW());

INSERT INTO tells(question)
VALUES ('how old are you?');