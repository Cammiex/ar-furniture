import './App.css';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { XREstimatedLight } from 'three/examples/jsm/webxr/XREstimatedLight';
import { useEffect } from 'react';

function App() {
  let reticle;
  let hitTestSource = null;
  let hitTestSourceRequested = false;

  let scene, camera, renderer;

  let models = [
    './dylan_armchair_yolk_yellow.glb',
    './ivan_armchair_mineral_blue.glb',
    './marble_coffee_table.glb',
    './flippa_functional_coffee_table_w._storagewalnut.glb',
    './frame_armchairpetrol_velvet_with_gold_frame.glb',
    './elnaz_nesting_side_tables_brass__green_marble.glb',
    './chairmans-chair.glb',
  ];
  let modelScaleFactor = [0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.008];
  let items = [];
  let itemSelectedIndex = 0;

  let controller;

  useEffect(() => {
    init();
    setupFurnitureSelection();
    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function init() {
    let myCanvas = document.getElementById('canvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      40
    );

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({
      canvas: myCanvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;

    const xrLight = new XREstimatedLight(renderer);
    xrLight.addEventListener('estimationstart', () => {
      scene.add(xrLight);
      scene.remove(light);
      if (xrLight.environment) {
        scene.environment = xrLight.environment;
      }
    });

    xrLight.addEventListener('estimationend', () => {
      scene.add(light);
      scene.remove(xrLight);
    });

    let arButton = ARButton.createButton(renderer, {
      requiredFeatures: ['hit-test'],
      optionalFeatures: ['dom-overlay', 'light-estimation'],
      domOverlay: { root: document.body },
    });
    arButton.style.bottom = '20%';
    document.body.appendChild(arButton);

    for (let i = 0; i < models.length; i++) {
      const loader = new GLTFLoader();
      loader.load(models[i], function (glb) {
        let model = glb.scene;
        items[i] = model;
      });
    }

    controller = renderer.xr.getController(0);
    controller.addEventListener('select', onSelect);
    scene.add(controller);

    reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial()
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);
  }

  function onSelect() {
    if (reticle.visible) {
      let newModel = items[itemSelectedIndex].clone();
      newModel.visible = true;
      reticle.matrix.decompose(
        newModel.position,
        newModel.quaternion,
        newModel.scale
      );
      let scaleFactor = modelScaleFactor[itemSelectedIndex];
      newModel.scale.set(scaleFactor, scaleFactor, scaleFactor);

      scene.add(newModel);
    }
  }

  const onClicked = (e, selectItem, index) => {
    itemSelectedIndex = index;

    for (let i = 0; i < models.length; i++) {
      const el = document.querySelector(`#item` + i);
      el.classList.remove('scale-[1.20]');
    }
    e.target.classList.add('scale-[1.20]');
  };

  function setupFurnitureSelection() {
    for (let i = 0; i < models.length; i++) {
      const el = document.querySelector(`#item` + i);
      if (el) {
        el.addEventListener('beforexrselect', (e) => {
          e.preventDefault();
          e.stopPropagation();
        });
        el.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          onClicked(e, items[i], i);
        });
      } else {
        console.error(`Element with id #item${i} not found`);
      }
    }
  }

  function animate() {
    renderer.setAnimationLoop(render);
  }

  // function render(timestamp, frame) {
  //   if (frame) {
  //     const referenceSpace = renderer.xr.getReferenceSpace();
  //     const session = renderer.xr.getSession();

  //     if (hitTestSourceRequested === false) {
  //       session.requestReferenceSpace('viewer').then(function (referenceSpace) {
  //         session
  //           .requestHitTestSource({ space: referenceSpace })
  //           .then(function (source) {
  //             hitTestSource = source;
  //           });
  //       });

  //       session.addEventListener('end', function () {
  //         hitTestSourceRequested = false;
  //         hitTestSource = null;
  //       });

  //       hitTestSourceRequested = true;
  //     }

  //     if (hitTestSource) {
  //       const hitTestResults = frame.getHitTestResults(hitTestSource);

  //       if (hitTestResults.length) {
  //         const hit = hitTestResults[0];

  //         reticle.visible = true;
  //         reticle.matrix.fromArray(
  //           hit.getPose(referenceSpace).transform.matrix
  //         );
  //       } else {
  //         reticle.visible = false;
  //       }
  //     }
  //   }

  //   renderer.render(scene, camera);
  // }
  function render(timestamp, frame) {
    if (frame) {
      const referenceSpace = renderer.xr.getReferenceSpace();
      const session = renderer.xr.getSession();

      if (hitTestSourceRequested === false) {
        session.requestReferenceSpace('viewer').then(function (referenceSpace) {
          session
            .requestHitTestSource({ space: referenceSpace })
            .then(function (source) {
              hitTestSource = source;
            });
        });

        session.addEventListener('end', function () {
          hitTestSourceRequested = false;
          hitTestSource = null;
        });

        hitTestSourceRequested = true;
      }

      if (hitTestSource) {
        const hitTestResults = frame.getHitTestResults(hitTestSource);

        if (hitTestResults.length) {
          const hit = hitTestResults[0];
          reticle.visible = true;
          reticle.matrix.fromArray(
            hit.getPose(referenceSpace).transform.matrix
          );
        } else {
          reticle.visible = false;
        }
      }
    }

    renderer.render(scene, camera);
  }

  return (
    <div className="overflow-x-hidden App">
      <canvas id="canvas"></canvas>
      <div className="overflow-y-hidden overflow-x-scroll inline-block fixed bottom-0 h-[100px] no-scrollbar select-none w-full whitespace-nowrap px-3">
        {' '}
        <div className="size-[80px] border rounded-xl items-center justify-center p-2 inline-block mr-3 ">
          {' '}
          <img
            className="object-contain object-center transition-all duration-200 size-full"
            id="item0"
            src="/armchair.png"
            alt="Dylan Armchair"
          />
        </div>
        <div className="size-[80px] border rounded-xl items-center justify-center p-2 inline-block mr-3">
          {' '}
          <img
            className="object-contain object-center transition-all duration-200 size-full"
            id="item1"
            src="/lounger.png"
            alt="Ivan Armchair"
          />
        </div>
        <div className="size-[80px] border rounded-xl items-center justify-center p-2 inline-block mr-3">
          {' '}
          <img
            className="object-contain object-center transition-all duration-200 size-full"
            id="item2"
            src="/marble-coffeetable.png"
            alt="Marble Coffee Table"
          />
        </div>
        <div className="size-[80px] border rounded-xl items-center justify-center p-2 inline-block mr-3">
          {' '}
          <img
            className="object-contain object-center transition-all duration-200 size-full"
            id="item3"
            src="/walnut-coffeetable.png"
            alt="Flippa Coffee Table"
          />
        </div>
        <div className="size-[80px] border rounded-xl items-center justify-center p-2 inline-block mr-3">
          {' '}
          <img
            className="object-contain object-center transition-all duration-200 size-full"
            id="item4"
            src="/chair-with-gold.png"
            alt="Frame Armchair"
          />
        </div>
        <div className="size-[80px] border rounded-xl items-center justify-center p-2 inline-block mr-3">
          {' '}
          <img
            className="object-contain object-center transition-all duration-200 size-full"
            id="item5"
            src="/nesting-tables.png"
            alt="Elnaz Side Tables"
          />
        </div>
        <div className="size-[80px] border rounded-xl items-center justify-center p-2 inline-block mr-3">
          {' '}
          <img
            className="object-contain object-center transition-all duration-200 size-full"
            id="item6"
            src="/chairmans-chair.png"
            alt="Chairman's Chair"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
