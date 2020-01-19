var camera, scene, renderer;
var geometry, material, mesh;

var devices = [
  {
    position: { x: 0, y: 0, z: 0 }
  },
  {
    position: { x: 10, y: 10, z: 0 }
  },
  {
    position: { x: 12, y: 10, z: 0 }
  },
  {
    position: { x: 2, y: 15, z: 0 }
  }
];
var server = { position: { x: 5, y: 5, z: 0 } };

var wires = [
  {
    points: [
      { x: 0, y: 0, z: 0 },
      { x: 5, y: 0, z: 0 },
      { x: 5, y: 5, z: 0 }
    ]
  },
  {
    points: [
      { x: 10, y: 10, z: 0 },
      { x: 5, y: 5, z: 0 }
    ]
  },
  {
    points: [
      { x: 12, y: 10, z: 0 },
      { x: 12, y: 5, z: 0 },
      { x: 5, y: 5, z: 0 }
    ]
  },
  {
    points: [
      { x: 2, y: 15, z: 0 },
      { x: 2, y: 12, z: 0 },
      { x: 3, y: 12, z: 0 },
      { x: 3, y: 10, z: 0 },
      { x: 5, y: 10, z: 0 },
      { x: 5, y: 5, z: 0 }
    ]
  }
];

init();

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 1;

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}
