PRAGMA foreign_keys = ON;

drop table if exists User;
drop table if exists Entry;
drop table if exists Media;

create table User (
	userID INTEGER NOT NULL PRIMARY KEY,
	username TEXT NOT NULL,
	password TEXT NOT NULL
);

create table Entry (
    entryID INTEGER NOT NULL PRIMARY KEY,
    entryType TEXT NOT NULL,
    entryName TEXT NOT NULL,
    entryDescription TEXT
);

create table Media (
	mediaID INTEGER NOT NULL PRIMARY KEY,
	mediaType TEXT NOT NULL,
	mediaName TEXT NOT NULL,
	mediaDescription TEXT,
	mediaPath TEXT NOT NULL,
	entryID INTEGER NOT NULL,
	FOREIGN KEY (entryID) references Entry(entryID) on update cascade on delete cascade
);
