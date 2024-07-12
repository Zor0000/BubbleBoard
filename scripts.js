document.addEventListener("DOMContentLoaded", function () {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('menu-3d').appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.background = new THREE.Color( 0xBCB88A );
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Load models
    const models = ['models/boba_tea_cup/m1.gltf', 'models/bubble_tea_and_cookies/m2.gltf', 'models/cafe_latte_with_art/m3.gltf', 'models/desserts/m4.gltf']; // List of your GLTF models
    let currentModelIndex = 0;
    let currentModel;

    const loader = new THREE.GLTFLoader();
    function loadModel(index) {
        if (currentModel) {
            scene.remove(currentModel);
        }
        loader.load(models[index], function (gltf) {
            currentModel = gltf.scene;
            scene.add(currentModel);
            render();
        });
    }

    loadModel(currentModelIndex);

    // Navigation
    document.getElementById('prev').addEventListener('click', function () {
        currentModelIndex = (currentModelIndex - 1 + models.length) % models.length;
        loadModel(currentModelIndex);
    });

    document.getElementById('next').addEventListener('click', function () {
        currentModelIndex = (currentModelIndex + 1) % models.length;
        loadModel(currentModelIndex);
    });

    // Position the camera
    camera.position.z = 5;

    // Create an animation loop
    function animate() {
        requestAnimationFrame(animate);
        if (currentModel) {
            currentModel.rotation.y += 0.01; // Rotate the model for some basic animation
        }
        render();
    }

    function render() {
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
});
