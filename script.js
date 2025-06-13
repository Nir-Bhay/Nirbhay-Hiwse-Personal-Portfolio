// Particles.js configuration
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#00f0ff"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            },
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#00f0ff",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 3
            }
        }
    },
    retina_detect: true
});

// Custom Cursor
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

// Create cursor trails
const trailCount = 10;
const trails = [];

for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    document.body.appendChild(trail);
    trails.push(trail);
}

let mouseX = 0;
let mouseY = 0;
let trailPositions = Array(trailCount).fill().map(() => ({ x: 0, y: 0 }));

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Check for interactive elements
document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'BUTTON' ||
        e.target.classList.contains('nav-node') ||
        e.target.tagName === 'A') {
        cursor.classList.add('active');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'BUTTON' ||
        e.target.classList.contains('nav-node') ||
        e.target.tagName === 'A') {
        cursor.classList.remove('active');
    }
});

// Orbital Navigation
// If you want the orbital nav to follow the mouse cursor
const orbitalNav = document.querySelector('.orbital-nav');


// Or if you want it at a fixed position, you can set it explicitly
// orbitalNav.style.left = '100px';
// orbitalNav.style.top = '100px';
// Grid Lines
const gridContainer = document.querySelector('.grid-lines');
const lineCount = 10;
const lineSpacing = 100 / lineCount;

for (let i = 1; i < lineCount; i++) {
    const line = document.createElement('div');
    line.classList.add('horizontal-line');
    line.style.top = `${i * lineSpacing}%`;
    line.style.animationDelay = `${i * 0.3}s`;
    gridContainer.appendChild(line);
}

// Terminal Typing Animation
const terminalLines = document.querySelectorAll('.terminal-line');

function animateTerminalLine(line, index) {
    const text = line.getAttribute('data-text');
    const delay = index * 1000; // 1 second delay between lines

    setTimeout(() => {
        line.style.opacity = '1';
        line.style.animation = `typewriter ${text.length * 50}ms steps(${text.length}) forwards`;
        line.style.position = 'relative';
        line.textContent = text;

        // Add cursor
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.position = 'absolute';
        cursor.style.right = '0';
        cursor.style.animation = 'blinkCursor 0.8s infinite';
        line.appendChild(cursor);

        // Remove cursor when typing is complete except for the last line
        setTimeout(() => {
            if (index !== terminalLines.length - 1) {
                cursor.remove();
            }
        }, text.length * 50 + 500);

    }, delay);
}

// Name Animation
function animateName() {
    const name = document.querySelector('.name');
    const text = name.textContent;
    name.textContent = '';

    [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${2.5 + (index * 0.05)}s`;
        name.appendChild(span);
    });
}

// Call the function when the page loads
window.addEventListener('DOMContentLoaded', animateName);
// Or call it immediately if the DOM is already loaded
// animateName();

// Roles Animation
function animateRoles() {
    const roles = document.querySelector('.roles');
    setTimeout(() => {
        roles.style.opacity = '1';
        roles.style.animation = 'fadeIn 0.5s forwards';
    }, 3000);
}

// Stats Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const duration = 2000; // 2 seconds
        const step = target / duration * 10; // Update every 10ms

        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current > target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 10);
    });
}
function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'your-resume.pdf'; // Replace with your resume file path
    link.download = 'Your_Name_Resume.pdf'; // Replace with desired filename
    link.click();
}
// 3D Sphere
function initSphere() {
    const container = document.querySelector('.sphere-container');
    const canvas = document.getElementById('sphere-canvas');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create main sphere group
    const sphereGroup = new THREE.Group();

    // Create multiple layered spheres for depth
    // Outer glowing sphere
    const outerGeometry = new THREE.SphereGeometry(5.5, 32, 32);
    const outerMaterial = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const outerSphere = new THREE.Mesh(outerGeometry, outerMaterial);
    sphereGroup.add(outerSphere);

    // Main wireframe sphere with gradient effect
    const geometry = new THREE.IcosahedronGeometry(5, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.7
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphereGroup.add(sphere);

    // Inner core sphere
    const coreGeometry = new THREE.OctahedronGeometry(2, 0);
    const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0xfaff00,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    sphereGroup.add(coreSphere);

    scene.add(sphereGroup);

    // Enhanced particles with different sizes and colors
    const particleGroups = [];
    const particleColors = [0xfaff00, 0x00f0ff, 0xff00ff, 0x00ff00];

    particleColors.forEach((color, colorIndex) => {
        const particleCount = 50;
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesMaterial = new THREE.PointsMaterial({
            color: color,
            size: 0.1 + (colorIndex * 0.05),
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particlePositions = [];
        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const radius = 3 + Math.random() * 2;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            particlePositions.push(x, y, z);
        }

        particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        particleGroups.push(particles);
        scene.add(particles);
    });

    // Create orbital rings
    const rings = [];
    for (let i = 0; i < 3; i++) {
        const ringGeometry = new THREE.TorusGeometry(6 + i * 0.5, 0.05, 8, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: i === 1 ? 0xfaff00 : 0x00f0ff,
            transparent: true,
            opacity: 0.3
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2 * Math.random();
        ring.rotation.y = Math.PI * Math.random();
        rings.push(ring);
        scene.add(ring);
    }

    // Add floating tech icons with 3D text
    const loader = new THREE.FontLoader();
    const techStack = [
        { name: 'React', color: 0x61dafb, position: [6, 0, 0] },
        { name: 'Node', color: 0x68a063, position: [-6, 0, 0] },
        { name: 'JS', color: 0xf7df1e, position: [0, 6, 0] },
        { name: 'Three', color: 0x000000, position: [0, -6, 0] },
        { name: 'WebGL', color: 0x990000, position: [0, 0, 6] },
        { name: 'CSS', color: 0x1572b6, position: [0, 0, -6] }
    ];

    // Create tech orbs instead of text (since FontLoader requires additional setup)
    const techOrbs = [];
    techStack.forEach((tech, index) => {
        const orbGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const orbMaterial = new THREE.MeshBasicMaterial({
            color: tech.color,
            transparent: true,
            opacity: 0.8,
            emissive: tech.color,
            emissiveIntensity: 0.5
        });
        const orb = new THREE.Mesh(orbGeometry, orbMaterial);
        orb.position.set(...tech.position);

        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(0.7, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: tech.color,
            transparent: true,
            opacity: 0.2
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        orb.add(glow);

        techOrbs.push(orb);
        scene.add(orb);
    });

    // Add light effects
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 1, 100);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    camera.position.z = 15;

    // Enhanced animation variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let time = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Pulse animation for core
    function pulseCore() {
        coreSphere.scale.x = 1 + Math.sin(time * 2) * 0.1;
        coreSphere.scale.y = 1 + Math.sin(time * 2) * 0.1;
        coreSphere.scale.z = 1 + Math.sin(time * 2) * 0.1;
    }

    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        targetX = mouseX * 0.1;
        targetY = mouseY * 0.1;

        // Rotate spheres at different speeds
        sphere.rotation.y += 0.005;
        sphere.rotation.x += 0.002;

        coreSphere.rotation.y -= 0.01;
        coreSphere.rotation.x -= 0.005;

        outerSphere.rotation.y += 0.002;
        outerSphere.rotation.z += 0.001;

        // Animate particle groups
        particleGroups.forEach((group, index) => {
            group.rotation.y += 0.003 * (index + 1) * 0.3;
            group.rotation.x += 0.001 * (index + 1) * 0.3;
            group.rotation.z += 0.002 * (index + 1) * 0.3;
        });

        // Animate rings
        rings.forEach((ring, index) => {
            ring.rotation.z += 0.01 * (index + 1) * 0.5;
            ring.rotation.x += 0.005 * (index + 1) * 0.3;
        });

        // Animate tech orbs in orbital motion
        techOrbs.forEach((orb, index) => {
            const angle = time + (index * Math.PI * 2 / techOrbs.length);
            const radius = 7 + Math.sin(time * 2 + index) * 0.5;

            orb.position.x = Math.cos(angle) * radius;
            orb.position.y = Math.sin(angle * 0.5) * 3;
            orb.position.z = Math.sin(angle) * radius;

            orb.rotation.y += 0.02;

            // Pulse effect
            const scale = 1 + Math.sin(time * 3 + index) * 0.2;
            orb.scale.set(scale, scale, scale);
        });

        // Pulse core
        pulseCore();

        // Dynamic opacity based on mouse distance
        const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
        material.opacity = 0.7 + distance * 0.2;

        // Smooth camera movement based on mouse
        camera.position.x += (targetX * 5 - camera.position.x) * 0.05;
        camera.position.y += (targetY * 5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        // Wobble effect on hover
        sphereGroup.rotation.x = Math.sin(time) * 0.05 + mouseY * 0.2;
        sphereGroup.rotation.y = Math.cos(time) * 0.05 + mouseX * 0.2;

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });

    // Add interaction - click to explode/implode
    canvas.addEventListener('click', () => {
        techOrbs.forEach((orb, index) => {
            const targetRadius = orb.userData.expanded ? 7 : 12;
            orb.userData.expanded = !orb.userData.expanded;

            // Animate expansion
            const startPos = orb.position.clone();
            const angle = index * Math.PI * 2 / techOrbs.length;
            const endPos = new THREE.Vector3(
                Math.cos(angle) * targetRadius,
                Math.sin(angle * 0.5) * 3,
                Math.sin(angle) * targetRadius
            );

            // Simple lerp animation
            let progress = 0;
            const animateExpansion = () => {
                progress += 0.05;
                if (progress <= 1) {
                    orb.position.lerpVectors(startPos, endPos, progress);
                    requestAnimationFrame(animateExpansion);
                }
            };
            animateExpansion();
        });
    });
}
// Main animation sequence
function startAnimations() {
    // Terminal typing sequence
    terminalLines.forEach(animateTerminalLine);

    // Name animation with delay
    animateName();

    // Roles animation
    animateRoles();

    // Counter animation with delay
    setTimeout(animateCounters, 4000);

    // Initialize 3D sphere
    initSphere();
}

// Animation loop for cursor and orbital nav
function animationLoop() {
    // Update cursor position
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    // Update orbital nav position
    orbitalNav.style.left = `${mouseX}px`;
    orbitalNav.style.top = `${mouseY}px`;

    // Update trail positions with delay
    for (let i = 0; i < trails.length; i++) {
        // Calculate the delayed position (older positions for trails further back)
        const delayFactor = (trails.length - i) / trails.length;

        // Current target is the mouse position
        const targetX = mouseX;
        const targetY = mouseY;

        // Interpolate towards target
        trailPositions[i].x += (targetX - trailPositions[i].x) * (0.2 * delayFactor);
        trailPositions[i].y += (targetY - trailPositions[i].y) * (0.2 * delayFactor);

        // Apply position
        trails[i].style.left = `${trailPositions[i].x}px`;
        trails[i].style.top = `${trailPositions[i].y}px`;

        // Adjust opacity based on position in trail
        trails[i].style.opacity = (i / trails.length) * 0.5;
    }

    requestAnimationFrame(animationLoop);
}

// Start everything when the page loads
window.addEventListener('load', () => {
    startAnimations();
    animationLoop();
});


// Skills Network Visualization
document.addEventListener('DOMContentLoaded', function () {
    // Check if the about section is in the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start animations when section is visible
                initSkillsNetwork();
                animateElements();
                observer.disconnect(); // Only trigger once
            }
        });
    }, { threshold: 0.2 });

    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) observer.observe(aboutSection);

    // Animate elements as they scroll into view
    function animateElements() {
        const fadeElements = document.querySelectorAll('.fade-in');
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });

        // Add glitch effect to profile image
        const profileImage = document.querySelector('.profile-image');
        if (profileImage) {
            setInterval(() => {
                const glitchEffect = profileImage.querySelector('.image-glitch-effect');
                glitchEffect.style.opacity = '0.5';

                // Random offset positions
                glitchEffect.style.left = `${(Math.random() - 0.5) * 10}px`;
                glitchEffect.style.top = `${(Math.random() - 0.5) * 10}px`;

                setTimeout(() => {
                    glitchEffect.style.opacity = '0';
                    glitchEffect.style.left = '0';
                    glitchEffect.style.top = '0';
                }, 200);
            }, 3000);
        }
    }

    // Initialize the Neural Network Skills Visualization
    function initSkillsNetwork() {
        const canvas = document.getElementById('skills-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement;

        // Set canvas size
        function resizeCanvas() {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Define skill nodes with better colors and bigger sizes
       const skills = [
    // 🟦 Frontend Skills – Blue Tones
    {
        name: 'HTML', level: 90, category: 'frontend',
        color: '#4FC3F7', bgColor: '#0288D1', x: 0, y: 0, size: 35,
        description: 'Semantic HTML5, accessibility focused markup'
    },
    {
        name: 'CSS', level: 85, category: 'frontend',
        color: '#29B6F6', bgColor: '#0277BD', x: 0, y: 0, size: 32,
        description: 'Advanced styling, animations, and responsive design'
    },
    {
        name: 'JavaScript', level: 80, category: 'frontend',
        color: '#5C6BC0', bgColor: '#3949AB', x: 0, y: 0, size: 40,
        description: 'ES6+, DOM manipulation, async programming'
    },
    {
        name: 'React', level: 75, category: 'frontend',
        color: '#42A5F5', bgColor: '#1E88E5', x: 0, y: 0, size: 38,
        description: 'Component architecture, hooks, and state management'
    },

    // 🟩 Backend Skills – Green Shades
    {
        name: 'Node.js', level: 70, category: 'backend',
        color: '#66BB6A', bgColor: '#388E3C', x: 0, y: 0, size: 36,
        description: 'Server-side JavaScript, RESTful APIs'
    },
    {
        name: 'Express', level: 65, category: 'backend',
        color: '#9CCC65', bgColor: '#689F38', x: 0, y: 0, size: 32,
        description: 'Web application framework for Node.js'
    },
    {
        name: 'MongoDB', level: 65, category: 'backend',
        color: '#26A69A', bgColor: '#00897B', x: 0, y: 0, size: 32,
        description: 'NoSQL database integration and schema design'
    },

    // 🟣 Tools – Purple
    {
        name: 'Git', level: 75, category: 'tools',
        color: '#AB47BC', bgColor: '#8E24AA', x: 0, y: 0, size: 34,
        description: 'Version control, branching strategies, collaborative workflows'
    },

    // 🔴 Language – Red/Pink Shades
    {
        name: 'Java', level: 70, category: 'language',
        color: '#EC407A', bgColor: '#D81B60', x: 0, y: 0, size: 32,
        description: 'Object-oriented programming and application development'
    },

    // 🧠 AI Tools – Bright and Futuristic
    {
        name: 'Copilot', level: 70, category: 'ai-tools',
        color: '#FFE082', bgColor: '#FFC107', x: 0, y: 0, size: 32,
        description: 'GitHub Copilot AI pair programmer integration'
    },
    {
        name: 'ChatGPT', level: 85, category: 'ai-tools',
        color: '#80DEEA', bgColor: '#26C6DA', x: 0, y: 0, size: 36,
        description: 'AI assistant for code generation and debugging'
    },
    {
        name: 'Cloud Opus 4', level: 60, category: 'ai-tools',
        color: '#CE93D8', bgColor: '#9C27B0', x: 0, y: 0, size: 30,
        description: 'OpenAI multimodal cloud model integration'
    },

    // 🟠 Design – Warm Orange Tones
    {
        name: 'UI Design', level: 70, category: 'design',
        color: '#FF7043', bgColor: '#F4511E', x: 0, y: 0, size: 32,
        description: 'User interface prototyping and modern design principles'
    },
    {
        name: 'Figma', level: 75, category: 'design',
        color: '#FFAB91', bgColor: '#D84315', x: 0, y: 0, size: 34,
        description: 'UI/UX design tool for wireframes and prototypes'
    },
];


        // Define connections between related skills
        const connections = [
            { source: 'HTML', target: 'CSS', strength: 0.9 },
            { source: 'HTML', target: 'JavaScript', strength: 0.8 },
            { source: 'CSS', target: 'JavaScript', strength: 0.8 },
            { source: 'JavaScript', target: 'React', strength: 0.9 },
            { source: 'JavaScript', target: 'Node.js', strength: 0.7 },
            { source: 'Node.js', target: 'Express', strength: 0.9 },
            { source: 'Express', target: 'MongoDB', strength: 0.8 },
            { source: 'React', target: 'JavaScript', strength: 0.9 },
            { source: 'React', target: 'UI Design', strength: 0.8 },
            { source: 'Git', target: 'JavaScript', strength: 0.7 },
            { source: 'Git', target: 'Node.js', strength: 0.6 },
            { source: 'Git', target: 'React', strength: 0.5 },
            { source: 'Java', target: 'Node.js', strength: 0.6 },
            { source: 'Java', target: 'Express', strength: 0.5 },
            { source: 'JavaScript', target: 'Git', strength: 0.6 },
            { source: 'React', target: 'UI Design', strength: 0.7 },
            { source: 'HTML', target: 'UI Design', strength: 0.6 },
            { source: 'CSS', target: 'UI Design', strength: 0.8 },
            { source: 'Copilot', target: 'JavaScript', strength: 0.7 },
            { source: 'Copilot', target: 'React', strength: 0.6 },
            { source: 'ChatGPT', target: 'JavaScript', strength: 0.8 },
            { source: 'ChatGPT', target: 'Node.js', strength: 0.7 },
            { source: 'Cloud Opus 4', target: 'JavaScript', strength: 0.6 },
            { source: 'Cloud Opus 4', target: 'Node.js', strength: 0.5 },
            { source: 'Figma', target: 'UI Design', strength: 0.9 }
            
           
        ];

        // Physics simulation variables
        let simulation = {
            nodes: skills,
            links: [],
            centerX: canvas.width / 2,
            centerY: canvas.height / 2,
            running: true
        };

        // Set up the links based on connections
        connections.forEach(conn => {
            const sourceNode = skills.find(node => node.name === conn.source);
            const targetNode = skills.find(node => node.name === conn.target);

            if (sourceNode && targetNode) {
                simulation.links.push({
                    source: sourceNode,
                    target: targetNode,
                    strength: conn.strength,
                    distance: 150 - (conn.strength * 50) // Increased distance for bigger nodes
                });
            }
        });

        // Initialize random positions
        skills.forEach(skill => {
            const angle = Math.random() * Math.PI * 2;
            const radius = 100 + Math.random() * 200;
            skill.x = simulation.centerX + Math.cos(angle) * radius;
            skill.y = simulation.centerY + Math.sin(angle) * radius;
            skill.vx = 0;
            skill.vy = 0;
        });

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        let hoveredNode = null;

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;

            // Check for hover
            hoveredNode = null;
            for (const node of skills) {
                const dx = node.x - mouseX;
                const dy = node.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < node.size) {
                    hoveredNode = node;
                    break;
                }
            }

            // Update skill details display
            updateSkillDetails(hoveredNode);
        });

        function updateSkillDetails(node) {
            const skillName = document.querySelector('.skill-name');
            const skillDescription = document.querySelector('.skill-description');

            if (node) {
                skillName.textContent = node.name;
                skillDescription.textContent = node.description;
                canvas.style.cursor = 'pointer';
            } else {
                skillName.textContent = 'Select a skill';
                skillDescription.textContent = 'Hover over a skill node to see details';
                canvas.style.cursor = 'default';
            }
        }

        // Physics simulation
        function runSimulation() {
            if (!simulation.running) return;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Center force
            simulation.nodes.forEach(node => {
                const dx = simulation.centerX - node.x;
                const dy = simulation.centerY - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 250) {
                    const forceMagnitude = 0.01;
                    node.vx += dx * forceMagnitude;
                    node.vy += dy * forceMagnitude;
                }
            });

            // Link forces
            simulation.links.forEach(link => {
                const dx = link.target.x - link.source.x;
                const dy = link.target.y - link.source.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance === 0) return;

                const idealDistance = link.distance;
                const force = (distance - idealDistance) * 0.005 * link.strength;

                const forceX = dx / distance * force;
                const forceY = dy / distance * force;

                link.source.vx += forceX;
                link.source.vy += forceY;
                link.target.vx -= forceX;
                link.target.vy -= forceY;
            });

            // Node repulsion
            for (let i = 0; i < simulation.nodes.length; i++) {
                for (let j = i + 1; j < simulation.nodes.length; j++) {
                    const nodeA = simulation.nodes[i];
                    const nodeB = simulation.nodes[j];

                    const dx = nodeB.x - nodeA.x;
                    const dy = nodeB.y - nodeA.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance === 0) continue;

                    // Repulsion force (inverse square)
                    const minDistance = nodeA.size + nodeB.size + 20; // Extra padding
                    if (distance < minDistance * 1.5) {
                        const force = 1 / (distance * distance) * 20;
                        const forceX = dx / distance * force;
                        const forceY = dy / distance * force;

                        nodeA.vx -= forceX;
                        nodeA.vy -= forceY;
                        nodeB.vx += forceX;
                        nodeB.vy += forceY;
                    }
                }
            }

            // Mouse attraction/repulsion for hovered node
            if (hoveredNode) {
                const dx = mouseX - hoveredNode.x;
                const dy = mouseY - hoveredNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 0) {
                    const force = 0.2;
                    hoveredNode.vx += dx * force;
                    hoveredNode.vy += dy * force;
                }
            }

            // Update positions with velocity and damping
            simulation.nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                // Damping (friction)
                node.vx *= 0.9;
                node.vy *= 0.9;

                // Boundary collision
                const padding = node.size;
                if (node.x < padding) {
                    node.x = padding;
                    node.vx = Math.abs(node.vx) * 0.5;
                }
                if (node.x > canvas.width - padding) {
                    node.x = canvas.width - padding;
                    node.vx = -Math.abs(node.vx) * 0.5;
                }
                if (node.y < padding) {
                    node.y = padding;
                    node.vy = Math.abs(node.vy) * 0.5;
                }
                if (node.y > canvas.height - padding) {
                    node.y = canvas.height - padding;
                    node.vy = -Math.abs(node.vy) * 0.5;
                }
            });

            // Draw connections
            simulation.links.forEach(link => {
                // Determine if the link connects to a hovered node
                const isHighlighted = hoveredNode &&
                    (link.source === hoveredNode || link.target === hoveredNode);

                // Set line style
                if (isHighlighted) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.lineWidth = 3;
                } else {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
                    ctx.lineWidth = 1;
                }

                // Draw line
                ctx.beginPath();
                ctx.moveTo(link.source.x, link.source.y);
                ctx.lineTo(link.target.x, link.target.y);
                ctx.stroke();
            });

            // Draw nodes
            simulation.nodes.forEach(node => {
                const isHovered = node === hoveredNode;
                const currentSize = isHovered ? node.size * 1.15 : node.size;
                // Draw outer glow
                if (isHovered) {
                    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, currentSize * 1.5);
                    gradient.addColorStop(0, node.color + '40');
                    gradient.addColorStop(1, 'transparent');
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, currentSize * 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Draw main node with gradient
                const nodeGradient = ctx.createRadialGradient(
                    node.x - currentSize * 0.3,
                    node.y - currentSize * 0.3,
                    0,
                    node.x,
                    node.y,
                    currentSize
                );
                nodeGradient.addColorStop(0, node.color);
                nodeGradient.addColorStop(0.7, node.bgColor);
                nodeGradient.addColorStop(1, node.bgColor + 'CC');

                // Node circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
                ctx.fillStyle = nodeGradient;
                ctx.fill();

                // Draw skill level as outer ring
                ctx.beginPath();
                ctx.arc(node.x, node.y, currentSize + 3, -Math.PI / 2, (Math.PI * 2 * node.level / 100) - Math.PI / 2);
                ctx.strokeStyle = isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)';
                ctx.lineWidth = isHovered ? 4 : 3;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Draw percentage text if hovered
                if (isHovered) {
                    ctx.font = 'bold 12px Inter';
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(node.level + '%', node.x, node.y - currentSize - 10);
                }

                // Inner circle for better contrast
                ctx.beginPath();
                ctx.arc(node.x, node.y, currentSize * 0.85, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.fill();

                // Node text with better contrast
                ctx.save();

                // Text shadow for better readability
                ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
                ctx.shadowBlur = 4;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;

                // Adjust font size based on node size and hover state
                const fontSize = isHovered ? 16 : Math.min(14, currentSize * 0.4);
                ctx.font = `bold ${fontSize}px Inter`;
                ctx.fillStyle = '#FFFFFF';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Handle long text
                const maxWidth = currentSize * 1.6;
                const text = node.name;

                // Check if text fits
                if (ctx.measureText(text).width > maxWidth && text.includes('.')) {
                    // Split text for better display (e.g., "Node.js" -> "Node" and ".js")
                    const parts = text.split('.');
                    ctx.fillText(parts[0], node.x, node.y - fontSize * 0.3);
                    ctx.font = `bold ${fontSize * 0.8}px Inter`;
                    ctx.fillText('.' + parts[1], node.x, node.y + fontSize * 0.5);
                } else if (ctx.measureText(text).width > maxWidth) {
                    // Use smaller font for long names
                    ctx.font = `bold ${fontSize * 0.8}px Inter`;
                    ctx.fillText(text, node.x, node.y);
                } else {
                    ctx.fillText(text, node.x, node.y);
                }

                ctx.restore();

                // Add icon or symbol for categories
                ctx.save();
                ctx.font = '12px Font Awesome';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.textAlign = 'center';

                let icon = '';
                switch (node.category) {
                    case 'frontend':
                        icon = '🎨';
                        break;
                    case 'backend':
                        icon = '⚙️';
                        break;
                    case 'tools':
                        icon = '🔧';
                        break;
                    case 'language':
                        icon = '💻';
                        break;
                    case 'design':
                        icon = '✨';
                        break;
                }

                if (icon && isHovered) {
                    ctx.font = '16px sans-serif';
                    ctx.fillText(icon, node.x, node.y + currentSize + 20);
                }

                ctx.restore();
            });

            // Draw hover tooltip with more info
            if (hoveredNode) {
                const tooltipX = hoveredNode.x;
                const tooltipY = hoveredNode.y - hoveredNode.size - 40;

                // Background
                ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
                ctx.strokeStyle = hoveredNode.color;
                ctx.lineWidth = 2;

                const tooltipWidth = 200;
                const tooltipHeight = 60;

                // Draw rounded rectangle
                ctx.beginPath();
                ctx.roundRect(
                    tooltipX - tooltipWidth / 2,
                    tooltipY - tooltipHeight,
                    tooltipWidth,
                    tooltipHeight,
                    8
                );
                ctx.fill();
                ctx.stroke();

                // Tooltip arrow
                ctx.beginPath();
                ctx.moveTo(tooltipX - 10, tooltipY);
                ctx.lineTo(tooltipX, tooltipY + 10);
                ctx.lineTo(tooltipX + 10, tooltipY);
                ctx.closePath();
                ctx.fill();

                // Tooltip text
                ctx.fillStyle = '#FFFFFF';
                ctx.font = 'bold 14px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(hoveredNode.name, tooltipX, tooltipY - tooltipHeight + 25);

                ctx.font = '12px Inter';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                const descWords = hoveredNode.description.split(' ');
                const line1 = descWords.slice(0, Math.ceil(descWords.length / 2)).join(' ');
                const line2 = descWords.slice(Math.ceil(descWords.length / 2)).join(' ');

                ctx.fillText(line1, tooltipX, tooltipY - tooltipHeight + 42);
                ctx.fillText(line2, tooltipX, tooltipY - tooltipHeight + 56);
            }

            requestAnimationFrame(runSimulation);
        }

        // Add roundRect polyfill for older browsers
        if (!ctx.roundRect) {
            CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
                if (width < 2 * radius) radius = width / 2;
                if (height < 2 * radius) radius = height / 2;
                this.moveTo(x + radius, y);
                this.arcTo(x + width, y, x + width, y + height, radius);
                this.arcTo(x + width, y + height, x, y + height, radius);
                this.arcTo(x, y + height, x, y, radius);
                this.arcTo(x, y, x + width, y, radius);
            };
        }

        runSimulation();
    }

});

// Add fade-in class to all elements that should animate when visible
document.addEventListener('DOMContentLoaded', function () {
    const elementsToAnimate = [
        '.section-header',
        '.profile-container',
        '.bio-paragraph',
        '.education-info',
        '.cta-buttons',
        '.network-header',
        '.network-visualization',
        '.skill-details'
    ];

    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${0.1 * index}s`;
        });
    });
});

// Projects Section: Digital Terrain
// Simple Projects Section
(function () {
    // Project data
    const projectsData = [

        {
            id: 2,
            title: "SeatWise",
            category: "fullstack",
            description: "A smart seat booking and management system for institutes and event halls with PDF-based seating arrangements.",
            tech: ["Node.js", "Express", "PDF.js"],
            features: ["Dynamic seating", "PDF output", "Student data integration"],
            github: "https://github.com/Nir-Bhay/Seatwise",
            demo: "https://nir-bhay.github.io/Seatwise/"
        },
        {
            id: 7,
            title: "Delicious Food Delivery",
            category: "fullstack",
            description: "A responsive landing page for a food delivery service with modern design and product showcase.",
            tech: ["HTML", "CSS", "JavaScript"],
            features: ["Product cards", "Responsive layout", "Call-to-action buttons"],
            github: "https://github.com/Nir-Bhay/Delicious-Food-Delivered-to-Your-Doorstep",
            demo: "https://delicious-food-delivered-to-your-doorstep.vercel.app/"
        },
        {
            id: 3,
            title: "Ranjana NGO Website",
            category: "frontend",
            description: "A clean, responsive website for a women's empowerment NGO featuring donation and contact modules.",
            tech: ["HTML", "CSS", "JavaScript"],
            features: ["Informational sections", "Contact form", "Mobile friendly"],
            github: "https://github.com/Nir-Bhay/Ranjana-Women-Empowerment-NGO",
            demo: "https://nir-bhay.github.io/Ranjana-Women-Empowerment-NGO/"
        },
        {
            id: 4,
            title: "Personal Portfolio",
            category: "frontend",
            description: "My official developer portfolio site showcasing skills, projects, and resume with a responsive modern UI.",
            tech: ["HTML", "CSS", "JavaScript",],
            features: ["Project showcase", "Contact section", "Responsive design"],
            github: "https://github.com/Nir-Bhay/Nirbhay-Hiwse-Personal-Portfolio",
            demo: "https://nir-bhay.github.io/Nirbhay-Hiwse-Personal-Portfolio/"
        },
        {
            id: 5,
            title: "3D Solar System Simulator",
            category: "frontend",
            description: "An interactive 3D simulation of the solar system built using Three.js, allowing users to explore planets.",
            tech: ["Three.js", "JavaScript", "WebGL"],
            features: ["Orbit animation", "Interactive camera", "Space experience"],
            github: "https://github.com/Nir-Bhay/Interactive-3D-Solar-System-Simulation-0.2",
            demo: "https://nir-bhay.github.io/Interactive-3D-Solar-System-Simulation-0.2/"
        },
        {
            id: 6,
            title: "Personal Music Player",
            category: "frontend",
            description: "A sleek music player web app that plays tracks with album art and basic media controls.",
            tech: ["HTML", "CSS", "JavaScript", "Audio API",],
            features: ["Play/pause", "Next/previous", "Custom UI"],
            github: "https://github.com/Nir-Bhay/personal-music-player",
            demo: "https://personal-music-player.vercel.app/"
        },

        {
            id: 8,
            title: "Browser Extension Tools",
            category: "tools",
            description: "A custom Chrome extension offering quick access to multiple utilities from the browser toolbar.",
            tech: ["JavaScript", "HTML", "Manifest V3"],
            features: ["Quick launch tools", "Minimal UI", "Extension popup"],
            github: "https://github.com/Nir-Bhay/Browser-EXTENSION",
            demo: "https://github.com/Nir-Bhay/Browser-EXTENSION/blob/main/README.md"
        },
        {
            id: 9,
            title: "16 Parchi Game",
            category: "games",
            description: "A digital remake of the traditional Indian 16-parchi paper game implemented in the browser.",
            tech: ["HTML", "CSS", "JavaScript"],
            features: ["Card picking logic", "Game animations", "Responsive layout"],
            github: "https://github.com/Nir-Bhay/16-PARCHI-GAME",
            demo: "https://nir-bhay.github.io/16-PARCHI-GAME/assets/Gameboard.html"
        },
        {
            id: 10,
            title: "JS Toolbox",
            category: "tools",
            description: "A bundle of JS utilities like QR code generator, image converter, and text-to-handwriting features.",
            tech: ["JavaScript", "HTML", "CSS"],
            features: ["QR generation", "Image tools", "Text converter"],
            github: "https://github.com/Nir-Bhay/JS-Toolbox---Find-you-best-tools",
            demo: "https://nir-bhay.github.io/JS-Toolbox---Find-you-best-tools/"
        }
    ];

    // Wait for DOM
    document.addEventListener('DOMContentLoaded', function () {
        initProjects();
    });

    function initProjects() {
        // Get elements
        const grid = document.getElementById('projectsGrid');
        const modal = document.getElementById('projectModal');
        const filterBtns = document.querySelectorAll('.filter-btn');

        if (!grid) return;

        // Render projects
        renderProjects('all');

        // Setup filters
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Filter projects
                const filter = this.getAttribute('data-filter');
                renderProjects(filter);
            });
        });

        // Setup modal close
        const modalClose = modal.querySelector('.modal-close');
        const modalBackdrop = modal.querySelector('.modal-backdrop');

        modalClose.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);

        // ESC key to close
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });
    }

    function renderProjects(filter) {
        const grid = document.getElementById('projectsGrid');
        grid.innerHTML = '';

        const filteredProjects = filter === 'all'
            ? projectsData
            : projectsData.filter(p => p.category === filter);

        filteredProjects.forEach(project => {
            const card = createProjectCard(project);
            grid.appendChild(card);
        });
    }

    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = `project-card ${project.category}`;

        const categoryName = {
            'frontend': 'Frontend',
            'fullstack': 'Full Stack',
            'tools': 'Tools'
        }[project.category];

        card.innerHTML = `
            <h3>${project.title}</h3>
            <span class="project-card-category">${categoryName}</span>
            <p>${project.description}</p>
            <div class="project-card-tech">
                ${project.tech.map(t => `<span class="tech-item">${t}</span>`).join('')}
            </div>
        `;

        card.addEventListener('click', () => showModal(project));
        return card;
    }

    // Update the showModal function
    function showModal(project) {
        const modal = document.getElementById('projectModal');

        // Update modal header
        modal.querySelector('.modal-title').textContent = project.title;
        modal.querySelector('.modal-category').textContent = {
            'frontend': 'Frontend',
            'fullstack': 'Full Stack',
            'tools': 'Tools',
            'games': 'Games'
        }[project.category];

        // Update description
        modal.querySelector('.modal-desc').textContent = project.description;

        // Tech stack with icon
        const techHtml = `
        <h4><i class="fas fa-code"></i> Technologies</h4>
        <div class="modal-tech-list">
            ${project.tech.map(t => `<span class="tech-item">${t}</span>`).join('')}
        </div>
    `;
        modal.querySelector('.modal-tech').innerHTML = techHtml;

        // Features with icon
        const featuresHtml = `
        <h4><i class="fas fa-star"></i> Key Features</h4>
        <ul>
            ${project.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
    `;
        modal.querySelector('.modal-features').innerHTML = featuresHtml;

        // Update links
        modal.querySelector('.demo-btn').href = project.demo;
        modal.querySelector('.github-btn').href = project.github;

        // Handle Demo Preview
        const demoSection = document.querySelector('.modal-demo-section');
        const demoIframe = document.getElementById('demoIframe');
        const loadingDiv = demoSection.querySelector('.demo-loading');

        if (project.demo && project.demo !== '#') {
            demoSection.classList.remove('no-demo');
            demoIframe.classList.remove('loaded');
            loadingDiv.style.display = 'block';

            // Reset iframe
            demoIframe.src = '';

            // Load iframe after a small delay
            setTimeout(() => {
                demoIframe.src = project.demo;
                demoIframe.onload = function () {
                    demoIframe.classList.add('loaded');
                    loadingDiv.style.display = 'none';
                };

                // Handle iframe load errors
                demoIframe.onerror = function () {
                    demoSection.classList.add('no-demo');
                    loadingDiv.style.display = 'none';
                };
            }, 100);
        } else {
            demoSection.classList.add('no-demo');
            demoIframe.src = '';
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }


    document.addEventListener('DOMContentLoaded', function () {
        const previewToggle = document.getElementById('previewToggle');
        const demoSection = document.querySelector('.modal-demo-section');

        if (previewToggle) {
            previewToggle.addEventListener('click', function () {
                demoSection.classList.toggle('fullscreen');
                const icon = this.querySelector('i');

                if (demoSection.classList.contains('fullscreen')) {
                    icon.className = 'fas fa-compress';
                    // Prevent body scroll when in fullscreen
                    document.body.style.overflow = 'hidden';
                } else {
                    icon.className = 'fas fa-expand';
                    // Restore body scroll
                    document.body.style.overflow = 'hidden'; // Still hidden because modal is open
                }
            });

            // ESC key to exit fullscreen
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && demoSection.classList.contains('fullscreen')) {
                    demoSection.classList.remove('fullscreen');
                    previewToggle.querySelector('i').className = 'fas fa-expand';
                }
            });
        }

        // Initialize projects
        initProjects();
    });


    function closeModal() {
        const modal = document.getElementById('projectModal');
        const demoIframe = document.getElementById('demoIframe');
        const demoSection = document.querySelector('.modal-demo-section');

        // Close modal
        modal.classList.remove('active');
        document.body.style.overflow = '';

        // Clean up iframe
        demoIframe.src = '';
        demoIframe.classList.remove('loaded');

        // Exit fullscreen if active
        if (demoSection.classList.contains('fullscreen')) {
            demoSection.classList.remove('fullscreen');
            document.getElementById('previewToggle').querySelector('i').className = 'fas fa-expand';
        }

        // Reset demo section
        demoSection.classList.remove('no-demo');
    }

})();


// Experience & Certifications Section
document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update panels
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${targetTab}-panel`) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // Animate timeline items on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // Observe cert cards
    document.querySelectorAll('.cert-card').forEach(card => {
        observer.observe(card);
    });
});


// Contact Section: Digital Portal
document.addEventListener('DOMContentLoaded', function () {
    // Initialize contact form when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initContactForm();
                initNetworkNodes();
                observer.disconnect(); // Only trigger once
            }
        });
    }, { threshold: 0.2 });

    const contactSection = document.querySelector('.contact-section');
    if (contactSection) observer.observe(contactSection);

    // Initialize contact form
    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        const submissionModal = document.querySelector('.submission-modal');
        const closeModalBtn = document.querySelector('.modal-close-btn');

        // Add stream particles to connection status
        createStatusParticles();

        // Form submission handler
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Animate form submission
                animateFormSubmission(contactForm);

                // Normally, you would send the form data to your server here
                // For this example, we'll just show the success modal
                setTimeout(() => {
                    submissionModal.classList.add('active');
                }, 1500);
            });
        }

        // Modal close button
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function () {
                submissionModal.classList.remove('active');

                // Reset form after modal is closed
                setTimeout(() => {
                    contactForm.reset();
                    // Reset input validation states
                    document.querySelectorAll('.input-validation').forEach(validation => {
                        validation.style.opacity = '0';
                    });
                }, 300);
            });
        }

        // Input validation
        const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateInput(input);
            });

            input.addEventListener('input', function () {
                if (input.value.trim() !== '') {
                    validateInput(input);
                }
            });
        });
    }

    // Validate form input
    function validateInput(input) {
        const validation = input.parentElement.querySelector('.input-validation');

        if (input.checkValidity() && input.value.trim() !== '') {
            validation.style.opacity = '1';
        } else {
            validation.style.opacity = '0';
        }
    }

    // Animate form submission
    function animateFormSubmission(form) {
        const inputs = form.querySelectorAll('input, textarea');
        const submitBtn = form.querySelector('.portal-btn');

        // Disable inputs and button
        inputs.forEach(input => {
            input.setAttribute('readonly', true);
            input.style.opacity = '0.7';
        });

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-text">Transmitting...</span><div class="btn-icon"><i class="fas fa-spinner fa-spin"></i></div>';

        // Create transmission particle effect
        createTransmissionEffect(form);
    }

    // Create transmission particle effect
    function createTransmissionEffect(form) {
        const formRect = form.getBoundingClientRect();
        const container = document.querySelector('.form-panel');

        // Create transmission particles
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'transmission-particle';

                // Random starting position within form
                const startX = Math.random() * formRect.width;
                const startY = Math.random() * formRect.height;

                // Style the particle
                particle.style.cssText = `
                    position: absolute;
                    left: ${startX}px;
                    top: ${startY}px;
                    width: ${Math.random() * 3 + 2}px;
                    height: ${Math.random() * 3 + 2}px;
                    background-color: var(--accent-cyan);
                    border-radius: 50%;
                    opacity: ${Math.random() * 0.5 + 0.5};
                    z-index: 100;
                    pointer-events: none;
                `;

                container.appendChild(particle);

                // Animate particle moving upward and fading out
                gsapAnimation(particle);
            }, i * 50);
        }
    }

    // GSAP animation for transmission particles
    function gsapAnimation(particle) {
        // If GSAP is available, use it for smoother animation
        if (window.gsap) {
            gsap.to(particle, {
                y: -100,
                x: Math.random() * 100 - 50,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out",
                onComplete: () => {
                    particle.remove();
                }
            });
        } else {
            // Fallback to basic animation
            particle.animate([
                { transform: 'translate(0, 0)', opacity: particle.style.opacity },
                { transform: `translate(${Math.random() * 100 - 50}px, -100px)`, opacity: 0 }
            ], {
                duration: 1500,
                easing: 'ease-out'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }

    // Create connection status particles
    function createStatusParticles() {
        const statusIndicator = document.querySelector('.status-indicator');
        if (!statusIndicator) return;

        // Create a small particle system for the status indicator
        const container = statusIndicator.parentElement;

        setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'status-particle';

            // Style the particle
            particle.style.cssText = `
                position: absolute;
                left: 4px;
                top: 4px;
                width: 4px;
                height: 4px;
                background-color: #28CA41;
                border-radius: 50%;
                opacity: 0.8;
                z-index: 5;
                pointer-events: none;
            `;

            container.appendChild(particle);

            // Animate particle
            particle.animate([
                { transform: 'translate(0, 0)', opacity: 0.8 },
                { transform: 'translate(30px, 0)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                particle.remove();
            };
        }, 1000);
    }

    // Initialize network nodes
    function initNetworkNodes() {
        const networkNodes = document.querySelectorAll('.network-node');

        networkNodes.forEach((node, index) => {
            // Staggered animation
            node.style.opacity = '0';
            node.style.transform = 'translateY(20px)';

            setTimeout(() => {
                node.style.transition = 'all 0.5s ease';
                node.style.opacity = '1';
                node.style.transform = 'translateY(0)';
            }, 300 + (index * 150));

            // Hover effect
            node.addEventListener('mouseenter', function () {
                const pulseElement = this.querySelector('.node-pulse');
                pulseElement.style.animation = 'none';

                setTimeout(() => {
                    pulseElement.style.animation = '';
                }, 10);
            });
        });
    }
});
