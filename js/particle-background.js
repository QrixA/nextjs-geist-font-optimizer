/**
 * Particle Background Animation
 * Creates a dynamic background with floating particles simulating network traffic
 */
(function() {
    let camera, scene, renderer;
    let particles;
    const container = document.getElementById('particle-background');

    if (!container) return;

    function init() {
        // Scene setup
        scene = new THREE.Scene();
        
        // Camera setup with perspective for depth
        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 50;

        // Renderer setup
        renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true 
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Create particles
        createParticles();

        // Handle window resize
        window.addEventListener('resize', onWindowResize, false);

        // Start animation
        animate();
    }

    function createParticles() {
        // Determine particle count based on screen size
        const particleCount = Math.min(
            200,
            Math.floor((window.innerWidth * window.innerHeight) / 10000)
        );

        // Create particle geometry
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Position
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 100;
            positions[i3 + 1] = (Math.random() - 0.5) * 100;
            positions[i3 + 2] = (Math.random() - 0.5) * 100;

            // Velocity
            velocities[i3] = (Math.random() - 0.5) * 0.2;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.2;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.2;

            // Color (mix of red and cyan)
            const colorChoice = Math.random();
            if (colorChoice > 0.7) {
                // Red particles
                colors[i3] = 1.0;
                colors[i3 + 1] = 0.2;
                colors[i3 + 2] = 0.2;
            } else {
                // Cyan particles
                colors[i3] = 0.2;
                colors[i3 + 1] = 1.0;
                colors[i3 + 2] = 1.0;
            }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Store velocities for animation
        geometry.userData = { velocities };

        // Create particle material
        const material = new THREE.PointsMaterial({
            size: 0.5,
            transparent: true,
            opacity: 0.8,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        // Create particle system
        particles = new THREE.Points(geometry, material);
        scene.add(particles);
    }

    function updateParticles() {
        if (!particles) return;

        const positions = particles.geometry.attributes.position.array;
        const velocities = particles.geometry.userData.velocities;

        for (let i = 0; i < positions.length; i += 3) {
            // Update positions based on velocity
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];

            // Check boundaries and reset particles
            if (Math.abs(positions[i]) > 50) {
                positions[i] = -50 * Math.sign(positions[i]);
            }
            if (Math.abs(positions[i + 1]) > 50) {
                positions[i + 1] = -50 * Math.sign(positions[i + 1]);
            }
            if (Math.abs(positions[i + 2]) > 50) {
                positions[i + 2] = -50 * Math.sign(positions[i + 2]);
            }
        }

        particles.geometry.attributes.position.needsUpdate = true;
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);

        // Update particle positions
        updateParticles();

        // Rotate particle system slightly
        if (particles) {
            particles.rotation.y += 0.0005;
        }

        renderer.render(scene, camera);
    }

    // Initialize if WebGL is available
    try {
        if (window.WebGLRenderingContext) {
            init();
        } else {
            console.warn('WebGL not supported - particle background disabled');
        }
    } catch (e) {
        console.error('Error initializing particle background:', e);
    }
})();
