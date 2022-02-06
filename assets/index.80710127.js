import { r as ref, M as Mesh, H as HemisphereLight, D as DirectionalLight, d as defineComponent, V as Vector3, G as GLTFLoader, o as onMounted, S as Stats, c as createElementBlock, u as unref, a as createBaseVNode, t as toDisplayString, b as createCommentVNode, F as Fragment, e as renderList, f as createVNode, w as withCtx, R as Renderer, L as LoadingManager, g as openBlock, n as normalizeClass, P as PerspectiveCamera, h as Scene, i as createApp } from "./vendor.82606929.js";
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
function addLoaderManager(manager) {
  const loading = ref({
    loaded: 0,
    total: 0,
    progress: 0
  });
  manager.onProgress = (item, loaded, total) => {
    loading.value.loaded = loaded;
    loading.value.total = total;
    loading.value.progress = Math.round(loaded / total * 1e4) / 100;
  };
  return {
    loading
  };
}
function addModel(loader, scene, objects, mapPath) {
  loader.load(mapPath, (gltf) => {
    const model = gltf.scene;
    objects.teeth = {};
    model.traverse((child) => {
      if (child instanceof Mesh && child.name.startsWith("Teeth")) {
        objects.teeth[child.name] = child;
      }
    });
    if (scene)
      scene.add(model);
  }, void 0, function(error) {
    console.error(error);
  });
}
function addLights(scene) {
  const ambientLight = new HemisphereLight(16777215, 16777215, 0.7);
  const mainLight = new DirectionalLight(16777215, 1);
  mainLight.position.set(0, 0.01, 0.06).multiplyScalar(100);
  mainLight.shadow.mapSize.setScalar(1024);
  mainLight.shadow.bias = -1e-3;
  mainLight.shadow.normalBias = 0.05;
  mainLight.castShadow = true;
  const shadowCam = mainLight.shadow.camera;
  shadowCam.bottom = shadowCam.left = -14;
  shadowCam.top = 7;
  shadowCam.right = 7;
  if (scene) {
    scene.add(ambientLight);
    scene.add(mainLight);
  }
}
var App_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "stats" }, null, -1);
const _hoisted_2 = {
  key: 0,
  class: "loader-box"
};
const _hoisted_3 = { class: "loader" };
const _hoisted_4 = {
  key: 1,
  class: "teeth-box"
};
const _hoisted_5 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const rendererC = ref();
    const scene = ref();
    ref();
    ref();
    const modelPosition = new Vector3(0, 2, 0);
    const cameraOffset = new Vector3(0, 0, 25);
    let clientWidth = window.innerWidth;
    let clientHeight = window.innerHeight;
    const manager = new LoadingManager();
    const { loading } = addLoaderManager(manager);
    const loader = new GLTFLoader(manager);
    const objects = ref({});
    const controlsSettings = {
      enableDamping: true,
      dampingFactor: 0.05,
      screenSpacePanning: false,
      minDistance: 1,
      maxDistance: 15,
      maxPolarAngle: 135 * Math.PI / 179.99,
      minAzimuthAngle: -135 * Math.PI / 179.99,
      maxAzimuthAngle: 135 * Math.PI / 179.99,
      enablePan: false,
      enableRotate: true,
      enableZoom: true,
      target: modelPosition
    };
    onMounted(() => {
      const renderer = rendererC.value;
      const stats = new Stats();
      stats.showPanel(0);
      const statsContainer = document.querySelector(".stats");
      if (statsContainer)
        statsContainer.appendChild(stats.dom);
      addLights(scene.value);
      addModel(loader, scene.value, objects.value, `open_teeth/open_teeth.gltf`);
      renderer.onBeforeRender(() => {
        stats.begin();
      });
      renderer.onAfterRender(() => {
        stats.end();
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _hoisted_1,
        unref(loading).progress != 100 ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, " \u0141adowanie: " + toDisplayString(unref(loading).progress) + "% ", 1)
        ])) : createCommentVNode("", true),
        objects.value.teeth ? (openBlock(), createElementBlock("div", _hoisted_4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(objects.value.teeth, (teeth, index) => {
            return openBlock(), createElementBlock("button", {
              type: "button",
              key: index,
              onClick: ($event) => teeth.visible = !teeth.visible,
              class: normalizeClass(["teeth", { "hidden": !teeth.visible }])
            }, toDisplayString(teeth.name), 11, _hoisted_5);
          }), 128))
        ])) : createCommentVNode("", true),
        createVNode(unref(Renderer), {
          ref_key: "rendererC",
          ref: rendererC,
          antialias: "",
          "orbit-ctrl": controlsSettings,
          resize: "window"
        }, {
          default: withCtx(() => [
            createVNode(unref(PerspectiveCamera), {
              ref: "camera",
              fov: 60,
              aspect: unref(clientWidth) / unref(clientHeight),
              near: 1,
              far: 30,
              position: { x: unref(modelPosition).x + unref(cameraOffset).x, y: unref(modelPosition).y + unref(cameraOffset).y, z: unref(modelPosition).z + unref(cameraOffset).z }
            }, null, 8, ["aspect", "position"]),
            createVNode(unref(Scene), {
              ref_key: "scene",
              ref: scene,
              background: "#44b1ff"
            }, null, 512)
          ]),
          _: 1
        }, 512)
      ], 64);
    };
  }
});
createApp(_sfc_main).mount("#app");
