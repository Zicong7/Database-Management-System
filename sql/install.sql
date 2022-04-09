CREATE DATABASE TravelLover;
USE TravelLover;

CREATE TABLE Place (
    place_id INT,
    price INT,
    place_name CHAR(80),
    address CHAR(80),
    PRIMARY KEY (place_id)
);
CREATE TABLE Category (
    cat_id INT NOT NULL,
    cat_name CHAR(80),
    PRIMARY KEY (cat_id)
);
CREATE TABLE TouristSpot (
    place_id INT NOT NULL,
    cat_id INT,
    PRIMARY KEY (place_id),
    FOREIGN KEY (place_id)
        REFERENCES Place(place_id),
    FOREIGN KEY (cat_id)
        REFERENCES Category(cat_id)
);
CREATE TABLE Cuisine (
    cus_id INT NOT NULL,
    cus_name CHAR(80),
    PRIMARY KEY (cus_id)
);
CREATE TABLE Restaurant (
    place_id INT NOT NULL,
    cus_id INT,
    delivery BOOLEAN,
    PRIMARY KEY (place_id),
    FOREIGN KEY (place_id)
        REFERENCES Place(place_id),
    FOREIGN KEY (cus_id)
        REFERENCES Cuisine(cus_id)
);
CREATE TABLE User (
    user_id INT NOT NULL,
    user_fname CHAR(80),
    user_lname CHAR(80),
    user_email CHAR(80),
    user_gender CHAR(80),
    user_dob DATE,
    PRIMARY KEY (user_id)
);
CREATE TABLE Review (
    place_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT,
    recommended BOOLEAN,
    PRIMARY KEY (place_id , user_id),
    FOREIGN KEY (place_id)
        REFERENCES Place(place_id),
    FOREIGN KEY (user_id)
        REFERENCES User(user_id)
);
CREATE TABLE SearchedFor (
    place_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (place_id , user_id),
    FOREIGN KEY (place_id)
        REFERENCES Place(place_id),
    FOREIGN KEY (user_id)
        REFERENCES User(user_id)
);
CREATE TABLE Favourite (
    place_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (place_id , user_id),
    FOREIGN KEY (place_id)
        REFERENCES Place(place_id),
    FOREIGN KEY (user_id)
        REFERENCES User(user_id)
);
CREATE TABLE WantsToGo (
    place_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (place_id , user_id),
    FOREIGN KEY (place_id)
        REFERENCES Place(place_id),
    FOREIGN KEY (user_id)
        REFERENCES User(user_id)
);
CREATE TABLE Starred (
    place_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (place_id , user_id),
    FOREIGN KEY (place_id)
        REFERENCES Place(place_id),
    FOREIGN KEY (user_id)
        REFERENCES User(user_id)
);
CREATE TABLE Visited (
    place_id INT NOT NULL,
    user_id INT NOT NULL,
    visit_date DATE,
    PRIMARY KEY (place_id , user_id),
    FOREIGN KEY (place_id)
        REFERENCES Place(place_id),
    FOREIGN KEY (user_id)
        REFERENCES User(user_id)
);
CREATE TABLE Item (
    item_id INT,
    item_price INT,
    item_name CHAR(80),
    Place_id INT,
    FOREIGN KEY (place_id)
        REFERENCES Restaurant (place_id),
    PRIMARY KEY (item_id)
);

