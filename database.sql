CREATE TABLE  classes  (
   room_id  varchar PRIMARY KEY,
   roomNo  int,
   building  varchar,
   type  varchar,
   capacity  int,
   projector  boolean
);

CREATE TABLE  default_time_slots  (
   room_id  varchar,
   garag  varchar,
   time  int
);

CREATE TABLE  users  (
   id  varchar PRIMARY KEY,
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

CREATE TABLE  reservation_times  (
   time  int,
   res_id  varchar
);

CREATE TABLE  liked  (
   user_id  varchar,
   room_id  varchar
);

CREATE TABLE  schedule  (
   week_id  varchar,
   room_id  varchar,
   garag  varchar,
   time  int,
   status  bool
);

-- FOREIGN KEYS
ALTER TABLE  ratings  ADD FOREIGN KEY ( user_id ) REFERENCES  users  ( id );

ALTER TABLE  ratings  ADD FOREIGN KEY ( room_id ) REFERENCES  classes  ( room_id );

ALTER TABLE  reservations  ADD FOREIGN KEY ( user_id ) REFERENCES  users  ( id );

ALTER TABLE  reservations  ADD FOREIGN KEY ( room_id ) REFERENCES  classes  ( room_id );

ALTER TABLE  default_time_slots  ADD FOREIGN KEY ( room_id ) REFERENCES  classes  ( room_id );

ALTER TABLE  reservation_times  ADD FOREIGN KEY ( res_id ) REFERENCES  reservations  ( res_id );

ALTER TABLE  liked  ADD FOREIGN KEY ( user_id ) REFERENCES  users  ( id );

ALTER TABLE  liked  ADD FOREIGN KEY ( room_id ) REFERENCES  classes  ( room_id );

ALTER TABLE  schedule  ADD FOREIGN KEY ( room_id ) REFERENCES  classes  ( room_id );

-- CONSTRAINTS
CREATE UNIQUE INDEX unique_user_room ON liked (user_id, room_id) WHERE delete_flag = FALSE;

ALTER TABLE liked ADD COLUMN delete_flag BOOLEAN DEFAULT FALSE;
ALTER TABLE ratings ADD COLUMN delete_flag BOOLEAN DEFAULT FALSE;
ALTER TABLE reservations ADD COLUMN delete_flag BOOLEAN DEFAULT FALSE;
ALTER TABLE reservations ALTER COLUMN status SET DEFAULT 'waiting';
ALTER TABLE reservations DROP COLUMN cancelled 
ALTER TABLE reservation_times ADD COLUMN date DATE
ALTER TABLE reservation_times ADD COLUMN garag VARCHAR

alter table schedule add column date Date
alter table schedule drop column week_id
alter table schedule ALTER COLUMN status SET DEFAULT TRUE;
alter table reservation_times drop column garag