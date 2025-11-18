const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const prisma = require("../prisma/client");
const { runScan, getUserScans } = require("../controllers/scanController");

router.get("/", verifyToken, getUserScans);

router.post("/run", verifyToken, runScan);

router.get("/count", verifyToken, async (req, res) => {
  try {
    const count = await prisma.scan.count({
      where: { userId: req.user.id },
    });

    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Could not get scan count" });
  }
});


module.exports = router;
