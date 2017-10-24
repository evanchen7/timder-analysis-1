CREATE TABLE User_Swipes (
    event_id int  NOT NULL,
    user_id int  NOT NULL,
    swiped_id int  NOT NULL,
    swipe boolean  NOT NULL,
    timestamp timestamp  NOT NULL,
    Users_user_id int  NOT NULL,
    CONSTRAINT User_Swipes_pk PRIMARY KEY (event_id)
);

-- Table: User_Weights
CREATE TABLE User_Weights (
    weight_id int  NOT NULL,
    user_id int  NOT NULL,
    photo_count_weight json  NOT NULL,
    created_at date  NOT NULL,
    CONSTRAINT User_Weights_pk PRIMARY KEY (weight_id)
);

-- Table: Users
CREATE TABLE Users (
    user_id int  NOT NULL,
    gender varchar  NOT NULL,
    location varchar  NOT NULL,
    photo_count int  NOT NULL,
    CONSTRAINT Users_pk PRIMARY KEY (user_id)
);

-- foreign keys
-- Reference: Users_User_Swipes (table: User_Swipes)
ALTER TABLE User_Swipes ADD CONSTRAINT Users_User_Swipes
    FOREIGN KEY (user_id)
    REFERENCES Users (user_id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: Users_User_Weights (table: User_Weights)
ALTER TABLE User_Weights ADD CONSTRAINT Users_User_Weights
    FOREIGN KEY (user_id)
    REFERENCES Users (user_id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;
