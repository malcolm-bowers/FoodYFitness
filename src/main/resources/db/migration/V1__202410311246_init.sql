DROP TABLE IF EXISTS exercise cascade;
CREATE TABLE exercise
(
    id       BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name     VARCHAR(255)                            NOT NULL,
    type     VARCHAR(255)                            NOT NULL,
    calories DECIMAL(10, 2)                          NOT NULL,
    CONSTRAINT pk_habit PRIMARY KEY (id)
);