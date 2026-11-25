// Loads agents-view.html in Chromium with a mocked `maxxing` host and fictitious data.
// Fails on any console error / page error. With SHOTS=1 also writes docs/*.png.
import { createRequire } from "node:module";
import { readFileSync, mkdirSync } from "node:fs";
import { data } from "./fixture.mjs";
const require = createRequire(process.env.PW_DIR ? process.env.PW_DIR + "/" : import.meta.url);
const { chromium } = require("playwright");

const html = readFileSync(new URL("../agents-view.html", import.meta.url), "utf8");
const shots = !!process.env.SHOTS;
const errors = [];
const nav = [];

function host(theme, lang) {
  return `window.maxxing={theme:${JSON.stringify(theme)},data:null,_cb:[],_tcb:[],
    onData(f){this._cb.push(f);},onTheme(f){this._tcb.push(f);},
    navigate(r){window.__nav=(window.__nav||[]);window.__nav.push(r);},resize(){},app:{},api(){}};
    window.__push=(d)=>{maxxing.data=d;maxxing._cb.forEach(f=>f(d));};`;
}

const browser = await chromium.launch({ args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"] });
async function open(theme, lang, w, h) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  page.on("console", (m) => m.type() === "error" && errors.push(`[${theme} ${w}] ${m.text()}`));
  page.on("pageerror", (e) => errors.push(`[${theme} ${w}] ${e.message}`));
  await page.addInitScript(host(theme, lang));
  await page.route("http://view.test/", (r) => r.fulfill({ contentType: "text/html", body: html }));
  await page.goto("http://view.test/", { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.evaluate((d) => window.__push(d), data(lang));
  await page.waitForTimeout(6000);
  return page;
}
// Screenshot of the #app area only (clip: no wait for a stable element, the scene animates).
async function snap(page, name) {
  const b = await page.evaluate(() => { const r = document.getElementById("app").getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  await page.screenshot({ path: out(name), clip: b });
}
mkdirSync(new URL("../docs", import.meta.url), { recursive: true });
const out = (n) => new URL(`../docs/${n}.png`, import.meta.url).pathname;

const dark = await open("dark", "en", 1440, 810);
const counts = await dark.evaluate(() => ({ rows: document.querySelectorAll("#lp .row").length, feed: document.querySelectorAll("#rp .fi").length }));
if (counts.rows !== 10) errors.push(`expected 10 agent rows, got ${counts.rows}`);
// Click the first row -> card + chat button (chat_route)
const idleBt = await dark.evaluate(() => getComputedStyle(document.getElementById("bt")).display);
if (idleBt !== "none") errors.push("chat button visible with no selection");
await dark.click("#lp .row");
await dark.waitForTimeout(500);
const chat = await dark.evaluate(() => { const b = document.getElementById("bt"); return { hidden: b.hidden, text: b.textContent }; });
if (chat.hidden) errors.push("chat button hidden although chat_route is set");
await dark.click("#bt");
const navs = await dark.evaluate(() => window.__nav || []);
if (!navs.some((r) => r.startsWith("/chat/"))) errors.push("chat button did not navigate to chat_route: " + JSON.stringify(navs));
if (shots) await snap(dark, "raw-dark");

await dark.close();
const light = await open("light", "en", 1440, 810);
if (shots) await snap(light, "raw-light");
await light.close();
const fr = await open("light", "fr", 1440, 810);
const topFr = await fr.evaluate(() => document.getElementById("top").textContent);
if (!/travail/.test(topFr)) errors.push("French header not applied: " + topFr);
await fr.close();
const mobile = await open("dark", "en", 390, 800);
if (shots) await snap(mobile, "raw-mobile");
await browser.close();
if (errors.length) { console.error("FAIL\n" + errors.join("\n")); process.exit(1); }
console.log("OK", JSON.stringify(counts), JSON.stringify(chat));
