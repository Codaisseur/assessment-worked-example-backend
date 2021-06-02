const { Router } = require("express");
const User = require("../models/").user;
const Artwork = require("../models").artwork;
const Bid = require("../models").bid;

const router = new Router();

router.get("/", async (req, res) => {
  // don't send back the password hash

  const artworks = await Artwork.findAll({
    include: [Bid],
    order: [[Bid, "createdAt", "DESC"]],
  });
  res.status(200).send({ message: "ok", artworks });
});

module.exports = router;
