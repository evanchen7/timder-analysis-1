-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-10-24 00:16:26.021

-- tables
-- Table: Calculated_Weights
CREATE TABLE Calculated_Weights (
    id int  NOT NULL,
    photo_count_weight json  NOT NULL,
    created_at timestamp  NOT NULL,
    CONSTRAINT Calculated_Weights_pk PRIMARY KEY (id)
);

-- Table: Event_Service
CREATE TABLE Event_Service (
    event_id int  NOT NULL,
    event_created_at date  NOT NULL,
    user_id int  NOT NULL,
    start_date date  NOT NULL,
    CONSTRAINT Event_Service_pk PRIMARY KEY (event_id)
);

-- Table: Swipes
CREATE TABLE Swipes (
    user_id int  NOT NULL,
    no_swipe int  NOT NULL,
    yes_swipe int  NOT NULL,
    matches int  NOT NULL,
    Event_Service_event_id int  NOT NULL,
    CONSTRAINT Swipes_pk PRIMARY KEY (user_id)
);

-- Table: User_Info
CREATE TABLE User_Info (
    user_id int  NOT NULL,
    gender varchar  NOT NULL,
    location varchar  NOT NULL,
    photo_count int  NOT NULL,
    Swipes_user_id int  NOT NULL,
    CONSTRAINT User_Info_pk PRIMARY KEY (user_id)
);

-- foreign keys
-- Reference: Swipes_Event_Service (table: Swipes)
ALTER TABLE Swipes ADD CONSTRAINT Swipes_Event_Service
    FOREIGN KEY (Event_Service_event_id)
    REFERENCES Event_Service (event_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: User_Info_Swipes (table: User_Info)
ALTER TABLE User_Info ADD CONSTRAINT User_Info_Swipes
    FOREIGN KEY (Swipes_user_id)
    REFERENCES Swipes (user_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

