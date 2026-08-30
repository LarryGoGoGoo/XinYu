import { defineComponent as R, createElementBlock as I, openBlock as w, createElementVNode as H, ref as O, onMounted as xe, onBeforeUnmount as ze, getCurrentInstance as we, inject as ne, computed as A, unref as h, shallowRef as Su, watchEffect as ea, readonly as Bo, getCurrentScope as ua, onScopeDispose as ta, nextTick as ye, watch as V, warn as na, mergeProps as cu, renderSlot as z, toRef as Ke, onUnmounted as wn, useAttrs as ra, useSlots as An, normalizeStyle as Ae, normalizeClass as U, createCommentVNode as P, Fragment as iu, createBlock as j, withCtx as q, resolveDynamicComponent as We, withModifiers as oa, toDisplayString as nu, provide as Ge, withDirectives as Ro, cloneVNode as aa, Comment as fr, Text as Mo, createVNode as X, Teleport as ia, onBeforeMount as sa, Transition as mn, vShow as ca, onDeactivated as la, reactive as fa, createTextVNode as $o, renderList as Fn, createStaticVNode as da, createSlots as pa } from "vue";
/*! Element Plus Icons Vue v2.3.2 */
var ha = /* @__PURE__ */ R({
  name: "ArrowDownBold",
  __name: "arrow-down-bold",
  setup(e) {
    return (u, t) => (w(), I("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      H("path", {
        fill: "currentColor",
        d: "M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496"
      })
    ]));
  }
}), ba = ha, ga = /* @__PURE__ */ R({
  name: "Brush",
  __name: "brush",
  setup(e) {
    return (u, t) => (w(), I("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      H("path", {
        fill: "currentColor",
        d: "M896 448H128v192a64 64 0 0 0 64 64h192v192h256V704h192a64 64 0 0 0 64-64zm-770.752-64c0-47.552 5.248-90.24 15.552-128 14.72-54.016 42.496-107.392 83.2-160h417.28l-15.36 70.336L736 96h211.2c-24.832 42.88-41.92 96.256-51.2 160a664 664 0 0 0-6.144 128H960v256a128 128 0 0 1-128 128H704v160a32 32 0 0 1-32 32H352a32 32 0 0 1-32-32V768H192A128 128 0 0 1 64 640V384zm64 0h636.544c-2.048-45.824.256-91.584 6.848-137.216 4.48-30.848 10.688-59.776 18.688-86.784h-96.64l-221.12 141.248L561.92 160H256.512c-25.856 37.888-43.776 75.456-53.952 112.832-8.768 32.064-13.248 69.12-13.312 111.168"
      })
    ]));
  }
}), ma = ga, va = /* @__PURE__ */ R({
  name: "CircleCheck",
  __name: "circle-check",
  setup(e) {
    return (u, t) => (w(), I("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      H("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      }),
      H("path", {
        fill: "currentColor",
        d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752z"
      })
    ]));
  }
}), ya = va, _a = /* @__PURE__ */ R({
  name: "CircleClose",
  __name: "circle-close",
  setup(e) {
    return (u, t) => (w(), I("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      H("path", {
        fill: "currentColor",
        d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z"
      }),
      H("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      })
    ]));
  }
}), zo = _a, xa = /* @__PURE__ */ R({
  name: "Hide",
  __name: "hide",
  setup(e) {
    return (u, t) => (w(), I("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      H("path", {
        fill: "currentColor",
        d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4s-12.8-9.6-22.4-9.6-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176S0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4s3.2 16 9.6 22.4 12.8 9.6 22.4 9.6 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4m-646.4 528Q115.2 579.2 76.8 512q43.2-72 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4m140.8-96Q352 555.2 352 512c0-44.8 16-83.2 48-112s67.2-48 112-48c28.8 0 54.4 6.4 73.6 19.2zM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6q-43.2 72-153.6 172.8c-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176S1024 528 1024 512s-48.001-73.6-134.401-176"
      }),
      H("path", {
        fill: "currentColor",
        d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112s-67.2 48-112 48"
      })
    ]));
  }
}), ka = xa, Ea = /* @__PURE__ */ R({
  name: "Loading",
  __name: "loading",
  setup(e) {
    return (u, t) => (w(), I("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      H("path", {
        fill: "currentColor",
        d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248m452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248M828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0"
      })
    ]));
  }
}), No = Ea, Ca = /* @__PURE__ */ R({
  name: "Microphone",
  __name: "microphone",
  setup(e) {
    return (u, t) => (w(), I("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      H("path", {
        fill: "currentColor",
        d: "M512 128a128 128 0 0 0-128 128v256a128 128 0 1 0 256 0V256a128 128 0 0 0-128-128m0-64a192 192 0 0 1 192 192v256a192 192 0 1 1-384 0V256A192 192 0 0 1 512 64m-32 832v-64a288 288 0 0 1-288-288v-32a32 32 0 0 1 64 0v32a224 224 0 0 0 224 224h64a224 224 0 0 0 224-224v-32a32 32 0 1 1 64 0v32a288 288 0 0 1-288 288v64h64a32 32 0 1 1 0 64H416a32 32 0 1 1 0-64z"
      })
    ]));
  }
}), wa = Ca, Aa = /* @__PURE__ */ R({
  name: "Top",
  __name: "top",
  setup(e) {
    return (u, t) => (w(), I("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      H("path", {
        fill: "currentColor",
        d: "M572.235 205.282v600.365a30.118 30.118 0 1 1-60.235 0V205.282L292.382 438.633a28.913 28.913 0 0 1-42.646 0 33.43 33.43 0 0 1 0-45.236l271.058-288.045a28.913 28.913 0 0 1 42.647 0L834.5 393.397a33.43 33.43 0 0 1 0 45.176 28.913 28.913 0 0 1-42.647 0l-219.618-233.23z"
      })
    ]));
  }
}), Fa = Aa, Da = /* @__PURE__ */ R({
  name: "View",
  __name: "view",
  setup(e) {
    return (u, t) => (w(), I("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      H("path", {
        fill: "currentColor",
        d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288m0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.19 160.19 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
      })
    ]));
  }
}), Sa = Da;
const Ta = (e) => {
  const u = O(!1), t = O(!1), n = () => {
    const o = e.value;
    o && (u.value = o.scrollHeight > o.clientHeight, t.value = o.scrollWidth > o.clientWidth);
  };
  let r = null;
  return xe(() => {
    n(), r = new ResizeObserver(n), e.value && r.observe(e.value);
  }), ze(() => {
    r && r.disconnect();
  }), {
    hasVertical: u,
    // 是否有纵向滚动条
    hasHorizontal: t,
    // 是否有横向滚动条
    check: n
    // 检查滚动条状态
  };
}, Oa = Symbol(), un = "el", Ia = "is-", gu = (e, u, t, n, r) => {
  let o = `${e}-${u}`;
  return t && (o += `-${t}`), n && (o += `__${n}`), r && (o += `--${r}`), o;
}, Pa = Symbol("namespaceContextKey"), Dn = (e) => {
  const u = we() ? ne(Pa, O(un)) : O(un);
  return A(() => h(u) || un);
}, he = (e, u) => {
  const t = Dn();
  return {
    namespace: t,
    b: (m = "") => gu(t.value, e, m, "", ""),
    e: (m) => m ? gu(t.value, e, "", m, "") : "",
    m: (m) => m ? gu(t.value, e, "", "", m) : "",
    be: (m, v) => m && v ? gu(t.value, e, m, v, "") : "",
    em: (m, v) => m && v ? gu(t.value, e, "", m, v) : "",
    bm: (m, v) => m && v ? gu(t.value, e, m, "", v) : "",
    bem: (m, v, y) => m && v && y ? gu(t.value, e, m, v, y) : "",
    is: (m, ...v) => {
      const y = v.length >= 1 ? v[0] : !0;
      return m && y ? `${Ia}${m}` : "";
    },
    cssVar: (m) => {
      const v = {};
      for (const y in m)
        m[y] && (v[`--${t.value}-${y}`] = m[y]);
      return v;
    },
    cssVarName: (m) => `--${t.value}-${m}`,
    cssVarBlock: (m) => {
      const v = {};
      for (const y in m)
        m[y] && (v[`--${t.value}-${e}-${y}`] = m[y]);
      return v;
    },
    cssVarBlockName: (m) => `--${t.value}-${e}-${m}`
  };
};
/**
* @vue/shared v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const Yu = () => {
}, Ba = Object.prototype.hasOwnProperty, dr = (e, u) => Ba.call(e, u), Lo = Array.isArray, Du = (e) => typeof e == "function", vu = (e) => typeof e == "string", et = (e) => e !== null && typeof e == "object";
var Ra = typeof global == "object" && global && global.Object === Object && global, Ma = typeof self == "object" && self && self.Object === Object && self, Sn = Ra || Ma || Function("return this")(), lu = Sn.Symbol, jo = Object.prototype, $a = jo.hasOwnProperty, za = jo.toString, Wu = lu ? lu.toStringTag : void 0;
function Na(e) {
  var u = $a.call(e, Wu), t = e[Wu];
  try {
    e[Wu] = void 0;
    var n = !0;
  } catch {
  }
  var r = za.call(e);
  return n && (u ? e[Wu] = t : delete e[Wu]), r;
}
var La = Object.prototype, ja = La.toString;
function qa(e) {
  return ja.call(e);
}
var Ha = "[object Null]", Ua = "[object Undefined]", pr = lu ? lu.toStringTag : void 0;
function Tn(e) {
  return e == null ? e === void 0 ? Ua : Ha : pr && pr in Object(e) ? Na(e) : qa(e);
}
function On(e) {
  return e != null && typeof e == "object";
}
var Va = "[object Symbol]";
function In(e) {
  return typeof e == "symbol" || On(e) && Tn(e) == Va;
}
function Wa(e, u) {
  for (var t = -1, n = e == null ? 0 : e.length, r = Array(n); ++t < n; )
    r[t] = u(e[t], t, e);
  return r;
}
var st = Array.isArray, hr = lu ? lu.prototype : void 0, br = hr ? hr.toString : void 0;
function qo(e) {
  if (typeof e == "string")
    return e;
  if (st(e))
    return Wa(e, qo) + "";
  if (In(e))
    return br ? br.call(e) : "";
  var u = e + "";
  return u == "0" && 1 / e == -1 / 0 ? "-0" : u;
}
function Pt(e) {
  var u = typeof e;
  return e != null && (u == "object" || u == "function");
}
function Ka(e) {
  return e;
}
var Za = "[object AsyncFunction]", Ga = "[object Function]", Ja = "[object GeneratorFunction]", Qa = "[object Proxy]";
function Xa(e) {
  if (!Pt(e))
    return !1;
  var u = Tn(e);
  return u == Ga || u == Ja || u == Za || u == Qa;
}
var tn = Sn["__core-js_shared__"], gr = (function() {
  var e = /[^.]+$/.exec(tn && tn.keys && tn.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
})();
function Ya(e) {
  return !!gr && gr in e;
}
var ei = Function.prototype, ui = ei.toString;
function ti(e) {
  if (e != null) {
    try {
      return ui.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var ni = /[\\^$.*+?()[\]{}|]/g, ri = /^\[object .+?Constructor\]$/, oi = Function.prototype, ai = Object.prototype, ii = oi.toString, si = ai.hasOwnProperty, ci = RegExp(
  "^" + ii.call(si).replace(ni, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function li(e) {
  if (!Pt(e) || Ya(e))
    return !1;
  var u = Xa(e) ? ci : ri;
  return u.test(ti(e));
}
function fi(e, u) {
  return e?.[u];
}
function Pn(e, u) {
  var t = fi(e, u);
  return li(t) ? t : void 0;
}
function di(e, u, t) {
  switch (t.length) {
    case 0:
      return e.call(u);
    case 1:
      return e.call(u, t[0]);
    case 2:
      return e.call(u, t[0], t[1]);
    case 3:
      return e.call(u, t[0], t[1], t[2]);
  }
  return e.apply(u, t);
}
var pi = 800, hi = 16, bi = Date.now;
function gi(e) {
  var u = 0, t = 0;
  return function() {
    var n = bi(), r = hi - (n - t);
    if (t = n, r > 0) {
      if (++u >= pi)
        return arguments[0];
    } else
      u = 0;
    return e.apply(void 0, arguments);
  };
}
function mi(e) {
  return function() {
    return e;
  };
}
var Bt = (function() {
  try {
    var e = Pn(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
})(), vi = Bt ? function(e, u) {
  return Bt(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: mi(u),
    writable: !0
  });
} : Ka, yi = gi(vi), _i = 9007199254740991, xi = /^(?:0|[1-9]\d*)$/;
function Ho(e, u) {
  var t = typeof e;
  return u = u ?? _i, !!u && (t == "number" || t != "symbol" && xi.test(e)) && e > -1 && e % 1 == 0 && e < u;
}
function ki(e, u, t) {
  u == "__proto__" && Bt ? Bt(e, u, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : e[u] = t;
}
function Uo(e, u) {
  return e === u || e !== e && u !== u;
}
var Ei = Object.prototype, Ci = Ei.hasOwnProperty;
function wi(e, u, t) {
  var n = e[u];
  (!(Ci.call(e, u) && Uo(n, t)) || t === void 0 && !(u in e)) && ki(e, u, t);
}
var mr = Math.max;
function Ai(e, u, t) {
  return u = mr(u === void 0 ? e.length - 1 : u, 0), function() {
    for (var n = arguments, r = -1, o = mr(n.length - u, 0), a = Array(o); ++r < o; )
      a[r] = n[u + r];
    r = -1;
    for (var i = Array(u + 1); ++r < u; )
      i[r] = n[r];
    return i[u] = t(a), di(e, this, i);
  };
}
var Fi = 9007199254740991;
function Di(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Fi;
}
var Si = "[object Arguments]";
function vr(e) {
  return On(e) && Tn(e) == Si;
}
var Vo = Object.prototype, Ti = Vo.hasOwnProperty, Oi = Vo.propertyIsEnumerable, Wo = vr(/* @__PURE__ */ (function() {
  return arguments;
})()) ? vr : function(e) {
  return On(e) && Ti.call(e, "callee") && !Oi.call(e, "callee");
}, Ii = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Pi = /^\w*$/;
function Bi(e, u) {
  if (st(e))
    return !1;
  var t = typeof e;
  return t == "number" || t == "symbol" || t == "boolean" || e == null || In(e) ? !0 : Pi.test(e) || !Ii.test(e) || u != null && e in Object(u);
}
var ut = Pn(Object, "create");
function Ri() {
  this.__data__ = ut ? ut(null) : {}, this.size = 0;
}
function Mi(e) {
  var u = this.has(e) && delete this.__data__[e];
  return this.size -= u ? 1 : 0, u;
}
var $i = "__lodash_hash_undefined__", zi = Object.prototype, Ni = zi.hasOwnProperty;
function Li(e) {
  var u = this.__data__;
  if (ut) {
    var t = u[e];
    return t === $i ? void 0 : t;
  }
  return Ni.call(u, e) ? u[e] : void 0;
}
var ji = Object.prototype, qi = ji.hasOwnProperty;
function Hi(e) {
  var u = this.__data__;
  return ut ? u[e] !== void 0 : qi.call(u, e);
}
var Ui = "__lodash_hash_undefined__";
function Vi(e, u) {
  var t = this.__data__;
  return this.size += this.has(e) ? 0 : 1, t[e] = ut && u === void 0 ? Ui : u, this;
}
function xu(e) {
  var u = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++u < t; ) {
    var n = e[u];
    this.set(n[0], n[1]);
  }
}
xu.prototype.clear = Ri;
xu.prototype.delete = Mi;
xu.prototype.get = Li;
xu.prototype.has = Hi;
xu.prototype.set = Vi;
function Wi() {
  this.__data__ = [], this.size = 0;
}
function qt(e, u) {
  for (var t = e.length; t--; )
    if (Uo(e[t][0], u))
      return t;
  return -1;
}
var Ki = Array.prototype, Zi = Ki.splice;
function Gi(e) {
  var u = this.__data__, t = qt(u, e);
  if (t < 0)
    return !1;
  var n = u.length - 1;
  return t == n ? u.pop() : Zi.call(u, t, 1), --this.size, !0;
}
function Ji(e) {
  var u = this.__data__, t = qt(u, e);
  return t < 0 ? void 0 : u[t][1];
}
function Qi(e) {
  return qt(this.__data__, e) > -1;
}
function Xi(e, u) {
  var t = this.__data__, n = qt(t, e);
  return n < 0 ? (++this.size, t.push([e, u])) : t[n][1] = u, this;
}
function Nu(e) {
  var u = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++u < t; ) {
    var n = e[u];
    this.set(n[0], n[1]);
  }
}
Nu.prototype.clear = Wi;
Nu.prototype.delete = Gi;
Nu.prototype.get = Ji;
Nu.prototype.has = Qi;
Nu.prototype.set = Xi;
var Yi = Pn(Sn, "Map");
function es() {
  this.size = 0, this.__data__ = {
    hash: new xu(),
    map: new (Yi || Nu)(),
    string: new xu()
  };
}
function us(e) {
  var u = typeof e;
  return u == "string" || u == "number" || u == "symbol" || u == "boolean" ? e !== "__proto__" : e === null;
}
function Ht(e, u) {
  var t = e.__data__;
  return us(u) ? t[typeof u == "string" ? "string" : "hash"] : t.map;
}
function ts(e) {
  var u = Ht(this, e).delete(e);
  return this.size -= u ? 1 : 0, u;
}
function ns(e) {
  return Ht(this, e).get(e);
}
function rs(e) {
  return Ht(this, e).has(e);
}
function os(e, u) {
  var t = Ht(this, e), n = t.size;
  return t.set(e, u), this.size += t.size == n ? 0 : 1, this;
}
function ku(e) {
  var u = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++u < t; ) {
    var n = e[u];
    this.set(n[0], n[1]);
  }
}
ku.prototype.clear = es;
ku.prototype.delete = ts;
ku.prototype.get = ns;
ku.prototype.has = rs;
ku.prototype.set = os;
var as = "Expected a function";
function Bn(e, u) {
  if (typeof e != "function" || u != null && typeof u != "function")
    throw new TypeError(as);
  var t = function() {
    var n = arguments, r = u ? u.apply(this, n) : n[0], o = t.cache;
    if (o.has(r))
      return o.get(r);
    var a = e.apply(this, n);
    return t.cache = o.set(r, a) || o, a;
  };
  return t.cache = new (Bn.Cache || ku)(), t;
}
Bn.Cache = ku;
var is = 500;
function ss(e) {
  var u = Bn(e, function(n) {
    return t.size === is && t.clear(), n;
  }), t = u.cache;
  return u;
}
var cs = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ls = /\\(\\)?/g, fs = ss(function(e) {
  var u = [];
  return e.charCodeAt(0) === 46 && u.push(""), e.replace(cs, function(t, n, r, o) {
    u.push(r ? o.replace(ls, "$1") : n || t);
  }), u;
});
function ds(e) {
  return e == null ? "" : qo(e);
}
function Ut(e, u) {
  return st(e) ? e : Bi(e, u) ? [e] : fs(ds(e));
}
function Rn(e) {
  if (typeof e == "string" || In(e))
    return e;
  var u = e + "";
  return u == "0" && 1 / e == -1 / 0 ? "-0" : u;
}
function ps(e, u) {
  u = Ut(u, e);
  for (var t = 0, n = u.length; e != null && t < n; )
    e = e[Rn(u[t++])];
  return t && t == n ? e : void 0;
}
function hs(e, u) {
  for (var t = -1, n = u.length, r = e.length; ++t < n; )
    e[r + t] = u[t];
  return e;
}
var yr = lu ? lu.isConcatSpreadable : void 0;
function bs(e) {
  return st(e) || Wo(e) || !!(yr && e && e[yr]);
}
function gs(e, u, t, n, r) {
  var o = -1, a = e.length;
  for (t || (t = bs), r || (r = []); ++o < a; ) {
    var i = e[o];
    t(i) ? hs(r, i) : r[r.length] = i;
  }
  return r;
}
function ms(e) {
  var u = e == null ? 0 : e.length;
  return u ? gs(e) : [];
}
function vs(e) {
  return yi(Ai(e, void 0, ms), e + "");
}
function ys(e, u) {
  return e != null && u in Object(e);
}
function _s(e, u, t) {
  u = Ut(u, e);
  for (var n = -1, r = u.length, o = !1; ++n < r; ) {
    var a = Rn(u[n]);
    if (!(o = e != null && t(e, a)))
      break;
    e = e[a];
  }
  return o || ++n != r ? o : (r = e == null ? 0 : e.length, !!r && Di(r) && Ho(a, r) && (st(e) || Wo(e)));
}
function xs(e, u) {
  return e != null && _s(e, u, ys);
}
function Rt(e) {
  for (var u = -1, t = e == null ? 0 : e.length, n = {}; ++u < t; ) {
    var r = e[u];
    n[r[0]] = r[1];
  }
  return n;
}
function Vt(e) {
  return e == null;
}
function ks(e) {
  return e === void 0;
}
function Es(e, u, t, n) {
  if (!Pt(e))
    return e;
  u = Ut(u, e);
  for (var r = -1, o = u.length, a = o - 1, i = e; i != null && ++r < o; ) {
    var s = Rn(u[r]), c = t;
    if (s === "__proto__" || s === "constructor" || s === "prototype")
      return e;
    if (r != a) {
      var l = i[s];
      c = void 0, c === void 0 && (c = Pt(l) ? l : Ho(u[r + 1]) ? [] : {});
    }
    wi(i, s, c), i = i[s];
  }
  return e;
}
function Cs(e, u, t) {
  for (var n = -1, r = u.length, o = {}; ++n < r; ) {
    var a = u[n], i = ps(e, a);
    t(i, a) && Es(o, Ut(a, e), i);
  }
  return o;
}
function ws(e, u) {
  return Cs(e, u, function(t, n) {
    return xs(e, n);
  });
}
var As = vs(function(e, u) {
  return e == null ? {} : ws(e, u);
});
const Fs = (e) => e === void 0, Mn = (e) => typeof e == "boolean", Je = (e) => typeof e == "number", Ju = (e) => typeof Element > "u" ? !1 : e instanceof Element, Ds = (e) => vu(e) ? !Number.isNaN(Number(e)) : !1;
var Ss = Object.defineProperty, Ts = Object.defineProperties, Os = Object.getOwnPropertyDescriptors, _r = Object.getOwnPropertySymbols, Is = Object.prototype.hasOwnProperty, Ps = Object.prototype.propertyIsEnumerable, xr = (e, u, t) => u in e ? Ss(e, u, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[u] = t, Bs = (e, u) => {
  for (var t in u || (u = {}))
    Is.call(u, t) && xr(e, t, u[t]);
  if (_r)
    for (var t of _r(u))
      Ps.call(u, t) && xr(e, t, u[t]);
  return e;
}, Rs = (e, u) => Ts(e, Os(u));
function Ko(e, u) {
  var t;
  const n = Su();
  return ea(() => {
    n.value = e();
  }, Rs(Bs({}, u), {
    flush: (t = void 0) != null ? t : "sync"
  })), Bo(n);
}
var kr;
const Ee = typeof window < "u", Ms = (e) => typeof e == "string", Zo = () => {
}, $s = Ee && ((kr = window?.navigator) == null ? void 0 : kr.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Go(e) {
  return typeof e == "function" ? e() : h(e);
}
function zs(e) {
  return e;
}
function $n(e) {
  return ua() ? (ta(e), !0) : !1;
}
function Ns(e, u = !0) {
  we() ? xe(e) : u ? e() : ye(e);
}
function ru(e) {
  var u;
  const t = Go(e);
  return (u = t?.$el) != null ? u : t;
}
const zn = Ee ? window : void 0;
function Tu(...e) {
  let u, t, n, r;
  if (Ms(e[0]) || Array.isArray(e[0]) ? ([t, n, r] = e, u = zn) : [u, t, n, r] = e, !u)
    return Zo;
  Array.isArray(t) || (t = [t]), Array.isArray(n) || (n = [n]);
  const o = [], a = () => {
    o.forEach((l) => l()), o.length = 0;
  }, i = (l, d, b, p) => (l.addEventListener(d, b, p), () => l.removeEventListener(d, b, p)), s = V(() => [ru(u), Go(r)], ([l, d]) => {
    a(), l && o.push(...t.flatMap((b) => n.map((p) => i(l, b, p, d))));
  }, { immediate: !0, flush: "post" }), c = () => {
    s(), a();
  };
  return $n(c), c;
}
let Er = !1;
function Ls(e, u, t = {}) {
  const { window: n = zn, ignore: r = [], capture: o = !0, detectIframe: a = !1 } = t;
  if (!n)
    return;
  $s && !Er && (Er = !0, Array.from(n.document.body.children).forEach((b) => b.addEventListener("click", Zo)));
  let i = !0;
  const s = (b) => r.some((p) => {
    if (typeof p == "string")
      return Array.from(n.document.querySelectorAll(p)).some((f) => f === b.target || b.composedPath().includes(f));
    {
      const f = ru(p);
      return f && (b.target === f || b.composedPath().includes(f));
    }
  }), l = [
    Tu(n, "click", (b) => {
      const p = ru(e);
      if (!(!p || p === b.target || b.composedPath().includes(p))) {
        if (b.detail === 0 && (i = !s(b)), !i) {
          i = !0;
          return;
        }
        u(b);
      }
    }, { passive: !0, capture: o }),
    Tu(n, "pointerdown", (b) => {
      const p = ru(e);
      p && (i = !b.composedPath().includes(p) && !s(b));
    }, { passive: !0 }),
    a && Tu(n, "blur", (b) => {
      var p;
      const f = ru(e);
      ((p = n.document.activeElement) == null ? void 0 : p.tagName) === "IFRAME" && !f?.contains(n.document.activeElement) && u(b);
    })
  ].filter(Boolean);
  return () => l.forEach((b) => b());
}
function js(e, u = !1) {
  const t = O(), n = () => t.value = !!e();
  return n(), Ns(n, u), t;
}
const Cr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, wr = "__vueuse_ssr_handlers__";
Cr[wr] = Cr[wr] || {};
var Ar = Object.getOwnPropertySymbols, qs = Object.prototype.hasOwnProperty, Hs = Object.prototype.propertyIsEnumerable, Us = (e, u) => {
  var t = {};
  for (var n in e)
    qs.call(e, n) && u.indexOf(n) < 0 && (t[n] = e[n]);
  if (e != null && Ar)
    for (var n of Ar(e))
      u.indexOf(n) < 0 && Hs.call(e, n) && (t[n] = e[n]);
  return t;
};
function Vs(e, u, t = {}) {
  const n = t, { window: r = zn } = n, o = Us(n, ["window"]);
  let a;
  const i = js(() => r && "ResizeObserver" in r), s = () => {
    a && (a.disconnect(), a = void 0);
  }, c = V(() => ru(e), (d) => {
    s(), i.value && r && d && (a = new ResizeObserver(u), a.observe(d, o));
  }, { immediate: !0, flush: "post" }), l = () => {
    s(), c();
  };
  return $n(l), {
    isSupported: i,
    stop: l
  };
}
var Fr;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(Fr || (Fr = {}));
var Ws = Object.defineProperty, Dr = Object.getOwnPropertySymbols, Ks = Object.prototype.hasOwnProperty, Zs = Object.prototype.propertyIsEnumerable, Sr = (e, u, t) => u in e ? Ws(e, u, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[u] = t, Gs = (e, u) => {
  for (var t in u || (u = {}))
    Ks.call(u, t) && Sr(e, t, u[t]);
  if (Dr)
    for (var t of Dr(u))
      Zs.call(u, t) && Sr(e, t, u[t]);
  return e;
};
const Js = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
Gs({
  linear: zs
}, Js);
const Tr = {
  current: 0
}, Or = O(0), Qs = 2e3, Ir = Symbol("elZIndexContextKey"), Xs = Symbol("zIndexContextKey"), Ys = (e) => {
  const u = we() ? ne(Ir, Tr) : Tr, t = we() ? ne(Xs, void 0) : void 0, n = A(() => {
    const a = h(t);
    return Je(a) ? a : Qs;
  }), r = A(() => n.value + Or.value), o = () => (u.current++, Or.value = u.current, r.value);
  return !Ee && ne(Ir), {
    initialZIndex: n,
    currentZIndex: r,
    nextZIndex: o
  };
}, Jo = "__epPropKey", N = (e) => e, ec = (e) => et(e) && !!e[Jo], Wt = (e, u) => {
  if (!et(e) || ec(e))
    return e;
  const { values: t, required: n, default: r, type: o, validator: a } = e, s = {
    type: o,
    required: !!n,
    validator: t || a ? (c) => {
      let l = !1, d = [];
      if (t && (d = Array.from(t), dr(e, "default") && d.push(r), l || (l = d.includes(c))), a && (l || (l = a(c))), !l && d.length > 0) {
        const b = [...new Set(d)].map((p) => JSON.stringify(p)).join(", ");
        na(`Invalid prop: validation failed${u ? ` for prop "${u}"` : ""}. Expected one of [${b}], got value ${JSON.stringify(c)}.`);
      }
      return l;
    } : void 0,
    [Jo]: !0
  };
  return dr(e, "default") && (s.default = r), s;
}, re = (e) => Rt(Object.entries(e).map(([u, t]) => [
  u,
  Wt(t, u)
])), Qo = ["", "default", "small", "large"], Xo = Wt({
  type: String,
  values: Qo,
  required: !1
}), uc = Symbol("size"), tc = () => {
  const e = ne(uc, {});
  return A(() => h(e.size) || "");
}, Pr = O();
function nc(e, u = void 0) {
  const t = we() ? ne(Oa, Pr) : Pr;
  return A(() => {
    var n, r;
    return (r = (n = t.value) == null ? void 0 : n[e]) != null ? r : u;
  });
}
const vn = "update:modelValue", Br = "change", Rr = "input";
var ce = (e, u) => {
  const t = e.__vccOpts || e;
  for (const [n, r] of u)
    t[n] = r;
  return t;
};
function Nn(e, u = "px") {
  if (!e)
    return "";
  if (Je(e) || Ds(e))
    return `${e}${u}`;
  if (vu(e))
    return e;
}
const du = (e, u) => {
  if (e.install = (t) => {
    for (const n of [e, ...Object.values(u ?? {})])
      t.component(n.name, n);
  }, u)
    for (const [t, n] of Object.entries(u))
      e[t] = n;
  return e;
}, rc = (e, u) => (e.install = (t) => {
  t.directive(u, e);
}, e), oc = (e) => (e.install = Yu, e), ac = re({
  size: {
    type: N([Number, String])
  },
  color: {
    type: String
  }
}), ic = R({
  name: "ElIcon",
  inheritAttrs: !1
}), sc = /* @__PURE__ */ R({
  ...ic,
  props: ac,
  setup(e) {
    const u = e, t = he("icon"), n = A(() => {
      const { size: r, color: o } = u;
      return !r && !o ? {} : {
        fontSize: Fs(r) ? void 0 : Nn(r),
        "--color": o
      };
    });
    return (r, o) => (w(), I("i", cu({
      class: h(t).b(),
      style: h(n)
    }, r.$attrs), [
      z(r.$slots, "default")
    ], 16));
  }
});
var cc = /* @__PURE__ */ ce(sc, [["__file", "icon.vue"]]);
const ke = du(cc);
function Mr() {
  let e;
  const u = (n, r) => {
    t(), e = window.setTimeout(n, r);
  }, t = () => window.clearTimeout(e);
  return $n(() => t()), {
    registerTimeout: u,
    cancelTimeout: t
  };
}
const lc = re({
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  autoClose: {
    type: Number,
    default: 0
  }
}), fc = ({
  showAfter: e,
  hideAfter: u,
  autoClose: t,
  open: n,
  close: r
}) => {
  const { registerTimeout: o } = Mr(), {
    registerTimeout: a,
    cancelTimeout: i
  } = Mr();
  return {
    onOpen: (l, d = h(e)) => {
      o(() => {
        n(l);
        const b = h(t);
        Je(b) && b > 0 && a(() => {
          r(l);
        }, b);
      }, d);
    },
    onClose: (l, d = h(u)) => {
      i(), o(() => {
        r(l);
      }, d);
    }
  };
}, yu = N([
  String,
  Object,
  Function
]), dc = {
  validating: No,
  success: ya,
  error: zo
}, pc = () => Ee && /firefox/i.test(window.navigator.userAgent);
let fe;
const hc = {
  height: "0",
  visibility: "hidden",
  overflow: pc() ? "" : "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0"
}, bc = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing",
  "word-break"
];
function gc(e) {
  const u = window.getComputedStyle(e), t = u.getPropertyValue("box-sizing"), n = Number.parseFloat(u.getPropertyValue("padding-bottom")) + Number.parseFloat(u.getPropertyValue("padding-top")), r = Number.parseFloat(u.getPropertyValue("border-bottom-width")) + Number.parseFloat(u.getPropertyValue("border-top-width"));
  return { contextStyle: bc.map((a) => [
    a,
    u.getPropertyValue(a)
  ]), paddingSize: n, borderSize: r, boxSizing: t };
}
function $r(e, u = 1, t) {
  var n, r;
  fe || (fe = document.createElement("textarea"), ((n = e.parentNode) != null ? n : document.body).appendChild(fe));
  const { paddingSize: o, borderSize: a, boxSizing: i, contextStyle: s } = gc(e);
  s.forEach(([b, p]) => fe?.style.setProperty(b, p)), Object.entries(hc).forEach(([b, p]) => fe?.style.setProperty(b, p, "important")), fe.value = e.value || e.placeholder || "";
  let c = fe.scrollHeight;
  const l = {};
  i === "border-box" ? c = c + a : i === "content-box" && (c = c - o), fe.value = "";
  const d = fe.scrollHeight - o;
  if (Je(u)) {
    let b = d * u;
    i === "border-box" && (b = b + o + a), c = Math.max(b, c), l.minHeight = `${b}px`;
  }
  if (Je(t)) {
    let b = d * t;
    i === "border-box" && (b = b + o + a), c = Math.min(b, c);
  }
  return l.height = `${c}px`, (r = fe.parentNode) == null || r.removeChild(fe), fe = void 0, l;
}
const mc = (e) => e, vc = re({
  ariaLabel: String,
  ariaOrientation: {
    type: String,
    values: ["horizontal", "vertical", "undefined"]
  },
  ariaControls: String
}), Ln = (e) => As(vc, e), yc = re({
  id: {
    type: String,
    default: void 0
  },
  size: Xo,
  disabled: Boolean,
  modelValue: {
    type: N([
      String,
      Number,
      Object
    ]),
    default: ""
  },
  maxlength: {
    type: [String, Number]
  },
  minlength: {
    type: [String, Number]
  },
  type: {
    type: String,
    default: "text"
  },
  resize: {
    type: String,
    values: ["none", "both", "horizontal", "vertical"]
  },
  autosize: {
    type: N([Boolean, Object]),
    default: !1
  },
  autocomplete: {
    type: N(String),
    default: "off"
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  },
  placeholder: {
    type: String
  },
  form: {
    type: String
  },
  readonly: Boolean,
  clearable: Boolean,
  clearIcon: {
    type: yu,
    default: zo
  },
  showPassword: Boolean,
  showWordLimit: Boolean,
  suffixIcon: {
    type: yu
  },
  prefixIcon: {
    type: yu
  },
  containerRole: {
    type: String,
    default: void 0
  },
  tabindex: {
    type: [String, Number],
    default: 0
  },
  validateEvent: {
    type: Boolean,
    default: !0
  },
  inputStyle: {
    type: N([Object, Array, String]),
    default: () => mc({})
  },
  autofocus: Boolean,
  rows: {
    type: Number,
    default: 2
  },
  ...Ln(["ariaLabel"]),
  inputmode: {
    type: N(String),
    default: void 0
  },
  name: String
}), _c = {
  [vn]: (e) => vu(e),
  input: (e) => vu(e),
  change: (e) => vu(e),
  focus: (e) => e instanceof FocusEvent,
  blur: (e) => e instanceof FocusEvent,
  clear: () => !0,
  mouseleave: (e) => e instanceof MouseEvent,
  mouseenter: (e) => e instanceof MouseEvent,
  keydown: (e) => e instanceof Event,
  compositionstart: (e) => e instanceof CompositionEvent,
  compositionupdate: (e) => e instanceof CompositionEvent,
  compositionend: (e) => e instanceof CompositionEvent
}, xc = ["class", "style"], kc = /^on[A-Z]/, Ec = (e = {}) => {
  const { excludeListeners: u = !1, excludeKeys: t } = e, n = A(() => (t?.value || []).concat(xc)), r = we();
  return r ? A(() => {
    var o;
    return Rt(Object.entries((o = r.proxy) == null ? void 0 : o.$attrs).filter(([a]) => !n.value.includes(a) && !(u && kc.test(a))));
  }) : A(() => ({}));
}, zr = {
  prefix: Math.floor(Math.random() * 1e4),
  current: 0
}, Cc = Symbol("elIdInjection"), Yo = () => we() ? ne(Cc, zr) : zr, e0 = (e) => {
  const u = Yo(), t = Dn();
  return Ko(() => h(e) || `${t.value}-id-${u.prefix}-${u.current++}`);
}, jn = Symbol("formContextKey"), Mt = Symbol("formItemContextKey"), u0 = () => {
  const e = ne(jn, void 0), u = ne(Mt, void 0);
  return {
    form: e,
    formItem: u
  };
}, wc = (e, {
  formItemContext: u,
  disableIdGeneration: t,
  disableIdManagement: n
}) => {
  t || (t = O(!1)), n || (n = O(!1));
  const r = we(), o = () => {
    let c = r?.parent;
    for (; c; ) {
      if (c.type.name === "ElFormItem")
        return !1;
      if (c.type.name === "ElLabelWrap")
        return !0;
      c = c.parent;
    }
    return !1;
  }, a = O();
  let i;
  const s = A(() => {
    var c;
    return !!(!(e.label || e.ariaLabel) && u && u.inputIds && ((c = u.inputIds) == null ? void 0 : c.length) <= 1);
  });
  return xe(() => {
    i = V([Ke(e, "id"), t], ([c, l]) => {
      const d = c ?? (l ? void 0 : e0().value);
      d !== a.value && (u?.removeInputId && !o() && (a.value && u.removeInputId(a.value), !n?.value && !l && d && u.addInputId(d)), a.value = d);
    }, { immediate: !0 });
  }), wn(() => {
    i && i(), u?.removeInputId && a.value && u.removeInputId(a.value);
  }), {
    isLabeledByFormItem: s,
    inputId: a
  };
}, t0 = (e) => {
  const u = we();
  return A(() => {
    var t, n;
    return (n = (t = u?.proxy) == null ? void 0 : t.$props) == null ? void 0 : n[e];
  });
}, n0 = (e, u = {}) => {
  const t = O(void 0), n = u.prop ? t : t0("size"), r = u.global ? t : tc(), o = u.form ? { size: void 0 } : ne(jn, void 0), a = u.formItem ? { size: void 0 } : ne(Mt, void 0);
  return A(() => n.value || h(e) || a?.size || o?.size || r.value || "");
}, qn = (e) => {
  const u = t0("disabled"), t = ne(jn, void 0);
  return A(() => u.value || h(e) || t?.disabled || !1);
}, Nr = (e) => typeof Element > "u" ? !1 : e instanceof Element, $t = (e) => {
  if (e.tabIndex > 0 || e.tabIndex === 0 && e.getAttribute("tabIndex") !== null)
    return !0;
  if (e.tabIndex < 0 || e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true")
    return !1;
  switch (e.nodeName) {
    case "A":
      return !!e.href && e.rel !== "ignore";
    case "INPUT":
      return !(e.type === "hidden" || e.type === "file");
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA":
      return !0;
    default:
      return !1;
  }
}, Hn = (e, u) => {
  if (!e || !e.focus)
    return;
  let t = !1;
  Nr(e) && !$t(e) && !e.getAttribute("tabindex") && (e.setAttribute("tabindex", "-1"), t = !0), e.focus(u), Nr(e) && t && e.removeAttribute("tabindex");
};
function Ac(e, {
  disabled: u,
  beforeFocus: t,
  afterFocus: n,
  beforeBlur: r,
  afterBlur: o
} = {}) {
  const a = we(), { emit: i } = a, s = Su(), c = O(!1), l = (p) => {
    const f = Du(t) ? t(p) : !1;
    h(u) || c.value || f || (c.value = !0, i("focus", p), n?.());
  }, d = (p) => {
    var f;
    const m = Du(r) ? r(p) : !1;
    h(u) || p.relatedTarget && ((f = s.value) != null && f.contains(p.relatedTarget)) || m || (c.value = !1, i("blur", p), o?.());
  }, b = (p) => {
    var f, m;
    h(u) || $t(p.target) || (f = s.value) != null && f.contains(document.activeElement) && s.value !== document.activeElement || (m = e.value) == null || m.focus();
  };
  return V([s, () => h(u)], ([p, f]) => {
    p && (f ? p.removeAttribute("tabindex") : p.setAttribute("tabindex", "-1"));
  }), Tu(s, "focus", l, !0), Tu(s, "blur", d, !0), Tu(s, "click", b, !0), {
    isFocused: c,
    wrapperRef: s,
    handleFocus: l,
    handleBlur: d
  };
}
const Fc = (e) => /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(e);
function Dc({
  afterComposition: e,
  emit: u
}) {
  const t = O(!1), n = (i) => {
    u?.("compositionstart", i), t.value = !0;
  }, r = (i) => {
    var s;
    u?.("compositionupdate", i);
    const c = (s = i.target) == null ? void 0 : s.value, l = c[c.length - 1] || "";
    t.value = !Fc(l);
  }, o = (i) => {
    u?.("compositionend", i), t.value && (t.value = !1, ye(() => e(i)));
  };
  return {
    isComposing: t,
    handleComposition: (i) => {
      i.type === "compositionend" ? o(i) : r(i);
    },
    handleCompositionStart: n,
    handleCompositionUpdate: r,
    handleCompositionEnd: o
  };
}
function Sc(e) {
  let u;
  function t() {
    if (e.value == null)
      return;
    const { selectionStart: r, selectionEnd: o, value: a } = e.value;
    if (r == null || o == null)
      return;
    const i = a.slice(0, Math.max(0, r)), s = a.slice(Math.max(0, o));
    u = {
      selectionStart: r,
      selectionEnd: o,
      value: a,
      beforeTxt: i,
      afterTxt: s
    };
  }
  function n() {
    if (e.value == null || u == null)
      return;
    const { value: r } = e.value, { beforeTxt: o, afterTxt: a, selectionStart: i } = u;
    if (o == null || a == null || i == null)
      return;
    let s = r.length;
    if (r.endsWith(a))
      s = r.length - a.length;
    else if (r.startsWith(o))
      s = o.length;
    else {
      const c = o[i - 1], l = r.indexOf(c, i - 1);
      l !== -1 && (s = l + 1);
    }
    e.value.setSelectionRange(s, s);
  }
  return [t, n];
}
const Tc = "ElInput", Oc = R({
  name: Tc,
  inheritAttrs: !1
}), Ic = /* @__PURE__ */ R({
  ...Oc,
  props: yc,
  emits: _c,
  setup(e, { expose: u, emit: t }) {
    const n = e, r = ra(), o = Ec(), a = An(), i = A(() => [
      n.type === "textarea" ? m.b() : f.b(),
      f.m(b.value),
      f.is("disabled", p.value),
      f.is("exceed", ee.value),
      {
        [f.b("group")]: a.prepend || a.append,
        [f.m("prefix")]: a.prefix || n.prefixIcon,
        [f.m("suffix")]: a.suffix || n.suffixIcon || n.clearable || n.showPassword,
        [f.bm("suffix", "password-clear")]: B.value && Y.value,
        [f.b("hidden")]: n.type === "hidden"
      },
      r.class
    ]), s = A(() => [
      f.e("wrapper"),
      f.is("focus", S.value)
    ]), { form: c, formItem: l } = u0(), { inputId: d } = wc(n, {
      formItemContext: l
    }), b = n0(), p = qn(), f = he("input"), m = he("textarea"), v = Su(), y = Su(), _ = O(!1), g = O(!1), x = O(), k = Su(n.inputStyle), E = A(() => v.value || y.value), { wrapperRef: C, isFocused: S, handleFocus: T, handleBlur: M } = Ac(E, {
      disabled: p,
      afterBlur() {
        var F;
        n.validateEvent && ((F = l?.validate) == null || F.call(l, "blur").catch((W) => void 0));
      }
    }), L = A(() => {
      var F;
      return (F = c?.statusIcon) != null ? F : !1;
    }), $ = A(() => l?.validateState || ""), Q = A(() => $.value && dc[$.value]), ue = A(() => g.value ? Sa : ka), te = A(() => [
      r.style
    ]), K = A(() => [
      n.inputStyle,
      k.value,
      { resize: n.resize }
    ]), Z = A(() => Vt(n.modelValue) ? "" : String(n.modelValue)), B = A(() => n.clearable && !p.value && !n.readonly && !!Z.value && (S.value || _.value)), Y = A(() => n.showPassword && !p.value && !!Z.value), D = A(() => n.showWordLimit && !!n.maxlength && (n.type === "text" || n.type === "textarea") && !p.value && !n.readonly && !n.showPassword), G = A(() => Z.value.length), ee = A(() => !!D.value && G.value > Number(n.maxlength)), ge = A(() => !!a.suffix || !!n.suffixIcon || B.value || n.showPassword || D.value || !!$.value && L.value), [le, oe] = Sc(v);
    Vs(y, (F) => {
      if (Xe(), !D.value || n.resize !== "both")
        return;
      const W = F[0], { width: He } = W.contentRect;
      x.value = {
        right: `calc(100% - ${He + 15 + 6}px)`
      };
    });
    const Pe = () => {
      const { type: F, autosize: W } = n;
      if (!(!Ee || F !== "textarea" || !y.value))
        if (W) {
          const He = et(W) ? W.minRows : void 0, Uu = et(W) ? W.maxRows : void 0, Vu = $r(y.value, He, Uu);
          k.value = {
            overflowY: "hidden",
            ...Vu
          }, ye(() => {
            y.value.offsetHeight, k.value = Vu;
          });
        } else
          k.value = {
            minHeight: $r(y.value).minHeight
          };
    }, Xe = ((F) => {
      let W = !1;
      return () => {
        var He;
        if (W || !n.autosize)
          return;
        ((He = y.value) == null ? void 0 : He.offsetParent) === null || (setTimeout(F), W = !0);
      };
    })(Pe), hu = () => {
      const F = E.value, W = n.formatter ? n.formatter(Z.value) : Z.value;
      !F || F.value === W || (F.value = W);
    }, ju = async (F) => {
      le();
      let { value: W } = F.target;
      if (n.formatter && n.parser && (W = n.parser(W)), !bt.value) {
        if (W === Z.value) {
          hu();
          return;
        }
        t(vn, W), t(Rr, W), await ye(), hu(), oe();
      }
    }, Cu = (F) => {
      let { value: W } = F.target;
      n.formatter && n.parser && (W = n.parser(W)), t(Br, W);
    }, {
      isComposing: bt,
      handleCompositionStart: qu,
      handleCompositionUpdate: gt,
      handleCompositionEnd: mt
    } = Dc({ emit: t, afterComposition: ju }), vt = () => {
      le(), g.value = !g.value, setTimeout(oe);
    }, yt = () => {
      var F;
      return (F = E.value) == null ? void 0 : F.focus();
    }, Yt = () => {
      var F;
      return (F = E.value) == null ? void 0 : F.blur();
    }, en = (F) => {
      _.value = !1, t("mouseleave", F);
    }, qe = (F) => {
      _.value = !0, t("mouseenter", F);
    }, bu = (F) => {
      t("keydown", F);
    }, _t = () => {
      var F;
      (F = E.value) == null || F.select();
    }, Hu = () => {
      t(vn, ""), t(Br, ""), t("clear"), t(Rr, "");
    };
    return V(() => n.modelValue, () => {
      var F;
      ye(() => Pe()), n.validateEvent && ((F = l?.validate) == null || F.call(l, "change").catch((W) => void 0));
    }), V(Z, () => hu()), V(() => n.type, async () => {
      await ye(), hu(), Pe();
    }), xe(() => {
      !n.formatter && n.parser, hu(), ye(Pe);
    }), u({
      input: v,
      textarea: y,
      ref: E,
      textareaStyle: K,
      autosize: Ke(n, "autosize"),
      isComposing: bt,
      focus: yt,
      blur: Yt,
      select: _t,
      clear: Hu,
      resizeTextarea: Pe
    }), (F, W) => (w(), I("div", {
      class: U([
        h(i),
        {
          [h(f).bm("group", "append")]: F.$slots.append,
          [h(f).bm("group", "prepend")]: F.$slots.prepend
        }
      ]),
      style: Ae(h(te)),
      onMouseenter: qe,
      onMouseleave: en
    }, [
      P(" input "),
      F.type !== "textarea" ? (w(), I(iu, { key: 0 }, [
        P(" prepend slot "),
        F.$slots.prepend ? (w(), I("div", {
          key: 0,
          class: U(h(f).be("group", "prepend"))
        }, [
          z(F.$slots, "prepend")
        ], 2)) : P("v-if", !0),
        H("div", {
          ref_key: "wrapperRef",
          ref: C,
          class: U(h(s))
        }, [
          P(" prefix slot "),
          F.$slots.prefix || F.prefixIcon ? (w(), I("span", {
            key: 0,
            class: U(h(f).e("prefix"))
          }, [
            H("span", {
              class: U(h(f).e("prefix-inner"))
            }, [
              z(F.$slots, "prefix"),
              F.prefixIcon ? (w(), j(h(ke), {
                key: 0,
                class: U(h(f).e("icon"))
              }, {
                default: q(() => [
                  (w(), j(We(F.prefixIcon)))
                ]),
                _: 1
              }, 8, ["class"])) : P("v-if", !0)
            ], 2)
          ], 2)) : P("v-if", !0),
          H("input", cu({
            id: h(d),
            ref_key: "input",
            ref: v,
            class: h(f).e("inner")
          }, h(o), {
            name: F.name,
            minlength: F.minlength,
            maxlength: F.maxlength,
            type: F.showPassword ? g.value ? "text" : "password" : F.type,
            disabled: h(p),
            readonly: F.readonly,
            autocomplete: F.autocomplete,
            tabindex: F.tabindex,
            "aria-label": F.ariaLabel,
            placeholder: F.placeholder,
            style: F.inputStyle,
            form: F.form,
            autofocus: F.autofocus,
            role: F.containerRole,
            inputmode: F.inputmode,
            onCompositionstart: h(qu),
            onCompositionupdate: h(gt),
            onCompositionend: h(mt),
            onInput: ju,
            onChange: Cu,
            onKeydown: bu
          }), null, 16, ["id", "name", "minlength", "maxlength", "type", "disabled", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder", "form", "autofocus", "role", "inputmode", "onCompositionstart", "onCompositionupdate", "onCompositionend"]),
          P(" suffix slot "),
          h(ge) ? (w(), I("span", {
            key: 1,
            class: U(h(f).e("suffix"))
          }, [
            H("span", {
              class: U(h(f).e("suffix-inner"))
            }, [
              !h(B) || !h(Y) || !h(D) ? (w(), I(iu, { key: 0 }, [
                z(F.$slots, "suffix"),
                F.suffixIcon ? (w(), j(h(ke), {
                  key: 0,
                  class: U(h(f).e("icon"))
                }, {
                  default: q(() => [
                    (w(), j(We(F.suffixIcon)))
                  ]),
                  _: 1
                }, 8, ["class"])) : P("v-if", !0)
              ], 64)) : P("v-if", !0),
              h(B) ? (w(), j(h(ke), {
                key: 1,
                class: U([h(f).e("icon"), h(f).e("clear")]),
                onMousedown: oa(h(Yu), ["prevent"]),
                onClick: Hu
              }, {
                default: q(() => [
                  (w(), j(We(F.clearIcon)))
                ]),
                _: 1
              }, 8, ["class", "onMousedown"])) : P("v-if", !0),
              h(Y) ? (w(), j(h(ke), {
                key: 2,
                class: U([h(f).e("icon"), h(f).e("password")]),
                onClick: vt
              }, {
                default: q(() => [
                  (w(), j(We(h(ue))))
                ]),
                _: 1
              }, 8, ["class"])) : P("v-if", !0),
              h(D) ? (w(), I("span", {
                key: 3,
                class: U(h(f).e("count"))
              }, [
                H("span", {
                  class: U(h(f).e("count-inner"))
                }, nu(h(G)) + " / " + nu(F.maxlength), 3)
              ], 2)) : P("v-if", !0),
              h($) && h(Q) && h(L) ? (w(), j(h(ke), {
                key: 4,
                class: U([
                  h(f).e("icon"),
                  h(f).e("validateIcon"),
                  h(f).is("loading", h($) === "validating")
                ])
              }, {
                default: q(() => [
                  (w(), j(We(h(Q))))
                ]),
                _: 1
              }, 8, ["class"])) : P("v-if", !0)
            ], 2)
          ], 2)) : P("v-if", !0)
        ], 2),
        P(" append slot "),
        F.$slots.append ? (w(), I("div", {
          key: 1,
          class: U(h(f).be("group", "append"))
        }, [
          z(F.$slots, "append")
        ], 2)) : P("v-if", !0)
      ], 64)) : (w(), I(iu, { key: 1 }, [
        P(" textarea "),
        H("textarea", cu({
          id: h(d),
          ref_key: "textarea",
          ref: y,
          class: [h(m).e("inner"), h(f).is("focus", h(S))]
        }, h(o), {
          minlength: F.minlength,
          maxlength: F.maxlength,
          tabindex: F.tabindex,
          disabled: h(p),
          readonly: F.readonly,
          autocomplete: F.autocomplete,
          style: h(K),
          "aria-label": F.ariaLabel,
          placeholder: F.placeholder,
          form: F.form,
          autofocus: F.autofocus,
          rows: F.rows,
          role: F.containerRole,
          onCompositionstart: h(qu),
          onCompositionupdate: h(gt),
          onCompositionend: h(mt),
          onInput: ju,
          onFocus: h(T),
          onBlur: h(M),
          onChange: Cu,
          onKeydown: bu
        }), null, 16, ["id", "minlength", "maxlength", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder", "form", "autofocus", "rows", "role", "onCompositionstart", "onCompositionupdate", "onCompositionend", "onFocus", "onBlur"]),
        h(D) ? (w(), I("span", {
          key: 0,
          style: Ae(x.value),
          class: U(h(f).e("count"))
        }, nu(h(G)) + " / " + nu(F.maxlength), 7)) : P("v-if", !0)
      ], 64))
    ], 38));
  }
});
var Pc = /* @__PURE__ */ ce(Ic, [["__file", "input.vue"]]);
const Bc = du(Pc), Un = Symbol("popper"), r0 = Symbol("popperContent"), o0 = [
  "dialog",
  "grid",
  "group",
  "listbox",
  "menu",
  "navigation",
  "tooltip",
  "tree"
], a0 = re({
  role: {
    type: String,
    values: o0,
    default: "tooltip"
  }
}), Rc = R({
  name: "ElPopper",
  inheritAttrs: !1
}), Mc = /* @__PURE__ */ R({
  ...Rc,
  props: a0,
  setup(e, { expose: u }) {
    const t = e, n = O(), r = O(), o = O(), a = O(), i = A(() => t.role), s = {
      triggerRef: n,
      popperInstanceRef: r,
      contentRef: o,
      referenceRef: a,
      role: i
    };
    return u(s), Ge(Un, s), (c, l) => z(c.$slots, "default");
  }
});
var $c = /* @__PURE__ */ ce(Mc, [["__file", "popper.vue"]]);
const zc = R({
  name: "ElPopperArrow",
  inheritAttrs: !1
}), Nc = /* @__PURE__ */ R({
  ...zc,
  setup(e, { expose: u }) {
    const t = he("popper"), { arrowRef: n, arrowStyle: r } = ne(r0, void 0);
    return ze(() => {
      n.value = void 0;
    }), u({
      arrowRef: n
    }), (o, a) => (w(), I("span", {
      ref_key: "arrowRef",
      ref: n,
      class: U(h(t).e("arrow")),
      style: Ae(h(r)),
      "data-popper-arrow": ""
    }, null, 6));
  }
});
var Lc = /* @__PURE__ */ ce(Nc, [["__file", "arrow.vue"]]);
const i0 = re({
  virtualRef: {
    type: N(Object)
  },
  virtualTriggering: Boolean,
  onMouseenter: {
    type: N(Function)
  },
  onMouseleave: {
    type: N(Function)
  },
  onClick: {
    type: N(Function)
  },
  onKeydown: {
    type: N(Function)
  },
  onFocus: {
    type: N(Function)
  },
  onBlur: {
    type: N(Function)
  },
  onContextmenu: {
    type: N(Function)
  },
  id: String,
  open: Boolean
}), s0 = Symbol("elForwardRef"), jc = (e) => {
  Ge(s0, {
    setForwardRef: (t) => {
      e.value = t;
    }
  });
}, qc = (e) => ({
  mounted(u) {
    e(u);
  },
  updated(u) {
    e(u);
  },
  unmounted() {
    e(null);
  }
}), Hc = "ElOnlyChild", Uc = R({
  name: Hc,
  setup(e, {
    slots: u,
    attrs: t
  }) {
    var n;
    const r = ne(s0), o = qc((n = r?.setForwardRef) != null ? n : Yu);
    return () => {
      var a;
      const i = (a = u.default) == null ? void 0 : a.call(u, t);
      if (!i)
        return null;
      const [s, c] = c0(i);
      return s ? Ro(aa(s, t), [[o]]) : null;
    };
  }
});
function c0(e) {
  if (!e)
    return [null, 0];
  const u = e, t = u.filter((n) => n.type !== fr).length;
  for (const n of u) {
    if (et(n))
      switch (n.type) {
        case fr:
          continue;
        case Mo:
        case "svg":
          return [Lr(n), t];
        case iu:
          return c0(n.children);
        default:
          return [n, t];
      }
    return [Lr(n), t];
  }
  return [null, 0];
}
function Lr(e) {
  const u = he("only-child");
  return X("span", {
    class: u.e("content")
  }, [e]);
}
const Vc = R({
  name: "ElPopperTrigger",
  inheritAttrs: !1
}), Wc = /* @__PURE__ */ R({
  ...Vc,
  props: i0,
  setup(e, { expose: u }) {
    const t = e, { role: n, triggerRef: r } = ne(Un, void 0);
    jc(r);
    const o = A(() => i.value ? t.id : void 0), a = A(() => {
      if (n && n.value === "tooltip")
        return t.open && t.id ? t.id : void 0;
    }), i = A(() => {
      if (n && n.value !== "tooltip")
        return n.value;
    }), s = A(() => i.value ? `${t.open}` : void 0);
    let c;
    const l = [
      "onMouseenter",
      "onMouseleave",
      "onClick",
      "onKeydown",
      "onFocus",
      "onBlur",
      "onContextmenu"
    ];
    return xe(() => {
      V(() => t.virtualRef, (d) => {
        d && (r.value = ru(d));
      }, {
        immediate: !0
      }), V(r, (d, b) => {
        c?.(), c = void 0, Ju(d) && (l.forEach((p) => {
          var f;
          const m = t[p];
          m && (d.addEventListener(p.slice(2).toLowerCase(), m, ["onFocus", "onBlur"].includes(p)), (f = b?.removeEventListener) == null || f.call(b, p.slice(2).toLowerCase(), m, ["onFocus", "onBlur"].includes(p)));
        }), $t(d) && (c = V([o, a, i, s], (p) => {
          [
            "aria-controls",
            "aria-describedby",
            "aria-haspopup",
            "aria-expanded"
          ].forEach((f, m) => {
            Vt(p[m]) ? d.removeAttribute(f) : d.setAttribute(f, p[m]);
          });
        }, { immediate: !0 }))), Ju(b) && $t(b) && [
          "aria-controls",
          "aria-describedby",
          "aria-haspopup",
          "aria-expanded"
        ].forEach((p) => b.removeAttribute(p));
      }, {
        immediate: !0
      });
    }), ze(() => {
      if (c?.(), c = void 0, r.value && Ju(r.value)) {
        const d = r.value;
        l.forEach((b) => {
          const p = t[b];
          p && d.removeEventListener(b.slice(2).toLowerCase(), p, ["onFocus", "onBlur"].includes(b));
        }), r.value = void 0;
      }
    }), u({
      triggerRef: r
    }), (d, b) => d.virtualTriggering ? P("v-if", !0) : (w(), j(h(Uc), cu({ key: 0 }, d.$attrs, {
      "aria-controls": h(o),
      "aria-describedby": h(a),
      "aria-expanded": h(s),
      "aria-haspopup": h(i)
    }), {
      default: q(() => [
        z(d.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup"]));
  }
});
var Kc = /* @__PURE__ */ ce(Wc, [["__file", "trigger.vue"]]);
const nn = "focus-trap.focus-after-trapped", rn = "focus-trap.focus-after-released", Zc = "focus-trap.focusout-prevented", jr = {
  cancelable: !0,
  bubbles: !1
}, Gc = {
  cancelable: !0,
  bubbles: !1
}, qr = "focusAfterTrapped", Hr = "focusAfterReleased", Jc = Symbol("elFocusTrap"), Vn = O(), Kt = O(0), Wn = O(0);
let xt = 0;
const l0 = (e) => {
  const u = [], t = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const r = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || r ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 || n === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; t.nextNode(); )
    u.push(t.currentNode);
  return u;
}, Ur = (e, u) => {
  for (const t of e)
    if (!Qc(t, u))
      return t;
}, Qc = (e, u) => {
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  for (; e; ) {
    if (u && e === u)
      return !1;
    if (getComputedStyle(e).display === "none")
      return !0;
    e = e.parentElement;
  }
  return !1;
}, Xc = (e) => {
  const u = l0(e), t = Ur(u, e), n = Ur(u.reverse(), e);
  return [t, n];
}, Yc = (e) => e instanceof HTMLInputElement && "select" in e, eu = (e, u) => {
  if (e) {
    const t = document.activeElement;
    Hn(e, { preventScroll: !0 }), Wn.value = window.performance.now(), e !== t && Yc(e) && u && e.select();
  }
};
function Vr(e, u) {
  const t = [...e], n = e.indexOf(u);
  return n !== -1 && t.splice(n, 1), t;
}
const el = () => {
  let e = [];
  return {
    push: (n) => {
      const r = e[0];
      r && n !== r && r.pause(), e = Vr(e, n), e.unshift(n);
    },
    remove: (n) => {
      var r, o;
      e = Vr(e, n), (o = (r = e[0]) == null ? void 0 : r.resume) == null || o.call(r);
    }
  };
}, ul = (e, u = !1) => {
  const t = document.activeElement;
  for (const n of e)
    if (eu(n, u), document.activeElement !== t)
      return;
}, Wr = el(), tl = () => Kt.value > Wn.value, kt = () => {
  Vn.value = "pointer", Kt.value = window.performance.now();
}, Kr = () => {
  Vn.value = "keyboard", Kt.value = window.performance.now();
}, nl = () => (xe(() => {
  xt === 0 && (document.addEventListener("mousedown", kt), document.addEventListener("touchstart", kt), document.addEventListener("keydown", Kr)), xt++;
}), ze(() => {
  xt--, xt <= 0 && (document.removeEventListener("mousedown", kt), document.removeEventListener("touchstart", kt), document.removeEventListener("keydown", Kr));
}), {
  focusReason: Vn,
  lastUserFocusTimestamp: Kt,
  lastAutomatedFocusTimestamp: Wn
}), Et = (e) => new CustomEvent(Zc, {
  ...Gc,
  detail: e
}), Ze = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  down: "ArrowDown",
  esc: "Escape",
  numpadEnter: "NumpadEnter"
};
let Fu = [];
const Zr = (e) => {
  e.code === Ze.esc && Fu.forEach((u) => u(e));
}, rl = (e) => {
  xe(() => {
    Fu.length === 0 && document.addEventListener("keydown", Zr), Ee && Fu.push(e);
  }), ze(() => {
    Fu = Fu.filter((u) => u !== e), Fu.length === 0 && Ee && document.removeEventListener("keydown", Zr);
  });
}, ol = R({
  name: "ElFocusTrap",
  inheritAttrs: !1,
  props: {
    loop: Boolean,
    trapped: Boolean,
    focusTrapEl: Object,
    focusStartEl: {
      type: [Object, String],
      default: "first"
    }
  },
  emits: [
    qr,
    Hr,
    "focusin",
    "focusout",
    "focusout-prevented",
    "release-requested"
  ],
  setup(e, { emit: u }) {
    const t = O();
    let n, r;
    const { focusReason: o } = nl();
    rl((f) => {
      e.trapped && !a.paused && u("release-requested", f);
    });
    const a = {
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }, i = (f) => {
      if (!e.loop && !e.trapped || a.paused)
        return;
      const { code: m, altKey: v, ctrlKey: y, metaKey: _, currentTarget: g, shiftKey: x } = f, { loop: k } = e, E = m === Ze.tab && !v && !y && !_, C = document.activeElement;
      if (E && C) {
        const S = g, [T, M] = Xc(S);
        if (T && M) {
          if (!x && C === M) {
            const $ = Et({
              focusReason: o.value
            });
            u("focusout-prevented", $), $.defaultPrevented || (f.preventDefault(), k && eu(T, !0));
          } else if (x && [T, S].includes(C)) {
            const $ = Et({
              focusReason: o.value
            });
            u("focusout-prevented", $), $.defaultPrevented || (f.preventDefault(), k && eu(M, !0));
          }
        } else if (C === S) {
          const $ = Et({
            focusReason: o.value
          });
          u("focusout-prevented", $), $.defaultPrevented || f.preventDefault();
        }
      }
    };
    Ge(Jc, {
      focusTrapRef: t,
      onKeydown: i
    }), V(() => e.focusTrapEl, (f) => {
      f && (t.value = f);
    }, { immediate: !0 }), V([t], ([f], [m]) => {
      f && (f.addEventListener("keydown", i), f.addEventListener("focusin", l), f.addEventListener("focusout", d)), m && (m.removeEventListener("keydown", i), m.removeEventListener("focusin", l), m.removeEventListener("focusout", d));
    });
    const s = (f) => {
      u(qr, f);
    }, c = (f) => u(Hr, f), l = (f) => {
      const m = h(t);
      if (!m)
        return;
      const v = f.target, y = f.relatedTarget, _ = v && m.contains(v);
      e.trapped || y && m.contains(y) || (n = y), _ && u("focusin", f), !a.paused && e.trapped && (_ ? r = v : eu(r, !0));
    }, d = (f) => {
      const m = h(t);
      if (!(a.paused || !m))
        if (e.trapped) {
          const v = f.relatedTarget;
          !Vt(v) && !m.contains(v) && setTimeout(() => {
            if (!a.paused && e.trapped) {
              const y = Et({
                focusReason: o.value
              });
              u("focusout-prevented", y), y.defaultPrevented || eu(r, !0);
            }
          }, 0);
        } else {
          const v = f.target;
          v && m.contains(v) || u("focusout", f);
        }
    };
    async function b() {
      await ye();
      const f = h(t);
      if (f) {
        Wr.push(a);
        const m = f.contains(document.activeElement) ? n : document.activeElement;
        if (n = m, !f.contains(m)) {
          const y = new Event(nn, jr);
          f.addEventListener(nn, s), f.dispatchEvent(y), y.defaultPrevented || ye(() => {
            let _ = e.focusStartEl;
            vu(_) || (eu(_), document.activeElement !== _ && (_ = "first")), _ === "first" && ul(l0(f), !0), (document.activeElement === m || _ === "container") && eu(f);
          });
        }
      }
    }
    function p() {
      const f = h(t);
      if (f) {
        f.removeEventListener(nn, s);
        const m = new CustomEvent(rn, {
          ...jr,
          detail: {
            focusReason: o.value
          }
        });
        f.addEventListener(rn, c), f.dispatchEvent(m), !m.defaultPrevented && (o.value == "keyboard" || !tl() || f.contains(document.activeElement)) && eu(n ?? document.body), f.removeEventListener(rn, c), Wr.remove(a), n = null, r = null;
      }
    }
    return xe(() => {
      e.trapped && b(), V(() => e.trapped, (f) => {
        f ? b() : p();
      });
    }), ze(() => {
      e.trapped && p(), t.value && (t.value.removeEventListener("keydown", i), t.value.removeEventListener("focusin", l), t.value.removeEventListener("focusout", d), t.value = void 0);
    }), {
      onKeydown: i
    };
  }
});
function al(e, u, t, n, r, o) {
  return z(e.$slots, "default", { handleKeydown: e.onKeydown });
}
var il = /* @__PURE__ */ ce(ol, [["render", al], ["__file", "focus-trap.vue"]]), de = "top", Fe = "bottom", De = "right", pe = "left", Kn = "auto", ct = [de, Fe, De, pe], Iu = "start", tt = "end", sl = "clippingParents", f0 = "viewport", Ku = "popper", cl = "reference", Gr = ct.reduce(function(e, u) {
  return e.concat([u + "-" + Iu, u + "-" + tt]);
}, []), Zn = [].concat(ct, [Kn]).reduce(function(e, u) {
  return e.concat([u, u + "-" + Iu, u + "-" + tt]);
}, []), ll = "beforeRead", fl = "read", dl = "afterRead", pl = "beforeMain", hl = "main", bl = "afterMain", gl = "beforeWrite", ml = "write", vl = "afterWrite", yl = [ll, fl, dl, pl, hl, bl, gl, ml, vl];
function $e(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Oe(e) {
  if (e == null) return window;
  if (e.toString() !== "[object Window]") {
    var u = e.ownerDocument;
    return u && u.defaultView || window;
  }
  return e;
}
function Pu(e) {
  var u = Oe(e).Element;
  return e instanceof u || e instanceof Element;
}
function Ce(e) {
  var u = Oe(e).HTMLElement;
  return e instanceof u || e instanceof HTMLElement;
}
function Gn(e) {
  if (typeof ShadowRoot > "u") return !1;
  var u = Oe(e).ShadowRoot;
  return e instanceof u || e instanceof ShadowRoot;
}
function _l(e) {
  var u = e.state;
  Object.keys(u.elements).forEach(function(t) {
    var n = u.styles[t] || {}, r = u.attributes[t] || {}, o = u.elements[t];
    !Ce(o) || !$e(o) || (Object.assign(o.style, n), Object.keys(r).forEach(function(a) {
      var i = r[a];
      i === !1 ? o.removeAttribute(a) : o.setAttribute(a, i === !0 ? "" : i);
    }));
  });
}
function xl(e) {
  var u = e.state, t = { popper: { position: u.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
  return Object.assign(u.elements.popper.style, t.popper), u.styles = t, u.elements.arrow && Object.assign(u.elements.arrow.style, t.arrow), function() {
    Object.keys(u.elements).forEach(function(n) {
      var r = u.elements[n], o = u.attributes[n] || {}, a = Object.keys(u.styles.hasOwnProperty(n) ? u.styles[n] : t[n]), i = a.reduce(function(s, c) {
        return s[c] = "", s;
      }, {});
      !Ce(r) || !$e(r) || (Object.assign(r.style, i), Object.keys(o).forEach(function(s) {
        r.removeAttribute(s);
      }));
    });
  };
}
var d0 = { name: "applyStyles", enabled: !0, phase: "write", fn: _l, effect: xl, requires: ["computeStyles"] };
function Me(e) {
  return e.split("-")[0];
}
var _u = Math.max, zt = Math.min, Bu = Math.round;
function Ru(e, u) {
  u === void 0 && (u = !1);
  var t = e.getBoundingClientRect(), n = 1, r = 1;
  if (Ce(e) && u) {
    var o = e.offsetHeight, a = e.offsetWidth;
    a > 0 && (n = Bu(t.width) / a || 1), o > 0 && (r = Bu(t.height) / o || 1);
  }
  return { width: t.width / n, height: t.height / r, top: t.top / r, right: t.right / n, bottom: t.bottom / r, left: t.left / n, x: t.left / n, y: t.top / r };
}
function Jn(e) {
  var u = Ru(e), t = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(u.width - t) <= 1 && (t = u.width), Math.abs(u.height - n) <= 1 && (n = u.height), { x: e.offsetLeft, y: e.offsetTop, width: t, height: n };
}
function p0(e, u) {
  var t = u.getRootNode && u.getRootNode();
  if (e.contains(u)) return !0;
  if (t && Gn(t)) {
    var n = u;
    do {
      if (n && e.isSameNode(n)) return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function Qe(e) {
  return Oe(e).getComputedStyle(e);
}
function kl(e) {
  return ["table", "td", "th"].indexOf($e(e)) >= 0;
}
function pu(e) {
  return ((Pu(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function Zt(e) {
  return $e(e) === "html" ? e : e.assignedSlot || e.parentNode || (Gn(e) ? e.host : null) || pu(e);
}
function Jr(e) {
  return !Ce(e) || Qe(e).position === "fixed" ? null : e.offsetParent;
}
function El(e) {
  var u = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, t = navigator.userAgent.indexOf("Trident") !== -1;
  if (t && Ce(e)) {
    var n = Qe(e);
    if (n.position === "fixed") return null;
  }
  var r = Zt(e);
  for (Gn(r) && (r = r.host); Ce(r) && ["html", "body"].indexOf($e(r)) < 0; ) {
    var o = Qe(r);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || u && o.willChange === "filter" || u && o.filter && o.filter !== "none") return r;
    r = r.parentNode;
  }
  return null;
}
function lt(e) {
  for (var u = Oe(e), t = Jr(e); t && kl(t) && Qe(t).position === "static"; ) t = Jr(t);
  return t && ($e(t) === "html" || $e(t) === "body" && Qe(t).position === "static") ? u : t || El(e) || u;
}
function Qn(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Qu(e, u, t) {
  return _u(e, zt(u, t));
}
function Cl(e, u, t) {
  var n = Qu(e, u, t);
  return n > t ? t : n;
}
function h0() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function b0(e) {
  return Object.assign({}, h0(), e);
}
function g0(e, u) {
  return u.reduce(function(t, n) {
    return t[n] = e, t;
  }, {});
}
var wl = function(e, u) {
  return e = typeof e == "function" ? e(Object.assign({}, u.rects, { placement: u.placement })) : e, b0(typeof e != "number" ? e : g0(e, ct));
};
function Al(e) {
  var u, t = e.state, n = e.name, r = e.options, o = t.elements.arrow, a = t.modifiersData.popperOffsets, i = Me(t.placement), s = Qn(i), c = [pe, De].indexOf(i) >= 0, l = c ? "height" : "width";
  if (!(!o || !a)) {
    var d = wl(r.padding, t), b = Jn(o), p = s === "y" ? de : pe, f = s === "y" ? Fe : De, m = t.rects.reference[l] + t.rects.reference[s] - a[s] - t.rects.popper[l], v = a[s] - t.rects.reference[s], y = lt(o), _ = y ? s === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, g = m / 2 - v / 2, x = d[p], k = _ - b[l] - d[f], E = _ / 2 - b[l] / 2 + g, C = Qu(x, E, k), S = s;
    t.modifiersData[n] = (u = {}, u[S] = C, u.centerOffset = C - E, u);
  }
}
function Fl(e) {
  var u = e.state, t = e.options, n = t.element, r = n === void 0 ? "[data-popper-arrow]" : n;
  r != null && (typeof r == "string" && (r = u.elements.popper.querySelector(r), !r) || !p0(u.elements.popper, r) || (u.elements.arrow = r));
}
var Dl = { name: "arrow", enabled: !0, phase: "main", fn: Al, effect: Fl, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
function Mu(e) {
  return e.split("-")[1];
}
var Sl = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function Tl(e) {
  var u = e.x, t = e.y, n = window, r = n.devicePixelRatio || 1;
  return { x: Bu(u * r) / r || 0, y: Bu(t * r) / r || 0 };
}
function Qr(e) {
  var u, t = e.popper, n = e.popperRect, r = e.placement, o = e.variation, a = e.offsets, i = e.position, s = e.gpuAcceleration, c = e.adaptive, l = e.roundOffsets, d = e.isFixed, b = a.x, p = b === void 0 ? 0 : b, f = a.y, m = f === void 0 ? 0 : f, v = typeof l == "function" ? l({ x: p, y: m }) : { x: p, y: m };
  p = v.x, m = v.y;
  var y = a.hasOwnProperty("x"), _ = a.hasOwnProperty("y"), g = pe, x = de, k = window;
  if (c) {
    var E = lt(t), C = "clientHeight", S = "clientWidth";
    if (E === Oe(t) && (E = pu(t), Qe(E).position !== "static" && i === "absolute" && (C = "scrollHeight", S = "scrollWidth")), E = E, r === de || (r === pe || r === De) && o === tt) {
      x = Fe;
      var T = d && E === k && k.visualViewport ? k.visualViewport.height : E[C];
      m -= T - n.height, m *= s ? 1 : -1;
    }
    if (r === pe || (r === de || r === Fe) && o === tt) {
      g = De;
      var M = d && E === k && k.visualViewport ? k.visualViewport.width : E[S];
      p -= M - n.width, p *= s ? 1 : -1;
    }
  }
  var L = Object.assign({ position: i }, c && Sl), $ = l === !0 ? Tl({ x: p, y: m }) : { x: p, y: m };
  if (p = $.x, m = $.y, s) {
    var Q;
    return Object.assign({}, L, (Q = {}, Q[x] = _ ? "0" : "", Q[g] = y ? "0" : "", Q.transform = (k.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + m + "px)" : "translate3d(" + p + "px, " + m + "px, 0)", Q));
  }
  return Object.assign({}, L, (u = {}, u[x] = _ ? m + "px" : "", u[g] = y ? p + "px" : "", u.transform = "", u));
}
function Ol(e) {
  var u = e.state, t = e.options, n = t.gpuAcceleration, r = n === void 0 ? !0 : n, o = t.adaptive, a = o === void 0 ? !0 : o, i = t.roundOffsets, s = i === void 0 ? !0 : i, c = { placement: Me(u.placement), variation: Mu(u.placement), popper: u.elements.popper, popperRect: u.rects.popper, gpuAcceleration: r, isFixed: u.options.strategy === "fixed" };
  u.modifiersData.popperOffsets != null && (u.styles.popper = Object.assign({}, u.styles.popper, Qr(Object.assign({}, c, { offsets: u.modifiersData.popperOffsets, position: u.options.strategy, adaptive: a, roundOffsets: s })))), u.modifiersData.arrow != null && (u.styles.arrow = Object.assign({}, u.styles.arrow, Qr(Object.assign({}, c, { offsets: u.modifiersData.arrow, position: "absolute", adaptive: !1, roundOffsets: s })))), u.attributes.popper = Object.assign({}, u.attributes.popper, { "data-popper-placement": u.placement });
}
var m0 = { name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: Ol, data: {} }, Ct = { passive: !0 };
function Il(e) {
  var u = e.state, t = e.instance, n = e.options, r = n.scroll, o = r === void 0 ? !0 : r, a = n.resize, i = a === void 0 ? !0 : a, s = Oe(u.elements.popper), c = [].concat(u.scrollParents.reference, u.scrollParents.popper);
  return o && c.forEach(function(l) {
    l.addEventListener("scroll", t.update, Ct);
  }), i && s.addEventListener("resize", t.update, Ct), function() {
    o && c.forEach(function(l) {
      l.removeEventListener("scroll", t.update, Ct);
    }), i && s.removeEventListener("resize", t.update, Ct);
  };
}
var v0 = { name: "eventListeners", enabled: !0, phase: "write", fn: function() {
}, effect: Il, data: {} }, Pl = { left: "right", right: "left", bottom: "top", top: "bottom" };
function It(e) {
  return e.replace(/left|right|bottom|top/g, function(u) {
    return Pl[u];
  });
}
var Bl = { start: "end", end: "start" };
function Xr(e) {
  return e.replace(/start|end/g, function(u) {
    return Bl[u];
  });
}
function Xn(e) {
  var u = Oe(e), t = u.pageXOffset, n = u.pageYOffset;
  return { scrollLeft: t, scrollTop: n };
}
function Yn(e) {
  return Ru(pu(e)).left + Xn(e).scrollLeft;
}
function Rl(e) {
  var u = Oe(e), t = pu(e), n = u.visualViewport, r = t.clientWidth, o = t.clientHeight, a = 0, i = 0;
  return n && (r = n.width, o = n.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (a = n.offsetLeft, i = n.offsetTop)), { width: r, height: o, x: a + Yn(e), y: i };
}
function Ml(e) {
  var u, t = pu(e), n = Xn(e), r = (u = e.ownerDocument) == null ? void 0 : u.body, o = _u(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), a = _u(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), i = -n.scrollLeft + Yn(e), s = -n.scrollTop;
  return Qe(r || t).direction === "rtl" && (i += _u(t.clientWidth, r ? r.clientWidth : 0) - o), { width: o, height: a, x: i, y: s };
}
function er(e) {
  var u = Qe(e), t = u.overflow, n = u.overflowX, r = u.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + r + n);
}
function y0(e) {
  return ["html", "body", "#document"].indexOf($e(e)) >= 0 ? e.ownerDocument.body : Ce(e) && er(e) ? e : y0(Zt(e));
}
function Xu(e, u) {
  var t;
  u === void 0 && (u = []);
  var n = y0(e), r = n === ((t = e.ownerDocument) == null ? void 0 : t.body), o = Oe(n), a = r ? [o].concat(o.visualViewport || [], er(n) ? n : []) : n, i = u.concat(a);
  return r ? i : i.concat(Xu(Zt(a)));
}
function yn(e) {
  return Object.assign({}, e, { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height });
}
function $l(e) {
  var u = Ru(e);
  return u.top = u.top + e.clientTop, u.left = u.left + e.clientLeft, u.bottom = u.top + e.clientHeight, u.right = u.left + e.clientWidth, u.width = e.clientWidth, u.height = e.clientHeight, u.x = u.left, u.y = u.top, u;
}
function Yr(e, u) {
  return u === f0 ? yn(Rl(e)) : Pu(u) ? $l(u) : yn(Ml(pu(e)));
}
function zl(e) {
  var u = Xu(Zt(e)), t = ["absolute", "fixed"].indexOf(Qe(e).position) >= 0, n = t && Ce(e) ? lt(e) : e;
  return Pu(n) ? u.filter(function(r) {
    return Pu(r) && p0(r, n) && $e(r) !== "body";
  }) : [];
}
function Nl(e, u, t) {
  var n = u === "clippingParents" ? zl(e) : [].concat(u), r = [].concat(n, [t]), o = r[0], a = r.reduce(function(i, s) {
    var c = Yr(e, s);
    return i.top = _u(c.top, i.top), i.right = zt(c.right, i.right), i.bottom = zt(c.bottom, i.bottom), i.left = _u(c.left, i.left), i;
  }, Yr(e, o));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function _0(e) {
  var u = e.reference, t = e.element, n = e.placement, r = n ? Me(n) : null, o = n ? Mu(n) : null, a = u.x + u.width / 2 - t.width / 2, i = u.y + u.height / 2 - t.height / 2, s;
  switch (r) {
    case de:
      s = { x: a, y: u.y - t.height };
      break;
    case Fe:
      s = { x: a, y: u.y + u.height };
      break;
    case De:
      s = { x: u.x + u.width, y: i };
      break;
    case pe:
      s = { x: u.x - t.width, y: i };
      break;
    default:
      s = { x: u.x, y: u.y };
  }
  var c = r ? Qn(r) : null;
  if (c != null) {
    var l = c === "y" ? "height" : "width";
    switch (o) {
      case Iu:
        s[c] = s[c] - (u[l] / 2 - t[l] / 2);
        break;
      case tt:
        s[c] = s[c] + (u[l] / 2 - t[l] / 2);
        break;
    }
  }
  return s;
}
function nt(e, u) {
  u === void 0 && (u = {});
  var t = u, n = t.placement, r = n === void 0 ? e.placement : n, o = t.boundary, a = o === void 0 ? sl : o, i = t.rootBoundary, s = i === void 0 ? f0 : i, c = t.elementContext, l = c === void 0 ? Ku : c, d = t.altBoundary, b = d === void 0 ? !1 : d, p = t.padding, f = p === void 0 ? 0 : p, m = b0(typeof f != "number" ? f : g0(f, ct)), v = l === Ku ? cl : Ku, y = e.rects.popper, _ = e.elements[b ? v : l], g = Nl(Pu(_) ? _ : _.contextElement || pu(e.elements.popper), a, s), x = Ru(e.elements.reference), k = _0({ reference: x, element: y, placement: r }), E = yn(Object.assign({}, y, k)), C = l === Ku ? E : x, S = { top: g.top - C.top + m.top, bottom: C.bottom - g.bottom + m.bottom, left: g.left - C.left + m.left, right: C.right - g.right + m.right }, T = e.modifiersData.offset;
  if (l === Ku && T) {
    var M = T[r];
    Object.keys(S).forEach(function(L) {
      var $ = [De, Fe].indexOf(L) >= 0 ? 1 : -1, Q = [de, Fe].indexOf(L) >= 0 ? "y" : "x";
      S[L] += M[Q] * $;
    });
  }
  return S;
}
function Ll(e, u) {
  u === void 0 && (u = {});
  var t = u, n = t.placement, r = t.boundary, o = t.rootBoundary, a = t.padding, i = t.flipVariations, s = t.allowedAutoPlacements, c = s === void 0 ? Zn : s, l = Mu(n), d = l ? i ? Gr : Gr.filter(function(f) {
    return Mu(f) === l;
  }) : ct, b = d.filter(function(f) {
    return c.indexOf(f) >= 0;
  });
  b.length === 0 && (b = d);
  var p = b.reduce(function(f, m) {
    return f[m] = nt(e, { placement: m, boundary: r, rootBoundary: o, padding: a })[Me(m)], f;
  }, {});
  return Object.keys(p).sort(function(f, m) {
    return p[f] - p[m];
  });
}
function jl(e) {
  if (Me(e) === Kn) return [];
  var u = It(e);
  return [Xr(e), u, Xr(u)];
}
function ql(e) {
  var u = e.state, t = e.options, n = e.name;
  if (!u.modifiersData[n]._skip) {
    for (var r = t.mainAxis, o = r === void 0 ? !0 : r, a = t.altAxis, i = a === void 0 ? !0 : a, s = t.fallbackPlacements, c = t.padding, l = t.boundary, d = t.rootBoundary, b = t.altBoundary, p = t.flipVariations, f = p === void 0 ? !0 : p, m = t.allowedAutoPlacements, v = u.options.placement, y = Me(v), _ = y === v, g = s || (_ || !f ? [It(v)] : jl(v)), x = [v].concat(g).reduce(function(le, oe) {
      return le.concat(Me(oe) === Kn ? Ll(u, { placement: oe, boundary: l, rootBoundary: d, padding: c, flipVariations: f, allowedAutoPlacements: m }) : oe);
    }, []), k = u.rects.reference, E = u.rects.popper, C = /* @__PURE__ */ new Map(), S = !0, T = x[0], M = 0; M < x.length; M++) {
      var L = x[M], $ = Me(L), Q = Mu(L) === Iu, ue = [de, Fe].indexOf($) >= 0, te = ue ? "width" : "height", K = nt(u, { placement: L, boundary: l, rootBoundary: d, altBoundary: b, padding: c }), Z = ue ? Q ? De : pe : Q ? Fe : de;
      k[te] > E[te] && (Z = It(Z));
      var B = It(Z), Y = [];
      if (o && Y.push(K[$] <= 0), i && Y.push(K[Z] <= 0, K[B] <= 0), Y.every(function(le) {
        return le;
      })) {
        T = L, S = !1;
        break;
      }
      C.set(L, Y);
    }
    if (S) for (var D = f ? 3 : 1, G = function(le) {
      var oe = x.find(function(Pe) {
        var Eu = C.get(Pe);
        if (Eu) return Eu.slice(0, le).every(function(Xe) {
          return Xe;
        });
      });
      if (oe) return T = oe, "break";
    }, ee = D; ee > 0; ee--) {
      var ge = G(ee);
      if (ge === "break") break;
    }
    u.placement !== T && (u.modifiersData[n]._skip = !0, u.placement = T, u.reset = !0);
  }
}
var Hl = { name: "flip", enabled: !0, phase: "main", fn: ql, requiresIfExists: ["offset"], data: { _skip: !1 } };
function eo(e, u, t) {
  return t === void 0 && (t = { x: 0, y: 0 }), { top: e.top - u.height - t.y, right: e.right - u.width + t.x, bottom: e.bottom - u.height + t.y, left: e.left - u.width - t.x };
}
function uo(e) {
  return [de, De, Fe, pe].some(function(u) {
    return e[u] >= 0;
  });
}
function Ul(e) {
  var u = e.state, t = e.name, n = u.rects.reference, r = u.rects.popper, o = u.modifiersData.preventOverflow, a = nt(u, { elementContext: "reference" }), i = nt(u, { altBoundary: !0 }), s = eo(a, n), c = eo(i, r, o), l = uo(s), d = uo(c);
  u.modifiersData[t] = { referenceClippingOffsets: s, popperEscapeOffsets: c, isReferenceHidden: l, hasPopperEscaped: d }, u.attributes.popper = Object.assign({}, u.attributes.popper, { "data-popper-reference-hidden": l, "data-popper-escaped": d });
}
var Vl = { name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: Ul };
function Wl(e, u, t) {
  var n = Me(e), r = [pe, de].indexOf(n) >= 0 ? -1 : 1, o = typeof t == "function" ? t(Object.assign({}, u, { placement: e })) : t, a = o[0], i = o[1];
  return a = a || 0, i = (i || 0) * r, [pe, De].indexOf(n) >= 0 ? { x: i, y: a } : { x: a, y: i };
}
function Kl(e) {
  var u = e.state, t = e.options, n = e.name, r = t.offset, o = r === void 0 ? [0, 0] : r, a = Zn.reduce(function(l, d) {
    return l[d] = Wl(d, u.rects, o), l;
  }, {}), i = a[u.placement], s = i.x, c = i.y;
  u.modifiersData.popperOffsets != null && (u.modifiersData.popperOffsets.x += s, u.modifiersData.popperOffsets.y += c), u.modifiersData[n] = a;
}
var Zl = { name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: Kl };
function Gl(e) {
  var u = e.state, t = e.name;
  u.modifiersData[t] = _0({ reference: u.rects.reference, element: u.rects.popper, placement: u.placement });
}
var x0 = { name: "popperOffsets", enabled: !0, phase: "read", fn: Gl, data: {} };
function Jl(e) {
  return e === "x" ? "y" : "x";
}
function Ql(e) {
  var u = e.state, t = e.options, n = e.name, r = t.mainAxis, o = r === void 0 ? !0 : r, a = t.altAxis, i = a === void 0 ? !1 : a, s = t.boundary, c = t.rootBoundary, l = t.altBoundary, d = t.padding, b = t.tether, p = b === void 0 ? !0 : b, f = t.tetherOffset, m = f === void 0 ? 0 : f, v = nt(u, { boundary: s, rootBoundary: c, padding: d, altBoundary: l }), y = Me(u.placement), _ = Mu(u.placement), g = !_, x = Qn(y), k = Jl(x), E = u.modifiersData.popperOffsets, C = u.rects.reference, S = u.rects.popper, T = typeof m == "function" ? m(Object.assign({}, u.rects, { placement: u.placement })) : m, M = typeof T == "number" ? { mainAxis: T, altAxis: T } : Object.assign({ mainAxis: 0, altAxis: 0 }, T), L = u.modifiersData.offset ? u.modifiersData.offset[u.placement] : null, $ = { x: 0, y: 0 };
  if (E) {
    if (o) {
      var Q, ue = x === "y" ? de : pe, te = x === "y" ? Fe : De, K = x === "y" ? "height" : "width", Z = E[x], B = Z + v[ue], Y = Z - v[te], D = p ? -S[K] / 2 : 0, G = _ === Iu ? C[K] : S[K], ee = _ === Iu ? -S[K] : -C[K], ge = u.elements.arrow, le = p && ge ? Jn(ge) : { width: 0, height: 0 }, oe = u.modifiersData["arrow#persistent"] ? u.modifiersData["arrow#persistent"].padding : h0(), Pe = oe[ue], Eu = oe[te], Xe = Qu(0, C[K], le[K]), hu = g ? C[K] / 2 - D - Xe - Pe - M.mainAxis : G - Xe - Pe - M.mainAxis, ju = g ? -C[K] / 2 + D + Xe + Eu + M.mainAxis : ee + Xe + Eu + M.mainAxis, Cu = u.elements.arrow && lt(u.elements.arrow), bt = Cu ? x === "y" ? Cu.clientTop || 0 : Cu.clientLeft || 0 : 0, qu = (Q = L?.[x]) != null ? Q : 0, gt = Z + hu - qu - bt, mt = Z + ju - qu, vt = Qu(p ? zt(B, gt) : B, Z, p ? _u(Y, mt) : Y);
      E[x] = vt, $[x] = vt - Z;
    }
    if (i) {
      var yt, Yt = x === "x" ? de : pe, en = x === "x" ? Fe : De, qe = E[k], bu = k === "y" ? "height" : "width", _t = qe + v[Yt], Hu = qe - v[en], F = [de, pe].indexOf(y) !== -1, W = (yt = L?.[k]) != null ? yt : 0, He = F ? _t : qe - C[bu] - S[bu] - W + M.altAxis, Uu = F ? qe + C[bu] + S[bu] - W - M.altAxis : Hu, Vu = p && F ? Cl(He, qe, Uu) : Qu(p ? He : _t, qe, p ? Uu : Hu);
      E[k] = Vu, $[k] = Vu - qe;
    }
    u.modifiersData[n] = $;
  }
}
var Xl = { name: "preventOverflow", enabled: !0, phase: "main", fn: Ql, requiresIfExists: ["offset"] };
function Yl(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function ef(e) {
  return e === Oe(e) || !Ce(e) ? Xn(e) : Yl(e);
}
function uf(e) {
  var u = e.getBoundingClientRect(), t = Bu(u.width) / e.offsetWidth || 1, n = Bu(u.height) / e.offsetHeight || 1;
  return t !== 1 || n !== 1;
}
function tf(e, u, t) {
  t === void 0 && (t = !1);
  var n = Ce(u), r = Ce(u) && uf(u), o = pu(u), a = Ru(e, r), i = { scrollLeft: 0, scrollTop: 0 }, s = { x: 0, y: 0 };
  return (n || !n && !t) && (($e(u) !== "body" || er(o)) && (i = ef(u)), Ce(u) ? (s = Ru(u, !0), s.x += u.clientLeft, s.y += u.clientTop) : o && (s.x = Yn(o))), { x: a.left + i.scrollLeft - s.x, y: a.top + i.scrollTop - s.y, width: a.width, height: a.height };
}
function nf(e) {
  var u = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), n = [];
  e.forEach(function(o) {
    u.set(o.name, o);
  });
  function r(o) {
    t.add(o.name);
    var a = [].concat(o.requires || [], o.requiresIfExists || []);
    a.forEach(function(i) {
      if (!t.has(i)) {
        var s = u.get(i);
        s && r(s);
      }
    }), n.push(o);
  }
  return e.forEach(function(o) {
    t.has(o.name) || r(o);
  }), n;
}
function rf(e) {
  var u = nf(e);
  return yl.reduce(function(t, n) {
    return t.concat(u.filter(function(r) {
      return r.phase === n;
    }));
  }, []);
}
function of(e) {
  var u;
  return function() {
    return u || (u = new Promise(function(t) {
      Promise.resolve().then(function() {
        u = void 0, t(e());
      });
    })), u;
  };
}
function af(e) {
  var u = e.reduce(function(t, n) {
    var r = t[n.name];
    return t[n.name] = r ? Object.assign({}, r, n, { options: Object.assign({}, r.options, n.options), data: Object.assign({}, r.data, n.data) }) : n, t;
  }, {});
  return Object.keys(u).map(function(t) {
    return u[t];
  });
}
var to = { placement: "bottom", modifiers: [], strategy: "absolute" };
function no() {
  for (var e = arguments.length, u = new Array(e), t = 0; t < e; t++) u[t] = arguments[t];
  return !u.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function ur(e) {
  e === void 0 && (e = {});
  var u = e, t = u.defaultModifiers, n = t === void 0 ? [] : t, r = u.defaultOptions, o = r === void 0 ? to : r;
  return function(a, i, s) {
    s === void 0 && (s = o);
    var c = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, to, o), modifiersData: {}, elements: { reference: a, popper: i }, attributes: {}, styles: {} }, l = [], d = !1, b = { state: c, setOptions: function(m) {
      var v = typeof m == "function" ? m(c.options) : m;
      f(), c.options = Object.assign({}, o, c.options, v), c.scrollParents = { reference: Pu(a) ? Xu(a) : a.contextElement ? Xu(a.contextElement) : [], popper: Xu(i) };
      var y = rf(af([].concat(n, c.options.modifiers)));
      return c.orderedModifiers = y.filter(function(_) {
        return _.enabled;
      }), p(), b.update();
    }, forceUpdate: function() {
      if (!d) {
        var m = c.elements, v = m.reference, y = m.popper;
        if (no(v, y)) {
          c.rects = { reference: tf(v, lt(y), c.options.strategy === "fixed"), popper: Jn(y) }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(S) {
            return c.modifiersData[S.name] = Object.assign({}, S.data);
          });
          for (var _ = 0; _ < c.orderedModifiers.length; _++) {
            if (c.reset === !0) {
              c.reset = !1, _ = -1;
              continue;
            }
            var g = c.orderedModifiers[_], x = g.fn, k = g.options, E = k === void 0 ? {} : k, C = g.name;
            typeof x == "function" && (c = x({ state: c, options: E, name: C, instance: b }) || c);
          }
        }
      }
    }, update: of(function() {
      return new Promise(function(m) {
        b.forceUpdate(), m(c);
      });
    }), destroy: function() {
      f(), d = !0;
    } };
    if (!no(a, i)) return b;
    b.setOptions(s).then(function(m) {
      !d && s.onFirstUpdate && s.onFirstUpdate(m);
    });
    function p() {
      c.orderedModifiers.forEach(function(m) {
        var v = m.name, y = m.options, _ = y === void 0 ? {} : y, g = m.effect;
        if (typeof g == "function") {
          var x = g({ state: c, name: v, instance: b, options: _ }), k = function() {
          };
          l.push(x || k);
        }
      });
    }
    function f() {
      l.forEach(function(m) {
        return m();
      }), l = [];
    }
    return b;
  };
}
ur();
var sf = [v0, x0, m0, d0];
ur({ defaultModifiers: sf });
var cf = [v0, x0, m0, d0, Zl, Hl, Xl, Dl, Vl], lf = ur({ defaultModifiers: cf });
const k0 = re({
  arrowOffset: {
    type: Number,
    default: 5
  }
}), ff = ["fixed", "absolute"], df = re({
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: N(Array),
    default: void 0
  },
  gpuAcceleration: {
    type: Boolean,
    default: !0
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String,
    values: Zn,
    default: "bottom"
  },
  popperOptions: {
    type: N(Object),
    default: () => ({})
  },
  strategy: {
    type: String,
    values: ff,
    default: "absolute"
  }
}), E0 = re({
  ...df,
  ...k0,
  id: String,
  style: {
    type: N([String, Array, Object])
  },
  className: {
    type: N([String, Array, Object])
  },
  effect: {
    type: N(String),
    default: "dark"
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: !0
  },
  pure: Boolean,
  focusOnShow: Boolean,
  trapping: Boolean,
  popperClass: {
    type: N([String, Array, Object])
  },
  popperStyle: {
    type: N([String, Array, Object])
  },
  referenceEl: {
    type: N(Object)
  },
  triggerTargetEl: {
    type: N(Object)
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: !0
  },
  virtualTriggering: Boolean,
  zIndex: Number,
  ...Ln(["ariaLabel"])
}), pf = {
  mouseenter: (e) => e instanceof MouseEvent,
  mouseleave: (e) => e instanceof MouseEvent,
  focus: () => !0,
  blur: () => !0,
  close: () => !0
}, hf = (e, u) => {
  const t = O(!1), n = O();
  return {
    focusStartRef: n,
    trapped: t,
    onFocusAfterReleased: (c) => {
      var l;
      ((l = c.detail) == null ? void 0 : l.focusReason) !== "pointer" && (n.value = "first", u("blur"));
    },
    onFocusAfterTrapped: () => {
      u("focus");
    },
    onFocusInTrap: (c) => {
      e.visible && !t.value && (c.target && (n.value = c.target), t.value = !0);
    },
    onFocusoutPrevented: (c) => {
      e.trapping || (c.detail.focusReason === "pointer" && c.preventDefault(), t.value = !1);
    },
    onReleaseRequested: () => {
      t.value = !1, u("close");
    }
  };
}, bf = (e, u = []) => {
  const { placement: t, strategy: n, popperOptions: r } = e, o = {
    placement: t,
    strategy: n,
    ...r,
    modifiers: [...mf(e), ...u]
  };
  return vf(o, r?.modifiers), o;
}, gf = (e) => {
  if (Ee)
    return ru(e);
};
function mf(e) {
  const { offset: u, gpuAcceleration: t, fallbackPlacements: n } = e;
  return [
    {
      name: "offset",
      options: {
        offset: [0, u ?? 12]
      }
    },
    {
      name: "preventOverflow",
      options: {
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      }
    },
    {
      name: "flip",
      options: {
        padding: 5,
        fallbackPlacements: n
      }
    },
    {
      name: "computeStyles",
      options: {
        gpuAcceleration: t
      }
    }
  ];
}
function vf(e, u) {
  u && (e.modifiers = [...e.modifiers, ...u ?? []]);
}
const yf = (e, u, t = {}) => {
  const n = {
    name: "updateState",
    enabled: !0,
    phase: "write",
    fn: ({ state: s }) => {
      const c = _f(s);
      Object.assign(a.value, c);
    },
    requires: ["computeStyles"]
  }, r = A(() => {
    const { onFirstUpdate: s, placement: c, strategy: l, modifiers: d } = h(t);
    return {
      onFirstUpdate: s,
      placement: c || "bottom",
      strategy: l || "absolute",
      modifiers: [
        ...d || [],
        n,
        { name: "applyStyles", enabled: !1 }
      ]
    };
  }), o = Su(), a = O({
    styles: {
      popper: {
        position: h(r).strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  }), i = () => {
    o.value && (o.value.destroy(), o.value = void 0);
  };
  return V(r, (s) => {
    const c = h(o);
    c && c.setOptions(s);
  }, {
    deep: !0
  }), V([e, u], ([s, c]) => {
    i(), !(!s || !c) && (o.value = lf(s, c, h(r)));
  }), ze(() => {
    i();
  }), {
    state: A(() => {
      var s;
      return { ...((s = h(o)) == null ? void 0 : s.state) || {} };
    }),
    styles: A(() => h(a).styles),
    attributes: A(() => h(a).attributes),
    update: () => {
      var s;
      return (s = h(o)) == null ? void 0 : s.update();
    },
    forceUpdate: () => {
      var s;
      return (s = h(o)) == null ? void 0 : s.forceUpdate();
    },
    instanceRef: A(() => h(o))
  };
};
function _f(e) {
  const u = Object.keys(e.elements), t = Rt(u.map((r) => [r, e.styles[r] || {}])), n = Rt(u.map((r) => [r, e.attributes[r]]));
  return {
    styles: t,
    attributes: n
  };
}
const xf = 0, kf = (e) => {
  const { popperInstanceRef: u, contentRef: t, triggerRef: n, role: r } = ne(Un, void 0), o = O(), a = A(() => e.arrowOffset), i = A(() => ({
    name: "eventListeners",
    enabled: !!e.visible
  })), s = A(() => {
    var y;
    const _ = h(o), g = (y = h(a)) != null ? y : xf;
    return {
      name: "arrow",
      enabled: !ks(_),
      options: {
        element: _,
        padding: g
      }
    };
  }), c = A(() => ({
    onFirstUpdate: () => {
      f();
    },
    ...bf(e, [
      h(s),
      h(i)
    ])
  })), l = A(() => gf(e.referenceEl) || h(n)), { attributes: d, state: b, styles: p, update: f, forceUpdate: m, instanceRef: v } = yf(l, t, c);
  return V(v, (y) => u.value = y, {
    flush: "sync"
  }), xe(() => {
    V(() => {
      var y, _;
      return (_ = (y = h(l)) == null ? void 0 : y.getBoundingClientRect) == null ? void 0 : _.call(y);
    }, () => {
      f();
    });
  }), {
    attributes: d,
    arrowRef: o,
    contentRef: t,
    instanceRef: v,
    state: b,
    styles: p,
    role: r,
    forceUpdate: m,
    update: f
  };
}, Ef = (e, {
  attributes: u,
  styles: t,
  role: n
}) => {
  const { nextZIndex: r } = Ys(), o = he("popper"), a = A(() => h(u).popper), i = O(Je(e.zIndex) ? e.zIndex : r()), s = A(() => [
    o.b(),
    o.is("pure", e.pure),
    o.is(e.effect),
    e.popperClass
  ]), c = A(() => [
    { zIndex: h(i) },
    h(t).popper,
    e.popperStyle || {}
  ]), l = A(() => n.value === "dialog" ? "false" : void 0), d = A(() => h(t).arrow || {});
  return {
    ariaModal: l,
    arrowStyle: d,
    contentAttrs: a,
    contentClass: s,
    contentStyle: c,
    contentZIndex: i,
    updateZIndex: () => {
      i.value = Je(e.zIndex) ? e.zIndex : r();
    }
  };
}, Cf = R({
  name: "ElPopperContent"
}), wf = /* @__PURE__ */ R({
  ...Cf,
  props: E0,
  emits: pf,
  setup(e, { expose: u, emit: t }) {
    const n = e, {
      focusStartRef: r,
      trapped: o,
      onFocusAfterReleased: a,
      onFocusAfterTrapped: i,
      onFocusInTrap: s,
      onFocusoutPrevented: c,
      onReleaseRequested: l
    } = hf(n, t), { attributes: d, arrowRef: b, contentRef: p, styles: f, instanceRef: m, role: v, update: y } = kf(n), {
      ariaModal: _,
      arrowStyle: g,
      contentAttrs: x,
      contentClass: k,
      contentStyle: E,
      updateZIndex: C
    } = Ef(n, {
      styles: f,
      attributes: d,
      role: v
    }), S = ne(Mt, void 0);
    Ge(r0, {
      arrowStyle: g,
      arrowRef: b
    }), S && Ge(Mt, {
      ...S,
      addInputId: Yu,
      removeInputId: Yu
    });
    let T;
    const M = ($ = !0) => {
      y(), $ && C();
    }, L = () => {
      M(!1), n.visible && n.focusOnShow ? o.value = !0 : n.visible === !1 && (o.value = !1);
    };
    return xe(() => {
      V(() => n.triggerTargetEl, ($, Q) => {
        T?.(), T = void 0;
        const ue = h($ || p.value), te = h(Q || p.value);
        Ju(ue) && (T = V([v, () => n.ariaLabel, _, () => n.id], (K) => {
          ["role", "aria-label", "aria-modal", "id"].forEach((Z, B) => {
            Vt(K[B]) ? ue.removeAttribute(Z) : ue.setAttribute(Z, K[B]);
          });
        }, { immediate: !0 })), te !== ue && Ju(te) && ["role", "aria-label", "aria-modal", "id"].forEach((K) => {
          te.removeAttribute(K);
        });
      }, { immediate: !0 }), V(() => n.visible, L, { immediate: !0 });
    }), ze(() => {
      T?.(), T = void 0;
    }), u({
      popperContentRef: p,
      popperInstanceRef: m,
      updatePopper: M,
      contentStyle: E
    }), ($, Q) => (w(), I("div", cu({
      ref_key: "contentRef",
      ref: p
    }, h(x), {
      style: h(E),
      class: h(k),
      tabindex: "-1",
      onMouseenter: (ue) => $.$emit("mouseenter", ue),
      onMouseleave: (ue) => $.$emit("mouseleave", ue)
    }), [
      X(h(il), {
        trapped: h(o),
        "trap-on-focus-in": !0,
        "focus-trap-el": h(p),
        "focus-start-el": h(r),
        onFocusAfterTrapped: h(i),
        onFocusAfterReleased: h(a),
        onFocusin: h(s),
        onFocusoutPrevented: h(c),
        onReleaseRequested: h(l)
      }, {
        default: q(() => [
          z($.$slots, "default")
        ]),
        _: 3
      }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusin", "onFocusoutPrevented", "onReleaseRequested"])
    ], 16, ["onMouseenter", "onMouseleave"]));
  }
});
var Af = /* @__PURE__ */ ce(wf, [["__file", "content.vue"]]);
const Ff = du($c), tr = Symbol("elTooltip"), C0 = re({
  to: {
    type: N([String, Object]),
    required: !0
  },
  disabled: Boolean
}), ve = re({
  ...lc,
  ...E0,
  appendTo: {
    type: C0.to.type
  },
  content: {
    type: String,
    default: ""
  },
  rawContent: Boolean,
  persistent: Boolean,
  visible: {
    type: N(Boolean),
    default: null
  },
  transition: String,
  teleported: {
    type: Boolean,
    default: !0
  },
  disabled: Boolean,
  ...Ln(["ariaLabel"])
}), su = re({
  ...i0,
  disabled: Boolean,
  trigger: {
    type: N([String, Array]),
    default: "hover"
  },
  triggerKeys: {
    type: N(Array),
    default: () => [Ze.enter, Ze.numpadEnter, Ze.space]
  },
  focusOnTarget: Boolean
}), Df = Wt({
  type: N(Boolean),
  default: null
}), Sf = Wt({
  type: N(Function)
}), Tf = (e) => {
  const u = `update:${e}`, t = `onUpdate:${e}`, n = [u], r = {
    [e]: Df,
    [t]: Sf
  };
  return {
    useModelToggle: ({
      indicator: a,
      toggleReason: i,
      shouldHideWhenRouteChanges: s,
      shouldProceed: c,
      onShow: l,
      onHide: d
    }) => {
      const b = we(), { emit: p } = b, f = b.props, m = A(() => Du(f[t])), v = A(() => f[e] === null), y = (C) => {
        a.value !== !0 && (a.value = !0, i && (i.value = C), Du(l) && l(C));
      }, _ = (C) => {
        a.value !== !1 && (a.value = !1, i && (i.value = C), Du(d) && d(C));
      }, g = (C) => {
        if (f.disabled === !0 || Du(c) && !c())
          return;
        const S = m.value && Ee;
        S && p(u, !0), (v.value || !S) && y(C);
      }, x = (C) => {
        if (f.disabled === !0 || !Ee)
          return;
        const S = m.value && Ee;
        S && p(u, !1), (v.value || !S) && _(C);
      }, k = (C) => {
        Mn(C) && (f.disabled && C ? m.value && p(u, !1) : a.value !== C && (C ? y() : _()));
      }, E = () => {
        a.value ? x() : g();
      };
      return V(() => f[e], k), s && b.appContext.config.globalProperties.$route !== void 0 && V(() => ({
        ...b.proxy.$route
      }), () => {
        s.value && a.value && x();
      }), xe(() => {
        k(f[e]);
      }), {
        hide: x,
        show: g,
        toggle: E,
        hasUpdateHandler: m
      };
    },
    useModelToggleProps: r,
    useModelToggleEmits: n
  };
}, {
  useModelToggleProps: Of,
  useModelToggleEmits: If,
  useModelToggle: Pf
} = Tf("visible"), Bf = re({
  ...a0,
  ...Of,
  ...ve,
  ...su,
  ...k0,
  showArrow: {
    type: Boolean,
    default: !0
  }
}), Rf = [
  ...If,
  "before-show",
  "before-hide",
  "show",
  "hide",
  "open",
  "close"
], Mf = (e, u) => Lo(e) ? e.includes(u) : e === u, wu = (e, u, t) => (n) => {
  Mf(h(e), u) && t(n);
}, Ve = (e, u, { checkForDefaultPrevented: t = !0 } = {}) => (r) => {
  const o = e?.(r);
  if (t === !1 || !o)
    return u?.(r);
}, $f = R({
  name: "ElTooltipTrigger"
}), zf = /* @__PURE__ */ R({
  ...$f,
  props: su,
  setup(e, { expose: u }) {
    const t = e, n = he("tooltip"), { controlled: r, id: o, open: a, onOpen: i, onClose: s, onToggle: c } = ne(tr, void 0), l = O(null), d = () => {
      if (h(r) || t.disabled)
        return !0;
    }, b = Ke(t, "trigger"), p = Ve(d, wu(b, "hover", (x) => {
      i(x), t.focusOnTarget && x.target && ye(() => {
        Hn(x.target, { preventScroll: !0 });
      });
    })), f = Ve(d, wu(b, "hover", s)), m = Ve(d, wu(b, "click", (x) => {
      x.button === 0 && c(x);
    })), v = Ve(d, wu(b, "focus", i)), y = Ve(d, wu(b, "focus", s)), _ = Ve(d, wu(b, "contextmenu", (x) => {
      x.preventDefault(), c(x);
    })), g = Ve(d, (x) => {
      const { code: k } = x;
      t.triggerKeys.includes(k) && (x.preventDefault(), c(x));
    });
    return u({
      triggerRef: l
    }), (x, k) => (w(), j(h(Kc), {
      id: h(o),
      "virtual-ref": x.virtualRef,
      open: h(a),
      "virtual-triggering": x.virtualTriggering,
      class: U(h(n).e("trigger")),
      onBlur: h(y),
      onClick: h(m),
      onContextmenu: h(_),
      onFocus: h(v),
      onMouseenter: h(p),
      onMouseleave: h(f),
      onKeydown: h(g)
    }, {
      default: q(() => [
        z(x.$slots, "default")
      ]),
      _: 3
    }, 8, ["id", "virtual-ref", "open", "virtual-triggering", "class", "onBlur", "onClick", "onContextmenu", "onFocus", "onMouseenter", "onMouseleave", "onKeydown"]));
  }
});
var Nf = /* @__PURE__ */ ce(zf, [["__file", "trigger.vue"]]);
const Lf = /* @__PURE__ */ R({
  __name: "teleport",
  props: C0,
  setup(e) {
    return (u, t) => u.disabled ? z(u.$slots, "default", { key: 0 }) : (w(), j(ia, {
      key: 1,
      to: u.to
    }, [
      z(u.$slots, "default")
    ], 8, ["to"]));
  }
});
var jf = /* @__PURE__ */ ce(Lf, [["__file", "teleport.vue"]]);
const qf = du(jf), w0 = () => {
  const e = Dn(), u = Yo(), t = A(() => `${e.value}-popper-container-${u.prefix}`), n = A(() => `#${t.value}`);
  return {
    id: t,
    selector: n
  };
}, Hf = (e) => {
  const u = document.createElement("div");
  return u.id = e, document.body.appendChild(u), u;
}, Uf = () => {
  const { id: e, selector: u } = w0();
  return sa(() => {
    Ee && (document.body.querySelector(u.value) || Hf(e.value));
  }), {
    id: e,
    selector: u
  };
}, Vf = (e) => !e && e !== 0 ? [] : Lo(e) ? e : [e], Wf = R({
  name: "ElTooltipContent",
  inheritAttrs: !1
}), Kf = /* @__PURE__ */ R({
  ...Wf,
  props: ve,
  setup(e, { expose: u }) {
    const t = e, { selector: n } = w0(), r = he("tooltip"), o = O(), a = Ko(() => {
      var B;
      return (B = o.value) == null ? void 0 : B.popperContentRef;
    });
    let i;
    const {
      controlled: s,
      id: c,
      open: l,
      trigger: d,
      onClose: b,
      onOpen: p,
      onShow: f,
      onHide: m,
      onBeforeShow: v,
      onBeforeHide: y
    } = ne(tr, void 0), _ = A(() => t.transition || `${r.namespace.value}-fade-in-linear`), g = A(() => t.persistent);
    ze(() => {
      i?.();
    });
    const x = A(() => h(g) ? !0 : h(l)), k = A(() => t.disabled ? !1 : h(l)), E = A(() => t.appendTo || n.value), C = A(() => {
      var B;
      return (B = t.style) != null ? B : {};
    }), S = O(!0), T = () => {
      m(), Z() && Hn(document.body, { preventScroll: !0 }), S.value = !0;
    }, M = () => {
      if (h(s))
        return !0;
    }, L = Ve(M, () => {
      t.enterable && h(d) === "hover" && p();
    }), $ = Ve(M, () => {
      h(d) === "hover" && b();
    }), Q = () => {
      var B, Y;
      (Y = (B = o.value) == null ? void 0 : B.updatePopper) == null || Y.call(B), v?.();
    }, ue = () => {
      y?.();
    }, te = () => {
      f();
    }, K = () => {
      t.virtualTriggering || b();
    }, Z = (B) => {
      var Y;
      const D = (Y = o.value) == null ? void 0 : Y.popperContentRef, G = B?.relatedTarget || document.activeElement;
      return D?.contains(G);
    };
    return V(() => h(l), (B) => {
      B ? (S.value = !1, i = Ls(a, () => {
        if (h(s))
          return;
        Vf(h(d)).every((D) => D !== "hover" && D !== "focus") && b();
      })) : i?.();
    }, {
      flush: "post"
    }), V(() => t.content, () => {
      var B, Y;
      (Y = (B = o.value) == null ? void 0 : B.updatePopper) == null || Y.call(B);
    }), u({
      contentRef: o,
      isFocusInsideContent: Z
    }), (B, Y) => (w(), j(h(qf), {
      disabled: !B.teleported,
      to: h(E)
    }, {
      default: q(() => [
        h(x) || !S.value ? (w(), j(mn, {
          key: 0,
          name: h(_),
          appear: !h(g),
          onAfterLeave: T,
          onBeforeEnter: Q,
          onAfterEnter: te,
          onBeforeLeave: ue,
          persisted: ""
        }, {
          default: q(() => [
            Ro(X(h(Af), cu({
              id: h(c),
              ref_key: "contentRef",
              ref: o
            }, B.$attrs, {
              "aria-label": B.ariaLabel,
              "aria-hidden": S.value,
              "boundaries-padding": B.boundariesPadding,
              "fallback-placements": B.fallbackPlacements,
              "gpu-acceleration": B.gpuAcceleration,
              offset: B.offset,
              placement: B.placement,
              "popper-options": B.popperOptions,
              "arrow-offset": B.arrowOffset,
              strategy: B.strategy,
              effect: B.effect,
              enterable: B.enterable,
              pure: B.pure,
              "popper-class": B.popperClass,
              "popper-style": [B.popperStyle, h(C)],
              "reference-el": B.referenceEl,
              "trigger-target-el": B.triggerTargetEl,
              visible: h(k),
              "z-index": B.zIndex,
              onMouseenter: h(L),
              onMouseleave: h($),
              onBlur: K,
              onClose: h(b)
            }), {
              default: q(() => [
                z(B.$slots, "default")
              ]),
              _: 3
            }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "arrow-offset", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "onMouseenter", "onMouseleave", "onClose"]), [
              [ca, h(k)]
            ])
          ]),
          _: 3
        }, 8, ["name", "appear"])) : P("v-if", !0)
      ]),
      _: 3
    }, 8, ["disabled", "to"]));
  }
});
var Zf = /* @__PURE__ */ ce(Kf, [["__file", "content.vue"]]);
const Gf = R({
  name: "ElTooltip"
}), Jf = /* @__PURE__ */ R({
  ...Gf,
  props: Bf,
  emits: Rf,
  setup(e, { expose: u, emit: t }) {
    const n = e;
    Uf();
    const r = he("tooltip"), o = e0(), a = O(), i = O(), s = () => {
      var g;
      const x = h(a);
      x && ((g = x.popperInstanceRef) == null || g.update());
    }, c = O(!1), l = O(), { show: d, hide: b, hasUpdateHandler: p } = Pf({
      indicator: c,
      toggleReason: l
    }), { onOpen: f, onClose: m } = fc({
      showAfter: Ke(n, "showAfter"),
      hideAfter: Ke(n, "hideAfter"),
      autoClose: Ke(n, "autoClose"),
      open: d,
      close: b
    }), v = A(() => Mn(n.visible) && !p.value), y = A(() => [r.b(), n.popperClass]);
    Ge(tr, {
      controlled: v,
      id: o,
      open: Bo(c),
      trigger: Ke(n, "trigger"),
      onOpen: f,
      onClose: m,
      onToggle: (g) => {
        h(c) ? m(g) : f(g);
      },
      onShow: () => {
        t("show", l.value);
      },
      onHide: () => {
        t("hide", l.value);
      },
      onBeforeShow: () => {
        t("before-show", l.value);
      },
      onBeforeHide: () => {
        t("before-hide", l.value);
      },
      updatePopper: s
    }), V(() => n.disabled, (g) => {
      g && c.value && (c.value = !1);
    });
    const _ = (g) => {
      var x;
      return (x = i.value) == null ? void 0 : x.isFocusInsideContent(g);
    };
    return la(() => c.value && b()), u({
      popperRef: a,
      contentRef: i,
      isFocusInsideContent: _,
      updatePopper: s,
      onOpen: f,
      onClose: m,
      hide: b
    }), (g, x) => (w(), j(h(Ff), {
      ref_key: "popperRef",
      ref: a,
      role: g.role
    }, {
      default: q(() => [
        X(Nf, {
          disabled: g.disabled,
          trigger: g.trigger,
          "trigger-keys": g.triggerKeys,
          "virtual-ref": g.virtualRef,
          "virtual-triggering": g.virtualTriggering,
          "focus-on-target": g.focusOnTarget
        }, {
          default: q(() => [
            g.$slots.default ? z(g.$slots, "default", { key: 0 }) : P("v-if", !0)
          ]),
          _: 3
        }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering", "focus-on-target"]),
        X(Zf, {
          ref_key: "contentRef",
          ref: i,
          "aria-label": g.ariaLabel,
          "boundaries-padding": g.boundariesPadding,
          content: g.content,
          disabled: g.disabled,
          effect: g.effect,
          enterable: g.enterable,
          "fallback-placements": g.fallbackPlacements,
          "hide-after": g.hideAfter,
          "gpu-acceleration": g.gpuAcceleration,
          offset: g.offset,
          persistent: g.persistent,
          "popper-class": h(y),
          "popper-style": g.popperStyle,
          placement: g.placement,
          "popper-options": g.popperOptions,
          "arrow-offset": g.arrowOffset,
          pure: g.pure,
          "raw-content": g.rawContent,
          "reference-el": g.referenceEl,
          "trigger-target-el": g.triggerTargetEl,
          "show-after": g.showAfter,
          strategy: g.strategy,
          teleported: g.teleported,
          transition: g.transition,
          "virtual-triggering": g.virtualTriggering,
          "z-index": g.zIndex,
          "append-to": g.appendTo
        }, {
          default: q(() => [
            z(g.$slots, "content", {}, () => [
              g.rawContent ? (w(), I("span", {
                key: 0,
                innerHTML: g.content
              }, null, 8, ["innerHTML"])) : (w(), I("span", { key: 1 }, nu(g.content), 1))
            ]),
            g.showArrow ? (w(), j(h(Lc), { key: 0 })) : P("v-if", !0)
          ]),
          _: 3
        }, 8, ["aria-label", "boundaries-padding", "content", "disabled", "effect", "enterable", "fallback-placements", "hide-after", "gpu-acceleration", "offset", "persistent", "popper-class", "popper-style", "placement", "popper-options", "arrow-offset", "pure", "raw-content", "reference-el", "trigger-target-el", "show-after", "strategy", "teleported", "transition", "virtual-triggering", "z-index", "append-to"])
      ]),
      _: 3
    }, 8, ["role"]));
  }
});
var Qf = /* @__PURE__ */ ce(Jf, [["__file", "tooltip.vue"]]);
const Xf = du(Qf), Yf = re({
  size: {
    type: [Number, String],
    values: Qo,
    default: "",
    validator: (e) => Je(e)
  },
  shape: {
    type: String,
    values: ["circle", "square"],
    default: "circle"
  },
  icon: {
    type: yu
  },
  src: {
    type: String,
    default: ""
  },
  alt: String,
  srcSet: String,
  fit: {
    type: N(String),
    default: "cover"
  }
}), ed = {
  error: (e) => e instanceof Event
}, ud = R({
  name: "ElAvatar"
}), td = /* @__PURE__ */ R({
  ...ud,
  props: Yf,
  emits: ed,
  setup(e, { emit: u }) {
    const t = e, n = he("avatar"), r = O(!1), o = A(() => {
      const { size: c, icon: l, shape: d } = t, b = [n.b()];
      return vu(c) && b.push(n.m(c)), l && b.push(n.m("icon")), d && b.push(n.m(d)), b;
    }), a = A(() => {
      const { size: c } = t;
      return Je(c) ? n.cssVarBlock({
        size: Nn(c) || ""
      }) : void 0;
    }), i = A(() => ({
      objectFit: t.fit
    }));
    V(() => t.src, () => r.value = !1);
    function s(c) {
      r.value = !0, u("error", c);
    }
    return (c, l) => (w(), I("span", {
      class: U(h(o)),
      style: Ae(h(a))
    }, [
      (c.src || c.srcSet) && !r.value ? (w(), I("img", {
        key: 0,
        src: c.src,
        alt: c.alt,
        srcset: c.srcSet,
        style: Ae(h(i)),
        onError: s
      }, null, 44, ["src", "alt", "srcset"])) : c.icon ? (w(), j(h(ke), { key: 1 }, {
        default: q(() => [
          (w(), j(We(c.icon)))
        ]),
        _: 1
      })) : z(c.$slots, "default", { key: 2 })
    ], 6));
  }
});
var nd = /* @__PURE__ */ ce(td, [["__file", "avatar.vue"]]);
const rd = du(nd), A0 = Symbol("buttonGroupContextKey"), od = ({ from: e, replacement: u, scope: t, version: n, ref: r, type: o = "API" }, a) => {
  V(() => h(a), (i) => {
  }, {
    immediate: !0
  });
}, ad = (e, u) => {
  od({
    from: "type.text",
    replacement: "link",
    version: "3.0.0",
    scope: "props",
    ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
  }, A(() => e.type === "text"));
  const t = ne(A0, void 0), n = nc("button"), { form: r } = u0(), o = n0(A(() => t?.size)), a = qn(), i = O(), s = An(), c = A(() => {
    var y;
    return e.type || t?.type || ((y = n.value) == null ? void 0 : y.type) || "";
  }), l = A(() => {
    var y, _, g;
    return (g = (_ = e.autoInsertSpace) != null ? _ : (y = n.value) == null ? void 0 : y.autoInsertSpace) != null ? g : !1;
  }), d = A(() => {
    var y, _, g;
    return (g = (_ = e.plain) != null ? _ : (y = n.value) == null ? void 0 : y.plain) != null ? g : !1;
  }), b = A(() => {
    var y, _, g;
    return (g = (_ = e.round) != null ? _ : (y = n.value) == null ? void 0 : y.round) != null ? g : !1;
  }), p = A(() => {
    var y, _, g;
    return (g = (_ = e.text) != null ? _ : (y = n.value) == null ? void 0 : y.text) != null ? g : !1;
  }), f = A(() => e.tag === "button" ? {
    ariaDisabled: a.value || e.loading,
    disabled: a.value || e.loading,
    autofocus: e.autofocus,
    type: e.nativeType
  } : {}), m = A(() => {
    var y;
    const _ = (y = s.default) == null ? void 0 : y.call(s);
    if (l.value && _?.length === 1) {
      const g = _[0];
      if (g?.type === Mo) {
        const x = g.children;
        return new RegExp("^\\p{Unified_Ideograph}{2}$", "u").test(x.trim());
      }
    }
    return !1;
  });
  return {
    _disabled: a,
    _size: o,
    _type: c,
    _ref: i,
    _props: f,
    _plain: d,
    _round: b,
    _text: p,
    shouldAddSpace: m,
    handleClick: (y) => {
      if (a.value || e.loading) {
        y.stopPropagation();
        return;
      }
      e.nativeType === "reset" && r?.resetFields(), u("click", y);
    }
  };
}, id = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  "text",
  ""
], sd = ["button", "submit", "reset"], _n = re({
  size: Xo,
  disabled: Boolean,
  type: {
    type: String,
    values: id,
    default: ""
  },
  icon: {
    type: yu
  },
  nativeType: {
    type: String,
    values: sd,
    default: "button"
  },
  loading: Boolean,
  loadingIcon: {
    type: yu,
    default: () => No
  },
  plain: {
    type: Boolean,
    default: void 0
  },
  text: {
    type: Boolean,
    default: void 0
  },
  link: Boolean,
  bg: Boolean,
  autofocus: Boolean,
  round: {
    type: Boolean,
    default: void 0
  },
  circle: Boolean,
  color: String,
  dark: Boolean,
  autoInsertSpace: {
    type: Boolean,
    default: void 0
  },
  tag: {
    type: N([String, Object]),
    default: "button"
  }
}), cd = {
  click: (e) => e instanceof MouseEvent
};
function se(e, u) {
  ld(e) && (e = "100%");
  var t = fd(e);
  return e = u === 360 ? e : Math.min(u, Math.max(0, parseFloat(e))), t && (e = parseInt(String(e * u), 10) / 100), Math.abs(e - u) < 1e-6 ? 1 : (u === 360 ? e = (e < 0 ? e % u + u : e % u) / parseFloat(String(u)) : e = e % u / parseFloat(String(u)), e);
}
function wt(e) {
  return Math.min(1, Math.max(0, e));
}
function ld(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function fd(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function F0(e) {
  return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function At(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function mu(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function dd(e, u, t) {
  return {
    r: se(e, 255) * 255,
    g: se(u, 255) * 255,
    b: se(t, 255) * 255
  };
}
function ro(e, u, t) {
  e = se(e, 255), u = se(u, 255), t = se(t, 255);
  var n = Math.max(e, u, t), r = Math.min(e, u, t), o = 0, a = 0, i = (n + r) / 2;
  if (n === r)
    a = 0, o = 0;
  else {
    var s = n - r;
    switch (a = i > 0.5 ? s / (2 - n - r) : s / (n + r), n) {
      case e:
        o = (u - t) / s + (u < t ? 6 : 0);
        break;
      case u:
        o = (t - e) / s + 2;
        break;
      case t:
        o = (e - u) / s + 4;
        break;
    }
    o /= 6;
  }
  return { h: o, s: a, l: i };
}
function on(e, u, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? e + (u - e) * (6 * t) : t < 1 / 2 ? u : t < 2 / 3 ? e + (u - e) * (2 / 3 - t) * 6 : e;
}
function pd(e, u, t) {
  var n, r, o;
  if (e = se(e, 360), u = se(u, 100), t = se(t, 100), u === 0)
    r = t, o = t, n = t;
  else {
    var a = t < 0.5 ? t * (1 + u) : t + u - t * u, i = 2 * t - a;
    n = on(i, a, e + 1 / 3), r = on(i, a, e), o = on(i, a, e - 1 / 3);
  }
  return { r: n * 255, g: r * 255, b: o * 255 };
}
function oo(e, u, t) {
  e = se(e, 255), u = se(u, 255), t = se(t, 255);
  var n = Math.max(e, u, t), r = Math.min(e, u, t), o = 0, a = n, i = n - r, s = n === 0 ? 0 : i / n;
  if (n === r)
    o = 0;
  else {
    switch (n) {
      case e:
        o = (u - t) / i + (u < t ? 6 : 0);
        break;
      case u:
        o = (t - e) / i + 2;
        break;
      case t:
        o = (e - u) / i + 4;
        break;
    }
    o /= 6;
  }
  return { h: o, s, v: a };
}
function hd(e, u, t) {
  e = se(e, 360) * 6, u = se(u, 100), t = se(t, 100);
  var n = Math.floor(e), r = e - n, o = t * (1 - u), a = t * (1 - r * u), i = t * (1 - (1 - r) * u), s = n % 6, c = [t, a, o, o, i, t][s], l = [i, t, t, a, o, o][s], d = [o, o, i, t, t, a][s];
  return { r: c * 255, g: l * 255, b: d * 255 };
}
function ao(e, u, t, n) {
  var r = [
    mu(Math.round(e).toString(16)),
    mu(Math.round(u).toString(16)),
    mu(Math.round(t).toString(16))
  ];
  return n && r[0].startsWith(r[0].charAt(1)) && r[1].startsWith(r[1].charAt(1)) && r[2].startsWith(r[2].charAt(1)) ? r[0].charAt(0) + r[1].charAt(0) + r[2].charAt(0) : r.join("");
}
function bd(e, u, t, n, r) {
  var o = [
    mu(Math.round(e).toString(16)),
    mu(Math.round(u).toString(16)),
    mu(Math.round(t).toString(16)),
    mu(gd(n))
  ];
  return r && o[0].startsWith(o[0].charAt(1)) && o[1].startsWith(o[1].charAt(1)) && o[2].startsWith(o[2].charAt(1)) && o[3].startsWith(o[3].charAt(1)) ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) + o[3].charAt(0) : o.join("");
}
function gd(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function io(e) {
  return me(e) / 255;
}
function me(e) {
  return parseInt(e, 16);
}
function md(e) {
  return {
    r: e >> 16,
    g: (e & 65280) >> 8,
    b: e & 255
  };
}
var xn = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function vd(e) {
  var u = { r: 0, g: 0, b: 0 }, t = 1, n = null, r = null, o = null, a = !1, i = !1;
  return typeof e == "string" && (e = xd(e)), typeof e == "object" && (Ue(e.r) && Ue(e.g) && Ue(e.b) ? (u = dd(e.r, e.g, e.b), a = !0, i = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : Ue(e.h) && Ue(e.s) && Ue(e.v) ? (n = At(e.s), r = At(e.v), u = hd(e.h, n, r), a = !0, i = "hsv") : Ue(e.h) && Ue(e.s) && Ue(e.l) && (n = At(e.s), o = At(e.l), u = pd(e.h, n, o), a = !0, i = "hsl"), Object.prototype.hasOwnProperty.call(e, "a") && (t = e.a)), t = F0(t), {
    ok: a,
    format: e.format || i,
    r: Math.min(255, Math.max(u.r, 0)),
    g: Math.min(255, Math.max(u.g, 0)),
    b: Math.min(255, Math.max(u.b, 0)),
    a: t
  };
}
var yd = "[-\\+]?\\d+%?", _d = "[-\\+]?\\d*\\.\\d+%?", ou = "(?:".concat(_d, ")|(?:").concat(yd, ")"), an = "[\\s|\\(]+(".concat(ou, ")[,|\\s]+(").concat(ou, ")[,|\\s]+(").concat(ou, ")\\s*\\)?"), sn = "[\\s|\\(]+(".concat(ou, ")[,|\\s]+(").concat(ou, ")[,|\\s]+(").concat(ou, ")[,|\\s]+(").concat(ou, ")\\s*\\)?"), Te = {
  CSS_UNIT: new RegExp(ou),
  rgb: new RegExp("rgb" + an),
  rgba: new RegExp("rgba" + sn),
  hsl: new RegExp("hsl" + an),
  hsla: new RegExp("hsla" + sn),
  hsv: new RegExp("hsv" + an),
  hsva: new RegExp("hsva" + sn),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function xd(e) {
  if (e = e.trim().toLowerCase(), e.length === 0)
    return !1;
  var u = !1;
  if (xn[e])
    e = xn[e], u = !0;
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var t = Te.rgb.exec(e);
  return t ? { r: t[1], g: t[2], b: t[3] } : (t = Te.rgba.exec(e), t ? { r: t[1], g: t[2], b: t[3], a: t[4] } : (t = Te.hsl.exec(e), t ? { h: t[1], s: t[2], l: t[3] } : (t = Te.hsla.exec(e), t ? { h: t[1], s: t[2], l: t[3], a: t[4] } : (t = Te.hsv.exec(e), t ? { h: t[1], s: t[2], v: t[3] } : (t = Te.hsva.exec(e), t ? { h: t[1], s: t[2], v: t[3], a: t[4] } : (t = Te.hex8.exec(e), t ? {
    r: me(t[1]),
    g: me(t[2]),
    b: me(t[3]),
    a: io(t[4]),
    format: u ? "name" : "hex8"
  } : (t = Te.hex6.exec(e), t ? {
    r: me(t[1]),
    g: me(t[2]),
    b: me(t[3]),
    format: u ? "name" : "hex"
  } : (t = Te.hex4.exec(e), t ? {
    r: me(t[1] + t[1]),
    g: me(t[2] + t[2]),
    b: me(t[3] + t[3]),
    a: io(t[4] + t[4]),
    format: u ? "name" : "hex8"
  } : (t = Te.hex3.exec(e), t ? {
    r: me(t[1] + t[1]),
    g: me(t[2] + t[2]),
    b: me(t[3] + t[3]),
    format: u ? "name" : "hex"
  } : !1)))))))));
}
function Ue(e) {
  return !!Te.CSS_UNIT.exec(String(e));
}
var kd = (
  /** @class */
  (function() {
    function e(u, t) {
      u === void 0 && (u = ""), t === void 0 && (t = {});
      var n;
      if (u instanceof e)
        return u;
      typeof u == "number" && (u = md(u)), this.originalInput = u;
      var r = vd(u);
      this.originalInput = u, this.r = r.r, this.g = r.g, this.b = r.b, this.a = r.a, this.roundA = Math.round(100 * this.a) / 100, this.format = (n = t.format) !== null && n !== void 0 ? n : r.format, this.gradientType = t.gradientType, this.r < 1 && (this.r = Math.round(this.r)), this.g < 1 && (this.g = Math.round(this.g)), this.b < 1 && (this.b = Math.round(this.b)), this.isValid = r.ok;
    }
    return e.prototype.isDark = function() {
      return this.getBrightness() < 128;
    }, e.prototype.isLight = function() {
      return !this.isDark();
    }, e.prototype.getBrightness = function() {
      var u = this.toRgb();
      return (u.r * 299 + u.g * 587 + u.b * 114) / 1e3;
    }, e.prototype.getLuminance = function() {
      var u = this.toRgb(), t, n, r, o = u.r / 255, a = u.g / 255, i = u.b / 255;
      return o <= 0.03928 ? t = o / 12.92 : t = Math.pow((o + 0.055) / 1.055, 2.4), a <= 0.03928 ? n = a / 12.92 : n = Math.pow((a + 0.055) / 1.055, 2.4), i <= 0.03928 ? r = i / 12.92 : r = Math.pow((i + 0.055) / 1.055, 2.4), 0.2126 * t + 0.7152 * n + 0.0722 * r;
    }, e.prototype.getAlpha = function() {
      return this.a;
    }, e.prototype.setAlpha = function(u) {
      return this.a = F0(u), this.roundA = Math.round(100 * this.a) / 100, this;
    }, e.prototype.isMonochrome = function() {
      var u = this.toHsl().s;
      return u === 0;
    }, e.prototype.toHsv = function() {
      var u = oo(this.r, this.g, this.b);
      return { h: u.h * 360, s: u.s, v: u.v, a: this.a };
    }, e.prototype.toHsvString = function() {
      var u = oo(this.r, this.g, this.b), t = Math.round(u.h * 360), n = Math.round(u.s * 100), r = Math.round(u.v * 100);
      return this.a === 1 ? "hsv(".concat(t, ", ").concat(n, "%, ").concat(r, "%)") : "hsva(".concat(t, ", ").concat(n, "%, ").concat(r, "%, ").concat(this.roundA, ")");
    }, e.prototype.toHsl = function() {
      var u = ro(this.r, this.g, this.b);
      return { h: u.h * 360, s: u.s, l: u.l, a: this.a };
    }, e.prototype.toHslString = function() {
      var u = ro(this.r, this.g, this.b), t = Math.round(u.h * 360), n = Math.round(u.s * 100), r = Math.round(u.l * 100);
      return this.a === 1 ? "hsl(".concat(t, ", ").concat(n, "%, ").concat(r, "%)") : "hsla(".concat(t, ", ").concat(n, "%, ").concat(r, "%, ").concat(this.roundA, ")");
    }, e.prototype.toHex = function(u) {
      return u === void 0 && (u = !1), ao(this.r, this.g, this.b, u);
    }, e.prototype.toHexString = function(u) {
      return u === void 0 && (u = !1), "#" + this.toHex(u);
    }, e.prototype.toHex8 = function(u) {
      return u === void 0 && (u = !1), bd(this.r, this.g, this.b, this.a, u);
    }, e.prototype.toHex8String = function(u) {
      return u === void 0 && (u = !1), "#" + this.toHex8(u);
    }, e.prototype.toHexShortString = function(u) {
      return u === void 0 && (u = !1), this.a === 1 ? this.toHexString(u) : this.toHex8String(u);
    }, e.prototype.toRgb = function() {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a
      };
    }, e.prototype.toRgbString = function() {
      var u = Math.round(this.r), t = Math.round(this.g), n = Math.round(this.b);
      return this.a === 1 ? "rgb(".concat(u, ", ").concat(t, ", ").concat(n, ")") : "rgba(".concat(u, ", ").concat(t, ", ").concat(n, ", ").concat(this.roundA, ")");
    }, e.prototype.toPercentageRgb = function() {
      var u = function(t) {
        return "".concat(Math.round(se(t, 255) * 100), "%");
      };
      return {
        r: u(this.r),
        g: u(this.g),
        b: u(this.b),
        a: this.a
      };
    }, e.prototype.toPercentageRgbString = function() {
      var u = function(t) {
        return Math.round(se(t, 255) * 100);
      };
      return this.a === 1 ? "rgb(".concat(u(this.r), "%, ").concat(u(this.g), "%, ").concat(u(this.b), "%)") : "rgba(".concat(u(this.r), "%, ").concat(u(this.g), "%, ").concat(u(this.b), "%, ").concat(this.roundA, ")");
    }, e.prototype.toName = function() {
      if (this.a === 0)
        return "transparent";
      if (this.a < 1)
        return !1;
      for (var u = "#" + ao(this.r, this.g, this.b, !1), t = 0, n = Object.entries(xn); t < n.length; t++) {
        var r = n[t], o = r[0], a = r[1];
        if (u === a)
          return o;
      }
      return !1;
    }, e.prototype.toString = function(u) {
      var t = !!u;
      u = u ?? this.format;
      var n = !1, r = this.a < 1 && this.a >= 0, o = !t && r && (u.startsWith("hex") || u === "name");
      return o ? u === "name" && this.a === 0 ? this.toName() : this.toRgbString() : (u === "rgb" && (n = this.toRgbString()), u === "prgb" && (n = this.toPercentageRgbString()), (u === "hex" || u === "hex6") && (n = this.toHexString()), u === "hex3" && (n = this.toHexString(!0)), u === "hex4" && (n = this.toHex8String(!0)), u === "hex8" && (n = this.toHex8String()), u === "name" && (n = this.toName()), u === "hsl" && (n = this.toHslString()), u === "hsv" && (n = this.toHsvString()), n || this.toHexString());
    }, e.prototype.toNumber = function() {
      return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    }, e.prototype.clone = function() {
      return new e(this.toString());
    }, e.prototype.lighten = function(u) {
      u === void 0 && (u = 10);
      var t = this.toHsl();
      return t.l += u / 100, t.l = wt(t.l), new e(t);
    }, e.prototype.brighten = function(u) {
      u === void 0 && (u = 10);
      var t = this.toRgb();
      return t.r = Math.max(0, Math.min(255, t.r - Math.round(255 * -(u / 100)))), t.g = Math.max(0, Math.min(255, t.g - Math.round(255 * -(u / 100)))), t.b = Math.max(0, Math.min(255, t.b - Math.round(255 * -(u / 100)))), new e(t);
    }, e.prototype.darken = function(u) {
      u === void 0 && (u = 10);
      var t = this.toHsl();
      return t.l -= u / 100, t.l = wt(t.l), new e(t);
    }, e.prototype.tint = function(u) {
      return u === void 0 && (u = 10), this.mix("white", u);
    }, e.prototype.shade = function(u) {
      return u === void 0 && (u = 10), this.mix("black", u);
    }, e.prototype.desaturate = function(u) {
      u === void 0 && (u = 10);
      var t = this.toHsl();
      return t.s -= u / 100, t.s = wt(t.s), new e(t);
    }, e.prototype.saturate = function(u) {
      u === void 0 && (u = 10);
      var t = this.toHsl();
      return t.s += u / 100, t.s = wt(t.s), new e(t);
    }, e.prototype.greyscale = function() {
      return this.desaturate(100);
    }, e.prototype.spin = function(u) {
      var t = this.toHsl(), n = (t.h + u) % 360;
      return t.h = n < 0 ? 360 + n : n, new e(t);
    }, e.prototype.mix = function(u, t) {
      t === void 0 && (t = 50);
      var n = this.toRgb(), r = new e(u).toRgb(), o = t / 100, a = {
        r: (r.r - n.r) * o + n.r,
        g: (r.g - n.g) * o + n.g,
        b: (r.b - n.b) * o + n.b,
        a: (r.a - n.a) * o + n.a
      };
      return new e(a);
    }, e.prototype.analogous = function(u, t) {
      u === void 0 && (u = 6), t === void 0 && (t = 30);
      var n = this.toHsl(), r = 360 / t, o = [this];
      for (n.h = (n.h - (r * u >> 1) + 720) % 360; --u; )
        n.h = (n.h + r) % 360, o.push(new e(n));
      return o;
    }, e.prototype.complement = function() {
      var u = this.toHsl();
      return u.h = (u.h + 180) % 360, new e(u);
    }, e.prototype.monochromatic = function(u) {
      u === void 0 && (u = 6);
      for (var t = this.toHsv(), n = t.h, r = t.s, o = t.v, a = [], i = 1 / u; u--; )
        a.push(new e({ h: n, s: r, v: o })), o = (o + i) % 1;
      return a;
    }, e.prototype.splitcomplement = function() {
      var u = this.toHsl(), t = u.h;
      return [
        this,
        new e({ h: (t + 72) % 360, s: u.s, l: u.l }),
        new e({ h: (t + 216) % 360, s: u.s, l: u.l })
      ];
    }, e.prototype.onBackground = function(u) {
      var t = this.toRgb(), n = new e(u).toRgb(), r = t.a + n.a * (1 - t.a);
      return new e({
        r: (t.r * t.a + n.r * n.a * (1 - t.a)) / r,
        g: (t.g * t.a + n.g * n.a * (1 - t.a)) / r,
        b: (t.b * t.a + n.b * n.a * (1 - t.a)) / r,
        a: r
      });
    }, e.prototype.triad = function() {
      return this.polyad(3);
    }, e.prototype.tetrad = function() {
      return this.polyad(4);
    }, e.prototype.polyad = function(u) {
      for (var t = this.toHsl(), n = t.h, r = [this], o = 360 / u, a = 1; a < u; a++)
        r.push(new e({ h: (n + a * o) % 360, s: t.s, l: t.l }));
      return r;
    }, e.prototype.equals = function(u) {
      return this.toRgbString() === new e(u).toRgbString();
    }, e;
  })()
);
function Ye(e, u = 20) {
  return e.mix("#141414", u).toString();
}
function Ed(e) {
  const u = qn(), t = he("button");
  return A(() => {
    let n = {}, r = e.color;
    if (r) {
      const o = r.match(/var\((.*?)\)/);
      o && (r = window.getComputedStyle(window.document.documentElement).getPropertyValue(o[1]));
      const a = new kd(r), i = e.dark ? a.tint(20).toString() : Ye(a, 20);
      if (e.plain)
        n = t.cssVarBlock({
          "bg-color": e.dark ? Ye(a, 90) : a.tint(90).toString(),
          "text-color": r,
          "border-color": e.dark ? Ye(a, 50) : a.tint(50).toString(),
          "hover-text-color": `var(${t.cssVarName("color-white")})`,
          "hover-bg-color": r,
          "hover-border-color": r,
          "active-bg-color": i,
          "active-text-color": `var(${t.cssVarName("color-white")})`,
          "active-border-color": i
        }), u.value && (n[t.cssVarBlockName("disabled-bg-color")] = e.dark ? Ye(a, 90) : a.tint(90).toString(), n[t.cssVarBlockName("disabled-text-color")] = e.dark ? Ye(a, 50) : a.tint(50).toString(), n[t.cssVarBlockName("disabled-border-color")] = e.dark ? Ye(a, 80) : a.tint(80).toString());
      else {
        const s = e.dark ? Ye(a, 30) : a.tint(30).toString(), c = a.isDark() ? `var(${t.cssVarName("color-white")})` : `var(${t.cssVarName("color-black")})`;
        if (n = t.cssVarBlock({
          "bg-color": r,
          "text-color": c,
          "border-color": r,
          "hover-bg-color": s,
          "hover-text-color": c,
          "hover-border-color": s,
          "active-bg-color": i,
          "active-border-color": i
        }), u.value) {
          const l = e.dark ? Ye(a, 50) : a.tint(50).toString();
          n[t.cssVarBlockName("disabled-bg-color")] = l, n[t.cssVarBlockName("disabled-text-color")] = e.dark ? "rgba(255, 255, 255, 0.5)" : `var(${t.cssVarName("color-white")})`, n[t.cssVarBlockName("disabled-border-color")] = l;
        }
      }
    }
    return n;
  });
}
const Cd = R({
  name: "ElButton"
}), wd = /* @__PURE__ */ R({
  ...Cd,
  props: _n,
  emits: cd,
  setup(e, { expose: u, emit: t }) {
    const n = e, r = Ed(n), o = he("button"), {
      _ref: a,
      _size: i,
      _type: s,
      _disabled: c,
      _props: l,
      _plain: d,
      _round: b,
      _text: p,
      shouldAddSpace: f,
      handleClick: m
    } = ad(n, t), v = A(() => [
      o.b(),
      o.m(s.value),
      o.m(i.value),
      o.is("disabled", c.value),
      o.is("loading", n.loading),
      o.is("plain", d.value),
      o.is("round", b.value),
      o.is("circle", n.circle),
      o.is("text", p.value),
      o.is("link", n.link),
      o.is("has-bg", n.bg)
    ]);
    return u({
      ref: a,
      size: i,
      type: s,
      disabled: c,
      shouldAddSpace: f
    }), (y, _) => (w(), j(We(y.tag), cu({
      ref_key: "_ref",
      ref: a
    }, h(l), {
      class: h(v),
      style: h(r),
      onClick: h(m)
    }), {
      default: q(() => [
        y.loading ? (w(), I(iu, { key: 0 }, [
          y.$slots.loading ? z(y.$slots, "loading", { key: 0 }) : (w(), j(h(ke), {
            key: 1,
            class: U(h(o).is("loading"))
          }, {
            default: q(() => [
              (w(), j(We(y.loadingIcon)))
            ]),
            _: 1
          }, 8, ["class"]))
        ], 64)) : y.icon || y.$slots.icon ? (w(), j(h(ke), { key: 1 }, {
          default: q(() => [
            y.icon ? (w(), j(We(y.icon), { key: 0 })) : z(y.$slots, "icon", { key: 1 })
          ]),
          _: 3
        })) : P("v-if", !0),
        y.$slots.default ? (w(), I("span", {
          key: 2,
          class: U({ [h(o).em("text", "expand")]: h(f) })
        }, [
          z(y.$slots, "default")
        ], 2)) : P("v-if", !0)
      ]),
      _: 3
    }, 16, ["class", "style", "onClick"]));
  }
});
var Ad = /* @__PURE__ */ ce(wd, [["__file", "button.vue"]]);
const Fd = {
  size: _n.size,
  type: _n.type
}, Dd = R({
  name: "ElButtonGroup"
}), Sd = /* @__PURE__ */ R({
  ...Dd,
  props: Fd,
  setup(e) {
    const u = e;
    Ge(A0, fa({
      size: Ke(u, "size"),
      type: Ke(u, "type")
    }));
    const t = he("button");
    return (n, r) => (w(), I("div", {
      class: U(h(t).b("group"))
    }, [
      z(n.$slots, "default")
    ], 2));
  }
});
var D0 = /* @__PURE__ */ ce(Sd, [["__file", "button-group.vue"]]);
const ft = du(Ad, {
  ButtonGroup: D0
});
oc(D0);
const Td = R({
  inheritAttrs: !1
});
function Od(e, u, t, n, r, o) {
  return z(e.$slots, "default");
}
var Id = /* @__PURE__ */ ce(Td, [["render", Od], ["__file", "collection.vue"]]);
const Pd = R({
  name: "ElCollectionItem",
  inheritAttrs: !1
});
function Bd(e, u, t, n, r, o) {
  return z(e.$slots, "default");
}
var Rd = /* @__PURE__ */ ce(Pd, [["render", Bd], ["__file", "collection-item.vue"]]);
const Md = "data-el-collection-item", $d = (e) => {
  const u = `El${e}Collection`, t = `${u}Item`, n = Symbol(u), r = Symbol(t), o = {
    ...Id,
    name: u,
    setup() {
      const i = O(), s = /* @__PURE__ */ new Map();
      Ge(n, {
        itemMap: s,
        getItems: () => {
          const l = h(i);
          if (!l)
            return [];
          const d = Array.from(l.querySelectorAll(`[${Md}]`));
          return [...s.values()].sort((p, f) => d.indexOf(p.ref) - d.indexOf(f.ref));
        },
        collectionRef: i
      });
    }
  }, a = {
    ...Rd,
    name: t,
    setup(i, { attrs: s }) {
      const c = O(), l = ne(n, void 0);
      Ge(r, {
        collectionItemRef: c
      }), xe(() => {
        const d = h(c);
        d && l.itemMap.set(d, {
          ref: d,
          ...s
        });
      }), ze(() => {
        const d = h(c);
        l.itemMap.delete(d);
      });
    }
  };
  return {
    COLLECTION_INJECTION_KEY: n,
    COLLECTION_ITEM_INJECTION_KEY: r,
    ElCollection: o,
    ElCollectionItem: a
  };
}, cn = re({
  trigger: su.trigger,
  triggerKeys: {
    type: N(Array),
    default: () => [
      Ze.enter,
      Ze.numpadEnter,
      Ze.space,
      Ze.down
    ]
  },
  virtualTriggering: su.virtualTriggering,
  virtualRef: su.virtualRef,
  effect: {
    ...ve.effect,
    default: "light"
  },
  type: {
    type: N(String)
  },
  placement: {
    type: N(String),
    default: "bottom"
  },
  popperOptions: {
    type: N(Object),
    default: () => ({})
  },
  id: String,
  size: {
    type: String,
    default: ""
  },
  splitButton: Boolean,
  hideOnClick: {
    type: Boolean,
    default: !0
  },
  loop: {
    type: Boolean,
    default: !0
  },
  showArrow: {
    type: Boolean,
    default: !0
  },
  showTimeout: {
    type: Number,
    default: 150
  },
  hideTimeout: {
    type: Number,
    default: 150
  },
  tabindex: {
    type: N([Number, String]),
    default: 0
  },
  maxHeight: {
    type: N([Number, String]),
    default: ""
  },
  popperClass: {
    type: String,
    default: ""
  },
  disabled: Boolean,
  role: {
    type: String,
    values: o0,
    default: "menu"
  },
  buttonProps: {
    type: N(Object)
  },
  teleported: ve.teleported,
  persistent: {
    type: Boolean,
    default: !0
  }
});
re({
  command: {
    type: [Object, String, Number],
    default: () => ({})
  },
  disabled: Boolean,
  divided: Boolean,
  textValue: String,
  icon: {
    type: yu
  }
});
re({
  onKeydown: { type: N(Function) }
});
$d("Dropdown");
const zd = re({
  trigger: su.trigger,
  triggerKeys: su.triggerKeys,
  placement: cn.placement,
  disabled: su.disabled,
  visible: ve.visible,
  transition: ve.transition,
  popperOptions: cn.popperOptions,
  tabindex: cn.tabindex,
  content: ve.content,
  popperStyle: ve.popperStyle,
  popperClass: ve.popperClass,
  enterable: {
    ...ve.enterable,
    default: !0
  },
  effect: {
    ...ve.effect,
    default: "light"
  },
  teleported: ve.teleported,
  appendTo: ve.appendTo,
  title: String,
  width: {
    type: [String, Number],
    default: 150
  },
  offset: {
    type: Number,
    default: void 0
  },
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  autoClose: {
    type: Number,
    default: 0
  },
  showArrow: {
    type: Boolean,
    default: !0
  },
  persistent: {
    type: Boolean,
    default: !0
  },
  "onUpdate:visible": {
    type: Function
  }
}), Nd = {
  "update:visible": (e) => Mn(e),
  "before-enter": () => !0,
  "before-leave": () => !0,
  "after-enter": () => !0,
  "after-leave": () => !0
}, Ld = "onUpdate:visible", jd = R({
  name: "ElPopover"
}), qd = /* @__PURE__ */ R({
  ...jd,
  props: zd,
  emits: Nd,
  setup(e, { expose: u, emit: t }) {
    const n = e, r = A(() => n[Ld]), o = he("popover"), a = O(), i = A(() => {
      var v;
      return (v = h(a)) == null ? void 0 : v.popperRef;
    }), s = A(() => [
      {
        width: Nn(n.width)
      },
      n.popperStyle
    ]), c = A(() => [o.b(), n.popperClass, { [o.m("plain")]: !!n.content }]), l = A(() => n.transition === `${o.namespace.value}-fade-in-linear`), d = () => {
      var v;
      (v = a.value) == null || v.hide();
    }, b = () => {
      t("before-enter");
    }, p = () => {
      t("before-leave");
    }, f = () => {
      t("after-enter");
    }, m = () => {
      t("update:visible", !1), t("after-leave");
    };
    return u({
      popperRef: i,
      hide: d
    }), (v, y) => (w(), j(h(Xf), cu({
      ref_key: "tooltipRef",
      ref: a
    }, v.$attrs, {
      trigger: v.trigger,
      "trigger-keys": v.triggerKeys,
      placement: v.placement,
      disabled: v.disabled,
      visible: v.visible,
      transition: v.transition,
      "popper-options": v.popperOptions,
      tabindex: v.tabindex,
      content: v.content,
      offset: v.offset,
      "show-after": v.showAfter,
      "hide-after": v.hideAfter,
      "auto-close": v.autoClose,
      "show-arrow": v.showArrow,
      "aria-label": v.title,
      effect: v.effect,
      enterable: v.enterable,
      "popper-class": h(c),
      "popper-style": h(s),
      teleported: v.teleported,
      "append-to": v.appendTo,
      persistent: v.persistent,
      "gpu-acceleration": h(l),
      "onUpdate:visible": h(r),
      onBeforeShow: b,
      onBeforeHide: p,
      onShow: f,
      onHide: m
    }), {
      content: q(() => [
        v.title ? (w(), I("div", {
          key: 0,
          class: U(h(o).e("title")),
          role: "title"
        }, nu(v.title), 3)) : P("v-if", !0),
        z(v.$slots, "default", {}, () => [
          $o(nu(v.content), 1)
        ])
      ]),
      default: q(() => [
        v.$slots.reference ? z(v.$slots, "reference", { key: 0 }) : P("v-if", !0)
      ]),
      _: 3
    }, 16, ["trigger", "trigger-keys", "placement", "disabled", "visible", "transition", "popper-options", "tabindex", "content", "offset", "show-after", "hide-after", "auto-close", "show-arrow", "aria-label", "effect", "enterable", "popper-class", "popper-style", "teleported", "append-to", "persistent", "gpu-acceleration", "onUpdate:visible"]));
  }
});
var Hd = /* @__PURE__ */ ce(qd, [["__file", "popover.vue"]]);
const so = (e, u) => {
  const t = u.arg || u.value, n = t?.popperRef;
  n && (n.triggerRef = e);
};
var Ud = {
  mounted(e, u) {
    so(e, u);
  },
  updated(e, u) {
    so(e, u);
  }
};
const Vd = "popover", Wd = rc(Ud, Vd), Kd = du(Hd, {
  directive: Wd
}), co = {};
function Zd(e) {
  let u = co[e];
  if (u)
    return u;
  u = co[e] = [];
  for (let t = 0; t < 128; t++) {
    const n = String.fromCharCode(t);
    u.push(n);
  }
  for (let t = 0; t < e.length; t++) {
    const n = e.charCodeAt(t);
    u[n] = "%" + ("0" + n.toString(16).toUpperCase()).slice(-2);
  }
  return u;
}
function $u(e, u) {
  typeof u != "string" && (u = $u.defaultChars);
  const t = Zd(u);
  return e.replace(/(%[a-f0-9]{2})+/gi, function(n) {
    let r = "";
    for (let o = 0, a = n.length; o < a; o += 3) {
      const i = parseInt(n.slice(o + 1, o + 3), 16);
      if (i < 128) {
        r += t[i];
        continue;
      }
      if ((i & 224) === 192 && o + 3 < a) {
        const s = parseInt(n.slice(o + 4, o + 6), 16);
        if ((s & 192) === 128) {
          const c = i << 6 & 1984 | s & 63;
          c < 128 ? r += "��" : r += String.fromCharCode(c), o += 3;
          continue;
        }
      }
      if ((i & 240) === 224 && o + 6 < a) {
        const s = parseInt(n.slice(o + 4, o + 6), 16), c = parseInt(n.slice(o + 7, o + 9), 16);
        if ((s & 192) === 128 && (c & 192) === 128) {
          const l = i << 12 & 61440 | s << 6 & 4032 | c & 63;
          l < 2048 || l >= 55296 && l <= 57343 ? r += "���" : r += String.fromCharCode(l), o += 6;
          continue;
        }
      }
      if ((i & 248) === 240 && o + 9 < a) {
        const s = parseInt(n.slice(o + 4, o + 6), 16), c = parseInt(n.slice(o + 7, o + 9), 16), l = parseInt(n.slice(o + 10, o + 12), 16);
        if ((s & 192) === 128 && (c & 192) === 128 && (l & 192) === 128) {
          let d = i << 18 & 1835008 | s << 12 & 258048 | c << 6 & 4032 | l & 63;
          d < 65536 || d > 1114111 ? r += "����" : (d -= 65536, r += String.fromCharCode(55296 + (d >> 10), 56320 + (d & 1023))), o += 9;
          continue;
        }
      }
      r += "�";
    }
    return r;
  });
}
$u.defaultChars = ";/?:@&=+$,#";
$u.componentChars = "";
const lo = {};
function Gd(e) {
  let u = lo[e];
  if (u)
    return u;
  u = lo[e] = [];
  for (let t = 0; t < 128; t++) {
    const n = String.fromCharCode(t);
    /^[0-9a-z]$/i.test(n) ? u.push(n) : u.push("%" + ("0" + t.toString(16).toUpperCase()).slice(-2));
  }
  for (let t = 0; t < e.length; t++)
    u[e.charCodeAt(t)] = e[t];
  return u;
}
function dt(e, u, t) {
  typeof u != "string" && (t = u, u = dt.defaultChars), typeof t > "u" && (t = !0);
  const n = Gd(u);
  let r = "";
  for (let o = 0, a = e.length; o < a; o++) {
    const i = e.charCodeAt(o);
    if (t && i === 37 && o + 2 < a && /^[0-9a-f]{2}$/i.test(e.slice(o + 1, o + 3))) {
      r += e.slice(o, o + 3), o += 2;
      continue;
    }
    if (i < 128) {
      r += n[i];
      continue;
    }
    if (i >= 55296 && i <= 57343) {
      if (i >= 55296 && i <= 56319 && o + 1 < a) {
        const s = e.charCodeAt(o + 1);
        if (s >= 56320 && s <= 57343) {
          r += encodeURIComponent(e[o] + e[o + 1]), o++;
          continue;
        }
      }
      r += "%EF%BF%BD";
      continue;
    }
    r += encodeURIComponent(e[o]);
  }
  return r;
}
dt.defaultChars = ";/?:@&=+$,-_.!~*'()#";
dt.componentChars = "-_.!~*'()";
function nr(e) {
  let u = "";
  return u += e.protocol || "", u += e.slashes ? "//" : "", u += e.auth ? e.auth + "@" : "", e.hostname && e.hostname.indexOf(":") !== -1 ? u += "[" + e.hostname + "]" : u += e.hostname || "", u += e.port ? ":" + e.port : "", u += e.pathname || "", u += e.search || "", u += e.hash || "", u;
}
function Nt() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
const Jd = /^([a-z0-9.+-]+:)/i, Qd = /:[0-9]*$/, Xd = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, Yd = ["<", ">", '"', "`", " ", "\r", `
`, "	"], e1 = ["{", "}", "|", "\\", "^", "`"].concat(Yd), u1 = ["'"].concat(e1), fo = ["%", "/", "?", ";", "#"].concat(u1), po = ["/", "?", "#"], t1 = 255, ho = /^[+a-z0-9A-Z_-]{0,63}$/, n1 = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, bo = {
  javascript: !0,
  "javascript:": !0
}, go = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
};
function rr(e, u) {
  if (e && e instanceof Nt) return e;
  const t = new Nt();
  return t.parse(e, u), t;
}
Nt.prototype.parse = function(e, u) {
  let t, n, r, o = e;
  if (o = o.trim(), !u && e.split("#").length === 1) {
    const c = Xd.exec(o);
    if (c)
      return this.pathname = c[1], c[2] && (this.search = c[2]), this;
  }
  let a = Jd.exec(o);
  if (a && (a = a[0], t = a.toLowerCase(), this.protocol = a, o = o.substr(a.length)), (u || a || o.match(/^\/\/[^@\/]+@[^@\/]+/)) && (r = o.substr(0, 2) === "//", r && !(a && bo[a]) && (o = o.substr(2), this.slashes = !0)), !bo[a] && (r || a && !go[a])) {
    let c = -1;
    for (let f = 0; f < po.length; f++)
      n = o.indexOf(po[f]), n !== -1 && (c === -1 || n < c) && (c = n);
    let l, d;
    c === -1 ? d = o.lastIndexOf("@") : d = o.lastIndexOf("@", c), d !== -1 && (l = o.slice(0, d), o = o.slice(d + 1), this.auth = l), c = -1;
    for (let f = 0; f < fo.length; f++)
      n = o.indexOf(fo[f]), n !== -1 && (c === -1 || n < c) && (c = n);
    c === -1 && (c = o.length), o[c - 1] === ":" && c--;
    const b = o.slice(0, c);
    o = o.slice(c), this.parseHost(b), this.hostname = this.hostname || "";
    const p = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!p) {
      const f = this.hostname.split(/\./);
      for (let m = 0, v = f.length; m < v; m++) {
        const y = f[m];
        if (y && !y.match(ho)) {
          let _ = "";
          for (let g = 0, x = y.length; g < x; g++)
            y.charCodeAt(g) > 127 ? _ += "x" : _ += y[g];
          if (!_.match(ho)) {
            const g = f.slice(0, m), x = f.slice(m + 1), k = y.match(n1);
            k && (g.push(k[1]), x.unshift(k[2])), x.length && (o = x.join(".") + o), this.hostname = g.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > t1 && (this.hostname = ""), p && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  const i = o.indexOf("#");
  i !== -1 && (this.hash = o.substr(i), o = o.slice(0, i));
  const s = o.indexOf("?");
  return s !== -1 && (this.search = o.substr(s), o = o.slice(0, s)), o && (this.pathname = o), go[t] && this.hostname && !this.pathname && (this.pathname = ""), this;
};
Nt.prototype.parseHost = function(e) {
  let u = Qd.exec(e);
  u && (u = u[0], u !== ":" && (this.port = u.substr(1)), e = e.substr(0, e.length - u.length)), e && (this.hostname = e);
};
const r1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: $u,
  encode: dt,
  format: nr,
  parse: rr
}, Symbol.toStringTag, { value: "Module" })), S0 = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, T0 = /[\0-\x1F\x7F-\x9F]/, o1 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/, or = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, O0 = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/, I0 = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/, a1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Any: S0,
  Cc: T0,
  Cf: o1,
  P: or,
  S: O0,
  Z: I0
}, Symbol.toStringTag, { value: "Module" })), i1 = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), s1 = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((e) => e.charCodeAt(0))
);
var ln;
const c1 = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]), l1 = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (ln = String.fromCodePoint) !== null && ln !== void 0 ? ln : function(e) {
    let u = "";
    return e > 65535 && (e -= 65536, u += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), u += String.fromCharCode(e), u;
  }
);
function f1(e) {
  var u;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (u = c1.get(e)) !== null && u !== void 0 ? u : e;
}
var ie;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(ie || (ie = {}));
const d1 = 32;
var au;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(au || (au = {}));
function kn(e) {
  return e >= ie.ZERO && e <= ie.NINE;
}
function p1(e) {
  return e >= ie.UPPER_A && e <= ie.UPPER_F || e >= ie.LOWER_A && e <= ie.LOWER_F;
}
function h1(e) {
  return e >= ie.UPPER_A && e <= ie.UPPER_Z || e >= ie.LOWER_A && e <= ie.LOWER_Z || kn(e);
}
function b1(e) {
  return e === ie.EQUALS || h1(e);
}
var ae;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(ae || (ae = {}));
var tu;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(tu || (tu = {}));
class g1 {
  constructor(u, t, n) {
    this.decodeTree = u, this.emitCodePoint = t, this.errors = n, this.state = ae.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = tu.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(u) {
    this.decodeMode = u, this.state = ae.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(u, t) {
    switch (this.state) {
      case ae.EntityStart:
        return u.charCodeAt(t) === ie.NUM ? (this.state = ae.NumericStart, this.consumed += 1, this.stateNumericStart(u, t + 1)) : (this.state = ae.NamedEntity, this.stateNamedEntity(u, t));
      case ae.NumericStart:
        return this.stateNumericStart(u, t);
      case ae.NumericDecimal:
        return this.stateNumericDecimal(u, t);
      case ae.NumericHex:
        return this.stateNumericHex(u, t);
      case ae.NamedEntity:
        return this.stateNamedEntity(u, t);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(u, t) {
    return t >= u.length ? -1 : (u.charCodeAt(t) | d1) === ie.LOWER_X ? (this.state = ae.NumericHex, this.consumed += 1, this.stateNumericHex(u, t + 1)) : (this.state = ae.NumericDecimal, this.stateNumericDecimal(u, t));
  }
  addToNumericResult(u, t, n, r) {
    if (t !== n) {
      const o = n - t;
      this.result = this.result * Math.pow(r, o) + parseInt(u.substr(t, o), r), this.consumed += o;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(u, t) {
    const n = t;
    for (; t < u.length; ) {
      const r = u.charCodeAt(t);
      if (kn(r) || p1(r))
        t += 1;
      else
        return this.addToNumericResult(u, n, t, 16), this.emitNumericEntity(r, 3);
    }
    return this.addToNumericResult(u, n, t, 16), -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(u, t) {
    const n = t;
    for (; t < u.length; ) {
      const r = u.charCodeAt(t);
      if (kn(r))
        t += 1;
      else
        return this.addToNumericResult(u, n, t, 10), this.emitNumericEntity(r, 2);
    }
    return this.addToNumericResult(u, n, t, 10), -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(u, t) {
    var n;
    if (this.consumed <= t)
      return (n = this.errors) === null || n === void 0 || n.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (u === ie.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === tu.Strict)
      return 0;
    return this.emitCodePoint(f1(this.result), this.consumed), this.errors && (u !== ie.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(u, t) {
    const { decodeTree: n } = this;
    let r = n[this.treeIndex], o = (r & au.VALUE_LENGTH) >> 14;
    for (; t < u.length; t++, this.excess++) {
      const a = u.charCodeAt(t);
      if (this.treeIndex = m1(n, r, this.treeIndex + Math.max(1, o), a), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === tu.Attribute && // We shouldn't have consumed any characters after the entity,
        (o === 0 || // And there should be no invalid characters.
        b1(a)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (r = n[this.treeIndex], o = (r & au.VALUE_LENGTH) >> 14, o !== 0) {
        if (a === ie.SEMI)
          return this.emitNamedEntityData(this.treeIndex, o, this.consumed + this.excess);
        this.decodeMode !== tu.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var u;
    const { result: t, decodeTree: n } = this, r = (n[t] & au.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(t, r, this.consumed), (u = this.errors) === null || u === void 0 || u.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(u, t, n) {
    const { decodeTree: r } = this;
    return this.emitCodePoint(t === 1 ? r[u] & ~au.VALUE_LENGTH : r[u + 1], n), t === 3 && this.emitCodePoint(r[u + 2], n), n;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var u;
    switch (this.state) {
      case ae.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== tu.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      // Otherwise, emit a numeric entity if we have one.
      case ae.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case ae.NumericHex:
        return this.emitNumericEntity(0, 3);
      case ae.NumericStart:
        return (u = this.errors) === null || u === void 0 || u.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case ae.EntityStart:
        return 0;
    }
  }
}
function P0(e) {
  let u = "";
  const t = new g1(e, (n) => u += l1(n));
  return function(r, o) {
    let a = 0, i = 0;
    for (; (i = r.indexOf("&", i)) >= 0; ) {
      u += r.slice(a, i), t.startEntity(o);
      const c = t.write(
        r,
        // Skip the "&"
        i + 1
      );
      if (c < 0) {
        a = i + t.end();
        break;
      }
      a = i + c, i = c === 0 ? a + 1 : a;
    }
    const s = u + r.slice(a);
    return u = "", s;
  };
}
function m1(e, u, t, n) {
  const r = (u & au.BRANCH_LENGTH) >> 7, o = u & au.JUMP_TABLE;
  if (r === 0)
    return o !== 0 && n === o ? t : -1;
  if (o) {
    const s = n - o;
    return s < 0 || s >= r ? -1 : e[t + s] - 1;
  }
  let a = t, i = a + r - 1;
  for (; a <= i; ) {
    const s = a + i >>> 1, c = e[s];
    if (c < n)
      a = s + 1;
    else if (c > n)
      i = s - 1;
    else
      return e[s + r];
  }
  return -1;
}
const v1 = P0(i1);
P0(s1);
function B0(e, u = tu.Legacy) {
  return v1(e, u);
}
function y1(e) {
  return Object.prototype.toString.call(e);
}
function ar(e) {
  return y1(e) === "[object String]";
}
const _1 = Object.prototype.hasOwnProperty;
function x1(e, u) {
  return _1.call(e, u);
}
function Gt(e) {
  return Array.prototype.slice.call(arguments, 1).forEach(function(t) {
    if (t) {
      if (typeof t != "object")
        throw new TypeError(t + "must be object");
      Object.keys(t).forEach(function(n) {
        e[n] = t[n];
      });
    }
  }), e;
}
function R0(e, u, t) {
  return [].concat(e.slice(0, u), t, e.slice(u + 1));
}
function ir(e) {
  return !(e >= 55296 && e <= 57343 || e >= 64976 && e <= 65007 || (e & 65535) === 65535 || (e & 65535) === 65534 || e >= 0 && e <= 8 || e === 11 || e >= 14 && e <= 31 || e >= 127 && e <= 159 || e > 1114111);
}
function Lt(e) {
  if (e > 65535) {
    e -= 65536;
    const u = 55296 + (e >> 10), t = 56320 + (e & 1023);
    return String.fromCharCode(u, t);
  }
  return String.fromCharCode(e);
}
const M0 = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g, k1 = /&([a-z#][a-z0-9]{1,31});/gi, E1 = new RegExp(M0.source + "|" + k1.source, "gi"), C1 = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function w1(e, u) {
  if (u.charCodeAt(0) === 35 && C1.test(u)) {
    const n = u[1].toLowerCase() === "x" ? parseInt(u.slice(2), 16) : parseInt(u.slice(1), 10);
    return ir(n) ? Lt(n) : e;
  }
  const t = B0(e);
  return t !== e ? t : e;
}
function A1(e) {
  return e.indexOf("\\") < 0 ? e : e.replace(M0, "$1");
}
function zu(e) {
  return e.indexOf("\\") < 0 && e.indexOf("&") < 0 ? e : e.replace(E1, function(u, t, n) {
    return t || w1(u, n);
  });
}
const F1 = /[&<>"]/, D1 = /[&<>"]/g, S1 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function T1(e) {
  return S1[e];
}
function fu(e) {
  return F1.test(e) ? e.replace(D1, T1) : e;
}
const O1 = /[.?*+^$[\]\\(){}|-]/g;
function I1(e) {
  return e.replace(O1, "\\$&");
}
function J(e) {
  switch (e) {
    case 9:
    case 32:
      return !0;
  }
  return !1;
}
function rt(e) {
  if (e >= 8192 && e <= 8202)
    return !0;
  switch (e) {
    case 9:
    // \t
    case 10:
    // \n
    case 11:
    // \v
    case 12:
    // \f
    case 13:
    // \r
    case 32:
    case 160:
    case 5760:
    case 8239:
    case 8287:
    case 12288:
      return !0;
  }
  return !1;
}
function ot(e) {
  return or.test(e) || O0.test(e);
}
function at(e) {
  switch (e) {
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 124:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
function Jt(e) {
  return e = e.trim().replace(/\s+/g, " "), "ẞ".toLowerCase() === "Ṿ" && (e = e.replace(/ẞ/g, "ß")), e.toLowerCase().toUpperCase();
}
const P1 = { mdurl: r1, ucmicro: a1 }, B1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  arrayReplaceAt: R0,
  assign: Gt,
  escapeHtml: fu,
  escapeRE: I1,
  fromCodePoint: Lt,
  has: x1,
  isMdAsciiPunct: at,
  isPunctChar: ot,
  isSpace: J,
  isString: ar,
  isValidEntityCode: ir,
  isWhiteSpace: rt,
  lib: P1,
  normalizeReference: Jt,
  unescapeAll: zu,
  unescapeMd: A1
}, Symbol.toStringTag, { value: "Module" }));
function R1(e, u, t) {
  let n, r, o, a;
  const i = e.posMax, s = e.pos;
  for (e.pos = u + 1, n = 1; e.pos < i; ) {
    if (o = e.src.charCodeAt(e.pos), o === 93 && (n--, n === 0)) {
      r = !0;
      break;
    }
    if (a = e.pos, e.md.inline.skipToken(e), o === 91) {
      if (a === e.pos - 1)
        n++;
      else if (t)
        return e.pos = s, -1;
    }
  }
  let c = -1;
  return r && (c = e.pos), e.pos = s, c;
}
function M1(e, u, t) {
  let n, r = u;
  const o = {
    ok: !1,
    pos: 0,
    str: ""
  };
  if (e.charCodeAt(r) === 60) {
    for (r++; r < t; ) {
      if (n = e.charCodeAt(r), n === 10 || n === 60)
        return o;
      if (n === 62)
        return o.pos = r + 1, o.str = zu(e.slice(u + 1, r)), o.ok = !0, o;
      if (n === 92 && r + 1 < t) {
        r += 2;
        continue;
      }
      r++;
    }
    return o;
  }
  let a = 0;
  for (; r < t && (n = e.charCodeAt(r), !(n === 32 || n < 32 || n === 127)); ) {
    if (n === 92 && r + 1 < t) {
      if (e.charCodeAt(r + 1) === 32)
        break;
      r += 2;
      continue;
    }
    if (n === 40 && (a++, a > 32))
      return o;
    if (n === 41) {
      if (a === 0)
        break;
      a--;
    }
    r++;
  }
  return u === r || a !== 0 || (o.str = zu(e.slice(u, r)), o.pos = r, o.ok = !0), o;
}
function $1(e, u, t, n) {
  let r, o = u;
  const a = {
    // if `true`, this is a valid link title
    ok: !1,
    // if `true`, this link can be continued on the next line
    can_continue: !1,
    // if `ok`, it's the position of the first character after the closing marker
    pos: 0,
    // if `ok`, it's the unescaped title
    str: "",
    // expected closing marker character code
    marker: 0
  };
  if (n)
    a.str = n.str, a.marker = n.marker;
  else {
    if (o >= t)
      return a;
    let i = e.charCodeAt(o);
    if (i !== 34 && i !== 39 && i !== 40)
      return a;
    u++, o++, i === 40 && (i = 41), a.marker = i;
  }
  for (; o < t; ) {
    if (r = e.charCodeAt(o), r === a.marker)
      return a.pos = o + 1, a.str += zu(e.slice(u, o)), a.ok = !0, a;
    if (r === 40 && a.marker === 41)
      return a;
    r === 92 && o + 1 < t && o++, o++;
  }
  return a.can_continue = !0, a.str += zu(e.slice(u, o)), a;
}
const z1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  parseLinkDestination: M1,
  parseLinkLabel: R1,
  parseLinkTitle: $1
}, Symbol.toStringTag, { value: "Module" })), Ne = {};
Ne.code_inline = function(e, u, t, n, r) {
  const o = e[u];
  return "<code" + r.renderAttrs(o) + ">" + fu(o.content) + "</code>";
};
Ne.code_block = function(e, u, t, n, r) {
  const o = e[u];
  return "<pre" + r.renderAttrs(o) + "><code>" + fu(e[u].content) + `</code></pre>
`;
};
Ne.fence = function(e, u, t, n, r) {
  const o = e[u], a = o.info ? zu(o.info).trim() : "";
  let i = "", s = "";
  if (a) {
    const l = a.split(/(\s+)/g);
    i = l[0], s = l.slice(2).join("");
  }
  let c;
  if (t.highlight ? c = t.highlight(o.content, i, s) || fu(o.content) : c = fu(o.content), c.indexOf("<pre") === 0)
    return c + `
`;
  if (a) {
    const l = o.attrIndex("class"), d = o.attrs ? o.attrs.slice() : [];
    l < 0 ? d.push(["class", t.langPrefix + i]) : (d[l] = d[l].slice(), d[l][1] += " " + t.langPrefix + i);
    const b = {
      attrs: d
    };
    return `<pre><code${r.renderAttrs(b)}>${c}</code></pre>
`;
  }
  return `<pre><code${r.renderAttrs(o)}>${c}</code></pre>
`;
};
Ne.image = function(e, u, t, n, r) {
  const o = e[u];
  return o.attrs[o.attrIndex("alt")][1] = r.renderInlineAsText(o.children, t, n), r.renderToken(e, u, t);
};
Ne.hardbreak = function(e, u, t) {
  return t.xhtmlOut ? `<br />
` : `<br>
`;
};
Ne.softbreak = function(e, u, t) {
  return t.breaks ? t.xhtmlOut ? `<br />
` : `<br>
` : `
`;
};
Ne.text = function(e, u) {
  return fu(e[u].content);
};
Ne.html_block = function(e, u) {
  return e[u].content;
};
Ne.html_inline = function(e, u) {
  return e[u].content;
};
function Lu() {
  this.rules = Gt({}, Ne);
}
Lu.prototype.renderAttrs = function(u) {
  let t, n, r;
  if (!u.attrs)
    return "";
  for (r = "", t = 0, n = u.attrs.length; t < n; t++)
    r += " " + fu(u.attrs[t][0]) + '="' + fu(u.attrs[t][1]) + '"';
  return r;
};
Lu.prototype.renderToken = function(u, t, n) {
  const r = u[t];
  let o = "";
  if (r.hidden)
    return "";
  r.block && r.nesting !== -1 && t && u[t - 1].hidden && (o += `
`), o += (r.nesting === -1 ? "</" : "<") + r.tag, o += this.renderAttrs(r), r.nesting === 0 && n.xhtmlOut && (o += " /");
  let a = !1;
  if (r.block && (a = !0, r.nesting === 1 && t + 1 < u.length)) {
    const i = u[t + 1];
    (i.type === "inline" || i.hidden || i.nesting === -1 && i.tag === r.tag) && (a = !1);
  }
  return o += a ? `>
` : ">", o;
};
Lu.prototype.renderInline = function(e, u, t) {
  let n = "";
  const r = this.rules;
  for (let o = 0, a = e.length; o < a; o++) {
    const i = e[o].type;
    typeof r[i] < "u" ? n += r[i](e, o, u, t, this) : n += this.renderToken(e, o, u);
  }
  return n;
};
Lu.prototype.renderInlineAsText = function(e, u, t) {
  let n = "";
  for (let r = 0, o = e.length; r < o; r++)
    switch (e[r].type) {
      case "text":
        n += e[r].content;
        break;
      case "image":
        n += this.renderInlineAsText(e[r].children, u, t);
        break;
      case "html_inline":
      case "html_block":
        n += e[r].content;
        break;
      case "softbreak":
      case "hardbreak":
        n += `
`;
        break;
    }
  return n;
};
Lu.prototype.render = function(e, u, t) {
  let n = "";
  const r = this.rules;
  for (let o = 0, a = e.length; o < a; o++) {
    const i = e[o].type;
    i === "inline" ? n += this.renderInline(e[o].children, u, t) : typeof r[i] < "u" ? n += r[i](e, o, u, t, this) : n += this.renderToken(e, o, u, t);
  }
  return n;
};
function be() {
  this.__rules__ = [], this.__cache__ = null;
}
be.prototype.__find__ = function(e) {
  for (let u = 0; u < this.__rules__.length; u++)
    if (this.__rules__[u].name === e)
      return u;
  return -1;
};
be.prototype.__compile__ = function() {
  const e = this, u = [""];
  e.__rules__.forEach(function(t) {
    t.enabled && t.alt.forEach(function(n) {
      u.indexOf(n) < 0 && u.push(n);
    });
  }), e.__cache__ = {}, u.forEach(function(t) {
    e.__cache__[t] = [], e.__rules__.forEach(function(n) {
      n.enabled && (t && n.alt.indexOf(t) < 0 || e.__cache__[t].push(n.fn));
    });
  });
};
be.prototype.at = function(e, u, t) {
  const n = this.__find__(e), r = t || {};
  if (n === -1)
    throw new Error("Parser rule not found: " + e);
  this.__rules__[n].fn = u, this.__rules__[n].alt = r.alt || [], this.__cache__ = null;
};
be.prototype.before = function(e, u, t, n) {
  const r = this.__find__(e), o = n || {};
  if (r === -1)
    throw new Error("Parser rule not found: " + e);
  this.__rules__.splice(r, 0, {
    name: u,
    enabled: !0,
    fn: t,
    alt: o.alt || []
  }), this.__cache__ = null;
};
be.prototype.after = function(e, u, t, n) {
  const r = this.__find__(e), o = n || {};
  if (r === -1)
    throw new Error("Parser rule not found: " + e);
  this.__rules__.splice(r + 1, 0, {
    name: u,
    enabled: !0,
    fn: t,
    alt: o.alt || []
  }), this.__cache__ = null;
};
be.prototype.push = function(e, u, t) {
  const n = t || {};
  this.__rules__.push({
    name: e,
    enabled: !0,
    fn: u,
    alt: n.alt || []
  }), this.__cache__ = null;
};
be.prototype.enable = function(e, u) {
  Array.isArray(e) || (e = [e]);
  const t = [];
  return e.forEach(function(n) {
    const r = this.__find__(n);
    if (r < 0) {
      if (u)
        return;
      throw new Error("Rules manager: invalid rule name " + n);
    }
    this.__rules__[r].enabled = !0, t.push(n);
  }, this), this.__cache__ = null, t;
};
be.prototype.enableOnly = function(e, u) {
  Array.isArray(e) || (e = [e]), this.__rules__.forEach(function(t) {
    t.enabled = !1;
  }), this.enable(e, u);
};
be.prototype.disable = function(e, u) {
  Array.isArray(e) || (e = [e]);
  const t = [];
  return e.forEach(function(n) {
    const r = this.__find__(n);
    if (r < 0) {
      if (u)
        return;
      throw new Error("Rules manager: invalid rule name " + n);
    }
    this.__rules__[r].enabled = !1, t.push(n);
  }, this), this.__cache__ = null, t;
};
be.prototype.getRules = function(e) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[e] || [];
};
function Ie(e, u, t) {
  this.type = e, this.tag = u, this.attrs = null, this.map = null, this.nesting = t, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
}
Ie.prototype.attrIndex = function(u) {
  if (!this.attrs)
    return -1;
  const t = this.attrs;
  for (let n = 0, r = t.length; n < r; n++)
    if (t[n][0] === u)
      return n;
  return -1;
};
Ie.prototype.attrPush = function(u) {
  this.attrs ? this.attrs.push(u) : this.attrs = [u];
};
Ie.prototype.attrSet = function(u, t) {
  const n = this.attrIndex(u), r = [u, t];
  n < 0 ? this.attrPush(r) : this.attrs[n] = r;
};
Ie.prototype.attrGet = function(u) {
  const t = this.attrIndex(u);
  let n = null;
  return t >= 0 && (n = this.attrs[t][1]), n;
};
Ie.prototype.attrJoin = function(u, t) {
  const n = this.attrIndex(u);
  n < 0 ? this.attrPush([u, t]) : this.attrs[n][1] = this.attrs[n][1] + " " + t;
};
function $0(e, u, t) {
  this.src = e, this.env = t, this.tokens = [], this.inlineMode = !1, this.md = u;
}
$0.prototype.Token = Ie;
const N1 = /\r\n?|\n/g, L1 = /\0/g;
function j1(e) {
  let u;
  u = e.src.replace(N1, `
`), u = u.replace(L1, "�"), e.src = u;
}
function q1(e) {
  let u;
  e.inlineMode ? (u = new e.Token("inline", "", 0), u.content = e.src, u.map = [0, 1], u.children = [], e.tokens.push(u)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);
}
function H1(e) {
  const u = e.tokens;
  for (let t = 0, n = u.length; t < n; t++) {
    const r = u[t];
    r.type === "inline" && e.md.inline.parse(r.content, e.md, e.env, r.children);
  }
}
function U1(e) {
  return /^<a[>\s]/i.test(e);
}
function V1(e) {
  return /^<\/a\s*>/i.test(e);
}
function W1(e) {
  const u = e.tokens;
  if (e.md.options.linkify)
    for (let t = 0, n = u.length; t < n; t++) {
      if (u[t].type !== "inline" || !e.md.linkify.pretest(u[t].content))
        continue;
      let r = u[t].children, o = 0;
      for (let a = r.length - 1; a >= 0; a--) {
        const i = r[a];
        if (i.type === "link_close") {
          for (a--; r[a].level !== i.level && r[a].type !== "link_open"; )
            a--;
          continue;
        }
        if (i.type === "html_inline" && (U1(i.content) && o > 0 && o--, V1(i.content) && o++), !(o > 0) && i.type === "text" && e.md.linkify.test(i.content)) {
          const s = i.content;
          let c = e.md.linkify.match(s);
          const l = [];
          let d = i.level, b = 0;
          c.length > 0 && c[0].index === 0 && a > 0 && r[a - 1].type === "text_special" && (c = c.slice(1));
          for (let p = 0; p < c.length; p++) {
            const f = c[p].url, m = e.md.normalizeLink(f);
            if (!e.md.validateLink(m))
              continue;
            let v = c[p].text;
            c[p].schema ? c[p].schema === "mailto:" && !/^mailto:/i.test(v) ? v = e.md.normalizeLinkText("mailto:" + v).replace(/^mailto:/, "") : v = e.md.normalizeLinkText(v) : v = e.md.normalizeLinkText("http://" + v).replace(/^http:\/\//, "");
            const y = c[p].index;
            if (y > b) {
              const k = new e.Token("text", "", 0);
              k.content = s.slice(b, y), k.level = d, l.push(k);
            }
            const _ = new e.Token("link_open", "a", 1);
            _.attrs = [["href", m]], _.level = d++, _.markup = "linkify", _.info = "auto", l.push(_);
            const g = new e.Token("text", "", 0);
            g.content = v, g.level = d, l.push(g);
            const x = new e.Token("link_close", "a", -1);
            x.level = --d, x.markup = "linkify", x.info = "auto", l.push(x), b = c[p].lastIndex;
          }
          if (b < s.length) {
            const p = new e.Token("text", "", 0);
            p.content = s.slice(b), p.level = d, l.push(p);
          }
          u[t].children = r = R0(r, a, l);
        }
      }
    }
}
const z0 = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, K1 = /\((c|tm|r)\)/i, Z1 = /\((c|tm|r)\)/ig, G1 = {
  c: "©",
  r: "®",
  tm: "™"
};
function J1(e, u) {
  return G1[u.toLowerCase()];
}
function Q1(e) {
  let u = 0;
  for (let t = e.length - 1; t >= 0; t--) {
    const n = e[t];
    n.type === "text" && !u && (n.content = n.content.replace(Z1, J1)), n.type === "link_open" && n.info === "auto" && u--, n.type === "link_close" && n.info === "auto" && u++;
  }
}
function X1(e) {
  let u = 0;
  for (let t = e.length - 1; t >= 0; t--) {
    const n = e[t];
    n.type === "text" && !u && z0.test(n.content) && (n.content = n.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–")), n.type === "link_open" && n.info === "auto" && u--, n.type === "link_close" && n.info === "auto" && u++;
  }
}
function Y1(e) {
  let u;
  if (e.md.options.typographer)
    for (u = e.tokens.length - 1; u >= 0; u--)
      e.tokens[u].type === "inline" && (K1.test(e.tokens[u].content) && Q1(e.tokens[u].children), z0.test(e.tokens[u].content) && X1(e.tokens[u].children));
}
const ep = /['"]/, mo = /['"]/g, vo = "’";
function Ft(e, u, t) {
  return e.slice(0, u) + t + e.slice(u + 1);
}
function up(e, u) {
  let t;
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r], a = e[r].level;
    for (t = n.length - 1; t >= 0 && !(n[t].level <= a); t--)
      ;
    if (n.length = t + 1, o.type !== "text")
      continue;
    let i = o.content, s = 0, c = i.length;
    e:
      for (; s < c; ) {
        mo.lastIndex = s;
        const l = mo.exec(i);
        if (!l)
          break;
        let d = !0, b = !0;
        s = l.index + 1;
        const p = l[0] === "'";
        let f = 32;
        if (l.index - 1 >= 0)
          f = i.charCodeAt(l.index - 1);
        else
          for (t = r - 1; t >= 0 && !(e[t].type === "softbreak" || e[t].type === "hardbreak"); t--)
            if (e[t].content) {
              f = e[t].content.charCodeAt(e[t].content.length - 1);
              break;
            }
        let m = 32;
        if (s < c)
          m = i.charCodeAt(s);
        else
          for (t = r + 1; t < e.length && !(e[t].type === "softbreak" || e[t].type === "hardbreak"); t++)
            if (e[t].content) {
              m = e[t].content.charCodeAt(0);
              break;
            }
        const v = at(f) || ot(String.fromCharCode(f)), y = at(m) || ot(String.fromCharCode(m)), _ = rt(f), g = rt(m);
        if (g ? d = !1 : y && (_ || v || (d = !1)), _ ? b = !1 : v && (g || y || (b = !1)), m === 34 && l[0] === '"' && f >= 48 && f <= 57 && (b = d = !1), d && b && (d = v, b = y), !d && !b) {
          p && (o.content = Ft(o.content, l.index, vo));
          continue;
        }
        if (b)
          for (t = n.length - 1; t >= 0; t--) {
            let x = n[t];
            if (n[t].level < a)
              break;
            if (x.single === p && n[t].level === a) {
              x = n[t];
              let k, E;
              p ? (k = u.md.options.quotes[2], E = u.md.options.quotes[3]) : (k = u.md.options.quotes[0], E = u.md.options.quotes[1]), o.content = Ft(o.content, l.index, E), e[x.token].content = Ft(
                e[x.token].content,
                x.pos,
                k
              ), s += E.length - 1, x.token === r && (s += k.length - 1), i = o.content, c = i.length, n.length = t;
              continue e;
            }
          }
        d ? n.push({
          token: r,
          pos: l.index,
          single: p,
          level: a
        }) : b && p && (o.content = Ft(o.content, l.index, vo));
      }
  }
}
function tp(e) {
  if (e.md.options.typographer)
    for (let u = e.tokens.length - 1; u >= 0; u--)
      e.tokens[u].type !== "inline" || !ep.test(e.tokens[u].content) || up(e.tokens[u].children, e);
}
function np(e) {
  let u, t;
  const n = e.tokens, r = n.length;
  for (let o = 0; o < r; o++) {
    if (n[o].type !== "inline") continue;
    const a = n[o].children, i = a.length;
    for (u = 0; u < i; u++)
      a[u].type === "text_special" && (a[u].type = "text");
    for (u = t = 0; u < i; u++)
      a[u].type === "text" && u + 1 < i && a[u + 1].type === "text" ? a[u + 1].content = a[u].content + a[u + 1].content : (u !== t && (a[t] = a[u]), t++);
    u !== t && (a.length = t);
  }
}
const fn = [
  ["normalize", j1],
  ["block", q1],
  ["inline", H1],
  ["linkify", W1],
  ["replacements", Y1],
  ["smartquotes", tp],
  // `text_join` finds `text_special` tokens (for escape sequences)
  // and joins them with the rest of the text
  ["text_join", np]
];
function sr() {
  this.ruler = new be();
  for (let e = 0; e < fn.length; e++)
    this.ruler.push(fn[e][0], fn[e][1]);
}
sr.prototype.process = function(e) {
  const u = this.ruler.getRules("");
  for (let t = 0, n = u.length; t < n; t++)
    u[t](e);
};
sr.prototype.State = $0;
function Le(e, u, t, n) {
  this.src = e, this.md = u, this.env = t, this.tokens = n, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0;
  const r = this.src;
  for (let o = 0, a = 0, i = 0, s = 0, c = r.length, l = !1; a < c; a++) {
    const d = r.charCodeAt(a);
    if (!l)
      if (J(d)) {
        i++, d === 9 ? s += 4 - s % 4 : s++;
        continue;
      } else
        l = !0;
    (d === 10 || a === c - 1) && (d !== 10 && a++, this.bMarks.push(o), this.eMarks.push(a), this.tShift.push(i), this.sCount.push(s), this.bsCount.push(0), l = !1, i = 0, s = 0, o = a + 1);
  }
  this.bMarks.push(r.length), this.eMarks.push(r.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
Le.prototype.push = function(e, u, t) {
  const n = new Ie(e, u, t);
  return n.block = !0, t < 0 && this.level--, n.level = this.level, t > 0 && this.level++, this.tokens.push(n), n;
};
Le.prototype.isEmpty = function(u) {
  return this.bMarks[u] + this.tShift[u] >= this.eMarks[u];
};
Le.prototype.skipEmptyLines = function(u) {
  for (let t = this.lineMax; u < t && !(this.bMarks[u] + this.tShift[u] < this.eMarks[u]); u++)
    ;
  return u;
};
Le.prototype.skipSpaces = function(u) {
  for (let t = this.src.length; u < t; u++) {
    const n = this.src.charCodeAt(u);
    if (!J(n))
      break;
  }
  return u;
};
Le.prototype.skipSpacesBack = function(u, t) {
  if (u <= t)
    return u;
  for (; u > t; )
    if (!J(this.src.charCodeAt(--u)))
      return u + 1;
  return u;
};
Le.prototype.skipChars = function(u, t) {
  for (let n = this.src.length; u < n && this.src.charCodeAt(u) === t; u++)
    ;
  return u;
};
Le.prototype.skipCharsBack = function(u, t, n) {
  if (u <= n)
    return u;
  for (; u > n; )
    if (t !== this.src.charCodeAt(--u))
      return u + 1;
  return u;
};
Le.prototype.getLines = function(u, t, n, r) {
  if (u >= t)
    return "";
  const o = new Array(t - u);
  for (let a = 0, i = u; i < t; i++, a++) {
    let s = 0;
    const c = this.bMarks[i];
    let l = c, d;
    for (i + 1 < t || r ? d = this.eMarks[i] + 1 : d = this.eMarks[i]; l < d && s < n; ) {
      const b = this.src.charCodeAt(l);
      if (J(b))
        b === 9 ? s += 4 - (s + this.bsCount[i]) % 4 : s++;
      else if (l - c < this.tShift[i])
        s++;
      else
        break;
      l++;
    }
    s > n ? o[a] = new Array(s - n + 1).join(" ") + this.src.slice(l, d) : o[a] = this.src.slice(l, d);
  }
  return o.join("");
};
Le.prototype.Token = Ie;
const rp = 65536;
function dn(e, u) {
  const t = e.bMarks[u] + e.tShift[u], n = e.eMarks[u];
  return e.src.slice(t, n);
}
function yo(e) {
  const u = [], t = e.length;
  let n = 0, r = e.charCodeAt(n), o = !1, a = 0, i = "";
  for (; n < t; )
    r === 124 && (o ? (i += e.substring(a, n - 1), a = n) : (u.push(i + e.substring(a, n)), i = "", a = n + 1)), o = r === 92, n++, r = e.charCodeAt(n);
  return u.push(i + e.substring(a)), u;
}
function op(e, u, t, n) {
  if (u + 2 > t)
    return !1;
  let r = u + 1;
  if (e.sCount[r] < e.blkIndent || e.sCount[r] - e.blkIndent >= 4)
    return !1;
  let o = e.bMarks[r] + e.tShift[r];
  if (o >= e.eMarks[r])
    return !1;
  const a = e.src.charCodeAt(o++);
  if (a !== 124 && a !== 45 && a !== 58 || o >= e.eMarks[r])
    return !1;
  const i = e.src.charCodeAt(o++);
  if (i !== 124 && i !== 45 && i !== 58 && !J(i) || a === 45 && J(i))
    return !1;
  for (; o < e.eMarks[r]; ) {
    const x = e.src.charCodeAt(o);
    if (x !== 124 && x !== 45 && x !== 58 && !J(x))
      return !1;
    o++;
  }
  let s = dn(e, u + 1), c = s.split("|");
  const l = [];
  for (let x = 0; x < c.length; x++) {
    const k = c[x].trim();
    if (!k) {
      if (x === 0 || x === c.length - 1)
        continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(k))
      return !1;
    k.charCodeAt(k.length - 1) === 58 ? l.push(k.charCodeAt(0) === 58 ? "center" : "right") : k.charCodeAt(0) === 58 ? l.push("left") : l.push("");
  }
  if (s = dn(e, u).trim(), s.indexOf("|") === -1 || e.sCount[u] - e.blkIndent >= 4)
    return !1;
  c = yo(s), c.length && c[0] === "" && c.shift(), c.length && c[c.length - 1] === "" && c.pop();
  const d = c.length;
  if (d === 0 || d !== l.length)
    return !1;
  if (n)
    return !0;
  const b = e.parentType;
  e.parentType = "table";
  const p = e.md.block.ruler.getRules("blockquote"), f = e.push("table_open", "table", 1), m = [u, 0];
  f.map = m;
  const v = e.push("thead_open", "thead", 1);
  v.map = [u, u + 1];
  const y = e.push("tr_open", "tr", 1);
  y.map = [u, u + 1];
  for (let x = 0; x < c.length; x++) {
    const k = e.push("th_open", "th", 1);
    l[x] && (k.attrs = [["style", "text-align:" + l[x]]]);
    const E = e.push("inline", "", 0);
    E.content = c[x].trim(), E.children = [], e.push("th_close", "th", -1);
  }
  e.push("tr_close", "tr", -1), e.push("thead_close", "thead", -1);
  let _, g = 0;
  for (r = u + 2; r < t && !(e.sCount[r] < e.blkIndent); r++) {
    let x = !1;
    for (let E = 0, C = p.length; E < C; E++)
      if (p[E](e, r, t, !0)) {
        x = !0;
        break;
      }
    if (x || (s = dn(e, r).trim(), !s) || e.sCount[r] - e.blkIndent >= 4 || (c = yo(s), c.length && c[0] === "" && c.shift(), c.length && c[c.length - 1] === "" && c.pop(), g += d - c.length, g > rp))
      break;
    if (r === u + 2) {
      const E = e.push("tbody_open", "tbody", 1);
      E.map = _ = [u + 2, 0];
    }
    const k = e.push("tr_open", "tr", 1);
    k.map = [r, r + 1];
    for (let E = 0; E < d; E++) {
      const C = e.push("td_open", "td", 1);
      l[E] && (C.attrs = [["style", "text-align:" + l[E]]]);
      const S = e.push("inline", "", 0);
      S.content = c[E] ? c[E].trim() : "", S.children = [], e.push("td_close", "td", -1);
    }
    e.push("tr_close", "tr", -1);
  }
  return _ && (e.push("tbody_close", "tbody", -1), _[1] = r), e.push("table_close", "table", -1), m[1] = r, e.parentType = b, e.line = r, !0;
}
function ap(e, u, t) {
  if (e.sCount[u] - e.blkIndent < 4)
    return !1;
  let n = u + 1, r = n;
  for (; n < t; ) {
    if (e.isEmpty(n)) {
      n++;
      continue;
    }
    if (e.sCount[n] - e.blkIndent >= 4) {
      n++, r = n;
      continue;
    }
    break;
  }
  e.line = r;
  const o = e.push("code_block", "code", 0);
  return o.content = e.getLines(u, r, 4 + e.blkIndent, !1) + `
`, o.map = [u, e.line], !0;
}
function ip(e, u, t, n) {
  let r = e.bMarks[u] + e.tShift[u], o = e.eMarks[u];
  if (e.sCount[u] - e.blkIndent >= 4 || r + 3 > o)
    return !1;
  const a = e.src.charCodeAt(r);
  if (a !== 126 && a !== 96)
    return !1;
  let i = r;
  r = e.skipChars(r, a);
  let s = r - i;
  if (s < 3)
    return !1;
  const c = e.src.slice(i, r), l = e.src.slice(r, o);
  if (a === 96 && l.indexOf(String.fromCharCode(a)) >= 0)
    return !1;
  if (n)
    return !0;
  let d = u, b = !1;
  for (; d++, !(d >= t || (r = i = e.bMarks[d] + e.tShift[d], o = e.eMarks[d], r < o && e.sCount[d] < e.blkIndent)); )
    if (e.src.charCodeAt(r) === a && !(e.sCount[d] - e.blkIndent >= 4) && (r = e.skipChars(r, a), !(r - i < s) && (r = e.skipSpaces(r), !(r < o)))) {
      b = !0;
      break;
    }
  s = e.sCount[u], e.line = d + (b ? 1 : 0);
  const p = e.push("fence", "code", 0);
  return p.info = l, p.content = e.getLines(u + 1, d, s, !0), p.markup = c, p.map = [u, e.line], !0;
}
function sp(e, u, t, n) {
  let r = e.bMarks[u] + e.tShift[u], o = e.eMarks[u];
  const a = e.lineMax;
  if (e.sCount[u] - e.blkIndent >= 4 || e.src.charCodeAt(r) !== 62)
    return !1;
  if (n)
    return !0;
  const i = [], s = [], c = [], l = [], d = e.md.block.ruler.getRules("blockquote"), b = e.parentType;
  e.parentType = "blockquote";
  let p = !1, f;
  for (f = u; f < t; f++) {
    const g = e.sCount[f] < e.blkIndent;
    if (r = e.bMarks[f] + e.tShift[f], o = e.eMarks[f], r >= o)
      break;
    if (e.src.charCodeAt(r++) === 62 && !g) {
      let k = e.sCount[f] + 1, E, C;
      e.src.charCodeAt(r) === 32 ? (r++, k++, C = !1, E = !0) : e.src.charCodeAt(r) === 9 ? (E = !0, (e.bsCount[f] + k) % 4 === 3 ? (r++, k++, C = !1) : C = !0) : E = !1;
      let S = k;
      for (i.push(e.bMarks[f]), e.bMarks[f] = r; r < o; ) {
        const T = e.src.charCodeAt(r);
        if (J(T))
          T === 9 ? S += 4 - (S + e.bsCount[f] + (C ? 1 : 0)) % 4 : S++;
        else
          break;
        r++;
      }
      p = r >= o, s.push(e.bsCount[f]), e.bsCount[f] = e.sCount[f] + 1 + (E ? 1 : 0), c.push(e.sCount[f]), e.sCount[f] = S - k, l.push(e.tShift[f]), e.tShift[f] = r - e.bMarks[f];
      continue;
    }
    if (p)
      break;
    let x = !1;
    for (let k = 0, E = d.length; k < E; k++)
      if (d[k](e, f, t, !0)) {
        x = !0;
        break;
      }
    if (x) {
      e.lineMax = f, e.blkIndent !== 0 && (i.push(e.bMarks[f]), s.push(e.bsCount[f]), l.push(e.tShift[f]), c.push(e.sCount[f]), e.sCount[f] -= e.blkIndent);
      break;
    }
    i.push(e.bMarks[f]), s.push(e.bsCount[f]), l.push(e.tShift[f]), c.push(e.sCount[f]), e.sCount[f] = -1;
  }
  const m = e.blkIndent;
  e.blkIndent = 0;
  const v = e.push("blockquote_open", "blockquote", 1);
  v.markup = ">";
  const y = [u, 0];
  v.map = y, e.md.block.tokenize(e, u, f);
  const _ = e.push("blockquote_close", "blockquote", -1);
  _.markup = ">", e.lineMax = a, e.parentType = b, y[1] = e.line;
  for (let g = 0; g < l.length; g++)
    e.bMarks[g + u] = i[g], e.tShift[g + u] = l[g], e.sCount[g + u] = c[g], e.bsCount[g + u] = s[g];
  return e.blkIndent = m, !0;
}
function cp(e, u, t, n) {
  const r = e.eMarks[u];
  if (e.sCount[u] - e.blkIndent >= 4)
    return !1;
  let o = e.bMarks[u] + e.tShift[u];
  const a = e.src.charCodeAt(o++);
  if (a !== 42 && a !== 45 && a !== 95)
    return !1;
  let i = 1;
  for (; o < r; ) {
    const c = e.src.charCodeAt(o++);
    if (c !== a && !J(c))
      return !1;
    c === a && i++;
  }
  if (i < 3)
    return !1;
  if (n)
    return !0;
  e.line = u + 1;
  const s = e.push("hr", "hr", 0);
  return s.map = [u, e.line], s.markup = Array(i + 1).join(String.fromCharCode(a)), !0;
}
function _o(e, u) {
  const t = e.eMarks[u];
  let n = e.bMarks[u] + e.tShift[u];
  const r = e.src.charCodeAt(n++);
  if (r !== 42 && r !== 45 && r !== 43)
    return -1;
  if (n < t) {
    const o = e.src.charCodeAt(n);
    if (!J(o))
      return -1;
  }
  return n;
}
function xo(e, u) {
  const t = e.bMarks[u] + e.tShift[u], n = e.eMarks[u];
  let r = t;
  if (r + 1 >= n)
    return -1;
  let o = e.src.charCodeAt(r++);
  if (o < 48 || o > 57)
    return -1;
  for (; ; ) {
    if (r >= n)
      return -1;
    if (o = e.src.charCodeAt(r++), o >= 48 && o <= 57) {
      if (r - t >= 10)
        return -1;
      continue;
    }
    if (o === 41 || o === 46)
      break;
    return -1;
  }
  return r < n && (o = e.src.charCodeAt(r), !J(o)) ? -1 : r;
}
function lp(e, u) {
  const t = e.level + 2;
  for (let n = u + 2, r = e.tokens.length - 2; n < r; n++)
    e.tokens[n].level === t && e.tokens[n].type === "paragraph_open" && (e.tokens[n + 2].hidden = !0, e.tokens[n].hidden = !0, n += 2);
}
function fp(e, u, t, n) {
  let r, o, a, i, s = u, c = !0;
  if (e.sCount[s] - e.blkIndent >= 4 || e.listIndent >= 0 && e.sCount[s] - e.listIndent >= 4 && e.sCount[s] < e.blkIndent)
    return !1;
  let l = !1;
  n && e.parentType === "paragraph" && e.sCount[s] >= e.blkIndent && (l = !0);
  let d, b, p;
  if ((p = xo(e, s)) >= 0) {
    if (d = !0, a = e.bMarks[s] + e.tShift[s], b = Number(e.src.slice(a, p - 1)), l && b !== 1) return !1;
  } else if ((p = _o(e, s)) >= 0)
    d = !1;
  else
    return !1;
  if (l && e.skipSpaces(p) >= e.eMarks[s])
    return !1;
  if (n)
    return !0;
  const f = e.src.charCodeAt(p - 1), m = e.tokens.length;
  d ? (i = e.push("ordered_list_open", "ol", 1), b !== 1 && (i.attrs = [["start", b]])) : i = e.push("bullet_list_open", "ul", 1);
  const v = [s, 0];
  i.map = v, i.markup = String.fromCharCode(f);
  let y = !1;
  const _ = e.md.block.ruler.getRules("list"), g = e.parentType;
  for (e.parentType = "list"; s < t; ) {
    o = p, r = e.eMarks[s];
    const x = e.sCount[s] + p - (e.bMarks[s] + e.tShift[s]);
    let k = x;
    for (; o < r; ) {
      const te = e.src.charCodeAt(o);
      if (te === 9)
        k += 4 - (k + e.bsCount[s]) % 4;
      else if (te === 32)
        k++;
      else
        break;
      o++;
    }
    const E = o;
    let C;
    E >= r ? C = 1 : C = k - x, C > 4 && (C = 1);
    const S = x + C;
    i = e.push("list_item_open", "li", 1), i.markup = String.fromCharCode(f);
    const T = [s, 0];
    i.map = T, d && (i.info = e.src.slice(a, p - 1));
    const M = e.tight, L = e.tShift[s], $ = e.sCount[s], Q = e.listIndent;
    if (e.listIndent = e.blkIndent, e.blkIndent = S, e.tight = !0, e.tShift[s] = E - e.bMarks[s], e.sCount[s] = k, E >= r && e.isEmpty(s + 1) ? e.line = Math.min(e.line + 2, t) : e.md.block.tokenize(e, s, t, !0), (!e.tight || y) && (c = !1), y = e.line - s > 1 && e.isEmpty(e.line - 1), e.blkIndent = e.listIndent, e.listIndent = Q, e.tShift[s] = L, e.sCount[s] = $, e.tight = M, i = e.push("list_item_close", "li", -1), i.markup = String.fromCharCode(f), s = e.line, T[1] = s, s >= t || e.sCount[s] < e.blkIndent || e.sCount[s] - e.blkIndent >= 4)
      break;
    let ue = !1;
    for (let te = 0, K = _.length; te < K; te++)
      if (_[te](e, s, t, !0)) {
        ue = !0;
        break;
      }
    if (ue)
      break;
    if (d) {
      if (p = xo(e, s), p < 0)
        break;
      a = e.bMarks[s] + e.tShift[s];
    } else if (p = _o(e, s), p < 0)
      break;
    if (f !== e.src.charCodeAt(p - 1))
      break;
  }
  return d ? i = e.push("ordered_list_close", "ol", -1) : i = e.push("bullet_list_close", "ul", -1), i.markup = String.fromCharCode(f), v[1] = s, e.line = s, e.parentType = g, c && lp(e, m), !0;
}
function dp(e, u, t, n) {
  let r = e.bMarks[u] + e.tShift[u], o = e.eMarks[u], a = u + 1;
  if (e.sCount[u] - e.blkIndent >= 4 || e.src.charCodeAt(r) !== 91)
    return !1;
  function i(_) {
    const g = e.lineMax;
    if (_ >= g || e.isEmpty(_))
      return null;
    let x = !1;
    if (e.sCount[_] - e.blkIndent > 3 && (x = !0), e.sCount[_] < 0 && (x = !0), !x) {
      const C = e.md.block.ruler.getRules("reference"), S = e.parentType;
      e.parentType = "reference";
      let T = !1;
      for (let M = 0, L = C.length; M < L; M++)
        if (C[M](e, _, g, !0)) {
          T = !0;
          break;
        }
      if (e.parentType = S, T)
        return null;
    }
    const k = e.bMarks[_] + e.tShift[_], E = e.eMarks[_];
    return e.src.slice(k, E + 1);
  }
  let s = e.src.slice(r, o + 1);
  o = s.length;
  let c = -1;
  for (r = 1; r < o; r++) {
    const _ = s.charCodeAt(r);
    if (_ === 91)
      return !1;
    if (_ === 93) {
      c = r;
      break;
    } else if (_ === 10) {
      const g = i(a);
      g !== null && (s += g, o = s.length, a++);
    } else if (_ === 92 && (r++, r < o && s.charCodeAt(r) === 10)) {
      const g = i(a);
      g !== null && (s += g, o = s.length, a++);
    }
  }
  if (c < 0 || s.charCodeAt(c + 1) !== 58)
    return !1;
  for (r = c + 2; r < o; r++) {
    const _ = s.charCodeAt(r);
    if (_ === 10) {
      const g = i(a);
      g !== null && (s += g, o = s.length, a++);
    } else if (!J(_)) break;
  }
  const l = e.md.helpers.parseLinkDestination(s, r, o);
  if (!l.ok)
    return !1;
  const d = e.md.normalizeLink(l.str);
  if (!e.md.validateLink(d))
    return !1;
  r = l.pos;
  const b = r, p = a, f = r;
  for (; r < o; r++) {
    const _ = s.charCodeAt(r);
    if (_ === 10) {
      const g = i(a);
      g !== null && (s += g, o = s.length, a++);
    } else if (!J(_)) break;
  }
  let m = e.md.helpers.parseLinkTitle(s, r, o);
  for (; m.can_continue; ) {
    const _ = i(a);
    if (_ === null) break;
    s += _, r = o, o = s.length, a++, m = e.md.helpers.parseLinkTitle(s, r, o, m);
  }
  let v;
  for (r < o && f !== r && m.ok ? (v = m.str, r = m.pos) : (v = "", r = b, a = p); r < o; ) {
    const _ = s.charCodeAt(r);
    if (!J(_))
      break;
    r++;
  }
  if (r < o && s.charCodeAt(r) !== 10 && v)
    for (v = "", r = b, a = p; r < o; ) {
      const _ = s.charCodeAt(r);
      if (!J(_))
        break;
      r++;
    }
  if (r < o && s.charCodeAt(r) !== 10)
    return !1;
  const y = Jt(s.slice(1, c));
  return y ? (n || (typeof e.env.references > "u" && (e.env.references = {}), typeof e.env.references[y] > "u" && (e.env.references[y] = { title: v, href: d }), e.line = a), !0) : !1;
}
const pp = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], hp = "[a-zA-Z_:][a-zA-Z0-9:._-]*", bp = "[^\"'=<>`\\x00-\\x20]+", gp = "'[^']*'", mp = '"[^"]*"', vp = "(?:" + bp + "|" + gp + "|" + mp + ")", yp = "(?:\\s+" + hp + "(?:\\s*=\\s*" + vp + ")?)", N0 = "<[A-Za-z][A-Za-z0-9\\-]*" + yp + "*\\s*\\/?>", L0 = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", _p = "<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->", xp = "<[?][\\s\\S]*?[?]>", kp = "<![A-Za-z][^>]*>", Ep = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", Cp = new RegExp("^(?:" + N0 + "|" + L0 + "|" + _p + "|" + xp + "|" + kp + "|" + Ep + ")"), wp = new RegExp("^(?:" + N0 + "|" + L0 + ")"), Au = [
  [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0],
  [/^<!--/, /-->/, !0],
  [/^<\?/, /\?>/, !0],
  [/^<![A-Z]/, />/, !0],
  [/^<!\[CDATA\[/, /\]\]>/, !0],
  [new RegExp("^</?(" + pp.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
  [new RegExp(wp.source + "\\s*$"), /^$/, !1]
];
function Ap(e, u, t, n) {
  let r = e.bMarks[u] + e.tShift[u], o = e.eMarks[u];
  if (e.sCount[u] - e.blkIndent >= 4 || !e.md.options.html || e.src.charCodeAt(r) !== 60)
    return !1;
  let a = e.src.slice(r, o), i = 0;
  for (; i < Au.length && !Au[i][0].test(a); i++)
    ;
  if (i === Au.length)
    return !1;
  if (n)
    return Au[i][2];
  let s = u + 1;
  if (!Au[i][1].test(a)) {
    for (; s < t && !(e.sCount[s] < e.blkIndent); s++)
      if (r = e.bMarks[s] + e.tShift[s], o = e.eMarks[s], a = e.src.slice(r, o), Au[i][1].test(a)) {
        a.length !== 0 && s++;
        break;
      }
  }
  e.line = s;
  const c = e.push("html_block", "", 0);
  return c.map = [u, s], c.content = e.getLines(u, s, e.blkIndent, !0), !0;
}
function Fp(e, u, t, n) {
  let r = e.bMarks[u] + e.tShift[u], o = e.eMarks[u];
  if (e.sCount[u] - e.blkIndent >= 4)
    return !1;
  let a = e.src.charCodeAt(r);
  if (a !== 35 || r >= o)
    return !1;
  let i = 1;
  for (a = e.src.charCodeAt(++r); a === 35 && r < o && i <= 6; )
    i++, a = e.src.charCodeAt(++r);
  if (i > 6 || r < o && !J(a))
    return !1;
  if (n)
    return !0;
  o = e.skipSpacesBack(o, r);
  const s = e.skipCharsBack(o, 35, r);
  s > r && J(e.src.charCodeAt(s - 1)) && (o = s), e.line = u + 1;
  const c = e.push("heading_open", "h" + String(i), 1);
  c.markup = "########".slice(0, i), c.map = [u, e.line];
  const l = e.push("inline", "", 0);
  l.content = e.src.slice(r, o).trim(), l.map = [u, e.line], l.children = [];
  const d = e.push("heading_close", "h" + String(i), -1);
  return d.markup = "########".slice(0, i), !0;
}
function Dp(e, u, t) {
  const n = e.md.block.ruler.getRules("paragraph");
  if (e.sCount[u] - e.blkIndent >= 4)
    return !1;
  const r = e.parentType;
  e.parentType = "paragraph";
  let o = 0, a, i = u + 1;
  for (; i < t && !e.isEmpty(i); i++) {
    if (e.sCount[i] - e.blkIndent > 3)
      continue;
    if (e.sCount[i] >= e.blkIndent) {
      let p = e.bMarks[i] + e.tShift[i];
      const f = e.eMarks[i];
      if (p < f && (a = e.src.charCodeAt(p), (a === 45 || a === 61) && (p = e.skipChars(p, a), p = e.skipSpaces(p), p >= f))) {
        o = a === 61 ? 1 : 2;
        break;
      }
    }
    if (e.sCount[i] < 0)
      continue;
    let b = !1;
    for (let p = 0, f = n.length; p < f; p++)
      if (n[p](e, i, t, !0)) {
        b = !0;
        break;
      }
    if (b)
      break;
  }
  if (!o)
    return !1;
  const s = e.getLines(u, i, e.blkIndent, !1).trim();
  e.line = i + 1;
  const c = e.push("heading_open", "h" + String(o), 1);
  c.markup = String.fromCharCode(a), c.map = [u, e.line];
  const l = e.push("inline", "", 0);
  l.content = s, l.map = [u, e.line - 1], l.children = [];
  const d = e.push("heading_close", "h" + String(o), -1);
  return d.markup = String.fromCharCode(a), e.parentType = r, !0;
}
function Sp(e, u, t) {
  const n = e.md.block.ruler.getRules("paragraph"), r = e.parentType;
  let o = u + 1;
  for (e.parentType = "paragraph"; o < t && !e.isEmpty(o); o++) {
    if (e.sCount[o] - e.blkIndent > 3 || e.sCount[o] < 0)
      continue;
    let c = !1;
    for (let l = 0, d = n.length; l < d; l++)
      if (n[l](e, o, t, !0)) {
        c = !0;
        break;
      }
    if (c)
      break;
  }
  const a = e.getLines(u, o, e.blkIndent, !1).trim();
  e.line = o;
  const i = e.push("paragraph_open", "p", 1);
  i.map = [u, e.line];
  const s = e.push("inline", "", 0);
  return s.content = a, s.map = [u, e.line], s.children = [], e.push("paragraph_close", "p", -1), e.parentType = r, !0;
}
const Dt = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ["table", op, ["paragraph", "reference"]],
  ["code", ap],
  ["fence", ip, ["paragraph", "reference", "blockquote", "list"]],
  ["blockquote", sp, ["paragraph", "reference", "blockquote", "list"]],
  ["hr", cp, ["paragraph", "reference", "blockquote", "list"]],
  ["list", fp, ["paragraph", "reference", "blockquote"]],
  ["reference", dp],
  ["html_block", Ap, ["paragraph", "reference", "blockquote"]],
  ["heading", Fp, ["paragraph", "reference", "blockquote"]],
  ["lheading", Dp],
  ["paragraph", Sp]
];
function Qt() {
  this.ruler = new be();
  for (let e = 0; e < Dt.length; e++)
    this.ruler.push(Dt[e][0], Dt[e][1], { alt: (Dt[e][2] || []).slice() });
}
Qt.prototype.tokenize = function(e, u, t) {
  const n = this.ruler.getRules(""), r = n.length, o = e.md.options.maxNesting;
  let a = u, i = !1;
  for (; a < t && (e.line = a = e.skipEmptyLines(a), !(a >= t || e.sCount[a] < e.blkIndent)); ) {
    if (e.level >= o) {
      e.line = t;
      break;
    }
    const s = e.line;
    let c = !1;
    for (let l = 0; l < r; l++)
      if (c = n[l](e, a, t, !1), c) {
        if (s >= e.line)
          throw new Error("block rule didn't increment state.line");
        break;
      }
    if (!c) throw new Error("none of the block rules matched");
    e.tight = !i, e.isEmpty(e.line - 1) && (i = !0), a = e.line, a < t && e.isEmpty(a) && (i = !0, a++, e.line = a);
  }
};
Qt.prototype.parse = function(e, u, t, n) {
  if (!e)
    return;
  const r = new this.State(e, u, t, n);
  this.tokenize(r, r.line, r.lineMax);
};
Qt.prototype.State = Le;
function pt(e, u, t, n) {
  this.src = e, this.env = t, this.md = u, this.tokens = n, this.tokens_meta = Array(n.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1, this.linkLevel = 0;
}
pt.prototype.pushPending = function() {
  const e = new Ie("text", "", 0);
  return e.content = this.pending, e.level = this.pendingLevel, this.tokens.push(e), this.pending = "", e;
};
pt.prototype.push = function(e, u, t) {
  this.pending && this.pushPending();
  const n = new Ie(e, u, t);
  let r = null;
  return t < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), n.level = this.level, t > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], r = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(n), this.tokens_meta.push(r), n;
};
pt.prototype.scanDelims = function(e, u) {
  const t = this.posMax, n = this.src.charCodeAt(e), r = e > 0 ? this.src.charCodeAt(e - 1) : 32;
  let o = e;
  for (; o < t && this.src.charCodeAt(o) === n; )
    o++;
  const a = o - e, i = o < t ? this.src.charCodeAt(o) : 32, s = at(r) || ot(String.fromCharCode(r)), c = at(i) || ot(String.fromCharCode(i)), l = rt(r), d = rt(i), b = !d && (!c || l || s), p = !l && (!s || d || c);
  return { can_open: b && (u || !p || s), can_close: p && (u || !b || c), length: a };
};
pt.prototype.Token = Ie;
function Tp(e) {
  switch (e) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
function Op(e, u) {
  let t = e.pos;
  for (; t < e.posMax && !Tp(e.src.charCodeAt(t)); )
    t++;
  return t === e.pos ? !1 : (u || (e.pending += e.src.slice(e.pos, t)), e.pos = t, !0);
}
const Ip = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
function Pp(e, u) {
  if (!e.md.options.linkify || e.linkLevel > 0) return !1;
  const t = e.pos, n = e.posMax;
  if (t + 3 > n || e.src.charCodeAt(t) !== 58 || e.src.charCodeAt(t + 1) !== 47 || e.src.charCodeAt(t + 2) !== 47) return !1;
  const r = e.pending.match(Ip);
  if (!r) return !1;
  const o = r[1], a = e.md.linkify.matchAtStart(e.src.slice(t - o.length));
  if (!a) return !1;
  let i = a.url;
  if (i.length <= o.length) return !1;
  i = i.replace(/\*+$/, "");
  const s = e.md.normalizeLink(i);
  if (!e.md.validateLink(s)) return !1;
  if (!u) {
    e.pending = e.pending.slice(0, -o.length);
    const c = e.push("link_open", "a", 1);
    c.attrs = [["href", s]], c.markup = "linkify", c.info = "auto";
    const l = e.push("text", "", 0);
    l.content = e.md.normalizeLinkText(i);
    const d = e.push("link_close", "a", -1);
    d.markup = "linkify", d.info = "auto";
  }
  return e.pos += i.length - o.length, !0;
}
function Bp(e, u) {
  let t = e.pos;
  if (e.src.charCodeAt(t) !== 10)
    return !1;
  const n = e.pending.length - 1, r = e.posMax;
  if (!u)
    if (n >= 0 && e.pending.charCodeAt(n) === 32)
      if (n >= 1 && e.pending.charCodeAt(n - 1) === 32) {
        let o = n - 1;
        for (; o >= 1 && e.pending.charCodeAt(o - 1) === 32; ) o--;
        e.pending = e.pending.slice(0, o), e.push("hardbreak", "br", 0);
      } else
        e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0);
    else
      e.push("softbreak", "br", 0);
  for (t++; t < r && J(e.src.charCodeAt(t)); )
    t++;
  return e.pos = t, !0;
}
const cr = [];
for (let e = 0; e < 256; e++)
  cr.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e) {
  cr[e.charCodeAt(0)] = 1;
});
function Rp(e, u) {
  let t = e.pos;
  const n = e.posMax;
  if (e.src.charCodeAt(t) !== 92 || (t++, t >= n)) return !1;
  let r = e.src.charCodeAt(t);
  if (r === 10) {
    for (u || e.push("hardbreak", "br", 0), t++; t < n && (r = e.src.charCodeAt(t), !!J(r)); )
      t++;
    return e.pos = t, !0;
  }
  let o = e.src[t];
  if (r >= 55296 && r <= 56319 && t + 1 < n) {
    const i = e.src.charCodeAt(t + 1);
    i >= 56320 && i <= 57343 && (o += e.src[t + 1], t++);
  }
  const a = "\\" + o;
  if (!u) {
    const i = e.push("text_special", "", 0);
    r < 256 && cr[r] !== 0 ? i.content = o : i.content = a, i.markup = a, i.info = "escape";
  }
  return e.pos = t + 1, !0;
}
function Mp(e, u) {
  let t = e.pos;
  if (e.src.charCodeAt(t) !== 96)
    return !1;
  const r = t;
  t++;
  const o = e.posMax;
  for (; t < o && e.src.charCodeAt(t) === 96; )
    t++;
  const a = e.src.slice(r, t), i = a.length;
  if (e.backticksScanned && (e.backticks[i] || 0) <= r)
    return u || (e.pending += a), e.pos += i, !0;
  let s = t, c;
  for (; (c = e.src.indexOf("`", s)) !== -1; ) {
    for (s = c + 1; s < o && e.src.charCodeAt(s) === 96; )
      s++;
    const l = s - c;
    if (l === i) {
      if (!u) {
        const d = e.push("code_inline", "code", 0);
        d.markup = a, d.content = e.src.slice(t, c).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
      }
      return e.pos = s, !0;
    }
    e.backticks[l] = c;
  }
  return e.backticksScanned = !0, u || (e.pending += a), e.pos += i, !0;
}
function $p(e, u) {
  const t = e.pos, n = e.src.charCodeAt(t);
  if (u || n !== 126)
    return !1;
  const r = e.scanDelims(e.pos, !0);
  let o = r.length;
  const a = String.fromCharCode(n);
  if (o < 2)
    return !1;
  let i;
  o % 2 && (i = e.push("text", "", 0), i.content = a, o--);
  for (let s = 0; s < o; s += 2)
    i = e.push("text", "", 0), i.content = a + a, e.delimiters.push({
      marker: n,
      length: 0,
      // disable "rule of 3" length checks meant for emphasis
      token: e.tokens.length - 1,
      end: -1,
      open: r.can_open,
      close: r.can_close
    });
  return e.pos += r.length, !0;
}
function ko(e, u) {
  let t;
  const n = [], r = u.length;
  for (let o = 0; o < r; o++) {
    const a = u[o];
    if (a.marker !== 126 || a.end === -1)
      continue;
    const i = u[a.end];
    t = e.tokens[a.token], t.type = "s_open", t.tag = "s", t.nesting = 1, t.markup = "~~", t.content = "", t = e.tokens[i.token], t.type = "s_close", t.tag = "s", t.nesting = -1, t.markup = "~~", t.content = "", e.tokens[i.token - 1].type === "text" && e.tokens[i.token - 1].content === "~" && n.push(i.token - 1);
  }
  for (; n.length; ) {
    const o = n.pop();
    let a = o + 1;
    for (; a < e.tokens.length && e.tokens[a].type === "s_close"; )
      a++;
    a--, o !== a && (t = e.tokens[a], e.tokens[a] = e.tokens[o], e.tokens[o] = t);
  }
}
function zp(e) {
  const u = e.tokens_meta, t = e.tokens_meta.length;
  ko(e, e.delimiters);
  for (let n = 0; n < t; n++)
    u[n] && u[n].delimiters && ko(e, u[n].delimiters);
}
const j0 = {
  tokenize: $p,
  postProcess: zp
};
function Np(e, u) {
  const t = e.pos, n = e.src.charCodeAt(t);
  if (u || n !== 95 && n !== 42)
    return !1;
  const r = e.scanDelims(e.pos, n === 42);
  for (let o = 0; o < r.length; o++) {
    const a = e.push("text", "", 0);
    a.content = String.fromCharCode(n), e.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: n,
      // Total length of these series of delimiters.
      //
      length: r.length,
      // A position of the token this delimiter corresponds to.
      //
      token: e.tokens.length - 1,
      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,
      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: r.can_open,
      close: r.can_close
    });
  }
  return e.pos += r.length, !0;
}
function Eo(e, u) {
  const t = u.length;
  for (let n = t - 1; n >= 0; n--) {
    const r = u[n];
    if (r.marker !== 95 && r.marker !== 42 || r.end === -1)
      continue;
    const o = u[r.end], a = n > 0 && u[n - 1].end === r.end + 1 && // check that first two markers match and adjacent
    u[n - 1].marker === r.marker && u[n - 1].token === r.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
    u[r.end + 1].token === o.token + 1, i = String.fromCharCode(r.marker), s = e.tokens[r.token];
    s.type = a ? "strong_open" : "em_open", s.tag = a ? "strong" : "em", s.nesting = 1, s.markup = a ? i + i : i, s.content = "";
    const c = e.tokens[o.token];
    c.type = a ? "strong_close" : "em_close", c.tag = a ? "strong" : "em", c.nesting = -1, c.markup = a ? i + i : i, c.content = "", a && (e.tokens[u[n - 1].token].content = "", e.tokens[u[r.end + 1].token].content = "", n--);
  }
}
function Lp(e) {
  const u = e.tokens_meta, t = e.tokens_meta.length;
  Eo(e, e.delimiters);
  for (let n = 0; n < t; n++)
    u[n] && u[n].delimiters && Eo(e, u[n].delimiters);
}
const q0 = {
  tokenize: Np,
  postProcess: Lp
};
function jp(e, u) {
  let t, n, r, o, a = "", i = "", s = e.pos, c = !0;
  if (e.src.charCodeAt(e.pos) !== 91)
    return !1;
  const l = e.pos, d = e.posMax, b = e.pos + 1, p = e.md.helpers.parseLinkLabel(e, e.pos, !0);
  if (p < 0)
    return !1;
  let f = p + 1;
  if (f < d && e.src.charCodeAt(f) === 40) {
    for (c = !1, f++; f < d && (t = e.src.charCodeAt(f), !(!J(t) && t !== 10)); f++)
      ;
    if (f >= d)
      return !1;
    if (s = f, r = e.md.helpers.parseLinkDestination(e.src, f, e.posMax), r.ok) {
      for (a = e.md.normalizeLink(r.str), e.md.validateLink(a) ? f = r.pos : a = "", s = f; f < d && (t = e.src.charCodeAt(f), !(!J(t) && t !== 10)); f++)
        ;
      if (r = e.md.helpers.parseLinkTitle(e.src, f, e.posMax), f < d && s !== f && r.ok)
        for (i = r.str, f = r.pos; f < d && (t = e.src.charCodeAt(f), !(!J(t) && t !== 10)); f++)
          ;
    }
    (f >= d || e.src.charCodeAt(f) !== 41) && (c = !0), f++;
  }
  if (c) {
    if (typeof e.env.references > "u")
      return !1;
    if (f < d && e.src.charCodeAt(f) === 91 ? (s = f + 1, f = e.md.helpers.parseLinkLabel(e, f), f >= 0 ? n = e.src.slice(s, f++) : f = p + 1) : f = p + 1, n || (n = e.src.slice(b, p)), o = e.env.references[Jt(n)], !o)
      return e.pos = l, !1;
    a = o.href, i = o.title;
  }
  if (!u) {
    e.pos = b, e.posMax = p;
    const m = e.push("link_open", "a", 1), v = [["href", a]];
    m.attrs = v, i && v.push(["title", i]), e.linkLevel++, e.md.inline.tokenize(e), e.linkLevel--, e.push("link_close", "a", -1);
  }
  return e.pos = f, e.posMax = d, !0;
}
function qp(e, u) {
  let t, n, r, o, a, i, s, c, l = "";
  const d = e.pos, b = e.posMax;
  if (e.src.charCodeAt(e.pos) !== 33 || e.src.charCodeAt(e.pos + 1) !== 91)
    return !1;
  const p = e.pos + 2, f = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1);
  if (f < 0)
    return !1;
  if (o = f + 1, o < b && e.src.charCodeAt(o) === 40) {
    for (o++; o < b && (t = e.src.charCodeAt(o), !(!J(t) && t !== 10)); o++)
      ;
    if (o >= b)
      return !1;
    for (c = o, i = e.md.helpers.parseLinkDestination(e.src, o, e.posMax), i.ok && (l = e.md.normalizeLink(i.str), e.md.validateLink(l) ? o = i.pos : l = ""), c = o; o < b && (t = e.src.charCodeAt(o), !(!J(t) && t !== 10)); o++)
      ;
    if (i = e.md.helpers.parseLinkTitle(e.src, o, e.posMax), o < b && c !== o && i.ok)
      for (s = i.str, o = i.pos; o < b && (t = e.src.charCodeAt(o), !(!J(t) && t !== 10)); o++)
        ;
    else
      s = "";
    if (o >= b || e.src.charCodeAt(o) !== 41)
      return e.pos = d, !1;
    o++;
  } else {
    if (typeof e.env.references > "u")
      return !1;
    if (o < b && e.src.charCodeAt(o) === 91 ? (c = o + 1, o = e.md.helpers.parseLinkLabel(e, o), o >= 0 ? r = e.src.slice(c, o++) : o = f + 1) : o = f + 1, r || (r = e.src.slice(p, f)), a = e.env.references[Jt(r)], !a)
      return e.pos = d, !1;
    l = a.href, s = a.title;
  }
  if (!u) {
    n = e.src.slice(p, f);
    const m = [];
    e.md.inline.parse(
      n,
      e.md,
      e.env,
      m
    );
    const v = e.push("image", "img", 0), y = [["src", l], ["alt", ""]];
    v.attrs = y, v.children = m, v.content = n, s && y.push(["title", s]);
  }
  return e.pos = o, e.posMax = b, !0;
}
const Hp = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, Up = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
function Vp(e, u) {
  let t = e.pos;
  if (e.src.charCodeAt(t) !== 60)
    return !1;
  const n = e.pos, r = e.posMax;
  for (; ; ) {
    if (++t >= r) return !1;
    const a = e.src.charCodeAt(t);
    if (a === 60) return !1;
    if (a === 62) break;
  }
  const o = e.src.slice(n + 1, t);
  if (Up.test(o)) {
    const a = e.md.normalizeLink(o);
    if (!e.md.validateLink(a))
      return !1;
    if (!u) {
      const i = e.push("link_open", "a", 1);
      i.attrs = [["href", a]], i.markup = "autolink", i.info = "auto";
      const s = e.push("text", "", 0);
      s.content = e.md.normalizeLinkText(o);
      const c = e.push("link_close", "a", -1);
      c.markup = "autolink", c.info = "auto";
    }
    return e.pos += o.length + 2, !0;
  }
  if (Hp.test(o)) {
    const a = e.md.normalizeLink("mailto:" + o);
    if (!e.md.validateLink(a))
      return !1;
    if (!u) {
      const i = e.push("link_open", "a", 1);
      i.attrs = [["href", a]], i.markup = "autolink", i.info = "auto";
      const s = e.push("text", "", 0);
      s.content = e.md.normalizeLinkText(o);
      const c = e.push("link_close", "a", -1);
      c.markup = "autolink", c.info = "auto";
    }
    return e.pos += o.length + 2, !0;
  }
  return !1;
}
function Wp(e) {
  return /^<a[>\s]/i.test(e);
}
function Kp(e) {
  return /^<\/a\s*>/i.test(e);
}
function Zp(e) {
  const u = e | 32;
  return u >= 97 && u <= 122;
}
function Gp(e, u) {
  if (!e.md.options.html)
    return !1;
  const t = e.posMax, n = e.pos;
  if (e.src.charCodeAt(n) !== 60 || n + 2 >= t)
    return !1;
  const r = e.src.charCodeAt(n + 1);
  if (r !== 33 && r !== 63 && r !== 47 && !Zp(r))
    return !1;
  const o = e.src.slice(n).match(Cp);
  if (!o)
    return !1;
  if (!u) {
    const a = e.push("html_inline", "", 0);
    a.content = o[0], Wp(a.content) && e.linkLevel++, Kp(a.content) && e.linkLevel--;
  }
  return e.pos += o[0].length, !0;
}
const Jp = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, Qp = /^&([a-z][a-z0-9]{1,31});/i;
function Xp(e, u) {
  const t = e.pos, n = e.posMax;
  if (e.src.charCodeAt(t) !== 38 || t + 1 >= n) return !1;
  if (e.src.charCodeAt(t + 1) === 35) {
    const o = e.src.slice(t).match(Jp);
    if (o) {
      if (!u) {
        const a = o[1][0].toLowerCase() === "x" ? parseInt(o[1].slice(1), 16) : parseInt(o[1], 10), i = e.push("text_special", "", 0);
        i.content = ir(a) ? Lt(a) : Lt(65533), i.markup = o[0], i.info = "entity";
      }
      return e.pos += o[0].length, !0;
    }
  } else {
    const o = e.src.slice(t).match(Qp);
    if (o) {
      const a = B0(o[0]);
      if (a !== o[0]) {
        if (!u) {
          const i = e.push("text_special", "", 0);
          i.content = a, i.markup = o[0], i.info = "entity";
        }
        return e.pos += o[0].length, !0;
      }
    }
  }
  return !1;
}
function Co(e) {
  const u = {}, t = e.length;
  if (!t) return;
  let n = 0, r = -2;
  const o = [];
  for (let a = 0; a < t; a++) {
    const i = e[a];
    if (o.push(0), (e[n].marker !== i.marker || r !== i.token - 1) && (n = a), r = i.token, i.length = i.length || 0, !i.close) continue;
    u.hasOwnProperty(i.marker) || (u[i.marker] = [-1, -1, -1, -1, -1, -1]);
    const s = u[i.marker][(i.open ? 3 : 0) + i.length % 3];
    let c = n - o[n] - 1, l = c;
    for (; c > s; c -= o[c] + 1) {
      const d = e[c];
      if (d.marker === i.marker && d.open && d.end < 0) {
        let b = !1;
        if ((d.close || i.open) && (d.length + i.length) % 3 === 0 && (d.length % 3 !== 0 || i.length % 3 !== 0) && (b = !0), !b) {
          const p = c > 0 && !e[c - 1].open ? o[c - 1] + 1 : 0;
          o[a] = a - c + p, o[c] = p, i.open = !1, d.end = a, d.close = !1, l = -1, r = -2;
          break;
        }
      }
    }
    l !== -1 && (u[i.marker][(i.open ? 3 : 0) + (i.length || 0) % 3] = l);
  }
}
function Yp(e) {
  const u = e.tokens_meta, t = e.tokens_meta.length;
  Co(e.delimiters);
  for (let n = 0; n < t; n++)
    u[n] && u[n].delimiters && Co(u[n].delimiters);
}
function e2(e) {
  let u, t, n = 0;
  const r = e.tokens, o = e.tokens.length;
  for (u = t = 0; u < o; u++)
    r[u].nesting < 0 && n--, r[u].level = n, r[u].nesting > 0 && n++, r[u].type === "text" && u + 1 < o && r[u + 1].type === "text" ? r[u + 1].content = r[u].content + r[u + 1].content : (u !== t && (r[t] = r[u]), t++);
  u !== t && (r.length = t);
}
const pn = [
  ["text", Op],
  ["linkify", Pp],
  ["newline", Bp],
  ["escape", Rp],
  ["backticks", Mp],
  ["strikethrough", j0.tokenize],
  ["emphasis", q0.tokenize],
  ["link", jp],
  ["image", qp],
  ["autolink", Vp],
  ["html_inline", Gp],
  ["entity", Xp]
], hn = [
  ["balance_pairs", Yp],
  ["strikethrough", j0.postProcess],
  ["emphasis", q0.postProcess],
  // rules for pairs separate '**' into its own text tokens, which may be left unused,
  // rule below merges unused segments back with the rest of the text
  ["fragments_join", e2]
];
function ht() {
  this.ruler = new be();
  for (let e = 0; e < pn.length; e++)
    this.ruler.push(pn[e][0], pn[e][1]);
  this.ruler2 = new be();
  for (let e = 0; e < hn.length; e++)
    this.ruler2.push(hn[e][0], hn[e][1]);
}
ht.prototype.skipToken = function(e) {
  const u = e.pos, t = this.ruler.getRules(""), n = t.length, r = e.md.options.maxNesting, o = e.cache;
  if (typeof o[u] < "u") {
    e.pos = o[u];
    return;
  }
  let a = !1;
  if (e.level < r) {
    for (let i = 0; i < n; i++)
      if (e.level++, a = t[i](e, !0), e.level--, a) {
        if (u >= e.pos)
          throw new Error("inline rule didn't increment state.pos");
        break;
      }
  } else
    e.pos = e.posMax;
  a || e.pos++, o[u] = e.pos;
};
ht.prototype.tokenize = function(e) {
  const u = this.ruler.getRules(""), t = u.length, n = e.posMax, r = e.md.options.maxNesting;
  for (; e.pos < n; ) {
    const o = e.pos;
    let a = !1;
    if (e.level < r) {
      for (let i = 0; i < t; i++)
        if (a = u[i](e, !1), a) {
          if (o >= e.pos)
            throw new Error("inline rule didn't increment state.pos");
          break;
        }
    }
    if (a) {
      if (e.pos >= n)
        break;
      continue;
    }
    e.pending += e.src[e.pos++];
  }
  e.pending && e.pushPending();
};
ht.prototype.parse = function(e, u, t, n) {
  const r = new this.State(e, u, t, n);
  this.tokenize(r);
  const o = this.ruler2.getRules(""), a = o.length;
  for (let i = 0; i < a; i++)
    o[i](r);
};
ht.prototype.State = pt;
function u2(e) {
  const u = {};
  e = e || {}, u.src_Any = S0.source, u.src_Cc = T0.source, u.src_Z = I0.source, u.src_P = or.source, u.src_ZPCc = [u.src_Z, u.src_P, u.src_Cc].join("|"), u.src_ZCc = [u.src_Z, u.src_Cc].join("|");
  const t = "[><｜]";
  return u.src_pseudo_letter = "(?:(?!" + t + "|" + u.src_ZPCc + ")" + u.src_Any + ")", u.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", u.src_auth = "(?:(?:(?!" + u.src_ZCc + "|[@/\\[\\]()]).)+@)?", u.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", u.src_host_terminator = "(?=$|" + t + "|" + u.src_ZPCc + ")(?!" + (e["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + u.src_ZPCc + "))", u.src_path = "(?:[/?#](?:(?!" + u.src_ZCc + "|" + t + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + u.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + u.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + u.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + u.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + u.src_ZCc + "|[']).)+\\'|\\'(?=" + u.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + u.src_ZCc + "|[.]|$)|" + (e["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + // allow `,,,` in paths
  ",(?!" + u.src_ZCc + "|$)|;(?!" + u.src_ZCc + "|$)|\\!+(?!" + u.src_ZCc + "|[!]|$)|\\?(?!" + u.src_ZCc + "|[?]|$))+|\\/)?", u.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', u.src_xn = "xn--[a-z0-9\\-]{1,59}", u.src_domain_root = // Allow letters & digits (http://test1)
  "(?:" + u.src_xn + "|" + u.src_pseudo_letter + "{1,63})", u.src_domain = "(?:" + u.src_xn + "|(?:" + u.src_pseudo_letter + ")|(?:" + u.src_pseudo_letter + "(?:-|" + u.src_pseudo_letter + "){0,61}" + u.src_pseudo_letter + "))", u.src_host = "(?:(?:(?:(?:" + u.src_domain + ")\\.)*" + u.src_domain + "))", u.tpl_host_fuzzy = "(?:" + u.src_ip4 + "|(?:(?:(?:" + u.src_domain + ")\\.)+(?:%TLDS%)))", u.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + u.src_domain + ")\\.)+(?:%TLDS%))", u.src_host_strict = u.src_host + u.src_host_terminator, u.tpl_host_fuzzy_strict = u.tpl_host_fuzzy + u.src_host_terminator, u.src_host_port_strict = u.src_host + u.src_port + u.src_host_terminator, u.tpl_host_port_fuzzy_strict = u.tpl_host_fuzzy + u.src_port + u.src_host_terminator, u.tpl_host_port_no_ip_fuzzy_strict = u.tpl_host_no_ip_fuzzy + u.src_port + u.src_host_terminator, u.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + u.src_ZPCc + "|>|$))", u.tpl_email_fuzzy = "(^|" + t + '|"|\\(|' + u.src_ZCc + ")(" + u.src_email_name + "@" + u.tpl_host_fuzzy_strict + ")", u.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + u.src_ZPCc + "))((?![$+<=>^`|｜])" + u.tpl_host_port_fuzzy_strict + u.src_path + ")", u.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + u.src_ZPCc + "))((?![$+<=>^`|｜])" + u.tpl_host_port_no_ip_fuzzy_strict + u.src_path + ")", u;
}
function En(e) {
  return Array.prototype.slice.call(arguments, 1).forEach(function(t) {
    t && Object.keys(t).forEach(function(n) {
      e[n] = t[n];
    });
  }), e;
}
function Xt(e) {
  return Object.prototype.toString.call(e);
}
function t2(e) {
  return Xt(e) === "[object String]";
}
function n2(e) {
  return Xt(e) === "[object Object]";
}
function r2(e) {
  return Xt(e) === "[object RegExp]";
}
function wo(e) {
  return Xt(e) === "[object Function]";
}
function o2(e) {
  return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
const H0 = {
  fuzzyLink: !0,
  fuzzyEmail: !0,
  fuzzyIP: !1
};
function a2(e) {
  return Object.keys(e || {}).reduce(function(u, t) {
    return u || H0.hasOwnProperty(t);
  }, !1);
}
const i2 = {
  "http:": {
    validate: function(e, u, t) {
      const n = e.slice(u);
      return t.re.http || (t.re.http = new RegExp(
        "^\\/\\/" + t.re.src_auth + t.re.src_host_port_strict + t.re.src_path,
        "i"
      )), t.re.http.test(n) ? n.match(t.re.http)[0].length : 0;
    }
  },
  "https:": "http:",
  "ftp:": "http:",
  "//": {
    validate: function(e, u, t) {
      const n = e.slice(u);
      return t.re.no_http || (t.re.no_http = new RegExp(
        "^" + t.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
        // with code comments
        "(?:localhost|(?:(?:" + t.re.src_domain + ")\\.)+" + t.re.src_domain_root + ")" + t.re.src_port + t.re.src_host_terminator + t.re.src_path,
        "i"
      )), t.re.no_http.test(n) ? u >= 3 && e[u - 3] === ":" || u >= 3 && e[u - 3] === "/" ? 0 : n.match(t.re.no_http)[0].length : 0;
    }
  },
  "mailto:": {
    validate: function(e, u, t) {
      const n = e.slice(u);
      return t.re.mailto || (t.re.mailto = new RegExp(
        "^" + t.re.src_email_name + "@" + t.re.src_host_strict,
        "i"
      )), t.re.mailto.test(n) ? n.match(t.re.mailto)[0].length : 0;
    }
  }
}, s2 = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", c2 = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function l2(e) {
  e.__index__ = -1, e.__text_cache__ = "";
}
function f2(e) {
  return function(u, t) {
    const n = u.slice(t);
    return e.test(n) ? n.match(e)[0].length : 0;
  };
}
function Ao() {
  return function(e, u) {
    u.normalize(e);
  };
}
function jt(e) {
  const u = e.re = u2(e.__opts__), t = e.__tlds__.slice();
  e.onCompile(), e.__tlds_replaced__ || t.push(s2), t.push(u.src_xn), u.src_tlds = t.join("|");
  function n(i) {
    return i.replace("%TLDS%", u.src_tlds);
  }
  u.email_fuzzy = RegExp(n(u.tpl_email_fuzzy), "i"), u.link_fuzzy = RegExp(n(u.tpl_link_fuzzy), "i"), u.link_no_ip_fuzzy = RegExp(n(u.tpl_link_no_ip_fuzzy), "i"), u.host_fuzzy_test = RegExp(n(u.tpl_host_fuzzy_test), "i");
  const r = [];
  e.__compiled__ = {};
  function o(i, s) {
    throw new Error('(LinkifyIt) Invalid schema "' + i + '": ' + s);
  }
  Object.keys(e.__schemas__).forEach(function(i) {
    const s = e.__schemas__[i];
    if (s === null)
      return;
    const c = { validate: null, link: null };
    if (e.__compiled__[i] = c, n2(s)) {
      r2(s.validate) ? c.validate = f2(s.validate) : wo(s.validate) ? c.validate = s.validate : o(i, s), wo(s.normalize) ? c.normalize = s.normalize : s.normalize ? o(i, s) : c.normalize = Ao();
      return;
    }
    if (t2(s)) {
      r.push(i);
      return;
    }
    o(i, s);
  }), r.forEach(function(i) {
    e.__compiled__[e.__schemas__[i]] && (e.__compiled__[i].validate = e.__compiled__[e.__schemas__[i]].validate, e.__compiled__[i].normalize = e.__compiled__[e.__schemas__[i]].normalize);
  }), e.__compiled__[""] = { validate: null, normalize: Ao() };
  const a = Object.keys(e.__compiled__).filter(function(i) {
    return i.length > 0 && e.__compiled__[i];
  }).map(o2).join("|");
  e.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + u.src_ZPCc + "))(" + a + ")", "i"), e.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + u.src_ZPCc + "))(" + a + ")", "ig"), e.re.schema_at_start = RegExp("^" + e.re.schema_search.source, "i"), e.re.pretest = RegExp(
    "(" + e.re.schema_test.source + ")|(" + e.re.host_fuzzy_test.source + ")|@",
    "i"
  ), l2(e);
}
function d2(e, u) {
  const t = e.__index__, n = e.__last_index__, r = e.__text_cache__.slice(t, n);
  this.schema = e.__schema__.toLowerCase(), this.index = t + u, this.lastIndex = n + u, this.raw = r, this.text = r, this.url = r;
}
function Cn(e, u) {
  const t = new d2(e, u);
  return e.__compiled__[t.schema].normalize(t, e), t;
}
function _e(e, u) {
  if (!(this instanceof _e))
    return new _e(e, u);
  u || a2(e) && (u = e, e = {}), this.__opts__ = En({}, H0, u), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = En({}, i2, e), this.__compiled__ = {}, this.__tlds__ = c2, this.__tlds_replaced__ = !1, this.re = {}, jt(this);
}
_e.prototype.add = function(u, t) {
  return this.__schemas__[u] = t, jt(this), this;
};
_e.prototype.set = function(u) {
  return this.__opts__ = En(this.__opts__, u), this;
};
_e.prototype.test = function(u) {
  if (this.__text_cache__ = u, this.__index__ = -1, !u.length)
    return !1;
  let t, n, r, o, a, i, s, c, l;
  if (this.re.schema_test.test(u)) {
    for (s = this.re.schema_search, s.lastIndex = 0; (t = s.exec(u)) !== null; )
      if (o = this.testSchemaAt(u, t[2], s.lastIndex), o) {
        this.__schema__ = t[2], this.__index__ = t.index + t[1].length, this.__last_index__ = t.index + t[0].length + o;
        break;
      }
  }
  return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (c = u.search(this.re.host_fuzzy_test), c >= 0 && (this.__index__ < 0 || c < this.__index__) && (n = u.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null && (a = n.index + n[1].length, (this.__index__ < 0 || a < this.__index__) && (this.__schema__ = "", this.__index__ = a, this.__last_index__ = n.index + n[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (l = u.indexOf("@"), l >= 0 && (r = u.match(this.re.email_fuzzy)) !== null && (a = r.index + r[1].length, i = r.index + r[0].length, (this.__index__ < 0 || a < this.__index__ || a === this.__index__ && i > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = a, this.__last_index__ = i))), this.__index__ >= 0;
};
_e.prototype.pretest = function(u) {
  return this.re.pretest.test(u);
};
_e.prototype.testSchemaAt = function(u, t, n) {
  return this.__compiled__[t.toLowerCase()] ? this.__compiled__[t.toLowerCase()].validate(u, n, this) : 0;
};
_e.prototype.match = function(u) {
  const t = [];
  let n = 0;
  this.__index__ >= 0 && this.__text_cache__ === u && (t.push(Cn(this, n)), n = this.__last_index__);
  let r = n ? u.slice(n) : u;
  for (; this.test(r); )
    t.push(Cn(this, n)), r = r.slice(this.__last_index__), n += this.__last_index__;
  return t.length ? t : null;
};
_e.prototype.matchAtStart = function(u) {
  if (this.__text_cache__ = u, this.__index__ = -1, !u.length) return null;
  const t = this.re.schema_at_start.exec(u);
  if (!t) return null;
  const n = this.testSchemaAt(u, t[2], t[0].length);
  return n ? (this.__schema__ = t[2], this.__index__ = t.index + t[1].length, this.__last_index__ = t.index + t[0].length + n, Cn(this, 0)) : null;
};
_e.prototype.tlds = function(u, t) {
  return u = Array.isArray(u) ? u : [u], t ? (this.__tlds__ = this.__tlds__.concat(u).sort().filter(function(n, r, o) {
    return n !== o[r - 1];
  }).reverse(), jt(this), this) : (this.__tlds__ = u.slice(), this.__tlds_replaced__ = !0, jt(this), this);
};
_e.prototype.normalize = function(u) {
  u.schema || (u.url = "http://" + u.url), u.schema === "mailto:" && !/^mailto:/i.test(u.url) && (u.url = "mailto:" + u.url);
};
_e.prototype.onCompile = function() {
};
const Ou = 2147483647, Be = 36, lr = 1, it = 26, p2 = 38, h2 = 700, U0 = 72, V0 = 128, W0 = "-", b2 = /^xn--/, g2 = /[^\0-\x7F]/, m2 = /[\x2E\u3002\uFF0E\uFF61]/g, v2 = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
}, bn = Be - lr, Re = Math.floor, gn = String.fromCharCode;
function uu(e) {
  throw new RangeError(v2[e]);
}
function y2(e, u) {
  const t = [];
  let n = e.length;
  for (; n--; )
    t[n] = u(e[n]);
  return t;
}
function K0(e, u) {
  const t = e.split("@");
  let n = "";
  t.length > 1 && (n = t[0] + "@", e = t[1]), e = e.replace(m2, ".");
  const r = e.split("."), o = y2(r, u).join(".");
  return n + o;
}
function Z0(e) {
  const u = [];
  let t = 0;
  const n = e.length;
  for (; t < n; ) {
    const r = e.charCodeAt(t++);
    if (r >= 55296 && r <= 56319 && t < n) {
      const o = e.charCodeAt(t++);
      (o & 64512) == 56320 ? u.push(((r & 1023) << 10) + (o & 1023) + 65536) : (u.push(r), t--);
    } else
      u.push(r);
  }
  return u;
}
const _2 = (e) => String.fromCodePoint(...e), x2 = function(e) {
  return e >= 48 && e < 58 ? 26 + (e - 48) : e >= 65 && e < 91 ? e - 65 : e >= 97 && e < 123 ? e - 97 : Be;
}, Fo = function(e, u) {
  return e + 22 + 75 * (e < 26) - ((u != 0) << 5);
}, G0 = function(e, u, t) {
  let n = 0;
  for (e = t ? Re(e / h2) : e >> 1, e += Re(e / u); e > bn * it >> 1; n += Be)
    e = Re(e / bn);
  return Re(n + (bn + 1) * e / (e + p2));
}, J0 = function(e) {
  const u = [], t = e.length;
  let n = 0, r = V0, o = U0, a = e.lastIndexOf(W0);
  a < 0 && (a = 0);
  for (let i = 0; i < a; ++i)
    e.charCodeAt(i) >= 128 && uu("not-basic"), u.push(e.charCodeAt(i));
  for (let i = a > 0 ? a + 1 : 0; i < t; ) {
    const s = n;
    for (let l = 1, d = Be; ; d += Be) {
      i >= t && uu("invalid-input");
      const b = x2(e.charCodeAt(i++));
      b >= Be && uu("invalid-input"), b > Re((Ou - n) / l) && uu("overflow"), n += b * l;
      const p = d <= o ? lr : d >= o + it ? it : d - o;
      if (b < p)
        break;
      const f = Be - p;
      l > Re(Ou / f) && uu("overflow"), l *= f;
    }
    const c = u.length + 1;
    o = G0(n - s, c, s == 0), Re(n / c) > Ou - r && uu("overflow"), r += Re(n / c), n %= c, u.splice(n++, 0, r);
  }
  return String.fromCodePoint(...u);
}, Q0 = function(e) {
  const u = [];
  e = Z0(e);
  const t = e.length;
  let n = V0, r = 0, o = U0;
  for (const s of e)
    s < 128 && u.push(gn(s));
  const a = u.length;
  let i = a;
  for (a && u.push(W0); i < t; ) {
    let s = Ou;
    for (const l of e)
      l >= n && l < s && (s = l);
    const c = i + 1;
    s - n > Re((Ou - r) / c) && uu("overflow"), r += (s - n) * c, n = s;
    for (const l of e)
      if (l < n && ++r > Ou && uu("overflow"), l === n) {
        let d = r;
        for (let b = Be; ; b += Be) {
          const p = b <= o ? lr : b >= o + it ? it : b - o;
          if (d < p)
            break;
          const f = d - p, m = Be - p;
          u.push(
            gn(Fo(p + f % m, 0))
          ), d = Re(f / m);
        }
        u.push(gn(Fo(d, 0))), o = G0(r, c, i === a), r = 0, ++i;
      }
    ++r, ++n;
  }
  return u.join("");
}, k2 = function(e) {
  return K0(e, function(u) {
    return b2.test(u) ? J0(u.slice(4).toLowerCase()) : u;
  });
}, E2 = function(e) {
  return K0(e, function(u) {
    return g2.test(u) ? "xn--" + Q0(u) : u;
  });
}, X0 = {
  /**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
  version: "2.3.1",
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
  ucs2: {
    decode: Z0,
    encode: _2
  },
  decode: J0,
  encode: Q0,
  toASCII: E2,
  toUnicode: k2
}, C2 = {
  options: {
    // Enable HTML tags in source
    html: !1,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !1,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 100
  },
  components: {
    core: {},
    block: {},
    inline: {}
  }
}, w2 = {
  options: {
    // Enable HTML tags in source
    html: !1,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !1,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "text"
      ],
      rules2: [
        "balance_pairs",
        "fragments_join"
      ]
    }
  }
}, A2 = {
  options: {
    // Enable HTML tags in source
    html: !0,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !0,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fence",
        "heading",
        "hr",
        "html_block",
        "lheading",
        "list",
        "reference",
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "emphasis",
        "entity",
        "escape",
        "html_inline",
        "image",
        "link",
        "newline",
        "text"
      ],
      rules2: [
        "balance_pairs",
        "emphasis",
        "fragments_join"
      ]
    }
  }
}, F2 = {
  default: C2,
  zero: w2,
  commonmark: A2
}, D2 = /^(vbscript|javascript|file|data):/, S2 = /^data:image\/(gif|png|jpeg|webp);/;
function T2(e) {
  const u = e.trim().toLowerCase();
  return D2.test(u) ? S2.test(u) : !0;
}
const Y0 = ["http:", "https:", "mailto:"];
function O2(e) {
  const u = rr(e, !0);
  if (u.hostname && (!u.protocol || Y0.indexOf(u.protocol) >= 0))
    try {
      u.hostname = X0.toASCII(u.hostname);
    } catch {
    }
  return dt(nr(u));
}
function I2(e) {
  const u = rr(e, !0);
  if (u.hostname && (!u.protocol || Y0.indexOf(u.protocol) >= 0))
    try {
      u.hostname = X0.toUnicode(u.hostname);
    } catch {
    }
  return $u(nr(u), $u.defaultChars + "%");
}
function Se(e, u) {
  if (!(this instanceof Se))
    return new Se(e, u);
  u || ar(e) || (u = e || {}, e = "default"), this.inline = new ht(), this.block = new Qt(), this.core = new sr(), this.renderer = new Lu(), this.linkify = new _e(), this.validateLink = T2, this.normalizeLink = O2, this.normalizeLinkText = I2, this.utils = B1, this.helpers = Gt({}, z1), this.options = {}, this.configure(e), u && this.set(u);
}
Se.prototype.set = function(e) {
  return Gt(this.options, e), this;
};
Se.prototype.configure = function(e) {
  const u = this;
  if (ar(e)) {
    const t = e;
    if (e = F2[t], !e)
      throw new Error('Wrong `markdown-it` preset "' + t + '", check name');
  }
  if (!e)
    throw new Error("Wrong `markdown-it` preset, can't be empty");
  return e.options && u.set(e.options), e.components && Object.keys(e.components).forEach(function(t) {
    e.components[t].rules && u[t].ruler.enableOnly(e.components[t].rules), e.components[t].rules2 && u[t].ruler2.enableOnly(e.components[t].rules2);
  }), this;
};
Se.prototype.enable = function(e, u) {
  let t = [];
  Array.isArray(e) || (e = [e]), ["core", "block", "inline"].forEach(function(r) {
    t = t.concat(this[r].ruler.enable(e, !0));
  }, this), t = t.concat(this.inline.ruler2.enable(e, !0));
  const n = e.filter(function(r) {
    return t.indexOf(r) < 0;
  });
  if (n.length && !u)
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + n);
  return this;
};
Se.prototype.disable = function(e, u) {
  let t = [];
  Array.isArray(e) || (e = [e]), ["core", "block", "inline"].forEach(function(r) {
    t = t.concat(this[r].ruler.disable(e, !0));
  }, this), t = t.concat(this.inline.ruler2.disable(e, !0));
  const n = e.filter(function(r) {
    return t.indexOf(r) < 0;
  });
  if (n.length && !u)
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + n);
  return this;
};
Se.prototype.use = function(e) {
  const u = [this].concat(Array.prototype.slice.call(arguments, 1));
  return e.apply(e, u), this;
};
Se.prototype.parse = function(e, u) {
  if (typeof e != "string")
    throw new Error("Input data should be a String");
  const t = new this.core.State(e, this, u);
  return this.core.process(t), t.tokens;
};
Se.prototype.render = function(e, u) {
  return u = u || {}, this.renderer.render(this.parse(e, u), this.options, u);
};
Se.prototype.parseInline = function(e, u) {
  const t = new this.core.State(e, this, u);
  return t.inlineMode = !0, this.core.process(t), t.tokens;
};
Se.prototype.renderInline = function(e, u) {
  return u = u || {}, this.renderer.render(this.parseInline(e, u), this.options, u);
};
const P2 = Symbol("vue-element-plus-x-config"), B2 = {
  html: !0,
  linkify: !0,
  typographer: !0,
  breaks: !0
}, R2 = {
  mdPlugins: [],
  md: new Se(B2),
  cdnAssets: [
    {
      url: "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
    }
  ]
};
function M2() {
  return ne(P2, R2);
}
const je = (e, u) => {
  const t = e.__vccOpts || e;
  for (const [n, r] of u)
    t[n] = r;
  return t;
}, $2 = ["innerHTML"], z2 = {
  __name: "index",
  props: {
    content: { type: String, default: "" },
    isMarkdown: { type: Boolean, default: !1 },
    typing: { type: [Boolean, Object], default: !1 },
    isFog: { type: Boolean, default: !1 },
    mdPlugins: { type: Array, default: () => [] }
  },
  emits: ["start", "finish", "writing"],
  setup(e, { expose: u, emit: t }) {
    const n = e, r = t, o = M2(), { md: a } = o, i = O(null), s = O(null);
    function c() {
      o.mdPlugins?.length && o.mdPlugins.forEach((T) => {
        a?.use(T);
      }), n.mdPlugins?.length && n.mdPlugins.forEach((T) => {
        a?.use(T);
      });
    }
    c();
    const l = O(0), d = O(!1);
    let b = null;
    const p = O(""), f = A(() => {
      const T = {
        step: typeof n.typing == "object" ? n.typing.step ?? 2 : 2,
        interval: typeof n.typing == "object" ? n.typing.interval ?? 50 : 50,
        // 根据条件动态设置后缀
        suffix: n.isMarkdown ? "" : typeof n.typing == "object" ? n.typing.suffix ?? "|" : "|"
      };
      return n.typing === !0 ? {
        ...T
      } : typeof n.typing == "object" ? {
        ...T,
        ...n.typing,
        // 强制覆盖后缀设置
        suffix: n.isMarkdown ? "" : n.typing.suffix ?? "|"
      } : T;
    }), m = A(() => n.content ? n.typing ? p.value.slice(0, l.value) : n.content : ""), v = A(() => p.value ? Math.min(l.value / p.value.length * 100, 100) : 0), y = A(() => n.isMarkdown ? a?.render(m.value ?? "") ?? "" : m.value), _ = {
      interrupt: k,
      continue: E,
      restart: C,
      destroy: S,
      renderedContent: A(() => y.value),
      isTyping: d,
      progress: A(() => v.value)
    };
    V(
      () => n.content,
      (T, M) => {
        if (!n.typing) {
          l.value = T?.length || 0, d.value = !1, p.value = T || "";
          return;
        }
        (!M || !T?.startsWith(M)) && (l.value = 0), p.value = T || "", d.value || g();
      },
      { immediate: !0 }
    );
    function g() {
      if (clearTimeout(b), !n.typing || !p.value) return;
      d.value = !0, r("start", _);
      const T = () => {
        if (l.value += f.value.step, r("writing", _), l.value >= p.value.length) {
          x();
          return;
        }
        b = setTimeout(T, f.value.interval);
      };
      b = setTimeout(T, f.value.interval);
    }
    function x() {
      d.value = !1, l.value = p.value.length, (typeof n.typing != "object" || n.typing.isRequestEnd) && r("finish", _);
    }
    function k() {
      clearTimeout(b), d.value = !1;
    }
    function E() {
      l.value < p.value.length && g();
    }
    function C() {
      l.value = 0, g();
    }
    function S() {
      clearTimeout(b), b = null, l.value = 0, d.value = !1;
    }
    return wn(S), u(_), (T, M) => (w(), I("div", {
      ref_key: "typeWriterRef",
      ref: s,
      class: "typer-container"
    }, [
      H("div", {
        ref_key: "markdownContentRef",
        ref: i,
        class: U(["typer-content", [
          {
            "markdown-content": e.isMarkdown,
            "typing-cursor": e.typing && f.value.suffix && d.value,
            "typing-cursor-foggy": n.isFog && e.typing && f.value.suffix && d.value,
            "typing-markdown-cursor-foggy": e.isMarkdown && n.isFog && e.typing && d.value
          },
          e.isMarkdown ? "markdown-body" : ""
        ]]),
        style: Ae({
          "--cursor-char": `'${f.value.suffix}'`,
          "--cursor-fog-bg-color": n.isFog ? typeof n.isFog == "object" ? n.isFog.bgColor ?? "var(--el-fill-color)" : "var(--el-fill-color)" : "",
          "--cursor-fog-width": n.isFog ? typeof n.isFog == "object" ? n.isFog.width ?? "80px" : "80px" : ""
        }),
        innerHTML: y.value
      }, null, 14, $2)
    ], 512));
  }
}, N2 = /* @__PURE__ */ je(z2, [["__scopeId", "data-v-7b4acdcd"]]), L2 = {
  key: 0,
  class: "el-bubble-avatar el-bubble-avatar-size"
}, j2 = {
  key: 1,
  class: "el-bubble-avatar-placeholder"
}, q2 = {
  key: 2,
  class: "el-bubble-avatar"
}, H2 = { class: "el-bubble-content-wrapper" }, U2 = {
  key: 0,
  class: "el-bubble-header"
}, V2 = {
  key: 2,
  class: "el-bubble-loading-wrap"
}, W2 = {
  key: 3,
  class: "el-bubble-loading-wrap"
}, K2 = {
  key: 1,
  class: "el-bubble-footer"
}, Z2 = {
  __name: "index",
  props: {
    content: { type: String, default: "" },
    avatar: { type: String, default: "" },
    placement: { type: String, default: "start" },
    variant: { type: String, default: "filled" },
    maxWidth: { type: String, default: "500px" },
    avatarSize: { type: String, default: "" },
    avatarGap: { type: String, default: "12px" },
    avatarShape: { type: String, default: "circle" },
    avatarSrcSet: { type: String, default: "" },
    avatarAlt: { type: String, default: "" },
    avatarFit: { type: String, default: "cover" },
    noStyle: { type: Boolean, default: !1 },
    typing: { type: [Boolean, Object], default: void 0 },
    isMarkdown: { type: Boolean, default: !1 },
    isFog: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    shape: { type: String, default: "" }
  },
  emits: [
    "start",
    "finish",
    "writing",
    "avatarError"
  ],
  setup(e, { expose: u, emit: t }) {
    const n = e, r = t, o = O(!1), a = O(!1);
    V(
      () => n.content,
      (g, x) => {
        g !== x && o.value && y();
      }
    );
    const i = O(), s = {
      interrupt: m,
      continue: v,
      restart: y,
      destroy: _,
      renderedContent: A(
        () => o.value ? "" : i.value?.renderedContent.value || ""
      ),
      isTyping: A(
        () => !o.value && (i.value?.isTyping.value || !1)
      ),
      progress: A(
        () => o.value ? 0 : i.value?.progress.value || 0
      )
    }, c = {
      step: 2,
      suffix: "|",
      interval: 50,
      isRequestEnd: !0
    }, l = A(() => typeof n.typing > "u" ? !1 : typeof n.typing == "boolean" ? n.typing : Object.assign({}, c, n.typing));
    function d(g) {
      r("start", g);
    }
    function b(g) {
      a.value = !1, r("finish", g);
    }
    function p(g) {
      a.value = !0, r("writing", g);
    }
    function f(g) {
      r("avatarError", g);
    }
    function m() {
      i.value?.interrupt();
    }
    function v() {
      i.value?.continue();
    }
    function y() {
      o.value = !1, i.value?.restart();
    }
    function _() {
      i.value?.destroy(), o.value = !0;
    }
    return wn(s.destroy), u(s), (g, x) => o.value ? P("", !0) : (w(), I("div", {
      key: 0,
      class: U(["el-bubble", {
        "el-bubble-start": e.placement === "start",
        "el-bubble-end": e.placement === "end",
        "el-bubble-no-style": e.noStyle,
        "el-bubble-is-typing": a.value
        // 新增动态类名
      }]),
      style: Ae({
        "--el-box-shadow-tertiary": `0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)`,
        "--bubble-content-max-width": `${e.maxWidth}`,
        "--el-bubble-avatar-placeholder-width": `${g.$slots.avatar ? "" : e.avatarSize}`,
        "--el-bubble-avatar-placeholder-height": `${g.$slots.avatar ? "" : e.avatarSize}`,
        "--el-bubble-avatar-placeholder-gap": `${e.avatarGap}`
      })
    }, [
      !g.$slots.avatar && e.avatar ? (w(), I("div", L2, [
        X(h(rd), {
          size: 0,
          src: e.avatar,
          shape: e.avatarShape,
          "src-set": e.avatarSrcSet,
          alt: e.avatarFit,
          onError: f
        }, null, 8, ["src", "shape", "src-set", "alt"])
      ])) : P("", !0),
      !g.$slots.avatar && !e.avatar && e.avatarSize ? (w(), I("div", j2)) : P("", !0),
      g.$slots.avatar ? (w(), I("div", q2, [
        z(g.$slots, "avatar", {}, void 0, !0)
      ])) : P("", !0),
      H("div", H2, [
        g.$slots.header ? (w(), I("div", U2, [
          z(g.$slots, "header", {}, void 0, !0)
        ])) : P("", !0),
        H("div", {
          class: U(["el-bubble-content", {
            "el-bubble-content-loading": e.loading,
            "el-bubble-content-round": e.shape === "round" && !e.noStyle,
            "el-bubble-content-corner": e.shape === "corner" && !e.noStyle,
            "el-bubble-content-filled": e.variant === "filled" && !e.noStyle,
            "el-bubble-content-borderless": e.variant === "borderless" && !e.noStyle,
            "el-bubble-content-outlined": e.variant === "outlined" && !e.noStyle,
            "el-bubble-content-shadow": e.variant === "shadow" && !e.noStyle
          }])
        }, [
          e.loading ? P("", !0) : (w(), I("div", {
            key: 0,
            class: U(["el-typewriter", {
              "no-content": !e.content
            }])
          }, [
            !g.$slots.content && e.content ? (w(), j(N2, {
              key: 0,
              ref_key: "typewriterRef",
              ref: i,
              typing: l.value,
              content: e.content,
              "is-markdown": e.isMarkdown,
              "is-fog": n.isFog,
              onStart: d,
              onWriting: p,
              onFinish: b
            }, null, 8, ["typing", "content", "is-markdown", "is-fog"])) : P("", !0)
          ], 2)),
          !o.value && g.$slots.content && !e.loading ? z(g.$slots, "content", { key: 1 }, void 0, !0) : P("", !0),
          e.loading && !g.$slots.loading ? (w(), I("div", V2, [
            (w(), I(iu, null, Fn(3, (k, E) => H("div", {
              key: E,
              class: "dot",
              style: Ae({ animationDelay: `${E * 0.2}s` })
            }, null, 4)), 64))
          ])) : P("", !0),
          e.loading && g.$slots.loading ? (w(), I("div", W2, [
            z(g.$slots, "loading", {}, void 0, !0)
          ])) : P("", !0)
        ], 2),
        g.$slots.footer ? (w(), I("div", K2, [
          z(g.$slots, "footer", {}, void 0, !0)
        ])) : P("", !0)
      ])
    ], 6));
  }
}, G2 = /* @__PURE__ */ je(Z2, [["__scopeId", "data-v-259d773e"]]), J2 = {}, Q2 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  version: "1.1",
  width: "704",
  height: "704",
  viewBox: "0 0 704 704"
};
function X2(e, u) {
  return w(), I("svg", Q2, [...u[0] || (u[0] = [
    da('<defs><filter id="master_svg0_62_10054" filterUnits="objectBoundingBox" color-interpolation-filters="sRGB" x="-0.030120481927710843" y="-0.030120481927710843" width="1.0602409638554218" height="1.0602409638554218"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur"></feGaussianBlur></filter><linearGradient id="master_svg1_62_10082" x1="0.5" y1="-0.13192443549633026" x2="0.42319029569625854" y2="1.368432641029358"><stop offset="9.145302325487137%" stop-color="currentColor" stop-opacity="1"></stop><stop offset="13.636428117752075%" stop-color="currentColor" stop-opacity="0.07539999485015869"></stop><stop offset="16.968481242656708%" stop-color="currentColor" stop-opacity="0"></stop></linearGradient></defs><g transform="matrix(0,1,-1,0,704,-664)" filter="url(#master_svg0_62_10054)"><path d="M1016,684C1199.359,684,1348,535.359,1348,352C1348,168.641,1199.359,20,1016,20C832.641,20,684,168.641,684,352C684,535.359,832.641,684,1016,684ZM1016,32C1192.731,32,1336,175.269,1336,352C1336,528.731,1192.731,672,1016,672C839.269,672,696,528.731,696,352C696,175.269,839.269,32,1016,32Z" fill-rule="evenodd" fill="url(#master_svg1_62_10082)" fill-opacity="1"></path></g>', 2)
  ])]);
}
const Y2 = /* @__PURE__ */ je(J2, [["render", X2]]), eh = 20, uh = {
  __name: "index",
  props: {
    list: { type: Array, default: () => [] },
    maxHeight: { type: String, default: "500px" },
    triggerIndices: { type: [String, Array], default: "only-last" },
    alwaysShowScrollbar: { type: Boolean, default: !1 },
    backButtonThreshold: { type: Number, default: 80 },
    showBackButton: { type: Boolean, default: !0 },
    backButtonPosition: {
      type: Function,
      default: () => ({ bottom: "20px", left: "calc(50% - 19px)" })
    },
    btnLoading: { type: Boolean, default: !0 },
    btnColor: { type: String, default: "#409EFF" },
    btnIconSize: { type: Number, default: 24 }
  },
  emits: ["complete"],
  setup(e, { expose: u, emit: t }) {
    const n = e, r = t;
    function o() {
      document.documentElement.style.setProperty(
        "--el-bubble-list-max-height",
        n.maxHeight
      ), document.documentElement.style.setProperty(
        "--el-bubble-list-btn-size",
        `${n.btnIconSize}px`
      );
    }
    xe(() => {
      o();
    });
    const a = O(null), { hasVertical: i } = Ta(a), s = O(!1), c = O(0), l = O(0), d = O(null), b = O(!1);
    V(
      () => n.list.length,
      () => {
        n.list && n.list.length > 0 && ye(() => {
          v();
        });
      },
      { immediate: !0 }
    );
    function p() {
      s.value = !0, ye(() => {
        a.value && (a.value.scrollTop = 0);
      });
    }
    function f() {
      try {
        a.value && a.value.scrollHeight && ye(() => {
          a.value.scrollTop = a.value.scrollHeight, s.value = !1;
        });
      } catch (k) {
        console.warn("[BubbleList error]: ", k);
      }
    }
    function m(k) {
      const E = a.value;
      if (!E) return;
      const C = E.querySelectorAll(".el-bubble");
      if (k >= C.length) return;
      s.value = !0;
      const S = C[k], T = E.getBoundingClientRect(), L = S.getBoundingClientRect().top - T.top + E.scrollTop;
      E.scrollTo({
        top: L,
        behavior: "smooth"
      });
    }
    function v() {
      if (a.value) {
        const k = a.value.querySelectorAll(
          ".el-bubble-content-wrapper"
        );
        d.value && d.value.disconnect();
        const E = k[k.length - 1];
        E && (d.value = new ResizeObserver(() => {
          s.value || f();
        }), d.value.observe(E));
      }
    }
    const y = O({}), _ = A(
      () => n.list.map((k, E) => ({ ...k, _index_: E })).filter((k) => k.typing)
    );
    function g(k, E) {
      switch (n.triggerIndices) {
        case "only-last":
          k === _.value[_.value.length - 1]?._index_ && r("complete", E, k);
          break;
        case "all":
          y.value[k] = E, Object.keys(y.value).length === _.value.length && r("complete", E, k);
          break;
        default:
          Array.isArray(n.triggerIndices) && n.triggerIndices.includes(k) && r("complete", E, k);
          break;
      }
    }
    function x() {
      if (a.value) {
        const { scrollTop: k, scrollHeight: E, clientHeight: C } = a.value, S = E - (k + C);
        b.value = n.showBackButton && S > n.backButtonThreshold;
        const T = k + C >= E - 30, M = c.value > k, L = c.value < k, $ = c.value - k;
        c.value = k, M ? (l.value += $, l.value >= eh && (s.value || (s.value = !0), l.value = 0)) : l.value = 0, L && T && s.value && (s.value = !1);
      }
    }
    return u({
      scrollToTop: p,
      scrollToBottom: f,
      scrollToBubble: m
    }), (k, E) => (w(), I("div", {
      ref_key: "scrollContainer",
      ref: a,
      class: U(["el-bubble-list", { "always-scrollbar": n.alwaysShowScrollbar }]),
      onScroll: x
    }, [
      (w(!0), I(iu, null, Fn(e.list, (C, S) => (w(), j(G2, {
        key: S,
        content: C.content,
        placement: C.placement,
        loading: C.loading,
        shape: C.shape,
        variant: C.variant,
        "is-markdown": C.isMarkdown,
        "is-fog": C.isFog,
        typing: C.typing,
        "max-width": C.maxWidth,
        avatar: C.avatar,
        "avatar-size": C.avatarSize,
        "avatar-gap": C.avatarGap,
        "avatar-shape": C.avatarShape,
        "avatar-src-set": C.avatarSrcSet,
        "avatar-alt": C.avatarAlt,
        "avatar-fit": C.avatarFit,
        "no-style": C.noStyle,
        onFinish: (T) => g(S, T)
      }, pa({ _: 2 }, [
        k.$slots.avatar ? {
          name: "avatar",
          fn: q(() => [
            z(k.$slots, "avatar", { item: C }, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        k.$slots.header ? {
          name: "header",
          fn: q(() => [
            z(k.$slots, "header", { item: C }, void 0, !0)
          ]),
          key: "1"
        } : void 0,
        k.$slots.content ? {
          name: "content",
          fn: q(() => [
            z(k.$slots, "content", { item: C }, void 0, !0)
          ]),
          key: "2"
        } : void 0,
        k.$slots.footer ? {
          name: "footer",
          fn: q(() => [
            z(k.$slots, "footer", { item: C }, void 0, !0)
          ]),
          key: "3"
        } : void 0,
        k.$slots.loading ? {
          name: "loading",
          fn: q(() => [
            z(k.$slots, "loading", { item: C }, void 0, !0)
          ]),
          key: "4"
        } : void 0
      ]), 1032, ["content", "placement", "loading", "shape", "variant", "is-markdown", "is-fog", "typing", "max-width", "avatar", "avatar-size", "avatar-gap", "avatar-shape", "avatar-src-set", "avatar-alt", "avatar-fit", "no-style", "onFinish"]))), 128)),
      b.value && h(i) ? (w(), I("div", {
        key: 0,
        class: U(["el-bubble-list-default-back-button", {
          "el-bubble-list-back-to-bottom-solt": k.$slots.backToBottom
        }]),
        style: Ae({
          bottom: e.backButtonPosition.bottom,
          left: e.backButtonPosition.left
        }),
        onClick: f
      }, [
        z(k.$slots, "backToBottom", {}, () => [
          X(h(ke), {
            class: "el-bubble-list-back-to-bottom-icon",
            style: Ae({ color: n.btnColor })
          }, {
            default: q(() => [
              X(h(ba)),
              n.btnLoading ? (w(), j(Y2, {
                key: 0,
                class: "back-to-bottom-loading-svg-bg"
              })) : P("", !0)
            ]),
            _: 1
          }, 8, ["style"])
        ], !0)
      ], 6)) : P("", !0)
    ], 34));
  }
}, th = /* @__PURE__ */ je(uh, [["__scopeId", "data-v-c64ced5b"]]), nh = { class: "el-send-button-clear" }, rh = /* @__PURE__ */ R({
  __name: "index",
  emits: ["clear"],
  setup(e, { emit: u }) {
    const t = u;
    return (n, r) => (w(), I("div", nh, [
      X(h(ft), {
        circle: "",
        onClick: r[0] || (r[0] = (o) => t("clear"))
      }, {
        default: q(() => [
          X(h(ke), null, {
            default: q(() => [
              X(h(ma))
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]));
  }
}), Do = /* @__PURE__ */ je(rh, [["__scopeId", "data-v-33469030"]]), oh = {}, ah = {
  viewBox: "0 0 1000 1000",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink"
};
function ih(e, u) {
  return w(), I("svg", ah, [...u[0] || (u[0] = [
    H("title", null, "Loading", -1),
    H("rect", {
      fill: "currentColor",
      height: "250",
      rx: "24",
      ry: "24",
      width: "250",
      x: "375",
      y: "375"
    }, null, -1),
    H("circle", {
      cx: "500",
      cy: "500",
      fill: "none",
      r: "450",
      stroke: "currentColor",
      "stroke-width": "100",
      opacity: "0.45"
    }, null, -1),
    H("circle", {
      cx: "500",
      cy: "500",
      fill: "none",
      r: "450",
      stroke: "currentColor",
      "stroke-width": "100",
      "stroke-dasharray": "600 9999999"
    }, [
      H("animateTransform", {
        attributeName: "transform",
        dur: "1s",
        from: "0 500 500",
        repeatCount: "indefinite",
        to: "360 500 500",
        type: "rotate"
      })
    ], -1)
  ])]);
}
const sh = /* @__PURE__ */ je(oh, [["render", ih]]), ch = { class: "el-send-button-cancel" }, lh = /* @__PURE__ */ R({
  __name: "index",
  emits: ["cancel"],
  setup(e, { emit: u }) {
    const t = u;
    return (n, r) => (w(), I("div", ch, [
      X(h(ft), {
        circle: "",
        onClick: r[0] || (r[0] = (o) => t("cancel"))
      }, {
        default: q(() => [
          X(sh, { class: "loading-svg" })
        ]),
        _: 1
      })
    ]));
  }
}), So = /* @__PURE__ */ je(lh, [["__scopeId", "data-v-d38e4cad"]]), fh = { class: "el-send-button" }, To = /* @__PURE__ */ R({
  __name: "index",
  props: {
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["submit"],
  setup(e, { emit: u }) {
    const t = e, n = u;
    return (r, o) => (w(), I("div", fh, [
      X(h(ft), {
        circle: "",
        disabled: t.disabled,
        onClick: o[0] || (o[0] = (a) => n("submit"))
      }, {
        default: q(() => [
          X(h(ke), null, {
            default: q(() => [
              X(h(Fa))
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["disabled"])
    ]));
  }
}), dh = { class: "el-send-button" }, Oo = /* @__PURE__ */ R({
  __name: "index",
  setup(e) {
    return (u, t) => (w(), I("div", dh, [
      X(h(ft), { circle: "" }, {
        default: q(() => [
          X(h(ke), null, {
            default: q(() => [
              X(h(wa))
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]));
  }
}), ph = ["viewBox"], hh = ["x", "y"], bh = ["values", "dur", "begin"], gh = ["values", "dur", "begin"], Zu = 1e3, Gu = 4, St = 140, Tt = 250, Io = 500, Ot = 0.8, mh = /* @__PURE__ */ R({
  __name: "loading",
  props: {
    className: { default: "" }
  },
  setup(e) {
    const u = St / 2, t = computed(() => {
      const n = (Zu - St * Gu) / (Gu - 1);
      return Array.from({ length: Gu }).map((r, o) => {
        const a = o * (n + St), i = Zu / 2 - Tt / 2, s = Zu / 2 - Io / 2;
        return { x: a, yMin: i, yMax: s };
      });
    });
    return (n, r) => (w(), I("svg", {
      class: U(n.className),
      color: "currentColor",
      viewBox: `0 0 ${Zu} ${Zu}`,
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }, [
      r[0] || (r[0] = H("title", null, "Speech Recording", -1)),
      (w(!0), I(iu, null, Fn(h(t), (o, a) => (w(), I("rect", {
        key: a,
        fill: "currentColor",
        rx: u,
        ry: u,
        height: Tt,
        width: St,
        x: o.x,
        y: o.yMin
      }, [
        H("animate", {
          attributeName: "height",
          values: `${Tt}; ${Io}; ${Tt}`,
          keyTimes: "0; 0.5; 1",
          dur: `${Ot}s`,
          begin: `${Ot / Gu * a}s`,
          repeatCount: "indefinite"
        }, null, 8, bh),
        H("animate", {
          attributeName: "y",
          values: `${o.yMin}; ${o.yMax}; ${o.yMin}`,
          keyTimes: "0; 0.5; 1",
          dur: `${Ot}s`,
          begin: `${Ot / Gu * a}s`,
          repeatCount: "indefinite"
        }, null, 8, gh)
      ], 8, hh))), 128))
    ], 10, ph));
  }
}), vh = /* @__PURE__ */ je(mh, [["__scopeId", "data-v-dd795da4"]]), yh = { class: "el-send-button-audio" }, _h = /* @__PURE__ */ R({
  __name: "index",
  setup(e) {
    return (u, t) => (w(), I("div", yh, [
      X(h(ft), { circle: "" }, {
        default: q(() => [
          X(vh, { class: "loading-svg" })
        ]),
        _: 1
      })
    ]));
  }
}), Po = /* @__PURE__ */ je(_h, [["__scopeId", "data-v-594d1e67"]]), xh = {
  key: 0,
  class: "el-sender-header-wrap"
}, kh = {
  key: 0,
  class: "el-sender-header"
}, Eh = {
  key: 0,
  class: "el-sender-prefix"
}, Ch = {
  key: 1,
  class: "el-sender-action-list"
}, wh = { class: "el-sender-action-list-presets" }, Ah = {
  key: 2,
  class: "el-sender-updown-wrap"
}, Fh = {
  key: 0,
  class: "el-sender-prefix"
}, Dh = { class: "el-sender-action-list" }, Sh = { class: "el-sender-action-list-presets" }, Th = {
  key: 0,
  class: "el-sender-footer"
}, Oh = {
  __name: "index",
  props: {
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    autoSize: {
      type: Object,
      default: () => ({
        minRows: 1,
        maxRows: 6
      })
    },
    submitType: {
      type: String,
      default: "enter"
    },
    headerAnimationTimer: {
      type: Number,
      default: 300
    },
    inputWidth: {
      type: String,
      default: "100%"
    },
    modelValue: {
      type: String,
      default: ""
    },
    variant: {
      type: String,
      default: "default"
    },
    showUpdown: {
      type: Boolean,
      default: !0
    },
    submitBtnDisabled: {
      type: Boolean,
      default: void 0
      // Vue 会将其视为“未设置”，允许父组件控制
    },
    inputStyle: {
      type: Object,
      default: () => ({})
    },
    triggerStrings: {
      type: Array,
      default: () => []
    },
    triggerPopoverVisible: {
      type: Boolean,
      default: !1
    },
    triggerPopoverWidth: {
      type: String,
      default: "fit-content"
    },
    triggerPopoverLeft: {
      type: String,
      default: "0px"
    },
    triggerPopoverOffset: {
      type: Number,
      default: 8
    },
    triggerPopoverPlacement: {
      type: String,
      default: "top-start"
    }
  },
  setup(e, { expose: u, emit: t }) {
    const n = e, r = t, o = An(), a = we(), i = A(() => !!a?.vnode.props?.onRecordingChange), s = O(), c = O(), l = A({
      get() {
        return n.modelValue;
      },
      set(D) {
        n.readOnly || n.disabled || r("update:modelValue", D);
      }
    }), d = A(() => c.value?.ref), b = O(!1), p = O(), f = A(() => !!a?.vnode.props?.onTrigger), m = A(() => typeof n.submitBtnDisabled == "boolean" ? n.submitBtnDisabled : !l.value), v = A({
      get() {
        return n.triggerPopoverVisible;
      },
      set(D) {
        n.readOnly || n.disabled || r("update:triggerPopoverVisible", D);
      }
    }), y = O("");
    V(
      () => l.value,
      (D, G) => {
        if (b.value) return;
        const ee = n.triggerStrings || [], ge = typeof G == "string" ? G : "", le = ee.includes(ge), oe = ee.includes(D);
        G === "" && oe ? (y.value = D, f.value && r("trigger", {
          oldValue: G,
          // 关闭时返回之前触发的字符
          newValue: D,
          triggerString: D,
          isOpen: !0
        }), v.value = !0) : !oe && le ? (f.value && r("trigger", {
          oldValue: G || "",
          // 关闭时返回之前触发的字符
          newValue: D,
          triggerString: void 0,
          isOpen: !1
        }), v.value = !1) : G !== "" && oe && !le && (y.value = D, f.value && r("trigger", {
          oldValue: G || "",
          // 关闭时返回之前触发的字符
          newValue: D,
          triggerString: D,
          isOpen: !0
        }), v.value = !0);
      },
      { deep: !0, immediate: !0 }
    );
    function _(D) {
      D.target !== s.value.querySelector(".el-textarea__inner") && D.preventDefault(), c.value.focus();
    }
    const g = O(!1);
    function x() {
      if (!o.header || n.readOnly) return !1;
      g.value = !0;
    }
    function k() {
      o.header && (n.readOnly || (g.value = !1));
    }
    const E = O(null), C = O(!1);
    function S() {
      if (!n.readOnly) {
        if (i.value) {
          C.value = !0, r("recordingChange", !0);
          return;
        }
        "webkitSpeechRecognition" in window ? (E.value = new window.webkitSpeechRecognition(), E.value.continuous = !0, E.value.interimResults = !0, E.value.lang = "zh-CN", E.value.onresult = (D) => {
          let G = "";
          for (let ee = 0; ee <= D.resultIndex; ee++)
            G += D.results[ee][0].transcript;
          n.readOnly || (l.value = G);
        }, E.value.onstart = () => {
          C.value = !0;
        }, E.value.onend = () => {
          C.value = !1;
        }, E.value.onerror = (D) => {
          console.error("语音识别出错:", D.error), C.value = !1;
        }, E.value.start()) : console.error("浏览器不支持 Web Speech API");
      }
    }
    function T() {
      if (i.value) {
        C.value = !1, r("recordingChange", !1);
        return;
      }
      E.value && (E.value.stop(), C.value = !1);
    }
    function M() {
      n.readOnly || n.loading || n.disabled || m.value || r("submit", l.value);
    }
    function L() {
      n.readOnly || r("cancel", l.value);
    }
    function $() {
      n.readOnly || (c.value.clear(), l.value = "");
    }
    function Q(D) {
      if (n.readOnly) return;
      const G = () => {
        const ge = D.target.selectionStart, le = l.value.slice(0, ge), oe = l.value.slice(ge);
        l.value = `${le}
${oe}`, D.target.setSelectionRange(ge + 1, ge + 1);
      };
      let ee = !1;
      switch (n.submitType) {
        case "cmdOrCtrlEnter":
          ee = D.metaKey || D.ctrlKey;
          break;
        case "shiftEnter":
          ee = D.shiftKey;
          break;
        case "altEnter":
          ee = D.altKey;
          break;
        case "enter":
          ee = D.shiftKey || D.metaKey || D.ctrlKey || D.altKey;
          break;
        default:
          ee = !1;
          break;
      }
      D.keyCode === 13 && (D.preventDefault(), n.submitType === "enter" ? ee ? G() : M() : ee ? M() : G());
    }
    function ue() {
      if (n.readOnly)
        return !1;
      c.value.blur();
    }
    function te(D = "all") {
      if (n.readOnly)
        return !1;
      D === "all" ? c.value.select() : D === "start" ? K() : D === "end" && Z();
    }
    function K() {
      if (c.value) {
        const D = c.value.ref;
        D && (D.focus(), D.setSelectionRange(0, 0));
      }
    }
    function Z() {
      if (c.value) {
        const D = c.value.ref;
        D && (D.focus(), D.setSelectionRange(
          l.value.length,
          l.value.length
        ));
      }
    }
    function B() {
      b.value = !0;
    }
    function Y() {
      b.value = !1;
    }
    return u({
      openHeader: x,
      // 打开头部
      closeHeader: k,
      // 关闭头部
      clear: $,
      // 清空输入框
      blur: ue,
      // 失去焦点
      focus: te,
      // 获取焦点
      // 按钮操作
      submit: M,
      cancel: L,
      startRecognition: S,
      stopRecognition: T,
      popoverVisible: v,
      inputInstance: d
    }), (D, G) => (w(), I("div", {
      class: "el-sender-wrap",
      tabindex: "-1",
      style: Ae({
        cursor: n.disabled ? "not-allowed" : "default",
        "--el-sender-trigger-popover-width": n.triggerPopoverWidth,
        "--el-sender-trigger-popover-left": n.triggerPopoverLeft
      })
    }, [
      H("div", {
        ref_key: "senderRef",
        ref: s,
        class: U(["el-sender", {
          "el-sender-disabled": n.disabled
        }]),
        style: Ae({
          "--el-box-shadow-tertiary": "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
          "--el-sender-input-input-font-size": "14px",
          "--el-sender-header-animation-duration": `${n.headerAnimationTimer}ms`
        })
      }, [
        X(mn, { name: "slide" }, {
          default: q(() => [
            g.value ? (w(), I("div", xh, [
              D.$slots.header ? (w(), I("div", kh, [
                z(D.$slots, "header", {}, void 0, !0)
              ])) : P("", !0)
            ])) : P("", !0)
          ]),
          _: 3
        }),
        H("div", {
          class: U(["el-sender-content", { "content-variant-updown": n.variant === "updown" }]),
          onMousedown: _
        }, [
          D.$slots.prefix && n.variant === "default" ? (w(), I("div", Eh, [
            z(D.$slots, "prefix", {}, void 0, !0)
          ])) : P("", !0),
          X(h(Bc), {
            ref_key: "inputRef",
            ref: c,
            modelValue: l.value,
            "onUpdate:modelValue": G[0] || (G[0] = (ee) => l.value = ee),
            class: "el-sender-input",
            "input-style": n.inputStyle || {
              resize: "none",
              "max-height": "176px",
              "max-width": n.inputWidth
            },
            rows: 1,
            autosize: n.autoSize,
            type: "textarea",
            "validate-event": !1,
            placeholder: n.placeholder,
            "read-only": n.readOnly || n.disabled,
            disabled: n.disabled,
            onKeydown: Q,
            onCompositionstart: B,
            onCompositionend: Y
          }, null, 8, ["modelValue", "input-style", "autosize", "placeholder", "read-only", "disabled"]),
          n.variant === "default" ? (w(), I("div", Ch, [
            z(D.$slots, "action-list", {}, () => [
              H("div", wh, [
                n.loading ? P("", !0) : (w(), j(h(To), {
                  key: 0,
                  disabled: m.value,
                  onSubmit: M
                }, null, 8, ["disabled"])),
                n.loading ? (w(), j(h(So), {
                  key: 1,
                  onCancel: L
                })) : P("", !0),
                !C.value && n.allowSpeech ? (w(), j(h(Oo), {
                  key: 2,
                  onClick: S
                })) : P("", !0),
                C.value && n.allowSpeech ? (w(), j(h(Po), {
                  key: 3,
                  onClick: T
                })) : P("", !0),
                n.clearable ? (w(), j(h(Do), {
                  key: 4,
                  onClear: $
                })) : P("", !0)
              ])
            ], !0)
          ])) : P("", !0),
          n.variant === "updown" && n.showUpdown ? (w(), I("div", Ah, [
            D.$slots.prefix ? (w(), I("div", Fh, [
              z(D.$slots, "prefix", {}, void 0, !0)
            ])) : P("", !0),
            H("div", Dh, [
              z(D.$slots, "action-list", {}, () => [
                H("div", Sh, [
                  n.loading ? P("", !0) : (w(), j(h(To), {
                    key: 0,
                    disabled: m.value,
                    onSubmit: M
                  }, null, 8, ["disabled"])),
                  n.loading ? (w(), j(h(So), {
                    key: 1,
                    onCancel: L
                  })) : P("", !0),
                  !C.value && n.allowSpeech ? (w(), j(h(Oo), {
                    key: 2,
                    onClick: S
                  })) : P("", !0),
                  C.value && n.allowSpeech ? (w(), j(h(Po), {
                    key: 3,
                    onClick: T
                  })) : P("", !0),
                  n.clearable ? (w(), j(h(Do), {
                    key: 4,
                    onClear: $
                  })) : P("", !0)
                ])
              ], !0)
            ])
          ])) : P("", !0)
        ], 34),
        X(mn, { name: "slide" }, {
          default: q(() => [
            D.$slots.footer ? (w(), I("div", Th, [
              z(D.$slots, "footer", {}, void 0, !0)
            ])) : P("", !0)
          ]),
          _: 3
        })
      ], 6),
      X(h(Kd), {
        ref_key: "popoverRef",
        ref: p,
        "virtual-ref": s.value,
        "virtual-triggering": "",
        visible: v.value,
        disabled: n.disabled,
        "show-arrow": !1,
        placement: n.triggerPopoverPlacement,
        offset: n.triggerPopoverOffset,
        "popper-class": "el-sender-trigger-popover",
        teleported: !1
      }, {
        default: q(() => [
          z(D.$slots, "trigger-popover", { triggerString: y.value }, () => [
            $o(" 当前触发的字符为：" + nu(`${y.value}`) + " 在这里定义的内容，但注意这里的回车事件将会被 输入框 覆盖 ", 1)
          ], !0)
        ]),
        _: 3
      }, 8, ["virtual-ref", "visible", "disabled", "placement", "offset"])
    ], 4));
  }
}, Ih = /* @__PURE__ */ je(Oh, [["__scopeId", "data-v-275dcd68"]]), Bh = {
  BubbleList: th,
  Sender: Ih
};
export {
  th as BubbleList,
  Ih as Sender,
  Bh as default
};
