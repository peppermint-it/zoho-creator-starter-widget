const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const appDir = path.join(repoRoot, "app");

const targets = [
  path.join(appDir, "assets"),
  path.join(appDir, "widget.html"),
];

for (const target of targets) {
  try {
    fs.rmSync(target, { recursive: true, force: true });
  } catch (error) {
    console.error(`[widget:clean] Failed to remove ${target}`);
    throw error;
  }
}

console.log("[widget:clean] Removed generated app build outputs");

