const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const prisma = require("../prisma/client");
const { runScan ,deleteScan,deleteAllScans,updateScan} = require("../controllers/scanController");

router.get("/", verifyToken, async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", sort = "newest" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    let orderBy = {};
    if (sort === "newest") orderBy = { createdAt: "desc" };
    if (sort === "oldest") orderBy = { createdAt: "asc" };
    if (sort === "az") orderBy = { target: "asc" };
    if (sort === "za") orderBy = { target: "desc" };

    const where = {
      userId: req.user.id,
      target: { contains: search, mode: "insensitive" }
    };

    const total = await prisma.scan.count({ where });

    const scans = await prisma.scan.findMany({
      where,
      orderBy,
      skip,
      take: limit
    });

    res.json({
      scans,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (err) {
    console.error("Pagination error:", err);
    res.status(500).json({ message: "Failed to load scans" });
  }
});


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
router.put("/:id", verifyToken, updateScan);
router.delete("/all", verifyToken, deleteAllScans);
router.delete("/:id", verifyToken, deleteScan);



module.exports = router;
