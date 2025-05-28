/**
 * Warning Icon 3D Animation
 * A rotating 3D warning triangle with glow effect
 */
(function() {
    let camera, scene, renderer;
    let triangle;
    const container = document.getElementById('warning-icon-3d');

    if (!container) return;

    function init() {
        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 5;

        // Renderer setup with transparency
        renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Create warning triangle geometry
        const triangleShape = new THREE.Shape();
        triangleShape.moveTo(0, 1);
        triangleShape.lineTo(-1, -1);
        triangleShape.lineTo(1, -1);
        triangleShape.lineTo(0, 1);

        const geometry = new THREE.ShapeGeometry(triangleShape);
        
        // Create materials for glow effect
        const triangleMaterial = new THREE.MeshPhongMaterial({
            color: 0xff0000,
            emissive: 0x550000,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9
        });

        // Create the triangle mesh
        triangle = new THREE.Mesh(geometry, triangleMaterial);
        scene.add(triangle);

        // Add outline
        const edges = new THREE.EdgesGeometry(geometry);
        const outline = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ 
                color: 0xff3333,
                transparent: true,
                opacity: 0.8
            })
        );
        triangle.add(outline);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xff0000, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const blueLight = new THREE.PointLight(0x00ffff, 0.5);
        blueLight.position.set(-5, -5, 5);
        scene.add(blueLight);

        // Handle window resize
        window.addEventListener('resize', onWindowResize, false);

        // Start animation
        animate();
    }

    function onWindowResize() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }

    function animate() {
        requestAnimationFrame(animate);

        // Rotate the triangle
        if (triangle) {
            triangle.rotation.y += 0.01;
            triangle.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;
        }

        // Pulse effect
        if (triangle && triangle.material) {
            const pulseIntensity = (Math.sin(Date.now() * 0.003) + 1) / 2;
            triangle.material.emissiveIntensity = 0.5 + pulseIntensity * 0.5;
        }

        renderer.render(scene, camera);
    }

    // Initialize if WebGL is available
    try {
        if (window.WebGLRenderingContext) {
            init();
        } else {
            // Fallback for no WebGL support
            container.innerHTML = '<div class="fallback-warning">⚠️</div>';
        }
    } catch (e) {
        console.error('Error initializing 3D warning icon:', e);
        container.innerHTML = '<div class="fallback-warning">⚠️</div>';
    }
})();
