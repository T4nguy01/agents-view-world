// Entry point: bundles Three.js (only what is used) and the app, then starts it
// if WebGL is available.
import * as THREE from "three";
import { xo } from "./app.js";

try {
  const probe = document.createElement("canvas");
  if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) throw 0;
  xo(THREE);
} catch {
  const mid = document.getElementById("mid");
  if (mid)
    mid.innerHTML =
      '<div style="padding:24px;text-align:center;font:600 13px system-ui">3D view unavailable (WebGL missing or blocked). Use the classic view.</div>';
}
