// Build: src/{styles.css,body.html,app.js,main.js} -> agents-view.html (single file, no network).
import { build } from "esbuild";
import { readFileSync, writeFileSync } from "node:fs";

const out = await build({
  entryPoints: ["src/main.js"],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2020",
  legalComments: "inline",
  write: false,
});
const js = out.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");
const css = readFileSync("src/styles.css", "utf8");
const body = readFileSync("src/body.html", "utf8");
const html = `<!doctype html><html><head><meta charset="utf-8"><style>\n${css}\n</style></head><body>\n${body}<script>${js}</script>\n</body></html>\n`;
writeFileSync("agents-view.html", html);
console.log("agents-view.html", (html.length / 1024).toFixed(0), "KB");
