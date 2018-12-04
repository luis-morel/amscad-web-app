const db = require("../models");
const router = require("express").Router();

//---------------------------------------------//
//------------- API Routes (/api) -------------//
//---------------------------------------------//

// Add new building
router.post("/buildings/createnewbldg", (req, res) => {
  db.Buildings.create({
    name: req.body.name,
    location: req.body.location,
  })
    .then((results) => {
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    })
});

// Add new floor
router.post("/buildings/floors/createnewfloor", (req, res) => {
  db.Floors.create(req.body)
    .then((results) => {
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    })
});

// Add new room
router.post("/buildings/floors/rooms/createnewroom", (req, res) => {
  db.Rooms.create(req.body)
    .then((results) => {
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    })
});

// Add new user
router.post("/users/createnewuser", (req, res) => {
  db.Users.create(req.body)
    .then((results) => {
      res.json("/login");
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
});

// Retrieve all buildings
router.get("/buildings/listall", (req, res) => {
  db.Buildings.findAll({
    order: [['name']]
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
});

// Retrieve all data
router.get("/getalldata", (req, res) => {
  db.Buildings.findAll({
    include: [{
      model: db.Floors,
      include: [{ model: db.Rooms }],
    }],
    order: [
      ['name'],
      [db.Floors, 'name'],
      [db.Floors, db.Rooms, 'name']
    ]
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
});

// Retrieve one building
router.get("/buildings/findone/:bldgId", (req, res) => {
  db.Buildings.find({
    where: { id: req.params.bldgId }
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
});

// Retrieve one floor
router.get("/buildings/floors/findone/:floorId", (req, res) => {
  db.Floors.find({
    where: { id: req.params.floorId }
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
});

// Retrieve all floors in one building
router.get("/buildings/floors/listall/:bldgId", (req, res) => {
  db.Floors.findAll({
    where: { BuildingId: req.params.bldgId },
    order: [['name']]
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
});

// Retrieve all rooms on building floor
router.get("/buildings/floors/listrooms/:floorId", (req, res) => {
  db.Rooms.findAll({
    where: { FloorId: req.params.floorId },
    order: [['name']]
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
});

module.exports = router;