const { Router } = require("express");
const User = require("../models/").user;
const Artwork = require("../models").artwork;
const Bid = require("../models").bid;

const router = new Router();

/**Get all artworks */

router.get("/", async (req, res) => {
  // don't send back the password hash

  const artworks = await Artwork.findAll({
    include: [Bid],
    order: [[Bid, "createdAt", "DESC"]],
  });
  console.log("when i fetch", artworks[1].hearts);
  res.status(200).send({ message: "ok", artworks });
});

/**Get arwork by id */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id);
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "artwork id is not a number" });
  }

  const artwork = await Artwork.findByPk(id, {
    include: [Bid],
    order: [[Bid, "createdAt", "DESC"]],
  });

  if (artwork === null) {
    return res.status(404).send({ message: "artwork not found" });
  }

  res.status(200).send({ message: "ok", artwork });
});

/**Change the hearts */

router.patch("/:id", async (req, res) => {
  const artwork = await Artwork.findByPk(req.params.id);

  const { hearts } = req.body;
  console.log(hearts);

  await artwork.update({ hearts });

  return res.status(200).send({ artwork });
});

module.exports = router;
