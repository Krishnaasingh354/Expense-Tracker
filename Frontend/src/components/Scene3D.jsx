import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D({ className = '', interactive = true }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0; // Softened exposure
    container.appendChild(renderer.domElement);

    // Root Group for Mouse Tilt & Drag
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- 1. Central 3D Financial Medallion / Coin ---
    const coinGroup = new THREE.Group();
    mainGroup.add(coinGroup);

    // Outer Rim (Matte Satin Charcoal)
    const outerRimGeo = new THREE.CylinderGeometry(2.1, 2.1, 0.26, 48, 1, false);
    const outerRimMat = new THREE.MeshStandardMaterial({
      color: 0x16181f,
      roughness: 0.45,
      metalness: 0.7,
    });
    const outerRim = new THREE.Mesh(outerRimGeo, outerRimMat);
    outerRim.rotation.x = Math.PI / 2;
    coinGroup.add(outerRim);

    // Inner Coin Face (Softer Muted Warm Copper / Satin Tangerine)
    const innerFaceGeo = new THREE.CylinderGeometry(1.85, 1.85, 0.30, 48);
    const innerFaceMat = new THREE.MeshStandardMaterial({
      color: 0xd97543, // Softer warm terracotta/copper
      roughness: 0.38,
      metalness: 0.65,
      emissive: 0x221008,
      emissiveIntensity: 0.25, // Gentle subtle glow
    });
    const innerFace = new THREE.Mesh(innerFaceGeo, innerFaceMat);
    innerFace.rotation.x = Math.PI / 2;
    coinGroup.add(innerFace);

    // Center Core (Deep Matte Obsidian Inlay)
    const centerCoreGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.33, 48);
    const centerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x0c0d12,
      roughness: 0.35,
      metalness: 0.5,
    });
    const centerCore = new THREE.Mesh(centerCoreGeo, centerCoreMat);
    centerCore.rotation.x = Math.PI / 2;
    coinGroup.add(centerCore);

    // Center 3D Symbol: Soft Warm Amber Crystal
    const diamondGeo = new THREE.OctahedronGeometry(0.7, 0);
    const diamondMat = new THREE.MeshStandardMaterial({
      color: 0xe58b54,
      roughness: 0.25,
      metalness: 0.75,
      emissive: 0x3d1b0d,
      emissiveIntensity: 0.35,
    });
    const diamond = new THREE.Mesh(diamondGeo, diamondMat);
    diamond.scale.set(0.8, 1.2, 0.35);
    coinGroup.add(diamond);

    // Subtle Bezel Ring
    const torusBezelGeo = new THREE.TorusGeometry(1.9, 0.025, 16, 64);
    const torusBezelMat = new THREE.MeshStandardMaterial({
      color: 0xcc7243,
      roughness: 0.4,
      metalness: 0.7,
      emissive: 0x261006,
      emissiveIntensity: 0.2,
    });
    const torusBezel1 = new THREE.Mesh(torusBezelGeo, torusBezelMat);
    torusBezel1.position.z = 0.15;
    coinGroup.add(torusBezel1);

    const torusBezel2 = torusBezel1.clone();
    torusBezel2.position.z = -0.15;
    coinGroup.add(torusBezel2);

    // --- 2. Orbiting Gyroscope Rings (Muted Satin Rings) ---
    const ring1Geo = new THREE.TorusGeometry(2.7, 0.02, 16, 80);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xd47a4c,
      roughness: 0.35,
      metalness: 0.7,
      emissive: 0x241108,
      emissiveIntensity: 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.2, 0.016, 16, 80);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xc46f42,
      roughness: 0.4,
      metalness: 0.6,
      emissive: 0x1f0e06,
      emissiveIntensity: 0.15,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    mainGroup.add(ring2);

    // --- 3. Orbiting Floating Financial Crystals ---
    const crystalGroup = new THREE.Group();
    mainGroup.add(crystalGroup);

    const crystals = [];
    const crystalCount = 5;
    for (let i = 0; i < crystalCount; i++) {
      const cGeo = new THREE.OctahedronGeometry(0.24, 0);
      const cMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xcc7445 : 0x1e212b,
        roughness: 0.3,
        metalness: 0.7,
        emissive: i % 2 === 0 ? 0x2b1409 : 0x08090d,
        emissiveIntensity: i % 2 === 0 ? 0.3 : 0.05,
      });
      const crystal = new THREE.Mesh(cGeo, cMat);
      
      const angle = (i / crystalCount) * Math.PI * 2;
      const radius = 3.1 + (i % 2) * 0.4;
      crystal.position.set(
        Math.cos(angle) * radius,
        (Math.sin(angle * 2) * 0.8),
        Math.sin(angle) * radius
      );
      crystalGroup.add(crystal);
      crystals.push({ mesh: crystal, angle, radius, speed: 0.014 + (i * 0.003), yOffset: i * 0.5 });
    }

    // --- 4. Floating 3D Card Element ---
    const cardGroup = new THREE.Group();
    const cardShape = new THREE.BoxGeometry(1.6, 1.0, 0.035);
    const cardMat = new THREE.MeshStandardMaterial({
      color: 0x13151d,
      roughness: 0.35,
      metalness: 0.6,
      emissive: 0x180f0a,
      emissiveIntensity: 0.1,
    });
    const miniCard = new THREE.Mesh(cardShape, cardMat);
    
    // Soft copper chip on card
    const chipGeo = new THREE.BoxGeometry(0.3, 0.22, 0.04);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0xdb8856,
      metalness: 0.8,
      roughness: 0.25,
      emissive: 0x331a0e,
      emissiveIntensity: 0.25,
    });
    const chip = new THREE.Mesh(chipGeo, chipMat);
    chip.position.set(-0.4, 0.15, 0.01);
    miniCard.add(chip);

    cardGroup.add(miniCard);
    cardGroup.position.set(2.6, -1.8, 1.2);
    cardGroup.rotation.set(-0.3, 0.5, 0.2);
    mainGroup.add(cardGroup);

    // --- 5. Ambient Stardust / Ember Particles (Softened) ---
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 14;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Soft warm terracotta and muted sand tones
      const rRatio = Math.random();
      if (rRatio > 0.4) {
        particleColors[i3] = 0.86;     // R
        particleColors[i3 + 1] = 0.50; // G
        particleColors[i3 + 2] = 0.28; // B (softer warm peach/copper)
      } else if (rRatio > 0.15) {
        particleColors[i3] = 0.85;     // Soft warm amber
        particleColors[i3 + 1] = 0.62;
        particleColors[i3 + 2] = 0.38;
      } else {
        particleColors[i3] = 0.45;     // Gentle slate/silver
        particleColors[i3 + 1] = 0.48;
        particleColors[i3 + 2] = 0.55;
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.6, // Softened opacity
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 6. Lighting Setup (Softened & Calibrated) ---
    // Ambient soft matte light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    // Soft Warm Key Light (Reduced intensity from 4.5 to 2.2)
    const warmKeyLight = new THREE.DirectionalLight(0xe88251, 2.2);
    warmKeyLight.position.set(5, 6, 6);
    scene.add(warmKeyLight);

    // Soft Amber Rim Light (Reduced intensity from 3.0 to 1.6)
    const softRimLight = new THREE.DirectionalLight(0xd99564, 1.6);
    softRimLight.position.set(-6, -4, 4);
    scene.add(softRimLight);

    // Top gentle fill (Reduced from 3 to 1.2)
    const topLight = new THREE.PointLight(0xd97543, 1.2, 14);
    topLight.position.set(0, 5, 2);
    scene.add(topLight);

    // Deep cool rim light for contrast against matte black
    const contrastLight = new THREE.DirectionalLight(0x282f3d, 1.5);
    contrastLight.position.set(0, -6, -4);
    scene.add(contrastLight);

    // --- Mouse & Touch Interaction ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let manualRotX = 0;
    let manualRotY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        manualRotY += deltaX * 0.01;
        manualRotX += deltaY * 0.01;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };

    const handleMouseDown = (e) => {
      if (!interactive) return;
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        mouseX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (interactive) {
      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // --- Animation Loop ---
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) / 1000;

      // Idle Rotation
      coinGroup.rotation.y = elapsedTime * 0.5 + manualRotY;
      coinGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.12 + manualRotX;
      
      // Floating Bobbing effect
      coinGroup.position.y = Math.sin(elapsedTime * 1.3) * 0.15;

      // Inner diamond pulse/rotate
      diamond.rotation.y = -elapsedTime * 1.0;
      diamond.rotation.z = Math.sin(elapsedTime * 1.8) * 0.15;

      // Orbiting Rings
      ring1.rotation.z = elapsedTime * 0.25;
      ring1.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.35) * 0.18;

      ring2.rotation.z = -elapsedTime * 0.2;
      ring2.rotation.y = Math.PI / 3 + Math.cos(elapsedTime * 0.25) * 0.18;

      // Orbiting Crystals
      crystals.forEach(item => {
        item.angle += item.speed;
        item.mesh.position.x = Math.cos(item.angle) * item.radius;
        item.mesh.position.z = Math.sin(item.angle) * item.radius;
        item.mesh.position.y = Math.sin(elapsedTime * 1.8 + item.yOffset) * 0.6;
        item.mesh.rotation.x += 0.025;
        item.mesh.rotation.y += 0.035;
      });

      // Floating Mini Card
      cardGroup.position.y = -1.8 + Math.sin(elapsedTime * 1.5 + 1) * 0.12;
      cardGroup.rotation.y = 0.5 + Math.sin(elapsedTime * 0.7) * 0.12;
      cardGroup.rotation.x = -0.3 + Math.cos(elapsedTime * 0.6) * 0.08;

      // Particle subtle drifting
      particles.rotation.y = elapsedTime * 0.025;
      particles.rotation.x = Math.sin(elapsedTime * 0.015) * 0.08;

      // Smooth Mouse Parallax Lerping
      targetRotationY = mouseX * 0.45;
      targetRotationX = -mouseY * 0.35;
      
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (interactive) {
        container.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('touchmove', handleTouchMove);
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      outerRimGeo.dispose();
      outerRimMat.dispose();
      innerFaceGeo.dispose();
      innerFaceMat.dispose();
      centerCoreGeo.dispose();
      centerCoreMat.dispose();
      diamondGeo.dispose();
      diamondMat.dispose();
      torusBezelGeo.dispose();
      torusBezelMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      cardShape.dispose();
      cardMat.dispose();
      chipGeo.dispose();
      chipMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [interactive]);

  return (
    <div 
      ref={mountRef} 
      className={`relative w-full h-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
}
