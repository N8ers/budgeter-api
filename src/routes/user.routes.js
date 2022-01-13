const router = require("express").Router();

router.get("/", async (req, res) => {
  res.status(200).send("user routes work!");
});

module.exports = router;
