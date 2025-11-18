const prisma = require("../prisma/client");
const { exec } = require("child_process");

exports.getUserScans = async (req, res) => {
  try {
    const scans = await prisma.scan.findMany({
      where: { userId: req.user.id },  
      orderBy: { createdAt: "desc" },
    });

    res.json({ scans });
  } catch (err) {
    res.status(500).json({ message: "Could not load scans", error: err });
  }
};

exports.runScan = async (req, res) => {
  const { target } = req.body;

  if (!target) {
    return res.status(400).json({ message: "Target required" });
  }

  const safeTarget = target.replace(/[^a-zA-Z0-9\.\-\:]/g, "");

  const cmd = `nmap -T4 -F --top-ports 50 ${safeTarget}`;

  exec(cmd, { timeout: 15000 }, async (err, stdout, stderr) => {
    if (err) {
      console.error("Scan Error:", err);
      return res.status(500).json({ message: "Nmap scan failed" });
    }

    const scan = await prisma.scan.create({
      data: {
        userId: req.user.id,
        target: safeTarget,
        result: stdout.substring(0, 50000),
      },
    });

    res.json({
      message: "Scan completed",
      scanId: scan.id,
      output: stdout,
    });
  });
};
