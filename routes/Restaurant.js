const express = require("express");
const router = express.Router();
const restaurantcontrol = require("../controllers/Restaurantcontrol")

router.get("/", restaurantcontrol.getallRestaurant)
router.post("/addrestaurant", restaurantcontrol.addRestaurant)
