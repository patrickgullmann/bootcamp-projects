DROP TABLE IF EXISTS cities;
--bc when you do this it will drop old table

CREATE TABLE cities (
    id SERIAL primary key,
    name VARCHAR(255) NOT NULL,  
    -- name cannot be null! note: instead of VARCHAR(255) you can use TEXT or just VARCHAR with no limit
    population INT,
    country VARCHAR
);

--NOTE: THE DATABASE AND THE FILE ARE NOT CONNECTED -> WE JUST USE THE FILE TO WRITE MORE VISIBLE CODE
--WE HAVE THAN EVERY TIME TO LOAD IT IN THE DATABASE

--IN TERMINAL 
-- FIRST: createdb geography //create db (no matter where you are)
-- psql geography // open database (no matter where you are)
-- \q end database
-- psql -d geography -f cities.sql // load in database (matters where you are-> maybe use path)
-- psql geography // open database
-- \dt //shows relations

INSERT INTO cities(name, country, population)
VALUES('Berlin', 'Germany', 3610123);

INSERT INTO cities (name, country, population) 
VALUES ('Hamburg', 'Germany', 1774242);

INSERT INTO cities (name, country, population) 
VALUES ('Munch', 'Germany', 1450381);

INSERT INTO cities (name, country, population) 
VALUES ('Tokyo', 'Japan', 13617445);

INSERT INTO cities (name, country, population) 
VALUES ('Sydney', 'Australia', 4921000);


-- LATER IN TERMINAL SELECT * FROM cities;
-- SELECT population FROM cities;
-- SELECT name AS cityName, population AS pop FROM cities;
-- SELECT * FROM cities WHERE population > 4000000;
-- SELECT * FROM cities WHERE id = 2;

--IN TERMINAL LATER: 
-- UPDATE cities SET name = 'Quito' WHERE id = 5;

--DELETE FROM cities WHERE id =2;
-- NOTE WHEN YOU delete smth the id will be gone forever -> if I add Hamburg later it will be 
-- added as id 6!!! 

-- DELETE FROM cities WHERE country <> 'Germany'; //is SQL for !=


--ALSO "DELETE FROM cities" NEVER DO!!! WILL DELETE EVERYTHING

-- THERE IS ALSO ALTER FUNCTION!!!

