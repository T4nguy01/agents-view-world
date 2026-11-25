export function xo(THREE) {
  "use strict";
  let t = (e) => document.getElementById(e),
    n = t("cv"),
    r = t("mid"),
    i = t("labs"),
    a = () => (window.maxxing && maxxing.theme) === "dark",
    o = new THREE.WebGLRenderer({ canvas: n, antialias: true });
  (o.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6)),
    (o.shadowMap.enabled = true),
    (o.shadowMap.autoUpdate = false),
    (o.shadowMap.type = 2));
  let s = new THREE.Scene(),
    c = new THREE.OrthographicCamera(-1, 1, 1, -1, -300, 300),
    l = Math.PI / 4,
    u = Math.atan(1 / Math.SQRT2),
    d = new THREE.Vector3(0, 0, 0),
    f = new THREE.Vector3(0, 0, 0),
    p = 1,
    m = 1,
    h = new THREE.HemisphereLight(16777215, 12174544, 1.5),
    g = new THREE.DirectionalLight(16774368, 2.1);
  ((g.castShadow = true),
    g.shadow.mapSize.set(1536, 1536),
    (g.shadow.bias = -4e-4),
    (g.shadow.normalBias = 0.03),
    Object.assign(g.shadow.camera, {
      left: -26,
      right: 26,
      top: 26,
      bottom: -26,
      near: 1,
      far: 120,
    }),
    s.add(h, g, g.target));
  let _ = {},
    v = (e) => _[e] || (_[e] = new THREE.MeshLambertMaterial({ color: e }));
  function y(e, t, n, r, i, a, o, s, c = {}) {
    let l = new THREE.Mesh(new THREE.BoxGeometry(t, n, r), c.mat || v(i));
    return (
      l.position.set(a, o, s),
      (l.castShadow = c.cs !== false),
      (l.receiveShadow = c.rs !== false),
      e.add(l),
      l
    );
  }
  function b(e, t, n, r, i, a, o, s = {}) {
    let c = new THREE.Mesh(
      new THREE.CylinderGeometry(s.r2 ?? t, t, n, s.seg || 16),
      s.mat || v(r),
    );
    return (
      c.position.set(i, a, o),
      (c.castShadow = true),
      (c.receiveShadow = true),
      e.add(c),
      c
    );
  }
  function x(e, t, n, r, i, a, o = 1) {
    let s = new THREE.Mesh(new THREE.SphereGeometry(t, 16, 12), v(n));
    return (
      s.position.set(r, i, a),
      (s.scale.y = o),
      (s.castShadow = true),
      e.add(s),
      s
    );
  }
  let S = new THREE.MeshLambertMaterial({
    color: "#aee0f2",
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
  });
  function C(e, t, n, r, i = 2.5) {
    let a = Math.abs(n - e) || 0.06,
      o = Math.abs(r - t) || 0.06,
      c = (e + n) / 2,
      l = (t + r) / 2;
    (y(s, a, i, o, 0, c, i / 2, l, { mat: S, cs: false, rs: false }),
      y(s, a, 0.06, o, "#8aa0b4", c, i, l, { cs: false }),
      y(s, a, 0.08, o, "#8aa0b4", c, 0.04, l, { cs: false }));
  }
  function w(e, t, n = 1) {
    let r = new THREE.Group();
    (r.position.set(e, 0, t),
      b(r, 0.22 * n, 0.4 * n, "#e9e3d8", 0, 0.2 * n, 0),
      x(r, 0.32 * n, "#3f9b5a", 0, 0.65 * n, 0, 1.1),
      x(r, 0.22 * n, "#52b36c", 0.12 * n, 0.95 * n, 0.05 * n),
      s.add(r));
  }
  let T = [
      {
        cols: [-5.6, -2.8, 0],
        rows: [-7.6, -4.4],
        box: [-7.3, -8.9, 1.5, -1.6],
      },
      {
        cols: [4.2, 7, 9.8, 12.6],
        rows: [-7.6, -4.4],
        box: [2.5, -8.9, 14, -1.6],
      },
      {
        cols: [-12.2, -9.4, -6.6, -3.8],
        rows: [3.4, 6.6],
        box: [-14, 2.1, -2.2, 8.9],
      },
    ],
    E = T.map((e) => {
      let t = [];
      return (
        e.rows.forEach((n) =>
          e.cols.forEach((e) =>
            t.push({ x: e, z: n + 0.95, dx: e, dz: n, side: e + 1.4 }),
          ),
        ),
        t
      );
    }),
    D = [],
    O = [];
  function k() {
    let e = y(s, 160, 0.2, 160, "#92c47e", 0, -0.62, 0, { cs: false });
    e.name = "ground";
    let t = (e, t, n, r) =>
      y(s, n, 0.04, r, "#4a5260", e, -0.5, t, { cs: false });
    (t(0, 15, 80, 5), t(19.5, 0, 5, 80), t(-19.5, 0, 5, 80));
    for (let e = -36; e <= 36; e += 4)
      (y(s, 1.8, 0.05, 0.2, "#f1f1e6", e, -0.47, 15, { cs: false }),
        y(s, 0.2, 0.05, 1.8, "#f1f1e6", 19.5, -0.47, e, { cs: false }),
        y(s, 0.2, 0.05, 1.8, "#f1f1e6", -19.5, -0.47, e, { cs: false }));
    let n = (e, t, n, r, i, a) => {
      let o = new THREE.Group();
      (o.position.set(e, 0, t),
        y(o, n, i, r, a, 0, i / 2 - 0.5, 0),
        y(o, n + 0.2, 0.3, r + 0.2, "#cfc8bd", 0, i - 0.35, 0));
      for (let e = 0; e < Math.floor(i / 2.2); e++)
        for (let t = 0; t < Math.floor(n / 2); t++)
          (y(
            o,
            1,
            1.1,
            0.05,
            "#9fc8e6",
            -n / 2 + 1.2 + t * 2,
            1.6 + e * 2.2,
            r / 2 + 0.01,
            { cs: false },
          ),
            y(
              o,
              0.05,
              1.1,
              1,
              "#9fc8e6",
              n / 2 + 0.01,
              1.6 + e * 2.2,
              -r / 2 + 1.2 + t * 2,
              { cs: false },
            ));
      s.add(o);
    };
    (n(-22, -18, 10, 9, 13, "#e7d9c3"),
      n(-8, -23, 9, 8, 9, "#d9e2ea"),
      n(8, -24, 10, 9, 16, "#e9d3c8"),
      n(24, -20, 9, 9, 11, "#cfd8c6"),
      n(-27, -3, 8, 9, 10, "#e3cfc0"),
      n(30, -6, 8, 9, 12, "#d8dde6"),
      n(-28, 14, 8, 8, 8, "#e6e0cf"));
    let r = (e, t, n = 1) => {
      let r = new THREE.Group();
      (r.position.set(e, -0.5, t),
        b(r, 0.18 * n, 1.2 * n, "#8a5a2b", 0, 0.6 * n, 0),
        x(r, 0.95 * n, "#4aa361", 0, 1.7 * n, 0),
        x(r, 0.7 * n, "#5cb673", 0.35 * n, 2.3 * n, 0.1 * n),
        s.add(r));
    };
    ([
      [-16.5, 12, 1],
      [-10, 12.4, 1.1],
      [16, 12.3, 1],
      [22.5, -10, 1.2],
      [22.5, 6, 1],
      [-22.5, 8, 1.1],
      [-22.5, -12, 1.2],
      [-15, -12, 1],
      [20, -14, 1],
      [14, -12, 0.9],
      [-4, 12.2, 1],
      [6, 12.4, 1.1],
    ].forEach((e) => r(...e)),
      y(s, 29.4, 0.5, 19.6, "#d7d0c4", 0, -0.25, 0, { cs: false }),
      y(s, 28.8, 0.04, 18.8, "#f1e9db", 0, 0.02, 0, { cs: false }),
      y(s, 28.8, 0.05, 3, "#e4ddd1", 0, 0.03, 0, { cs: false }));
    for (let e = -13; e <= 13; e += 2)
      y(s, 0.03, 0.052, 3, "#d6cebf", e, 0.035, 0, { cs: false });
    T.forEach((e, t) => {
      let [n, r, i, a] = e.box,
        o = y(
          s,
          i - n - 0.6,
          0.05,
          a - r - 0.6,
          "#ddd",
          (n + i) / 2,
          0.04,
          (r + a) / 2,
          {
            mat: new THREE.MeshLambertMaterial({ color: "#e7e1d6" }),
            cs: false,
          },
        );
      (D.push(o), O.push([(n + i) / 2, (r + a) / 2]));
    });
    let i = v("#f6f1e8");
    (v("#c9c0b2"),
      y(s, 29.2, 2.9, 0.3, 0, 0, 1.45, -9.35, { mat: i }),
      y(s, 29.2, 0.1, 0.34, "#b8ae9e", 0, 2.95, -9.35, { cs: false }),
      y(s, 0.3, 2.9, 19, 0, 0, 1.45, 0, { mat: i }).position.set(
        -14.35,
        1.45,
        0,
      ),
      y(s, 0.34, 0.1, 19.2, "#b8ae9e", -14.35, 2.95, 0, { cs: false }),
      [-11, -5, 1, 7, 12.5].forEach((e) => {
        (y(s, 2.6, 1.3, 0.05, "#bfe0f3", e, 1.75, -9.17, { cs: false }),
          y(s, 2.7, 0.07, 0.07, "#8f8678", e, 1.1, -9.15, { cs: false }));
      }),
      [-6, -1, 4, 8].forEach((e) => {
        (y(s, 0.05, 1.3, 2.6, "#bfe0f3", -14.17, 1.75, e, { cs: false }),
          y(s, 0.07, 0.07, 2.7, "#8f8678", -14.15, 1.1, e, { cs: false }));
      }),
      C(-14, -1.6, -12.1, -1.6),
      C(-9.9, -1.6, -7.9, -1.6),
      C(-7.9, -9, -7.9, -1.6),
      y(s, 5.6, 0.05, 7, "#c9b28a", -11, 0.04, -5.3, { cs: false }));
    let a = new THREE.Group();
    (a.position.set(-11, 0, -7.8),
      y(a, 2.4, 0.08, 1.1, "#7a4b25", 0, 0.78, 0),
      y(a, 0.08, 0.74, 1, "#5c3818", -1.1, 0.37, 0),
      y(a, 0.08, 0.74, 1, "#5c3818", 1.1, 0.37, 0),
      y(a, 2.2, 0.5, 0.05, "#5c3818", 0, 0.5, -0.5),
      y(a, 0.9, 0.5, 0.05, "#111", -0.5, 1.15, -0.25),
      y(a, 0.9, 0.5, 0.05, "#111", 0.5, 1.15, -0.25),
      y(a, 0.8, 0.4, 0.03, "#2c6a9a", -0.5, 1.15, -0.22, {
        mat: new THREE.MeshLambertMaterial({
          color: "#000",
          emissive: "#4fb0ff",
          emissiveIntensity: 0.7,
        }),
      }),
      y(a, 0.8, 0.4, 0.03, "#000", 0.5, 1.15, -0.22, {
        mat: new THREE.MeshLambertMaterial({
          color: "#000",
          emissive: "#ffb84f",
          emissiveIntensity: 0.5,
        }),
      }),
      y(a, 0.6, 0.03, 0.2, "#e8e8e8", 0, 0.83, 0.2),
      s.add(a));
    let o = new THREE.Group();
    (o.position.set(-11, 0, -6.75),
      y(o, 0.62, 0.1, 0.6, "#d4a017", 0, 0.46, 0),
      y(o, 0.62, 0.8, 0.1, "#d4a017", 0, 0.9, 0.3),
      b(o, 0.07, 0.4, "#444", 0, 0.22, 0),
      s.add(o));
    let c = new THREE.Group();
    (c.position.set(-13.7, 0, -5), y(c, 0.45, 2.3, 3, "#8a5a2b", 0, 1.15, 0));
    for (let e = 0; e < 14; e++)
      y(
        c,
        0.3,
        0.34,
        0.14,
        ["#c0392b", "#2c7da0", "#e9c46a", "#2a9d8f", "#6a4c93"][e % 5],
        0.05,
        0.45 + Math.floor(e / 7) * 0.9 + (e % 3) * 0.04,
        -1.2 + (e % 7) * 0.4,
      );
    s.add(c);
    let l = new THREE.Group();
    (l.position.set(-9.2, 0, -4),
      (l.rotation.y = -Math.PI / 2),
      y(l, 2.2, 0.45, 0.9, "#4a6fa5", 0, 0.3, 0),
      y(l, 2.2, 0.6, 0.25, "#4a6fa5", 0, 0.65, 0.33),
      y(l, 0.25, 0.6, 0.9, "#3f5f93", -1.05, 0.5, 0),
      y(l, 0.25, 0.6, 0.9, "#3f5f93", 1.05, 0.5, 0),
      s.add(l),
      w(-13.3, -8.4, 1.1),
      w(-8.4, -8.5, 1),
      C(-1, 2, 0.9, 2),
      C(3, 2, 5.5, 2),
      C(-1, 2, -1, 8.7),
      C(5.5, 2, 5.5, 8.7),
      C(-1, 8.7, 5.5, 8.7),
      y(s, 6.2, 0.05, 6.4, "#d9d0c0", 2.25, 0.04, 5.35, { cs: false }));
    let u = new THREE.Group();
    (u.position.set(2.25, 0, 5.4),
      y(u, 3.2, 0.08, 1.5, "#f3efe8", 0, 0.76, 0),
      b(u, 0.15, 0.74, "#999", 0, 0.37, 0),
      b(u, 0.5, 0.04, "#bbb", 0, 0.02, 0),
      [-1.1, 0, 1.1].forEach((e) => {
        [-1, 1].forEach((t) => {
          let n = new THREE.Group();
          (n.position.set(e, 0, t * 1.1),
            y(n, 0.5, 0.08, 0.5, "#2f6f8f", 0, 0.45, 0),
            y(n, 0.5, 0.5, 0.08, "#2f6f8f", 0, 0.75, t * 0.22),
            b(n, 0.05, 0.4, "#444", 0, 0.22, 0),
            u.add(n));
        });
      }),
      s.add(u),
      y(s, 0.1, 1.3, 2.4, "#fff", 5.35, 1.5, 5.4, { cs: false }),
      y(s, 0.04, 1.1, 2.2, "#e9eef2", 5.28, 1.5, 5.4, { cs: false }),
      w(-0.4, 8.1, 0.9));
    let d = new THREE.Group();
    (d.position.set(8.8, 0, 8.3),
      y(d, 4.4, 1.05, 0.7, "#f7f4ee", 0, 0.52, 0),
      y(d, 4.4, 0.06, 0.8, "#6b4a2b", 0, 1.07, 0),
      y(d, 0.6, 0.45, 0.4, "#222", -1.2, 1.33, 0),
      y(d, 0.4, 0.3, 0.3, "#c0392b", 0.3, 1.25, 0),
      y(d, 0.9, 0.9, 0.7, "#bfc5cc", 1.6, 0.95, -0),
      s.add(d),
      [
        [7.4, 4.4],
        [10, 4.4],
      ].forEach(([e, t]) => {
        (b(s, 0.55, 0.05, "#fff", e, 1, t),
          b(s, 0.06, 0.95, "#999", e, 0.5, t),
          [
            [-0.8, 0],
            [0.8, 0],
          ].forEach(
            ([n, r]) =>
              b(s, 0.22, 0.1, "#e76f51", e + n, 0.45, t + r) &&
              b(s, 0.04, 0.4, "#555", e + n, 0.2, t + r),
          ));
      }),
      y(s, 4.6, 0.05, 6.4, "#f0cfc0", 8.8, 0.04, 5.3, { cs: false }),
      w(6.9, 8.1, 1),
      w(10.9, 8.1, 0.9),
      C(11.3, 2, 12.1, 2),
      C(13.1, 2, 14.1, 2),
      C(11.3, 2, 11.3, 5.8),
      C(11.3, 5.8, 14.1, 5.8),
      y(s, 2.6, 0.05, 3.6, "#3a4150", 12.7, 0.04, 3.9, { cs: false }),
      [0, 1, 2].forEach((e) => {
        let t = new THREE.Group();
        (t.position.set(12.3 + e * 0, 0, 3.2 + e * 0),
          t.position.set(13.5, 0, 3 + e * 1),
          (t.rotation.y = -Math.PI / 2),
          y(t, 0.9, 2.1, 0.8, "#252a33", 0, 1.05, 0));
        for (let e = 0; e < 8; e++)
          y(t, 0.7, 0.05, 0.02, 0, 0, 0.35 + e * 0.22, 0.41, {
            mat: new THREE.MeshLambertMaterial({
              color: "#000",
              emissive: e % 3 ? "#2bd96b" : "#3b9bff",
              emissiveIntensity: 1.2,
            }),
            cs: false,
          });
        s.add(t);
      }),
      w(-13.6, 0.8, 0.9),
      w(13.6, -0.9, 0.9),
      w(1.8, -1.1, 0.8),
      y(s, 2.2, 0.08, 0.5, "#7a4b25", -5.5, 0.45, 1.2),
      y(s, 0.06, 0.45, 0.4, "#444", -6.4, 0.22, 1.2),
      y(s, 0.06, 0.45, 0.4, "#444", -4.6, 0.22, 1.2));
  }
  function A(e, t, n, r) {
    let i = new THREE.Group();
    (i.position.set(n, 0, r),
      y(i, 1.7, 0.06, 0.85, "#f6f3ec", 0, 0.76, 0),
      y(i, 0.05, 0.74, 0.8, "#bdb7ab", -0.8, 0.37, 0),
      y(i, 0.05, 0.74, 0.8, "#bdb7ab", 0.8, 0.37, 0),
      y(i, 1.6, 0.4, 0.04, "#d6d0c4", 0, 0.52, -0.38));
    let a = new THREE.MeshLambertMaterial({
      color: "#000",
      emissive: "#000",
      emissiveIntensity: 1,
    });
    ([-0.4, 0.4].forEach((e) => {
      (y(i, 0.05, 0.2, 0.05, "#555", e, 0.89, -0.2),
        y(i, 0.64, 0.4, 0.04, "#15181d", e, 1.17, -0.22),
        y(i, 0.58, 0.34, 0.03, 0, e, 1.17, -0.2, { mat: a, cs: false }));
    }),
      y(i, 0.55, 0.025, 0.17, "#eceff3", 0, 0.8, 0.15),
      y(i, 0.08, 0.03, 0.12, "#eceff3", 0.45, 0.8, 0.15),
      b(i, 0.05, 0.09, "#e76f51", -0.65, 0.84, 0.2));
    let o = new THREE.Group();
    return (
      o.position.set(0, 0, 0.95),
      (o.name = "chair"),
      y(o, 0.52, 0.08, 0.52, "#2f7a8c", 0, 0.45, 0),
      y(o, 0.52, 0.55, 0.08, "#2f7a8c", 0, 0.78, 0.25),
      b(o, 0.05, 0.4, "#444", 0, 0.22, 0),
      y(o, 0.55, 0.04, 0.06, "#444", 0, 0.04, 0),
      y(o, 0.06, 0.04, 0.55, "#444", 0, 0.04, 0),
      i.add(o),
      s.add(i),
      { mat: a, chair: o }
    );
  }
  function j() {
    s.updateMatrixWorld(true);
    let e = new Set(Object.values(_).map((e) => e.uuid)),
      t = new Map(),
      n = [];
    (s.traverse((r) => {
      if (!r.isMesh || r.name === "ground" || !e.has(r.material.uuid)) return;
      let i =
        r.material.uuid +
        (r.castShadow ? "c" : "") +
        (r.receiveShadow ? "r" : "");
      (t.has(i) || t.set(i, []), t.get(i).push(r), n.push(r));
    }),
      t.forEach((e) => {
        let t = 0,
          n = 0;
        e.forEach((e) => {
          ((t += e.geometry.attributes.position.count),
            (n += e.geometry.index.count));
        });
        let r = new Float32Array(t * 3),
          i = new Float32Array(t * 3),
          a = new Uint32Array(n),
          o = 0,
          c = 0,
          l = new THREE.Vector3(),
          u = new THREE.Matrix3();
        e.forEach((e) => {
          let t = e.geometry,
            n = t.attributes.position,
            s = t.attributes.normal;
          u.getNormalMatrix(e.matrixWorld);
          for (let t = 0; t < n.count; t++)
            (l.fromBufferAttribute(n, t).applyMatrix4(e.matrixWorld),
              r.set([l.x, l.y, l.z], (o + t) * 3),
              l.fromBufferAttribute(s, t).applyMatrix3(u).normalize(),
              i.set([l.x, l.y, l.z], (o + t) * 3));
          for (let e = 0; e < t.index.count; e++)
            a[c + e] = t.index.array[e] + o;
          ((o += n.count), (c += t.index.count));
        });
        let d = new THREE.BufferGeometry();
        (d.setAttribute("position", new THREE.BufferAttribute(r, 3)),
          d.setAttribute("normal", new THREE.BufferAttribute(i, 3)),
          d.setIndex(new THREE.BufferAttribute(a, 1)));
        let f = new THREE.Mesh(d, e[0].material);
        ((f.castShadow = e[0].castShadow),
          (f.receiveShadow = e[0].receiveShadow),
          (f.matrixAutoUpdate = false),
          s.add(f));
      }),
      n.forEach((e) => {
        (e.geometry.dispose(), e.parent && e.parent.remove(e));
      }));
  }
  function M(e) {
    e.traverse((e) => {
      e.isMesh && e.geometry.dispose();
    });
  }
  let N = ["#f1c9a0", "#e0ac84", "#c68642", "#8d5524", "#ffdbb4"],
    ee = [
      "#2b1d12",
      "#5a3825",
      "#c8963e",
      "#9a9a9a",
      "#111",
      "#b5472f",
      "#3b4a8f",
    ],
    P = [
      "#e76f51",
      "#2a9d8f",
      "#e9c46a",
      "#6a8caf",
      "#9b6bb3",
      "#d97894",
      "#4f9d69",
      "#5b7fd1",
    ],
    te = (e) => {
      let t = 0;
      for (let n of String(e)) t = (t * 31 + n.charCodeAt(0)) >>> 0;
      return t;
    };
  function F(e, t, n, r) {
    let i = new THREE.Group();
    return (i.position.set(t, n, r), e.add(i), i);
  }
  function ne(e) {
    let t = new THREE.Group(),
      n = {};
    ((n.legL = F(t, -0.11, 0.52, 0)),
      (n.legR = F(t, 0.11, 0.52, 0)),
      [n.legL, n.legR].forEach((t) =>
        y(t, 0.17, 0.5, 0.2, e.pants || "#3b4252", 0, -0.25, 0),
      ),
      (n.tor = F(t, 0, 0.52, 0)),
      y(n.tor, 0.46, 0.52, 0.3, e.shirt, 0, 0.26, 0),
      (n.armL = F(n.tor, -0.3, 0.46, 0)),
      (n.armR = F(n.tor, 0.3, 0.46, 0)),
      [n.armL, n.armR].forEach((t) => {
        (y(t, 0.13, 0.42, 0.15, e.shirt, 0, -0.2, 0),
          x(t, 0.075, e.skin, 0, -0.44, 0));
      }),
      e.tie && y(n.tor, 0.08, 0.34, 0.02, e.tie, 0, 0.3, 0.16),
      (n.head = F(n.tor, 0, 0.62, 0)),
      x(n.head, 0.3, e.skin, 0, 0.3, 0, 1));
    let r = e.hs || "short",
      i = e.hair;
    if (r !== "none") {
      let t = new THREE.Mesh(
        new THREE.SphereGeometry(
          0.33,
          16,
          12,
          0,
          Math.PI * 2,
          0,
          Math.PI * 0.56,
        ),
        v(e.hair),
      );
      (t.position.set(0, 0.34, -0.02),
        (t.rotation.x = -0.15),
        (t.castShadow = true),
        n.head.add(t));
    }
    (r === "spiky" &&
      [
        [-0.14, 0.6, 0],
        [0, 0.66, -0.02],
        [0.14, 0.6, 0],
        [-0.07, 0.62, -0.12],
        [0.08, 0.62, -0.12],
      ].forEach(([e, t, r]) =>
        b(n.head, 0.07, 0.2, i, e, t, r, { r2: 0, seg: 4 }),
      ),
      r === "long" &&
        (y(n.head, 0.62, 0.62, 0.16, i, 0, 0.12, -0.2),
        y(n.head, 0.06, 0.4, 0.2, i, -0.31, 0.2, -0.05),
        y(n.head, 0.06, 0.4, 0.2, i, 0.31, 0.2, -0.05)),
      r === "curly" &&
        [
          [-0.26, 0.5, 0],
          [0.26, 0.5, 0],
          [0, 0.62, 0.04],
          [-0.18, 0.58, -0.18],
          [0.18, 0.58, -0.18],
          [0, 0.52, -0.28],
          [-0.3, 0.3, -0.12],
          [0.3, 0.3, -0.12],
        ].forEach(([e, t, r]) => x(n.head, 0.12, i, e, t, r)),
      r === "bun" && x(n.head, 0.15, i, 0, 0.68, -0.08));
    let a = e.face || "smile",
      o = "#222";
    if (
      (a === "happy"
        ? (y(n.head, 0.1, 0.03, 0.03, o, -0.1, 0.32, 0.28, { cs: false }),
          y(n.head, 0.1, 0.03, 0.03, o, 0.1, 0.32, 0.28, { cs: false }),
          y(n.head, 0.14, 0.04, 0.02, "#b5543f", 0, 0.19, 0.29, { cs: false }))
        : a === "focused"
          ? (x(n.head, 0.04, o, -0.1, 0.29, 0.28),
            x(n.head, 0.04, o, 0.1, 0.29, 0.28),
            y(n.head, 0.14, 0.03, 0.03, i, -0.1, 0.37, 0.28, { cs: false }),
            y(n.head, 0.14, 0.03, 0.03, i, 0.1, 0.37, 0.28, { cs: false }),
            y(n.head, 0.06, 0.02, 0.02, "#b5543f", 0, 0.19, 0.29, {
              cs: false,
            }))
          : a === "sleepy"
            ? (y(n.head, 0.09, 0.02, 0.03, o, -0.1, 0.29, 0.28, { cs: false }),
              y(n.head, 0.09, 0.02, 0.03, o, 0.1, 0.29, 0.28, { cs: false }),
              y(n.head, 0.05, 0.02, 0.02, "#b5543f", 0, 0.19, 0.29, {
                cs: false,
              }))
            : a === "wink"
              ? (x(n.head, 0.04, o, -0.1, 0.3, 0.28),
                y(n.head, 0.1, 0.03, 0.03, o, 0.1, 0.3, 0.28, { cs: false }),
                y(n.head, 0.1, 0.02, 0.02, "#b5543f", 0.02, 0.19, 0.29, {
                  cs: false,
                }))
              : a === "surprised"
                ? (x(n.head, 0.06, o, -0.1, 0.31, 0.28),
                  x(n.head, 0.06, o, 0.1, 0.31, 0.28),
                  x(n.head, 0.045, "#b5543f", 0, 0.18, 0.29))
                : (x(n.head, 0.04, o, -0.1, 0.3, 0.28),
                  x(n.head, 0.04, o, 0.1, 0.3, 0.28),
                  y(n.head, 0.1, 0.02, 0.02, "#b5543f", 0, 0.19, 0.29, {
                    cs: false,
                  })),
      e.crown)
    ) {
      let e = new THREE.Group();
      (e.position.set(0, 0.64, 0),
        b(e, 0.2, 0.12, "#f2c230", 0, 0, 0, { seg: 5 }),
        [0, 1, 2, 3, 4].forEach((t) => {
          let n = (t / 5) * 6.283;
          b(
            e,
            0.05,
            0.12,
            "#f2c230",
            Math.cos(n) * 0.18,
            0.1,
            Math.sin(n) * 0.18,
            { r2: 0, seg: 4 },
          );
        }),
        n.head.add(e));
    }
    return (
      e.acc === "glasses" &&
        (y(n.head, 0.17, 0.13, 0.03, "#2b2b35", -0.1, 0.3, 0.3),
        y(n.head, 0.17, 0.13, 0.03, "#2b2b35", 0.1, 0.3, 0.3),
        y(n.head, 0.06, 0.02, 0.03, "#2b2b35", 0, 0.3, 0.3)),
      e.acc === "headphones" &&
        (y(n.head, 0.7, 0.05, 0.05, "#3a3a46", 0, 0.62, 0),
        y(n.head, 0.1, 0.22, 0.2, e.shirt, -0.34, 0.3, 0),
        y(n.head, 0.1, 0.22, 0.2, e.shirt, 0.34, 0.3, 0)),
      e.acc === "antenna" &&
        (y(n.head, 0.03, 0.28, 0.03, "#9a9aa6", 0, 0.7, 0),
        x(n.head, 0.07, e.shirt, 0, 0.88, 0)),
      e.cap &&
        (b(n.head, 0.32, 0.12, e.cap, 0, 0.55, 0, { seg: 20 }),
        y(n.head, 0.4, 0.04, 0.22, e.cap, 0, 0.5, 0.3)),
      (t.userData.p = n),
      t
    );
  }
  let re = {
      blue: "#3c91fd",
      clay: "#f8962d",
      violet: "#c25af3",
      green: "#55cc4b",
      amber: "#f1d025",
      rose: "#fc523a",
    },
    ie = {
      light: "#ffdcc2",
      tan: "#e8ad7e",
      brown: "#b0744a",
      dark: "#7a4b2e",
    },
    I = {
      black: "#3a3444",
      brown: "#7c4a29",
      blond: "#ecc457",
      red: "#cc5a32",
      white: "#e6e6ee",
    };
  function ae(e) {
    if (!e) return {};
    let t = {};
    return (
      re[e.color] && (t.shirt = re[e.color]),
      ie[e.skin] && (t.skin = ie[e.skin]),
      I[e.hair_color] && (t.hair = I[e.hair_color]),
      e.hair && (t.hs = e.hair),
      e.face && (t.face = e.face),
      e.accessory === "cap"
        ? (t.cap = t.shirt)
        : e.accessory === "crown"
          ? (t.crown = true)
          : ["glasses", "headphones", "antenna"].includes(e.accessory) &&
            (t.acc = e.accessory),
      t
    );
  }
  function oe(e, t = {}) {
    let n = te(e);
    return ne({
      skin: N[n % 5],
      hair: ee[(n >> 3) % 7],
      shirt: P[(n >> 5) % 8],
      ...t,
    });
  }
  let se = 0;
  function z(e, t, n = {}) {
    return {
      id: ++se,
      x: e,
      z: t,
      sit: !!n.sit,
      face: n.face ?? Math.PI,
      via: n.via || [],
      hub: n.hub || [e, 0],
      occ: null,
      kind: n.kind || "leisure",
    };
  }
  let ce = [
      z(8.8, 6.2, { kind: "cafe" }),
      z(6.6, 4.4, { kind: "cafe", sit: true, face: 1.57 }),
      z(8.2, 4.4, { kind: "cafe", sit: true, face: -1.57 }),
      z(9.2, 4.4, { kind: "cafe", sit: true, face: 1.57 }),
      z(10.8, 4.4, { kind: "cafe", sit: true, face: -1.57 }),
      z(1.15, 4.3, {
        kind: "meet",
        sit: true,
        face: 0,
        via: [[2, 2.7]],
        hub: [2, 0],
      }),
      z(2.25, 4.3, {
        kind: "meet",
        sit: true,
        face: 0,
        via: [[2, 2.7]],
        hub: [2, 0],
      }),
      z(3.35, 4.3, {
        kind: "meet",
        sit: true,
        face: 0,
        via: [[2, 2.7]],
        hub: [2, 0],
      }),
      z(1.15, 6.5, {
        kind: "meet",
        sit: true,
        face: Math.PI,
        via: [
          [0.2, 5.4],
          [2, 2.7],
        ],
        hub: [2, 0],
      }),
      z(2.25, 6.5, {
        kind: "meet",
        sit: true,
        face: Math.PI,
        via: [
          [0.2, 5.4],
          [2, 2.7],
        ],
        hub: [2, 0],
      }),
      z(3.35, 6.5, {
        kind: "meet",
        sit: true,
        face: Math.PI,
        via: [
          [4.3, 5.4],
          [2, 2.7],
        ],
        hub: [2, 0],
      }),
      z(12.6, 3.3, { kind: "serv" }),
      z(-4, 0.8, { kind: "cor", face: 0 }),
      z(-2.6, 0.8, { kind: "cor", face: 0 }),
      z(5, -0.6, { kind: "cor" }),
      z(-0.5, 0.9, { kind: "cor", face: 3.1 }),
    ],
    le = [-12.6, -11.2, -9.8, -8.6].map((e, t) =>
      z(e, 0.55 + (t % 2) * 0.7, { kind: "queue", face: Math.PI }),
    );
  function pe(e, t) {
    let n = [];
    e && (n.push(...e.via), n.push(e.hub));
    let r = t.hub;
    return (
      (n.length === 0 ||
        n[n.length - 1][0] !== r[0] ||
        n[n.length - 1][1] !== r[1]) &&
        n.push(r),
      n.push(...t.via.slice().reverse()),
      n.push([t.x, t.z]),
      n
    );
  }
  let B = null,
    V = true,
    H = null,
    U = null,
    W = "all",
    G = "auto",
    K = null,
    J = new Map(),
    ge = [],
    _e =
      window.matchMedia &&
      matchMedia("(prefers-reduced-motion: reduce)").matches,
    ve = {
      running: "#3b82f6",
      waiting: "#f59e0b",
      failed: "#ef4444",
      unread: "#10b981",
      off: "#64748b",
      idle: "#94a3b8",
    },
    ye = E.map((e) =>
      e.map((e) =>
        z(e.x, e.z, {
          sit: true,
          kind: "desk",
          via: [[e.x + 1.4, e.z]],
          hub: [e.x + 1.4, 0],
        }),
      ),
    ),
    be = E.map((e) => e.map((e) => A(e.x, e.z, e.dx, e.dz)));
  function X(e, t, n, r) {
    let i = document.createElement(e);
    return (
      t && (i.className = t),
      n != null && (i.textContent = n),
      r && r.append(i),
      i
    );
  }
  function xe(e, t) {
    ((e.tabIndex = 0),
      e.setAttribute("role", "button"),
      e.setAttribute("aria-label", t),
      e.addEventListener("keydown", (t) => {
        (t.key === "Enter" || t.key === " ") && (t.preventDefault(), e.click());
      }));
  }
  function Se(e) {
    return X("div", "lab " + (e || ""), null, i);
  }
  function Ce(e) {
    let t = e.lab;
    t.replaceChildren();
    let n = e.a,
      r = X("div", "p", null, t),
      i = X("i");
    ((i.style.background = ve[n.status] || ve.idle),
      r.append(i),
      X("span", null, (n.display_name || n.name || "").slice(0, 24), r),
      n.status === "running" && n.status_text
        ? X("div", "q", n.status_text.slice(0, 40), t)
        : n.status === "waiting"
          ? X("div", "q", "! " + (V ? "À valider" : "Needs you"), t)
          : n.status === "failed" &&
            X("div", "q", "✗ " + (V ? "Échec" : "Failed"), t));
  }
  function we(e, t, n) {
    let r = oe(t.name || e, n.extra || ae(t.avatar));
    s.add(r);
    let i = {
      id: e,
      a: t,
      g: r,
      p: r.userData.p,
      spot: null,
      path: [],
      pend: null,
      mode: "stand",
      face: Math.PI,
      t: Math.random() * 9,
      dwell: 0,
      home: n.home,
      lab: Se(),
      ring: null,
    };
    return (
      r.traverse((t) => {
        t.isMesh && (t.userData.ent = e);
      }),
      J.set(e, i),
      i
    );
  }
  function Te(e, t) {
    ((e.spot = t),
      e.g.position.set(t.x, 0, t.z),
      (e.mode = t.sit ? "sit" : "stand"),
      (e.face = t.face),
      (e.g.rotation.y = t.face),
      (t.occ = e));
  }
  function Ee(e, t) {
    if (!t || (e.spot === t && !e.path.length)) return;
    if (e.path.length) {
      if (e.dest === t) return;
      e.pend = t;
      return;
    }
    if (t.occ && t.occ !== e && t.kind !== "queue" && t.kind !== "desk") return;
    let n = e.spot;
    (n && n.occ === e && (n.occ = null),
      (t.occ = e),
      _e
        ? (Te(e, t), (e.dwell = 25 + Math.random() * 20))
        : ((e.dest = t),
          (e.path = pe(n, t)),
          (e.spot = null),
          (e.pend = null)));
  }
  function De(e) {
    if (
      ((e.spot = e.dest),
      e.dest.kind !== "queue" &&
        e.dest.kind !== "desk" &&
        (e.lastKind = e.dest.kind),
      (e.mode = e.dest.sit ? "sit" : "stand"),
      (e.face = e.dest.face),
      (e.dwell = e.dest.sit
        ? 35 + Math.random() * 45
        : e.dest.kind === "cor"
          ? 8 + Math.random() * 10
          : 12 + Math.random() * 16),
      e.pend)
    ) {
      let t = e.pend;
      ((e.pend = null), Ee(e, t));
    }
  }
  let Oe = (e) => e === "idle" || e === "unread";
  /** Where an agent wants to be: queue when waiting, desk when active, free (null) when resting. */
  function ke(e) {
    let t = e.a.status;
    if (t === "waiting") {
      let t = [...J.values()]
        .filter((e) => e.a.status === "waiting")
        .sort((e, t) => (e.id < t.id ? -1 : 1))
        .indexOf(e);
      return le[Math.max(0, t) % le.length];
    }
    return Oe(t) ? null : e.home;
  }
  let Me = { cafe: 5, meet: 5, cor: 1, serv: 1 };
  function Ne(e) {
    let t = ce.filter((t) => !t.occ && t !== e.spot);
    if (!t.length) return null;
    let n = 0,
      r = t.map((t) => {
        let r = (Me[t.kind] || 1) * (e.lastKind === t.kind ? 0.25 : 1);
        return ((n += r), r);
      }),
      i = Math.random() * n;
    for (let e = 0; e < t.length; e++) if (((i -= r[e]), i <= 0)) return t[e];
    return t[0];
  }
  let Pe = new Set(["cafe", "meet", "cor", "serv"]);
  function Fe() {
    let e = 0;
    return (
      J.forEach((t) => {
        ((t.spot && Pe.has(t.spot.kind)) ||
          (t.path.length && t.dest && Pe.has(t.dest.kind))) &&
          e++;
      }),
      e
    );
  }
  function Ie() {
    return Math.max(2, Math.round(J.size * 0.25));
  }
  function Le(e) {
    let t = ke(e);
    if (t) {
      Ee(e, t);
      return;
    }
    if (e.path.length || (e.spot && e.spot.kind !== "desk" && e.dwell > 0))
      return;
    if (e.spot && e.spot.kind === "desk") {
      if (Fe() >= Ie() || Math.random() < 0.6) {
        e.dwell = 8 + Math.random() * 14;
        return;
      }
    } else if (e.spot && e.home && Math.random() < 0.7) {
      Ee(e, e.home);
      return;
    }
    let n = Ne(e);
    n ? Ee(e, n) : (e.dwell = 4);
  }
  function Re(e, t, n) {
    return e + (((t - e + Math.PI * 3) % (Math.PI * 2)) - Math.PI) * n;
  }
  let ze = new THREE.Vector3();
  function Be(e, t, n) {
    let r = e.g,
      i = e.p;
    if (((e.t += t), e.path.length)) {
      let n = e.path[0],
        i = n[0] - r.position.x,
        a = n[1] - r.position.z,
        o = Math.hypot(i, a),
        s = 2 * t;
      (o <= s
        ? ((r.position.x = n[0]),
          (r.position.z = n[1]),
          e.path.shift(),
          e.path.length || De(e))
        : ((r.position.x += (i / o) * s),
          (r.position.z += (a / o) * s),
          (e.face = Math.atan2(i, a))),
        (e.mode = "walk"));
    } else
      (e.mode === "walk" && (e.mode = e.spot && e.spot.sit ? "sit" : "stand"),
        e.dwell > 0 && (e.dwell -= t));
    r.rotation.y = Re(r.rotation.y, e.face, Math.min(1, t * 10));
    let a = e.a.status,
      o = e.t,
      s = 0;
    if (e.mode === "walk") {
      let e = Math.sin(o * 9);
      ((i.legL.rotation.x = e * 0.7),
        (i.legR.rotation.x = -e * 0.7),
        (i.armL.rotation.x = -e * 0.6),
        (i.armR.rotation.x = e * 0.6),
        (s = Math.abs(e) * 0.06),
        (i.head.rotation.x = 0),
        (i.tor.rotation.x = 0));
    } else if (e.mode === "sit") {
      if (
        ((i.legL.rotation.x = i.legR.rotation.x = -1.45),
        (s = -0.02),
        a === "running")
      ) {
        let e = Math.sin(o * 14);
        ((i.armL.rotation.x = -1.25 + e * 0.12),
          (i.armR.rotation.x = -1.25 - e * 0.12),
          (i.head.rotation.x = 0.08),
          (i.tor.rotation.x = 0.06));
      } else
        a === "off"
          ? ((i.armL.rotation.x = i.armR.rotation.x = -0.3),
            (i.head.rotation.x = 0.65 + Math.sin(o * 1.3) * 0.04),
            (i.tor.rotation.x = 0.18))
          : a === "failed"
            ? ((i.armL.rotation.x = -2.5),
              (i.armR.rotation.x = -2.5),
              (i.head.rotation.x = 0.4),
              (r.position.x += Math.sin(o * 40) * 0.004))
            : ((i.armL.rotation.x = -0.5),
              (i.armR.rotation.x = -0.5 + Math.sin(o * 1.2) * 0.05),
              (i.head.rotation.x = Math.sin(o * 0.7) * 0.05),
              (i.tor.rotation.x = 0));
    } else
      ((i.legL.rotation.x = i.legR.rotation.x = 0),
        (i.armL.rotation.x = Math.sin(o * 1.5) * 0.05),
        (i.armR.rotation.x = -Math.sin(o * 1.5) * 0.05),
        (i.head.rotation.x = 0),
        (i.tor.rotation.x = 0),
        (s = Math.sin(o * 2) * 0.012),
        a === "waiting"
          ? (i.armR.rotation.z = -2.7 + Math.sin(o * 6) * 0.25)
          : (i.armR.rotation.z = 0),
        a !== "waiting" && (i.armR.rotation.z = 0));
    (e.mode === "sit" && a !== "waiting" && (i.armR.rotation.z = 0),
      (i.tor.position.y = 0.52 + s),
      (i.legL.position.y = i.legR.position.y = 0.52 + s * 0.5),
      (e.g.position.y = 0));
  }
  function Ve(e) {
    ze.copy(e).project(c);
    let t = r.clientWidth,
      n = r.clientHeight;
    return [(ze.x * 0.5 + 0.5) * t, (-ze.y * 0.5 + 0.5) * n, ze.z];
  }
  function He(e) {
    let t = e.id === H || e.id === K;
    return G === "names"
      ? t || p >= 2.4
        ? 2
        : 1
      : G === "dots"
        ? t
          ? 2
          : 0
        : t || p >= 2.4
          ? 2
          : +(p >= 1.7);
  }
  function Ue() {
    let e = r.clientWidth,
      t = r.clientHeight,
      n = (n, r, i, a, o) => {
        ze.set(r, i, a);
        let s = Ve(ze),
          c = Math.round(s[0] * 2) / 2,
          l = Math.round((s[1] - o) * 2) / 2,
          u = c < -60 || c > e + 60 || l < -40 || l > t + 60;
        if (
          (n._o !== u && ((n._o = u), (n.style.display = u ? "none" : "")), u)
        )
          return;
        let d = c + "," + l;
        n._k !== d &&
          ((n._k = d),
          (n.style.transform = `translate(${c}px,${l}px) translate(-50%,-100%)`));
      };
    (J.forEach((e) => {
      let t = He(e);
      e.lv !== t &&
        (e.lab.classList.remove("l0", "l1", "l2"),
        e.lab.classList.add("l" + t),
        (e.lv = t));
      let r = e.id === H;
      (e._sl === r
        ? e._lz !== t &&
          ((e._lz = t), (e.lab.style.zIndex = t === 2 || r ? 5 : 1))
        : ((e._sl = r),
          e.lab.classList.toggle("sel", r),
          (e.lab.style.zIndex = t === 2 || r ? 5 : 1)),
        n(e.lab, e.g.position.x, 2.05, e.g.position.z, 0));
    }),
      ge.forEach((e) => n(e.el, e.x, e.y, e.z, 0)));
  }
  let We = false;
  function Ge() {
    let e = r.clientWidth / Math.max(1, r.clientHeight),
      t = Math.max(0.6, Math.min(1.45, (38 * e) / 34));
    return r.clientWidth < 560 ? Math.max(t, 0.95) : t;
  }
  function Ke() {
    let e = r.clientWidth,
      t = r.clientHeight;
    if (!e || !t) return;
    o.setSize(e, t, false);
    let n = e / t;
    ((c.left = -19 * n),
      (c.right = 19 * n),
      (c.top = 19),
      (c.bottom = -19),
      c.updateProjectionMatrix(),
      We || (m = Ge()));
  }
  function qe() {
    ((c.zoom = p),
      c.updateProjectionMatrix(),
      c.position.set(
        d.x + 80 * Math.cos(u) * Math.sin(l),
        d.y + 80 * Math.sin(u),
        d.z + 80 * Math.cos(u) * Math.cos(l),
      ),
      c.lookAt(d),
      g.position.set(d.x + 22, 40, d.z + 14),
      g.target.position.copy(d),
      (t("zv").textContent = Math.round(p * 100) + "%"));
  }
  let Je = new THREE.Vector3(Math.cos(l), 0, -Math.sin(l)),
    Ye = new THREE.Vector3(-Math.sin(l), 0, -Math.cos(l)),
    Xe = null,
    Ze = false,
    Qe = null,
    $e = new Map(),
    et = () => {
      let e = [...$e.values()];
      return Math.hypot(e[0].x - e[1].x, e[0].y - e[1].y) || 1;
    };
  function tt(e, t) {
    ((U = null), window.syncFol && syncFol());
    let r = 38 / p / n.clientHeight;
    (f.addScaledVector(Je, -e * r).addScaledVector(Ye, (t * r) / Math.sin(u)),
      (f.x = Math.max(-24, Math.min(24, f.x))),
      (f.z = Math.max(-18, Math.min(18, f.z))),
      d.copy(f));
  }
  (n.addEventListener("pointerdown", (e) => {
    ((Ze = true),
      n.focus({ preventScroll: true }),
      $e.set(e.pointerId, { x: e.clientX, y: e.clientY }));
    try {
      n.setPointerCapture(e.pointerId);
    } catch {}
    $e.size === 2
      ? ((Xe = null), (Qe = { d: et(), z: m }))
      : $e.size === 1 &&
        (Xe = {
          x: e.clientX,
          y: e.clientY,
          sx: e.clientX,
          sy: e.clientY,
          moved: false,
          touch: e.pointerType === "touch",
        });
  }),
    n.addEventListener("pointermove", (e) => {
      let t = $e.get(e.pointerId);
      if (!t) return;
      let n = e.clientX - t.x,
        r = e.clientY - t.y;
      ((t.x = e.clientX),
        (t.y = e.clientY),
        Qe && $e.size === 2
          ? ((We = true),
            (m = Math.max(0.6, Math.min(4, (Qe.z * et()) / Qe.d))),
            tt(n / 2, r / 2))
          : Xe &&
            (Math.hypot(e.clientX - Xe.sx, e.clientY - Xe.sy) > 5 &&
              (Xe.moved = true),
            Xe.moved && !Xe.touch && tt(n, r)));
    }));
  let nt = (e) => {
    ($e.delete(e.pointerId), $e.size < 2 && (Qe = null));
  };
  (n.addEventListener("pointerup", (e) => {
    (Xe && !Xe.moved && ct(e), (Xe = null), nt(e));
  }),
    n.addEventListener("pointercancel", (e) => {
      ((Xe = null), nt(e));
    }),
    n.addEventListener("pointerleave", (e) => {
      e.pointerType === "mouse" && (Ze = false);
    }),
    n.addEventListener(
      "wheel",
      (e) => {
        (Ze || e.ctrlKey) &&
          (e.preventDefault(),
          (We = true),
          (m = Math.max(0.6, Math.min(4, m * Math.exp(-e.deltaY * 0.0015)))));
      },
      { passive: false },
    ),
    n.addEventListener("keydown", (e) => {
      let t = 1.2;
      e.key === "+" || e.key === "="
        ? ((We = true), (m = Math.min(4, m * t)))
        : e.key === "-"
          ? ((We = true), (m = Math.max(0.6, m / t)))
          : e.key.startsWith("Arrow") &&
            (e.preventDefault(),
            tt(
              e.key === "ArrowLeft" ? 60 : e.key === "ArrowRight" ? -60 : 0,
              e.key === "ArrowUp" ? 60 : e.key === "ArrowDown" ? -60 : 0,
            ));
    }));
  let rt = [
    [
      "auto",
      (e) => (e ? "Noms : auto (au survol / en zoomant)" : "Names: auto"),
    ],
    ["names", (e) => (e ? "Noms : toujours" : "Names: always")],
    [
      "dots",
      (e) => (e ? "Noms : points seulement (survol)" : "Names: dots only"),
    ],
  ];
  ((t("bn").onclick = () => {
    let e = (rt.findIndex((e) => e[0] === G) + 1) % rt.length;
    G = rt[e][0];
    let n = rt[e][1](V);
    ((t("bn").title = n),
      t("bn").setAttribute("aria-label", n),
      (t("bn").style.opacity = G === "auto" ? 1 : 0.7),
      (t("bn").dataset.m = G === "auto" ? "a" : G === "names" ? "n" : "o"));
  }),
    (t("bp").onclick = () => {
      ((We = true), (m = Math.min(4, m * 1.25)));
    }),
    (t("bm").onclick = () => {
      ((We = true), (m = Math.max(0.6, m / 1.25)));
    }),
    (t("bh").onclick = () => {
      ((We = false),
        f.set(0, 0, 0.5),
        (m = Ge()),
        (H = null),
        (U = null),
        (t("card").style.display = "none"),
        mt());
    }));
  let it = 0;
  (n.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || $e.size) return;
    let t = performance.now();
    if (t - it < 90) return;
    it = t;
    let n = st(e);
    K = (n && n.object.userData.ent) || null;
  }),
    n.addEventListener("pointerleave", () => {
      K = null;
    }));
  let at = new THREE.Raycaster(),
    ot = new THREE.Vector2();
  function st(e) {
    let t = n.getBoundingClientRect();
    return (
      ot.set(
        ((e.clientX - t.left) / t.width) * 2 - 1,
        -((e.clientY - t.top) / t.height) * 2 + 1,
      ),
      at.setFromCamera(ot, c),
      at
        .intersectObjects(
          [...J.values()].map((e) => e.g),
          true,
        )
        .find((e) => e.object.userData.ent)
    );
  }
  function ct(e) {
    let t = n.getBoundingClientRect();
    (ot.set(
      ((e.clientX - t.left) / t.width) * 2 - 1,
      -((e.clientY - t.top) / t.height) * 2 + 1,
    ),
      at.setFromCamera(ot, c));
    let r = at
      .intersectObjects(
        [...J.values()].map((e) => e.g),
        true,
      )
      .find((e) => e.object.userData.ent);
    r && lt(r.object.userData.ent, false);
  }
  function lt(e, n) {
    ((H = e),
      t("app").classList.contains("ov") &&
        (t("lp").classList.add("hid"), t("rp").classList.add("hid")));
    let r = J.get(e);
    r &&
      (n
        ? ((We = true),
          (U = e),
          f.set(r.g.position.x, 0, r.g.position.z),
          (m = Math.max(m, 1.9)))
        : ((U = null), ft(r)),
      mt());
  }
  function dt(e) {
    let t = Math.max(0, Math.round((Date.now() / 1e3 - e) / 60));
    return t < 1
      ? V
        ? "à l’instant"
        : "now"
      : t < 60
        ? t + " min"
        : t < 1440
          ? Math.round(t / 60) + " h"
          : Math.round(t / 1440) + " j";
  }
  let syncFol = () => {};
  /** Agent card (top right of the 3D view): status, last run, cost, buttons Open / Chat / Follow. */
  function ft(e) {
    let n = t("card");
    (n.replaceChildren(), (n.style.display = "block"));
    let r = e.a;
    (X("h4", null, r.display_name || r.name, n),
      X("div", null, r.status_text || r.status || "", n),
      r.description && X("div", "t", r.description, n),
      r.last_run &&
        r.last_run.text &&
        X(
          "div",
          "t",
          (r.last_run.ok === false ? "✗ " : "") + r.last_run.text,
          n,
        ),
      r.cost_today != null &&
        X(
          "div",
          "t",
          (V ? "Coût du jour : " : "Cost today: ") +
            Number(r.cost_today).toFixed(2) +
            " $",
          n,
        ));
    let i = (e) => () => e && maxxing.navigate(e);
    if (r.route)
      X("button", null, V ? "Ouvrir" : "Open", n).onclick = i(r.route);
    if (r.chat_route)
      X("button", null, V ? "Conversation" : "Chat", n).onclick = i(
        r.chat_route,
      );
    let s = X("button", null, "×", n);
    s.setAttribute("aria-label", V ? "Fermer" : "Close");
    s.onclick = () => {
      ((n.style.display = "none"), (H = null), (U = null), mt());
    };
    let c = X(
      "button",
      U === e.id ? "on" : null,
      (V ? "Suivre" : "Follow") + (U === e.id ? " ✓" : ""),
      n,
    );
    ((syncFol = () => {
      ((c.className = U === e.id ? "on" : ""),
        (c.textContent = (V ? "Suivre" : "Follow") + (U === e.id ? " ✓" : "")));
    }),
      (c.onclick = () => {
        (U === e.id
          ? (U = null)
          : ((U = e.id), (We = true), (m = Math.max(m, 1.9))),
          syncFol());
      }));
  }
  /** Rebuilds the left list (agents by project), the stats and the activity feed (right panel). */
  function mt() {
    if (!B) return;
    let n = t("lp"),
      r = t("rp"),
      i = n.scrollTop,
      a = r.scrollTop;
    (n.replaceChildren(), X("h3", null, "Agents", n));
    B.projects
      .filter((e) => e.agents.length)
      .forEach((t) => {
        let r = X("div", "gh", null, n),
          i = X("i", null, null, r);
        ((i.style.background = t.color || "#888"),
          X(
            "span",
            null,
            (t.emoji ? t.emoji + " " : "") + t.name + " · " + t.agents.length,
            r,
          ),
          t.agents.forEach((e) => {
            let t = X("div", "row" + (H === e.path ? " sel" : ""), null, n);
            if ((xe(t, e.display_name || e.name), e.avatar_svg)) {
              let n = X("img", null, null, t);
              n.alt = "";
              n.src = "data:image/svg+xml," + encodeURIComponent(e.avatar_svg);
            }
            let r = X("div", "tx", null, t);
            (X("div", "n", e.display_name || e.name, r),
              X("div", "s", e.status_text || e.status, r),
              X("div", "dot st-" + e.status, null, t),
              (t.onclick = () => lt(e.path, true)));
          }));
      });
    setTimeout(() => {
      ((n.scrollTop = i), (r.scrollTop = a));
    }, 0);
    let o = t("rp");
    o.replaceChildren();
    let s = [...J.values()].map((e) => e.a),
      c = s.filter((e) => e.status === "running").length,
      l = s.filter(
        (e) => e.status === "waiting" || e.status === "failed",
      ).length,
      d = X("div", "stats", null, o);
    [
      [c, V ? "au travail" : "working"],
      [s.length, "agents"],
      [l, V ? "à traiter" : "attention"],
    ].forEach(([e, t]) => {
      let n = X("div", null, t, d);
      n.prepend(X("b", null, String(e)));
    });
    let f = X("div", "tabs", null, o);
    [
      ["all", V ? "Tout" : "All"],
      ["todo", V ? "À traiter" : "Needs you"],
    ].forEach(([e, t]) => {
      let n = X("button", W === e ? "on" : "", t, f);
      n.onclick = () => {
        ((W = e), mt());
      };
    });
    let p = [];
    (s.forEach((e) => {
      let t = J.get(e.path),
        n = e.last_run && e.last_run.at,
        r = e.display_name || e.name;
      (typeof n == "string"
        ? (n = Date.parse(n) / 1e3)
        : n > 0xe8d4a51000 && (n /= 1e3),
        e.status === "waiting"
          ? p.push({
              t: Date.now() / 1e3,
              e: t,
              title: r,
              body:
                e.status_text ||
                (V ? "En attente de validation" : "Waiting for you"),
              cls: "warn",
              todo: true,
            })
          : e.status === "failed"
            ? p.push({
                t: n || 0,
                e: t,
                title: r,
                body:
                  "✗ " +
                  ((e.last_run && e.last_run.text) || e.status_text || ""),
                cls: "bad",
                todo: true,
              })
            : n &&
              e.last_run &&
              e.last_run.text &&
              p.push({
                t: n,
                e: t,
                title: r,
                body: e.last_run.text,
                cls: "",
                todo: false,
              }));
    }),
      p.sort((e, t) => t.t - e.t));
    let m = p.filter((e) => W === "all" || e.todo).slice(0, 25);
    (m.length ||
      X("div", "empty", V ? "Rien à signaler" : "Nothing to report", o),
      m.forEach((e) => {
        let t = X("div", "fi " + e.cls, null, o);
        xe(t, e.title);
        let n = X("div", "h", null, t);
        (X("div", null, e.title, n),
          X("span", null, e.t ? dt(e.t) : "", n),
          X("div", "b", e.body, t),
          e.e && (t.onclick = () => lt(e.e.id, true)));
      }),
      t("top").replaceChildren(
        document.createTextNode(
          s.length +
            " agents · " +
            c +
            (V ? " au travail" : " working") +
            " · ",
        ),
        X("b", null, l + (V ? " à traiter" : " need you")),
      ));
    // Chat button (bottom toolbar): talks to the selected agent through its chat_route.
    let u = H && J.get(H),
      h = t("bt"),
      g = u && u.a.chat_route;
    ((h.hidden = !g),
      g &&
        ((h.textContent =
          "💬 " +
          (V ? "Discuter avec " : "Chat with ") +
          (u.a.display_name || u.a.name)),
        (h.onclick = () => maxxing.navigate(g))));
  }
  function ht(n) {
    ((B = n), (V = (n.lang || "").startsWith("fr")));
    let r = new Set(),
      i = T.map((e) => 0),
      a = T.map(() => null),
      o = new Map(),
      c = n.projects.filter((e) => e.agents.length),
      l = T.map(() => 0);
    ((Tt = 0),
      [...c]
        .sort((e, t) => t.agents.length - e.agents.length)
        .forEach((e) => {
          let t = e.agents.length,
            n = T.findIndex((e, n) => !a[n] && ye[n].length >= t);
          if (n < 0) {
            let e = T.map((e, t) => ye[t].length - i[t]),
              r = Math.max(...e);
            r >= t && (n = e.indexOf(r));
          }
          (n < 0 && (n = i.indexOf(Math.min(...i))),
            (a[n] = a[n] || []).push(e),
            e.agents.forEach((e) => {
              let t = n;
              if (i[t] >= ye[t].length) {
                let e = T.findIndex((e, t) => i[t] < ye[t].length);
                e >= 0 ? (t = e) : Tt++;
              }
              let r = i[t]++;
              (l[t]++, o.set(e.path, [t, r % ye[t].length]));
            }));
        }),
      Tt &&
        Ct(
          V
            ? Tt + " agent(s) sans bureau libre (22 places)"
            : Tt + " agent(s) without a free desk (22 desks)",
        ),
      D.forEach((e, t) => {
        let n = a[t] && a[t][0],
          r = new THREE.Color(n ? n.color || "#ccc" : "#e7e1d6");
        (n && r.lerp(new THREE.Color("#f1e9db"), 0.78),
          e.material.color.copy(r));
      }),
      ge.forEach((t, n) => {
        if (n < T.length) {
          let r = a[n];
          t.el.textContent = r
            ? r[0].name.toUpperCase() +
              (r.length > 1 ? " +" + (r.length - 1) : "") +
              " · " +
              l[n]
            : "";
        }
      }),
      be.forEach((e) =>
        e.forEach((e) => {
          (e.mat.emissive.set("#000"), (e.mat.emissiveIntensity = 1));
        }),
      ),
      c.forEach((e) => {
        e.agents.forEach((e) => {
          r.add(e.path);
          let [t, n] = o.get(e.path),
            i = ye[t][n],
            a = J.get(e.path);
          if (!a) {
            a = we(e.path, e, { home: i });
            let t =
              Oe(e.status) && Fe() < Ie() && Math.random() < 0.3 ? Ne(a) : null;
            (Te(a, t || i), (a.dwell = Math.random() * 8));
          }
          {
            let t = JSON.stringify(e.avatar || null);
            if (a.avk === void 0) a.avk = t;
            else if (a.avk !== t) {
              a.avk = t;
              let n = oe(e.name || a.id, ae(e.avatar));
              (n.position.copy(a.g.position),
                n.rotation.copy(a.g.rotation),
                s.remove(a.g),
                M(a.g),
                s.add(n),
                n.traverse((e) => {
                  e.isMesh && (e.userData.ent = a.id);
                }),
                (a.g = n),
                (a.p = n.userData.p));
            }
          }
          ((a.a = e), (a.home = i), Ce(a));
          let c = be[t][n];
          (c.mat.emissive.set(
            e.status === "running"
              ? "#4fb0ff"
              : e.status === "failed"
                ? "#ff5a5a"
                : e.status === "off" || Oe(e.status)
                  ? "#000"
                  : "#27506e",
          ),
            (c.mat.emissiveIntensity = e.status === "running" ? 0.9 : 0.45));
        });
      }),
      J.forEach((e, t) => {
        !r.has(t) &&
          (s.remove(e.g),
          M(e.g),
          e.lab.remove(),
          e.spot && e.spot.occ === e && (e.spot.occ = null),
          J.delete(t));
      }),
      J.forEach((e) => {
        Le(e);
      }),
      mt(),
      H && J.get(H) && t("card").style.display === "block" && ft(J.get(H)));
  }
  function Ct(e) {
    let n = t("wn");
    (n ||
      ((n = X("div", null, null, t("mid"))),
      (n.id = "wn"),
      (n.style.cssText =
        "position:absolute;left:50%;top:44px;transform:translateX(-50%);background:rgba(120,53,15,.92);color:#fff;border-radius:99px;padding:3px 12px;font-size:11px;font-weight:600;z-index:3;pointer-events:none"),
      n.setAttribute("role", "status")),
      (n.textContent = e),
      (n.hidden = !e));
  }
  let Tt = 0;
  let Dt = performance.now(),
    Ot = 0,
    kt = true,
    At = 0,
    jt = 0,
    Mt = 0,
    Nt = 0,
    Pt = Math.min(window.devicePixelRatio || 1, 1.6),
    Ft = 0;
  function It() {
    for (let e of J.values()) if (e.path.length) return true;
    return false;
  }
  function Lt(e, t, n) {
    if ((n && (Mt = Mt ? Mt * 0.92 + t * 0.08 : t), e - Ft < 2500 || !n))
      return;
    Ft = e;
    let r = Math.min(window.devicePixelRatio || 1, 1.6),
      i = Pt;
    (Mt > 46 && Pt > 0.8
      ? ((i = Math.max(0.8, Pt - 0.2)), (Nt = e + 15e3))
      : Mt < 36 && Pt < r && e > Nt && (i = Math.min(r, Pt + 0.2)),
      i !== Pt && ((Pt = i), o.setPixelRatio(Pt), Ke(), (Mt = 0)));
  }
  window.IntersectionObserver &&
    new IntersectionObserver((e) => {
      kt = e[0].isIntersecting;
    }).observe(n);
  function Rt(e) {
    if ((requestAnimationFrame(Rt), document.hidden || !kt)) return;
    let t = It() || Math.abs(m - p) > 0.002 || d.distanceToSquared(f) > 4e-4,
      n = t ? 30 : e - At < 2500 ? 45 : 66;
    if (e - Dt < n) return;
    t && (At = e);
    let r = e - Dt,
      i = Math.min(0.12, r / 1e3);
    if (
      ((Dt = e),
      Ot++,
      (o.shadowMap.needsUpdate = (t || Ot < 4) && (Ot % 3 == 0 || Ot < 4)),
      Lt(e, e - r, t),
      U)
    ) {
      let e = J.get(U);
      e && e.g
        ? f.set(
            Math.max(-24, Math.min(24, e.g.position.x)),
            0,
            Math.max(-18, Math.min(18, e.g.position.z)),
          )
        : (U = null);
    }
    (d.lerp(f, Math.min(1, i * 6)),
      (p += (m - p) * Math.min(1, i * 8)),
      qe(),
      J.forEach((t) => {
        (!t.path.length && t.dwell <= 0 && Oe(t.a.status) && B && Le(t),
          Be(t, i, e));
      }),
      Ue());
    let a = performance.now();
    (o.render(s, c), (jt = jt * 0.9 + (performance.now() - a) * 0.1));
  }
  function zt() {
    let e = a();
    ((s.background = new THREE.Color(e ? "#1c2431" : "#dbe7ee")),
      (r.style.background = e ? "#1c2431" : "#dbe7ee"),
      (h.intensity = e ? 1 : 1.5),
      (g.intensity = e ? 1.4 : 2.1));
    let t = s.getObjectByName("ground");
    t && (t.material = v(e ? "#3f6b4a" : "#92c47e"));
  }
  function Bt() {
    (k(),
      j(),
      T.forEach((e, t) => {
        let n = X("div", "zl", "", i);
        ge.push({ el: n, x: O[t][0], y: 3.1, z: e.box[1] });
      }),
      [
        ["OFFICE", -11, 3.1, -9],
        ["MEETING", 2.25, 2.9, 2],
        ["CAFÉ", 8.8, 2.4, 2.2],
        ["SERVERS", 12.7, 2.7, 2],
      ].forEach(([e, t, n, r]) => {
        let a = X("div", "zl", e, i);
        ge.push({ el: a, x: t, y: n, z: r });
      }));
    (zt(),
      f.set(0, 0, 0.5),
      d.copy(f),
      Ke(),
      (p = m),
      qe(),
      window.addEventListener("resize", () => {
        (Ke(), Yt());
      }),
      maxxing.onTheme && maxxing.onTheme(zt),
      n.addEventListener("webglcontextlost", (e) => {
        (e.preventDefault(),
          Ct(
            V
              ? "Affichage 3D interrompu, reprise automatique…"
              : "3D display interrupted, recovering…",
          ));
      }),
      n.addEventListener("webglcontextrestored", () => {
        (Ct(""), Ke());
      }),
      maxxing.onData(ht),
      requestAnimationFrame(Rt),
      Yt());
  }
  function Vt() {
    let e = t("app"),
      n = e.clientWidth < 1020;
    (n === e.classList.contains("ov") && e.dataset.l) ||
      (e.classList.toggle("ov", n),
      (e.dataset.l = 1),
      t("lp").classList.toggle("hid", n),
      t("rp").classList.toggle("hid", n));
  }
  function Ht() {
    let e =
      t("app").classList.contains("ov") &&
      (!t("lp").classList.contains("hid") ||
        !t("rp").classList.contains("hid"));
    ((t("bk").hidden = !e), (t("bx").hidden = !e));
  }
  function Wt() {
    (t("lp").classList.add("hid"), t("rp").classList.add("hid"), Ht());
  }
  ((t("bk").onclick = Wt), (t("bx").onclick = Wt));
  {
    let e = new MutationObserver(Ht);
    (e.observe(t("lp"), { attributes: true, attributeFilter: ["class"] }),
      e.observe(t("rp"), { attributes: true, attributeFilter: ["class"] }),
      e.observe(t("app"), { attributes: true, attributeFilter: ["class"] }));
  }
  let Gt = () => t("lp").classList.toggle("hid"),
    Kt = () => t("rp").classList.toggle("hid");
  ((t("bl").onclick = t("tl").onclick = Gt),
    (t("br").onclick = t("tr").onclick = Kt));
  {
    let e = () => {
        (t("tl").classList.toggle("on", !t("lp").classList.contains("hid")),
          t("tr").classList.toggle("on", !t("rp").classList.contains("hid")));
      },
      n = new MutationObserver(e);
    (n.observe(t("lp"), { attributes: true, attributeFilter: ["class"] }),
      n.observe(t("rp"), { attributes: true, attributeFilter: ["class"] }),
      e());
  }
  let qt = null,
    Jt = 0;
  if (window.IntersectionObserver) {
    let e = [];
    for (let t = 0; t <= 50; t++) e.push(t / 50);
    new IntersectionObserver(
      (e) => {
        let n = e[e.length - 1].intersectionRect,
          r = t("app");
        if (n.height > 0 && n.top <= 1 && n.height < r.clientHeight - 8) {
          let e = Math.max(280, Math.floor(n.height));
          (!qt || e < qt) && ((qt = e), Yt());
        }
      },
      { threshold: e },
    ).observe(t("app"));
  }
  function Yt() {
    (Vt(), window.innerWidth !== Jt && ((Jt = window.innerWidth), (qt = null)));
    let e = window.innerWidth < 560 ? 640 : window.innerWidth < 860 ? 600 : 780;
    {
      let t = Math.min(screen.width || 9999, screen.height || 9999);
      window.innerWidth > t * 1.2 && (e = Math.max(300, Math.min(e, t - 110)));
    }
    (qt && (e = Math.min(e, qt)),
      (document.getElementById("app").style.height = e + "px"),
      maxxing.resize(e + 4),
      Ke());
  }
  (window.ResizeObserver && new ResizeObserver(() => Ke()).observe(r), Bt());
}
