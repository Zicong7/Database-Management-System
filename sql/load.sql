USE TravelLover;

INSERT INTO Place VALUES(001, 10, "Life and Science Museum", "433 W Murray Ave, Durham, NC 27704");
INSERT INTO Place VALUES(002, 11, "History Museum", "123 Westside St, Durham, NC 27704");
INSERT INTO Place VALUES(003, 100, "Art Museum", "412 North Rd, Durham, NC 27704");
INSERT INTO Place VALUES(004, 1, "Ripley's Believe it or Not", "1231 Blaker Lane, Durham, NC 27704");
INSERT INTO Place VALUES(005, 5, "Fish House Aquarium", "434 W Murray Ave, Chapel Hill, NC 27517");
INSERT INTO Place VALUES(006, 12, "Water World", "432 W Murray Ave, Durham, NC 27704");
INSERT INTO Place VALUES(007, 11, "Animal Planet Zoo", "19 King's Rd, Chapel Hill, NC 27517");
INSERT INTO Place VALUES(008, 16, "Panda Preseve", "12321 Drew Drive, Benson, NC 27714");
INSERT INTO Place VALUES(009, 13, "Turtle Town", "987 Trick Lane, Benson, NC 27714");
INSERT INTO Place VALUES(010, 2, "Bird Base", "7722 Wild Horse Street El Paso, TX 79930");


INSERT INTO Place VALUES(101, 0, "Burger Shack", "658 S. Lexington St. Queensbury, NY 12804");
INSERT INTO Place VALUES(102, 0, "Med Deli", "317 South Sheffield Ave. Arvada, CO 80003");
INSERT INTO Place VALUES(103, 0, "Jade Palace", "102 Trout St. Neptune, NJ 07753");
INSERT INTO Place VALUES(104, 0, "Mint Indian Cuisine", "25 Rock Maple Dr. Upper Darby, PA 19082");
INSERT INTO Place VALUES(105, 0, "Village Pizza Pasta", "398 Williams St. Olive Branch, NA 38654");
INSERT INTO Place VALUES(106, 0, "Steak House", "7457 South Winchester Ave. Oxford, NY 38655");
INSERT INTO Place VALUES(107, 0, "BBQ Station", "9979 Brickyard Street Stockbridge, GA 30281");
INSERT INTO Place VALUES(108, 0, "Greg's Grill", "675 Walnut Ave. Lakeland, FL 33801");
INSERT INTO Place VALUES(109, 0, "Tandoor Indian Restaurant", "944 South Meadowbrook Street Mahopac, NY 10541");
INSERT INTO Place VALUES(110, 0, "Charlie's", "46 Ashley Rd. Southington, CT 06489");


INSERT INTO Category VALUES(001, 'museums');
INSERT INTO Category VALUES(002, 'aquariums');
INSERT INTO Category VALUES(003, 'zoos');


INSERT INTO TouristSpot VALUES(001, 001);
INSERT INTO TouristSpot VALUES(002, 001);
INSERT INTO TouristSpot VALUES(003, 001);
INSERT INTO TouristSpot VALUES(004, 002);
INSERT INTO TouristSpot VALUES(005, 002);
INSERT INTO TouristSpot VALUES(006, 002);
INSERT INTO TouristSpot VALUES(007, 003);
INSERT INTO TouristSpot VALUES(008, 003);
INSERT INTO TouristSpot VALUES(009, 003);
INSERT INTO TouristSpot VALUES(010, 003);


INSERT INTO Cuisine VALUES(001, 'American');
INSERT INTO Cuisine VALUES(002, 'Arabic');
INSERT INTO Cuisine VALUES(003, 'Chinese');
INSERT INTO Cuisine VALUES(004, 'Indian');
INSERT INTO Cuisine VALUES(005, 'Italian');


INSERT INTO Restaurant VALUES(101, 001, true);
INSERT INTO Restaurant VALUES(102, 002, false);
INSERT INTO Restaurant VALUES(103, 003, true);
INSERT INTO Restaurant VALUES(104, 004, true);
INSERT INTO Restaurant VALUES(105, 005, false);
INSERT INTO Restaurant VALUES(106, 001, true);
INSERT INTO Restaurant VALUES(107, 001, true);
INSERT INTO Restaurant VALUES(108, 001, false);
INSERT INTO Restaurant VALUES(109, 004, true);
INSERT INTO Restaurant VALUES(110, 005, false);


INSERT INTO User(user_id, user_fname, user_lname, user_email, user_gender, user_dob)
VALUES("1", "Evie", "Elysia", "evieyls@gmail.com", "nonbinary", "1999-05-14"),
("2", "Alice", "Smythe", "fireflame@gmail.com", "girl", "1999-06-06"),
("3", "Kev", "Gerk", "kevkev@hotmail.com", "boy", "1999-03-01"),
("4", "Celery", "Geist", "autumunbox@gmail.com", "girl", "2001-03-14"),
("5", "Jory", "Faux", "jjor@gmail.com", "girl", "2000-08-20"),
("6", "Steph", "Bikel", "buiboy@aol.com", "boy", "1999-07-11");


INSERT INTO Visited(place_id, user_id, visit_date)
VALUES(1, 1, "2020-05-23"),
(3, 1, "2010-05-23"),
(4, 1, "2000-05-23"),
(2, 1, "2007-05-23"),
(3, 2, "2019-05-23"),
(4, 3, "2020-05-23"),
(4, 2, "2021-05-23"),
(6, 2, "2009-05-23"),
(5, 2, "2007-05-23"),
(7, 4, "2016-05-23"),
(10, 5, "2005-05-23");

INSERT INTO Starred(place_id, user_id)
VALUES(1, 1),
(4, 2),
(4, 1),
(3, 3);

INSERT INTO WantsToGo(place_id, user_id)
VALUES(1, 2),
(1, 3),
(1, 4),
(4, 5),
(4, 1),
(5, 1),
(6, 1),
(6, 2),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5);

INSERT INTO SearchedFor(place_id, user_id)
VALUES(1, 1),
(7, 4),
(10, 3);

INSERT INTO Favourite(place_id, user_id)
VALUES(1, 1),
(4, 2),
(10, 5),
(2, 1);

INSERT INTO Review (place_id, user_id, rating, recommended)
VALUES(1, 1, 5, TRUE),
(2, 1, 4, TRUE),
(3, 1, 3, FALSE),
(7, 4, 4, TRUE),
(4, 2, 4, TRUE),

(106, 5, 5, TRUE),
(107, 1, 5, TRUE),
(106, 2, 5, TRUE),
(101, 4, 4, TRUE),
(101, 3, 5, TRUE),

(4, 3, 3, FALSE);

INSERT INTO ITEM (item_id, item_price, item_name, Place_id)
VALUES(1, 10, "Burger", 101),
(2, 2, "Fries", 101),
(3, 3, "Shake", 101),
(4, 4, "Hummus", 102),
(5, 5, "Crispy Tofu", 103),
(6, 1, "Curry", 104),
(7, 20, "Pizza", 105),
(8, 3, "Steak", 106),
(9, 7, "BBQ", 107),
(10, 8, "Chicken", 108),
(11, 5, "Naan", 109),
(12, 12, "Stir Fry", 110),
(13, 20, "Pizza", 101),
(14, 20, "Pizza", 107),
(15, 20, "Pizza", 106);