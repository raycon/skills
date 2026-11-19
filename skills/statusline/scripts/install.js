#!/usr/bin/env node
// Install assets/statusline.js into the Claude config dir and point settings.json at it.
// Usage: node install.js [config-dir]   (default: $CLAUDE_CONFIG_DIR or ~/.claude)
const fs = require("fs");
const path = require("path");
const os = require("os");

const dir = process.argv[2] || process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), ".claude");
const src = path.join(__dirname, "..", "assets", "statusline.js");
const dst = path.join(dir, "statusline.js");
const settingsPath = path.join(dir, "settings.json");

// Read settings first so a broken settings.json stops the install before anything changes.
let settings = {};
if (fs.existsSync(settingsPath)) {
  try {
    settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
  } catch (e) {
    console.error(`[error] ${settingsPath} is not valid JSON: ${e.message}`);
    process.exit(1);
  }
}

fs.mkdirSync(dir, { recursive: true });
const next = fs.readFileSync(src);
if (fs.existsSync(dst) && !fs.readFileSync(dst).equals(next)) {
  fs.copyFileSync(dst, dst + ".bak");
  console.log(`[backup] ${dst}.bak`);
}
fs.writeFileSync(dst, next, { mode: 0o755 });
console.log(`[installed] ${dst}`);

// Keep other statusLine keys (e.g. padding) and replace only what this script owns.
const command = `node "${dst}"`;
const prev = settings.statusLine || {};
if (prev.type === "command" && prev.command === command) {
  console.log(`[settings] statusLine already points at ${dst}`);
} else {
  if (prev.command) console.log(`[settings] replacing statusLine.command: ${prev.command}`);
  settings.statusLine = { ...prev, type: "command", command };
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + "\n");
  console.log(`[settings] ${settingsPath}`);
}
