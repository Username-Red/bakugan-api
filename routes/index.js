const router = require('express').Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    //#swagger.tags = ["Hello World"];
    res.send("Welcome to the Bakugan API");
});

router.use("/bakugan", require("./bakugan"));

module.exports = router;