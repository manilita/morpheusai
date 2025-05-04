DROP DATABASE IF EXISTS DreamJournal;
CREATE DATABASE         DreamJournal;

DROP USER IF EXISTS 'manasi'@'localhost';
CREATE USER 'manasi'@'localhost' IDENTIFIED BY '121212454545';
GRANT ALL PRIVILEGES ON DreamJournal.* TO 'manasi'@'localhost';
FLUSH PRIVILEGES;

--ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '987654321';
--FLUSH PRIVILEGES;

USE DreamJournal;

CREATE TABLE Users
(
    User_ID     INT     UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Username    VARCHAR(100)    UNIQUE,
    Email       VARCHAR(250),
    Password    CHAR(60)
);

CREATE TABLE JournalEntries
(
    Entry_ID        INT     UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Entry_Name      VARCHAR(100),
    Journal_Entry   TEXT,
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
);