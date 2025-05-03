DROP DATABASE IF EXISTS DreamJournal;
CREATE DATABASE         DreamJournal;

DROP USER IF EXISTS 'manasi'@localhost';
CREATE USER         'manasi'@localhost' IDENTIFIED BY '121212';
GRANT ALL PRIVILEGES ON DreamJournal.* TO 'manasi'@'localhost';

USE DreamJournal;

CREATE TABLE Users
(
    User_ID     INTEGER     UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Username    VARCHAR(100)    UNIQUE,
    Email       VARCHAR(250),
    Password    CHAR(60)
);

CREATE TABLE JournalEntries
(
    Entry_ID        INTEGER     UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Entry_Name      VARCHAR(100),
    Journal_Entry   STR,
    USER_ID         INTEGER     FOREIGN KEY
);