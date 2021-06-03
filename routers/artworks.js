const { Router } = require("express");
const User = require("../models/").user;
const Artwork = require("../models").artwork;
const Bid = require("../models").bid;
const authMiddleware = require("../auth/middleware");

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
    order: [[Bid, "createdAt", "ASC"]],
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

router.post("/:id/bids", authMiddleware, async (req, res) => {
  const artwork = await Artwork.findByPk(req.params.id);

  if (artwork === null) {
    return res.status(404).send({ message: "This artwork does not exist" });
  }

  const bids = await Bid.findAll({
    where: { artworkId: req.params.id },
    // order: [[Bid, "createdAt", "DESC"]],
  });
  console.log(bids);
  const lastMaxBid =
    bids.length > 0 ? bids[bids.length - 1].amount + 1 : artwork.minimumBid;

  /**The +1 here it's placed so I can use the same comparation
   *  for the first bid (min value = to minimumbid) and the rest (min value > lastbid) */
  const { amount } = req.body;
  const email = req.user.email;
  console.log(amount, email, lastMaxBid);

  if (!email || !amount) {
    return res
      .status(400)
      .send({ message: "A bid must have an asociated email and an amount" });
  }

  if (amount < lastMaxBid) {
    return res.status(400).send({ message: "Your bid was too low" });
  }

  const bid = await Bid.create({
    email,
    amount,
    artworkId: artwork.id,
  });

  return res.status(201).send({ message: "Bid created", bid });
});

module.exports = router;
