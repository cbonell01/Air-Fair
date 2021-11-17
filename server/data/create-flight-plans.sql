DROP TABLE IF EXISTS flightplans;

CREATE TABLE flightplans( 
    id              INTEGER     PRIMARY KEY,
    origin          TEXT        NOT NULL,
    destination     TEXT        NOT NULL,
    flightplan      TEXT        NULL
);