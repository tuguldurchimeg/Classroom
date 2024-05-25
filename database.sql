CREATE TABLE  classes  (
   room_id  varchar PRIMARY KEY,
   roomNo  int,
   building  int,
   type  varchar,
   capacity  int,
   projector  boolean
);

CREATE TABLE  schedules  (
   room_id  varchar,
   week  varchar,
   garag  varchar,
   time  int,
   status  varchar
);

CREATE TABLE  users  (
   user_id  varchar PRIMARY KEY,
   username  varchar,
   password  varchar,
   phone  varchar
);

CREATE TABLE  ratings  (
   id  integer PRIMARY KEY,
   user_id  varchar,
   room_id  varchar,
   air_rate  int,
   comfort_rate  int,
   wifi_rate  int,
   slot_rate  int
);

CREATE TABLE  reservations  (
   res_id  varchar PRIMARY KEY,
   user_id  varchar,
   room_id  varchar,
   date  date,
   purpose  varchar,
   desc  varchar,
   people  int,
   phone1  varchar,
   phone2  varchar,
   cancelled  bool,
   status  varchar
);

CREATE TABLE  times  (
   time  int,
   res_id  varchar
);

CREATE TABLE  liked  (
   user_id  varchar,
   room_id  varchar
);

CREATE TABLE  reserved  (
   user_id  varchar,
   res_id  varchar
);

ALTER TABLE  ratings  ADD FOREIGN KEY ( user_id ) REFERENCES  users  ( user_id );

ALTER TABLE  ratings  ADD FOREIGN KEY ( room_id ) REFERENCES  classes  ( room_id );

ALTER TABLE  reservations  ADD FOREIGN KEY ( user_id ) REFERENCES  users  ( user_id );

ALTER TABLE  reservations  ADD FOREIGN KEY ( room_id ) REFERENCES  classes  ( room_id );

ALTER TABLE  schedules  ADD FOREIGN KEY ( room_id ) REFERENCES  classes  ( room_id );

ALTER TABLE  times  ADD FOREIGN KEY ( res_id ) REFERENCES  reservations  ( res_id );

ALTER TABLE  liked  ADD FOREIGN KEY ( user_id ) REFERENCES  users  ( user_id );

ALTER TABLE  liked  ADD FOREIGN KEY ( room_id ) REFERENCES  classes  ( room_id );

ALTER TABLE  reserved  ADD FOREIGN KEY ( user_id ) REFERENCES  users  ( user_id );

ALTER TABLE  reserved  ADD FOREIGN KEY ( res_id ) REFERENCES  reservations  ( res_id );
