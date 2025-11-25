import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface ThreeProductViewerProps {
  productType: 'ENCLOSURE' | 'KIOSK' | 'DEFAULT';
}

const ThreeProductViewer: React.FC<ThreeProductViewerProps> = ({ productType }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.set(4, 3, 6);

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const orangeLight = new THREE.PointLight(0xD62828, 2, 10);
    orangeLight.position.set(-2, 2, 2);
    scene.add(orangeLight);

    // Materials
    const grpMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xcccccc, // RAL 7035 Grey
      roughness: 0.4,
      metalness: 0.1 
    });
    
    const darkRubberMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a, 
      roughness: 0.9 
    });

    const orangeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xD62828, 
      roughness: 0.5 
    });

    const productGroup = new THREE.Group();

    // --- GEOMETRY GENERATION ---
    
    if (productType === 'ENCLOSURE') {
      // 1. Main Body Box
      const bodyGeo = new THREE.BoxGeometry(2, 3, 1);
      const bodyMesh = new THREE.Mesh(bodyGeo, grpMaterial);
      productGroup.add(bodyMesh);

      // 2. Door (slightly offset)
      const doorGeo = new THREE.BoxGeometry(1.9, 2.9, 0.1);
      const doorMesh = new THREE.Mesh(doorGeo, grpMaterial);
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
      const mountTop = new THREE.Mesh(mountGeo, grpMaterial);
      mountTop.position.set(0, 1.4, -0.55);
      productGroup.add(mountTop);
      const mountBot = new THREE.Mesh(mountGeo, grpMaterial);
      mountBot.position.set(0, -1.4, -0.55);
      productGroup.add(mountBot);

    } else if (productType === 'KIOSK') {
      // 1. Main Cabin Body
      const cabinGeo = new THREE.BoxGeometry(3, 2.5, 2);
      const cabinMesh = new THREE.Mesh(cabinGeo, grpMaterial);
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
      const doorLeft = new THREE.Mesh(doorGeo, grpMaterial);
      doorLeft.position.set(-0.72, -0.1, 1.02);
      productGroup.add(doorLeft);
      
      const doorRight = new THREE.Mesh(doorGeo, grpMaterial);
      doorRight.position.set(0.72, -0.1, 1.02);
      productGroup.add(doorRight);

      // 5. Base/Plinth
      const plinthGeo = new THREE.BoxGeometry(3.2, 0.2, 2.2);
      const plinthMesh = new THREE.Mesh(plinthGeo, darkRubberMaterial);
      plinthMesh.position.set(0, -1.35, 0);
      productGroup.add(plinthMesh);

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
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [productType]);

  return (
    <div className="w-full h-full relative group cursor-move">
       <div ref={mountRef} className="w-full h-full" />
       <div className="absolute bottom-4 right-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur pointer-events-none flex items-center gap-2">
         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
         Interactive 3D • Drag to Rotate
       </div>
    </div>
  );
};

export default ThreeProductViewer;
