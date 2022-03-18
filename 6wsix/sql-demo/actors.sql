DROP TABLE IF EXISTS actors;

CREATE TABLE actors (
    id SERIAL primary key,
    -- I want an ID for everybody
    name VARCHAR(255) NOT NULL,
    age INT,
    "number of oscars" INT
    -- If I want eg age to be big we need 'Age' with the '' also like the separation
);

INSERT INTO actors (name, age, "number of oscars") VALUES ('Leonardo DiCaprio', 41, 1);
INSERT INTO actors (name, age, "number of oscars") VALUES ('Jennifer Lawrence', 25, 1);
INSERT INTO actors (name, age, "number of oscars") VALUES ('Samuel L. Jackson', 67, 0);
INSERT INTO actors (name, age, "number of oscars") VALUES ('Meryl Streep', 66, 3);
INSERT INTO actors (name, age, "number of oscars") VALUES ('John Cho', 43, 0);

-- könnten auch auskommentieren und in Console
--FRAGE 1: ggf. auch nur >1
SELECT name, "number of oscars" FROM actors WHERE "number of oscars" >= 1;
SELECT * FROM actors WHERE "number of oscars" >= 1;

--FRAGE 2:
SELECT name, age FROM actors WHERE "age" >= 30;
SELECT * FROM actors WHERE "age" >= 30;