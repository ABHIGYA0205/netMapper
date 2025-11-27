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
    console.error("Scan fetch error:", err);
    res.status(500).json({ message: "Could not load scans", error: err });
  }
};

exports.runScan = async (req, res) => {
  const { target, scanType } = req.body;

  if (!target || !scanType)
    return res.status(400).json({ message: "Target & scanType required" });

  const safeTarget = target.replace(/[^a-zA-Z0-9\.\-\:]/g, "");

  let cmd;

switch (scanType) {
  case "full":
    cmd = `nmap --unprivileged -sT -T4 -p 1-65535 ${safeTarget}`;
    break;

  case "service":
    cmd = `nmap --unprivileged -sT -T4 -sV --version-light --top-ports 200 ${safeTarget}`;
    break;

  case "detailed":
    cmd = `nmap --unprivileged -sT -T4 -sV --version-light --top-ports 300 ${safeTarget}`;
    break;

  default:
    cmd = `nmap --unprivileged -sT -T4 --top-ports 50 ${safeTarget}`;
}

  console.log("Running Nmap:", cmd);

  exec(cmd, { timeout: 25000, maxBuffer: 10 * 1024 * 1024 }, async (err, stdout, stderr) => {
    if (err) {
      console.error("Nmap Error:", err);
      console.error("STDERR:", stderr);


      await prisma.scan.create({
        data: {
          userId: req.user.id,
          target: safeTarget,
          result: (stdout || stderr || "Scan failed").substring(0, 50000)
        },
      });

      return res.status(500).json({ message: "Nmap scan failed", error: stderr });
    }


    const scan = await prisma.scan.create({
      data: {
        userId: req.user.id,
        target: safeTarget,
        result: stdout.substring(0, 50000)
      },
    });

    res.json({
      message: "Scan completed",
      scanId: scan.id,
      output: stdout,
    });
  });
};
exports.deleteScan = async (req, res) => {
  try {
    const scanId =(req.params.id);

    const scan = await prisma.scan.findUnique({
      where: { id: scanId }
    });


    if (!scan || scan.userId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await prisma.scan.delete({
      where: { id: scanId }
    });

    res.json({ message: "Scan deleted" });

  } catch (err) {
    console.error("Delete scan error:", err);
    res.status(500).json({ message: "Failed to delete scan" });
  }
};

exports.deleteAllScans = async (req, res) => {
  try {
    await prisma.scan.deleteMany({
      where: { userId: req.user.id }
    });

    res.json({ message: "All scans deleted" });

  } catch (err) {
    console.error("Delete all error:", err);
    res.status(500).json({ message: "Failed to delete all scans" });
  }
};
