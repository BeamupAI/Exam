var camera, scene, renderer;
var geometry, material, mesh;
var sphere, device_mesh;
var line_geometry, line_material, wire;
var wire_objects = [];
var line_points = [];

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
    100
  );

  camera.position.set(5, 5, 20);

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(2, 2, 2);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(server.position.x, server.position.y, server.position.z) 
  scene.add(mesh);
  
  sphere = new THREE.SphereGeometry(1, 20, 20);

  for(i = 0; i < devices.length; i++){
    device_mesh = new THREE.Mesh(sphere, material);
    device_mesh.position.set(devices[i].position.x, devices[i].position.y, devices[i].position.z);
    scene.add(device_mesh);
  }

  line_material = new THREE.LineBasicMaterial({
    color: 0x0FA05F,
    linewidth: 3});
  
  
  // for(i = 0; i < wires.length; i++){
  //   line_geometry = new THREE.Geometry();
  //   for(j = 0; j < wires[i].points.length; j++){
  //     var point = wires[i].points
  //     line_geometry.vertices.push(new THREE.Vector3(point[j].x, point[j].y, point[j].z));
  //   }
  //   var wire = new THREE.Line(line_geometry, line_material);
  //   wire.visible = false;
  //   scene.add(wire);
  //   wire_objects.push(wire);
  // }

  line_material = new THREE.LineBasicMaterial({
    color: 0x0FA05F,
    linewidth: 3});
    
  // indices = [0,1,1,2, 3,4, 5,6,6,7, 8,9,9,10,10,11,11,12,12,13];
  indices = [];
  
  var index = 0;
  line_geometry = new THREE.BufferGeometry();
  for(var i = 0; i < wires.length; i++){
    for(var j = 0; j < wires[i].points.length; j++){
      var point = wires[i].points
      line_points.push(point[j].x, point[j].y, point[j].z);
      if(j > 0){
        indices.push(index)
        index += 1;
        indices.push(index)
      }
    };
    index += 1;
  };
  console.log(indices);

  line_geometry.setAttribute('position', new THREE.Float32BufferAttribute(line_points, 3));

  line_geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));

  wire = new THREE.LineSegments(line_geometry, line_material);
  wire.visible = false;
  scene.add(wire);
  

  // for(i = 0; i < wire_objects.length; i++){
  //   wire_objects[i].visible = true;
  // }

  btnShowHide = document.getElementById('showHide');

  // console.log(wire_objects);

  var wiresHidden = false;

  btnShowHide.addEventListener('click', function(){
    if(wiresHidden){
      wiresHidden = false;
      wire.visible = false;

    } else {
        wiresHidden = true;
        wire.visible = true;
    }
    renderer.render(scene, camera);
  })

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);

  window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})
}
