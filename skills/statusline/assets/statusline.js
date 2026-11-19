#!/usr/bin/env node
// Status line: cwd, then model (effort) | context usage | subscription rate limits.
// Missing fields are omitted.
let raw = "";
try { raw = require("fs").readFileSync(0, "utf8"); } catch {}
let j = {};
try { j = JSON.parse(raw); } catch {}

// 40 미만 초록, 40~59 노랑, 60~79 주황, 80 이상 빨강
const levelColor = p => p >= 80 ? "38;5;196" : p >= 60 ? "38;5;208" : p >= 40 ? "38;5;220" : "38;5;114";
// haiku 노랑, sonnet 초록, opus 파랑, 그 밖은 빨강
const modelColor = { haiku: "38;5;220", sonnet: "38;5;114", opus: "38;5;75" };
// low 노랑, medium 초록, high 파랑, 그 밖은 빨강
const effortColor = { low: "38;5;220", medium: "38;5;114", high: "38;5;75" };
const c = (code, t) => `\x1b[${code}m${t}\x1b[00m`;
const bar = p => { const f = Math.min(10, Math.max(0, Math.round(p / 10))); return "▓".repeat(f) + "░".repeat(10 - f); };
const sep = c("38;5;240", " | ");
const fmtTok = n => n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? Math.round(n / 1e3) + "k" : String(n);
// 리셋 시각: 7d는 요일도 붙인다
const DOW = ["일", "월", "화", "수", "목", "금", "토"];
const fmtAt = (epoch, withDay) => {
  const t = new Date(epoch * 1000);
  const hm = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
  return withDay ? `${DOW[t.getDay()]} ${hm}` : hm;
};
// 첫 줄은 cwd만. 둘째 줄은 모델 (effort) | ctx | 5h | 7d
let out = c("38;5;245", (j.workspace && j.workspace.current_dir) || j.cwd || process.cwd());

const line2 = [];
const model = j.model && (j.model.display_name || j.model.id);
const effort = j.effort && (typeof j.effort === "object" ? j.effort.level : j.effort);
let me = "";
if (model) {
  const key = Object.keys(modelColor).find(k => model.toLowerCase().includes(k));
  me = c(modelColor[key] || "38;5;196", model);
}
if (effort) me += (me ? " " : "") + c(effortColor[String(effort).toLowerCase()] || "38;5;196", `(${effort})`);
if (me) line2.push(me);
const cw = j.context_window || {};
if (cw.used_percentage != null) {
  const pct = Math.min(100, Math.max(0, Math.round(cw.used_percentage)));
  let s = c(levelColor(pct), `${bar(pct)} ${pct}%`);
  if (cw.context_window_size) {
    s += " " + c("38;5;250", fmtTok(Math.round(cw.context_window_size * pct / 100))) + c("38;5;245", `/${fmtTok(cw.context_window_size)}`);
  }
  line2.push(s);
}
const rl = j.rate_limits || {};
for (const [key, label, lc] of [["five_hour", "5h", "38;5;111"], ["seven_day", "7d", "38;5;177"]]) {
  const w = rl[key];
  if (!w || w.used_percentage == null) continue;
  const pct = Math.round(w.used_percentage);
  let s = c(lc, label) + " " + c(levelColor(pct), `${pct}%`);
  if (w.resets_at) s += " " + c("38;5;180", fmtAt(w.resets_at, key === "seven_day"));
  line2.push(s);
}
if (line2.length) out += "\n" + line2.join(sep);

// trailing space: terminal clips the last cell otherwise
process.stdout.write(out + " ");
