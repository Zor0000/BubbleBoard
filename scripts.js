document.addEventListener("DOMContentLoaded", function () {
  // Set up the scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(500, 300);
  document.getElementById("render").appendChild(renderer.domElement);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.background = new THREE.Color(0xbcb88a);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5).normalize();
  scene.add(directionalLight);

  // Load models
  const models = [
    "models/boba_tea_cup/m1.gltf",
    "models/bubble_tea_and_cookies/m2.gltf",
    "models/cafe_latte_with_art/m3.gltf",
    "models/desserts/m4.gltf",
    "models/hot_chocolate/m5.glb",
  ]; // List of your GLTF models
  let currentModelIndex = 0;
  let currentModel;

  const loader = new THREE.GLTFLoader();
  function loadModel(index) {
    if (currentModel) {
      scene.remove(currentModel);
    }
    loader.load(models[index], function (gltf) {
      currentModel = gltf.scene;

      // Normalize the scale of the model
      const box = new THREE.Box3().setFromObject(currentModel);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 5 / maxDim;
      currentModel.scale.set(scale, scale, scale);

      scene.add(currentModel);
      render();
    });
  }

  loadModel(currentModelIndex);

  // Navigation
  document.getElementById("prev").addEventListener("click", function () {
    currentModelIndex = (currentModelIndex - 1 + models.length) % models.length;
    loadModel(currentModelIndex);
  });

  document.getElementById("next").addEventListener("click", function () {
    currentModelIndex = (currentModelIndex + 1) % models.length;
    loadModel(currentModelIndex);
  });

  // Position the camera
  camera.position.z = 20;
  camera.position.x = 0;
  camera.position.y = 3;

  // Create an animation loop
  function animate() {
    requestAnimationFrame(animate);
    if (currentModel) {
      currentModel.rotation.y += 0.02; // Rotate the model for some basic animation
    }
    render();
  }

  function render() {
    renderer.render(scene, camera);
  }

  animate();

  // Handle window resize
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
});
