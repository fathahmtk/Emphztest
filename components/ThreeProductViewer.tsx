import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ThreeProductViewerProps {
  productType: 'ENCLOSURE' | 'KIOSK' | 'SMART_CABIN' | 'AUTOMOBILE' | 'DEFAULT';
}

const ThreeProductViewer: React.FC<ThreeProductViewerProps> = ({ productType }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Capture current ref for cleanup
    const container = mountRef.current;
    let animationId: number;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(6, 4, 8);

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const accentLight = new THREE.PointLight(0x00ADB5, 1, 10);
    accentLight.position.set(-2, 2, 2);
    scene.add(accentLight);

    // Materials
    const grpMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xeeeeee, // White GRP
      roughness: 0.3,
      metalness: 0.1 
    });
    
    const greyGrpMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xcccccc, // RAL 7035 Grey
      roughness: 0.4,
      metalness: 0.1 
    });

    const darkRubberMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a, 
      roughness: 0.9 
    });

    const orangeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x00ADB5, // Tech Teal Accent
      roughness: 0.5 
    });
    
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      metalness: 0.9,
      roughness: 0.05,
      transmission: 0.2, // Slight transparency
      thickness: 0.5,
      transparent: true,
      opacity: 0.9
    });

    const interiorLightMaterial = new THREE.MeshBasicMaterial({ color: 0x00ADB5 });

    const productGroup = new THREE.Group();

    // --- GEOMETRY GENERATION ---
    
    if (productType === 'ENCLOSURE') {
      // 1. Main Body Box
      const bodyGeo = new THREE.BoxGeometry(2, 3, 1);
      const bodyMesh = new THREE.Mesh(bodyGeo, greyGrpMaterial);
      productGroup.add(bodyMesh);

      // 2. Door (slightly offset)
      const doorGeo = new THREE.BoxGeometry(1.9, 2.9, 0.1);
      const doorMesh = new THREE.Mesh(doorGeo, greyGrpMaterial);
      doorMesh.position.set(0, 0, 0.52);
      productGroup.add(doorMesh);

      // 3. Hinges
      const hingeGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.2);
      const hinge1 = new THREE.Mesh(hingeGeo, darkRubberMaterial);
      hinge1.position.set(-0.95, 0.8, 0.5);
      productGroup.add(hinge1);
      const hinge2 = new THREE.Mesh(hingeGeo, darkRubberMaterial);
      hinge2.position.set(-0.95, -0.8, 0.5);
      productGroup.add(hinge2);

      // 4. Lock/Latch
      const lockGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1);
      const lockMesh = new THREE.Mesh(lockGeo, darkRubberMaterial);
      lockMesh.rotation.x = Math.PI / 2;
      lockMesh.position.set(0.8, 0, 0.55);
      productGroup.add(lockMesh);

      // 5. Mounting Brackets (Rear)
      const mountGeo = new THREE.BoxGeometry(2.2, 0.2, 0.1);
      const mountTop = new THREE.Mesh(mountGeo, greyGrpMaterial);
      mountTop.position.set(0, 1.4, -0.55);
      productGroup.add(mountTop);
      const mountBot = new THREE.Mesh(mountGeo, greyGrpMaterial);
      mountBot.position.set(0, -1.4, -0.55);
      productGroup.add(mountBot);

    } else if (productType === 'KIOSK') {
      // 1. Main Cabin Body
      const cabinGeo = new THREE.BoxGeometry(3, 2.5, 2);
      const cabinMesh = new THREE.Mesh(cabinGeo, greyGrpMaterial);
      productGroup.add(cabinMesh);

      // 2. Roof (Sloped/Pyramid style for water runoff)
      const roofGeo = new THREE.ConeGeometry(2.5, 0.8, 4);
      const roofMesh = new THREE.Mesh(roofGeo, orangeMaterial);
      roofMesh.position.set(0, 1.6, 0);
      roofMesh.rotation.y = Math.PI / 4; // Align square
      roofMesh.scale.set(1, 1, 0.7); // Flatten slightly
      productGroup.add(roofMesh);

      // 3. Ventilation Louvers (Side)
      const louverGeo = new THREE.BoxGeometry(0.1, 0.8, 0.8);
      const louverLeft = new THREE.Mesh(louverGeo, darkRubberMaterial);
      louverLeft.position.set(-1.51, 0, 0);
      productGroup.add(louverLeft);

      // 4. Double Doors (Front)
      const doorGeo = new THREE.BoxGeometry(1.4, 2.2, 0.05);
      const doorLeft = new THREE.Mesh(doorGeo, greyGrpMaterial);
      doorLeft.position.set(-0.72, -0.1, 1.02);
      productGroup.add(doorLeft);
      
      const doorRight = new THREE.Mesh(doorGeo, greyGrpMaterial);
      doorRight.position.set(0.72, -0.1, 1.02);
      productGroup.add(doorRight);

      // 5. Base/Plinth
      const plinthGeo = new THREE.BoxGeometry(3.2, 0.2, 2.2);
      const plinthMesh = new THREE.Mesh(plinthGeo, darkRubberMaterial);
      plinthMesh.position.set(0, -1.35, 0);
      productGroup.add(plinthMesh);

    } else if (productType === 'SMART_CABIN') {
      // Xpod Style Logic
      
      // 1. Main Shell (Rounded look via box with smaller boxes for interior)
      const shellGeo = new THREE.BoxGeometry(4, 2.2, 2);
      const shellMesh = new THREE.Mesh(shellGeo, grpMaterial);
      productGroup.add(shellMesh);
      
      // 2. Glass Front
      const glassGeo = new THREE.BoxGeometry(3.8, 2, 0.1);
      const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
      glassMesh.position.set(0, 0, 1.01);
      productGroup.add(glassMesh);

      // 3. Overhang / Roof Bezel
      const roofGeo = new THREE.BoxGeometry(4.2, 0.2, 2.4);
      const roofMesh = new THREE.Mesh(roofGeo, grpMaterial);
      roofMesh.position.set(0, 1.2, 0.1);
      productGroup.add(roofMesh);

      // 4. Floor / Deck
      const deckGeo = new THREE.BoxGeometry(4.4, 0.2, 3);
      const deckMesh = new THREE.Mesh(deckGeo, darkRubberMaterial);
      deckMesh.position.set(0, -1.2, 0.4);
      productGroup.add(deckMesh);

      // 5. Interior Glow Strip (Simulated LED)
      const ledGeo = new THREE.BoxGeometry(3.8, 0.05, 0.05);
      const ledMesh = new THREE.Mesh(ledGeo, interiorLightMaterial);
      ledMesh.position.set(0, 1.0, 0.95);
      productGroup.add(ledMesh);
      
      // 6. Side Branding Panel
      const sidePanelGeo = new THREE.BoxGeometry(0.1, 1.5, 1);
      const sidePanel = new THREE.Mesh(sidePanelGeo, darkRubberMaterial);
      sidePanel.position.set(-2.01, 0, 0);
      productGroup.add(sidePanel);

    } else if (productType === 'AUTOMOBILE') {
      // EV Battery Shield Style
      
      // 1. Main Shield Panel (Wide, low profile)
      const panelGeo = new THREE.BoxGeometry(3.5, 0.15, 2.2);
      const panelMesh = new THREE.Mesh(panelGeo, darkRubberMaterial);
      productGroup.add(panelMesh);
      
      // 2. Reinforcement Ribs (Orange for highlight)
      for (let i = -0.8; i <= 0.8; i += 0.4) {
          const ribGeo = new THREE.BoxGeometry(3.5, 0.05, 0.1);
          const rib = new THREE.Mesh(ribGeo, orangeMaterial);
          rib.position.set(0, 0.1, i);
          productGroup.add(rib);
      }

      // 3. Mounting Flanges
      const flangeGeo = new THREE.BoxGeometry(0.2, 0.05, 2.4);
      const flangeLeft = new THREE.Mesh(flangeGeo, greyGrpMaterial);
      flangeLeft.position.set(-1.85, 0, 0);
      productGroup.add(flangeLeft);
      
      const flangeRight = new THREE.Mesh(flangeGeo, greyGrpMaterial);
      flangeRight.position.set(1.85, 0, 0);
      productGroup.add(flangeRight);

    } else {
      // Default Cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      productGroup.add(cube);
    }

    scene.add(productGroup);

    // Animation Loop
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      
      if (container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      
      // Dispose Geometries and Materials to prevent memory leaks
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
           object.geometry.dispose();
           if (object.material instanceof THREE.Material) {
               object.material.dispose();
           } else if (Array.isArray(object.material)) {
               object.material.forEach((m: THREE.Material) => m.dispose());
           }
        }
      });
    };
  }, [productType]);

  return (
    <div className="w-full h-full relative group cursor-move touch-action-none">
       <div ref={mountRef} className="w-full h-full" />
       <div className="absolute bottom-4 right-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur pointer-events-none flex items-center gap-2">
         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
         Interactive 3D • Drag to Rotate
       </div>
    </div>
  );
};

export default ThreeProductViewer;