DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
SET search_path TO public;
grant usage on schema public to public;
grant create on schema public to public;


-- Schema
CREATE TABLE test_table (
	title VARCHAR,
	URL VARCHAR
);

-- Seed
INSERT INTO test_table (title, url) VALUES 
	('I am the first title', 'www.sup.com'),
	('wow such title much cool', 'www.comeatme.com');
	
SELECT * FROM test_table tt 