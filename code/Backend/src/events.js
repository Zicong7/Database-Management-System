const express = require('express');

function createRouter(db) {
  const router = express.Router();



router.get('/searchRestCity', function (req, res, next) {
  db.query(
    "SELECT * FROM place WHERE address LIKE '%" + req.query.address  + "%' and place_id IN ( SELECT place_id FROM Restaurant WHERE cus_id in ( SELECT cus_id FROM Cuisine WHERE cus_name = ?));",
	[req.query.cus],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/searchTouristCity', function (req, res, next) {
  db.query(
    "SELECT * FROM place WHERE address LIKE '%" + req.query.address  + "%' and place_id IN ( SELECT place_id FROM TouristSpot WHERE cat_id in ( SELECT cat_id FROM Category WHERE cat_name = ?));",
	[req.query.cat],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});



router.get('/searchFav', function (req, res, next) {
  db.query(
    "SELECT * FROM place WHERE place_id in (SELECT place_id FROM Favourite WHERE user_id IN (SELECT user_id FROM User WHERE user_fname = ?));",
	[req.query.fname],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/searchWant', function (req, res, next) {
  db.query(
    "SELECT * FROM place WHERE place_id in (SELECT place_id FROM WantsToGo WHERE user_id IN (SELECT user_id FROM User WHERE user_fname = ?));",
	[req.query.fname],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/searchVisit', function (req, res, next) {
  db.query(
    "SELECT * FROM place WHERE place_id in (SELECT place_id FROM Visited WHERE user_id IN (SELECT user_id FROM User WHERE user_fname = ?));",
	[req.query.fname],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/searchStar', function (req, res, next) {
  db.query(
    "SELECT * FROM place WHERE place_id in (SELECT place_id FROM Starred WHERE user_id IN (SELECT user_id FROM User WHERE user_fname = ?));",
	[req.query.fname],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/insertReview', (req, res, next) => {
  var isTrueSet = (req.query.recommended == req.query.recommended);

  db.query(
    'INSERT INTO Review VALUES(?, ?, ?, ?);',
    [req.query.place, req.query.user, req.query.rating, isTrueSet],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.post('/insertFav', (req, res, next) => {
  db.query(
    'INSERT INTO Favourite VALUES(?, ?);',
    [req.query.place, req.query.user],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.post('/insertWant', (req, res, next) => {
  db.query(
    'INSERT INTO WantsToGo VALUES(?, ?);',
    [req.query.place, req.query.user],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});


router.post('/insertStar', (req, res, next) => {
  db.query(
    'INSERT INTO Starred VALUES(?, ?);',
    [req.query.place, req.query.user],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});


router.post('/insertVisit', (req, res, next) => {
  db.query(
     'INSERT INTO Visited VALUES(?, ?, ?);',
    [req.query.place, req.query.user, req.query.date],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.post('/insertUser', (req, res, next) => {
  db.query(
    'INSERT INTO User VALUES(?, ?, ?, ?, ?, ?);',
    [req.query.id, req.query.fname, req.query.lname, req.query.email, req.query.gender, req.query.dob],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.delete('/deleteFav', function (req, res, next) {
  db.query(
    'DELETE FROM Favourite WHERE place_id=? AND user_id=?',
    [req.query.place, req.query.user],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.delete('/deleteWant', function (req, res, next) {
  db.query(
    'DELETE FROM WantsToGo WHERE place_id=? AND user_id=?',
    [req.query.place, req.query.user],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.delete('/deleteStar', function (req, res, next) {
  db.query(
    'DELETE FROM Starred WHERE place_id=? AND user_id=?',
    [req.query.place, req.query.user],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});


router.delete('/deleteVisit', function (req, res, next) {
    db.query(
        'DELETE FROM Visited WHERE place_id=? AND user_id=?',
        [req.query.place, req.query.user],
        (error) => {
            if (error) {
                res.status(500).json({status: 'error'});
            } else {
                res.status(200).json({status: 'ok'});
            }
        });
});




router.get('/getSearch', function (req, res, next) {
  db.query(
    "SELECT * FROM place where place_id in  (SELECT place_id FROM SearchedFor WHERE USER_ID = ?);",
	[req.query.user],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/addSearch', function (req, res, next) {
  db.query(
    'INSERT INTO SearchedFor VALUES(?, ?);',
	[req.query.place, req.query.user],
	(error) => {
      if (error) {
        res.status(500).json({status: error});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.get('/getUser', function (req, res, next) {
  db.query(
    "SELECT * FROM user WHERE user_fname = ?;",
	[req.query.user],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.put('/updateUser', function (req, res, next) {
  db.query(
    'UPDATE user SET user_fname=?, user_lname=?, user_email=?, user_gender=?, user_dob =? WHERE user_id=?;',
     [req.query.fname, req.query.lname, req.query.email, req.query.gender, req.query.dob, req.query.id],
    (error) => {
      if (error) {
        res.status(500).json({status: error});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.get('/getItems', function (req, res, next) {
  db.query(
    "SELECT item_name, item_price FROM item where place_id = ?;",
	[req.query.place],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});


router.get('/getAvgReview', function (req, res, next) {
  db.query(
    "SELECT AVG(rating) as avg from review where place_id = ?;",
	[req.query.place],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});
  return router; 
}

module.exports = createRouter;
