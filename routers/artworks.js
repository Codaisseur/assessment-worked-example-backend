const { Router } = require("express");
const User = require("../models/").user;
const Artwork = require("../models").artwork;
const Bid = require("../models").bid;
const authMiddleware = require("../auth/middleware");

const router = new Router();

/**Get all artworks */

router.get("/", async (req, res, next) => {
  try {
    const artworks = await Artwork.findAll({
      include: [Bid],
      order: [[Bid, "createdAt", "DESC"]],
    });

    res.status(200).send({ message: "ok", artworks });
  } catch(e) {
    next(e)
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { title, imageUrl, minimumBid } = req.body;
  
    if (!title || !imageUrl || !minimumBid) {
      return res
        .status(400)
        .send({ message: "A story must have a title, imageUrl and minimumBid" });
    }
    const artwork = await Artwork.create({
      title,
      imageUrl,
      hearts: 0,
      minimumBid,
      userId: req.user.id,
    });
  
    return res.status(201).send({ message: "Artwork created", artwork });
  } catch(e) {
    next(e)
  }
});

/**Get arwork by id */
router.get("/:id", async (req, res, next) => {
  try {
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
  } catch(e) {
    next(e)
  }
});

/**Change the hearts */

router.patch("/:id", async (req, res, next) => {
  try {
    const artwork = await Artwork.findByPk(req.params.id);
    
    if (!artwork) {
      return res.status(404).send("Artwork doesn't exist")
    }
    await artwork.update({ hearts: artwork.hearts + 1 });
  
    return res.status(200).send({ artwork });
  } catch(e) {
    next(e);
  }
});


router.post("/:id/bids", authMiddleware, async (req, res, next) => {
  try {
    const artwork = await Artwork.findByPk(req.params.id, { include: [Bid] });

  if (artwork === null) {
    return res.status(404).send({ message: "This artwork does not exist" });
  }

  const currentBids = artwork.bids.map(b => b.amount)

  const maxCurrentBid = currentBids.length ? Math.max(...currentBids) : artwork.minimumBid;

  const { amount } = req.body;
  const email = req.user.email;

  if (!email || !amount) {
    return res
      .status(400)
      .send({ message: "A bid must have an asociated email and an amount" });
  }

  if (amount <= maxCurrentBid) {
    return res.status(400).send({ message: "Your bid was too low" });
  }

  const bid = await Bid.create({
    email,
    amount,
    artworkId: artwork.id,
  });

  return res.status(201).send({ message: "Bid created", bid });

  } catch(e) {
    next(e)
  }
});

module.exports = router;
