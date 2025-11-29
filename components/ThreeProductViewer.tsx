import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Box } from 'lucide-react';

interface ThreeProductViewerProps {
  productType: 'ENCLOSURE' | 'KIOSK' | 'CABIN' | 'SMART_CABIN' | 'AUTOMOBILE' | 'DEFAULT';
}

const ThreeProductViewer: React.FC<ThreeProductViewerProps> = ({ productType }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  // Effect for simulating loading progress
  useEffect(() => {
    let currentProgress = 0;
    // Simulate a loading duration of ~1.2 seconds for realistic "initialization" feel
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress > 100) currentProgress = 100;
      
      setProgress(Math.floor(currentProgress));

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 500); // Delay before hiding
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;
    
    // Limits
    controls.minDistance = 3;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent going below ground

    controls.addEventListener('start', () => setIsInteracting(true));
    controls.addEventListener('end', () => setIsInteracting(false));

    // Lighting
    // Hemisphere light for natural outdoor feel (Sky color vs Ground color)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const accentLight = new THREE.PointLight(0x00ADB5, 0.8, 20);
    accentLight.position.set(-2, 2, 2);
    scene.add(accentLight);

    // Materials
    const grpMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xeeeeee, // White GRP
      roughness: 0.2,
      metalness: 0.1 
    });
    
    const greyGrpMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xcccccc, // RAL 7035 Grey
      roughness: 0.3,
      metalness: 0.1 
    });

    const darkRubberMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a, 
      roughness: 0.9 
    });

    const orangeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x00ADB5, // Tech Teal Accent
      roughness: 0.4 
    });
    
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      metalness: 0.9,
      roughness: 0.05,
      transmission: 0.6,
      thickness: 0.5,
      transparent: true,
      opacity: 0.4
    });

    const interiorLightMaterial = new THREE.MeshBasicMaterial({ color: 0x00ADB5 });

    const productGroup = new THREE.Group();

    // --- GEOMETRY GENERATION ---
    
    if (productType === 'ENCLOSURE') {
      // 1. Main Body Box
      const bodyGeo = new THREE.BoxGeometry(2, 3, 1);
      const bodyMesh = new THREE.Mesh(bodyGeo, greyGrpMaterial);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      productGroup.add(bodyMesh);

      // 2. Door (slightly offset)
      const doorGeo = new THREE.BoxGeometry(1.9, 2.9, 0.1);
      const doorMesh = new THREE.Mesh(doorGeo, greyGrpMaterial);
      doorMesh.position.set(0, 0, 0.52);
      doorMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
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
      cabinMesh.castShadow = true;
      productGroup.add(cabinMesh);

      // 2. Roof (Sloped/Pyramid style for water runoff)
      const roofGeo = new THREE.ConeGeometry(2.5, 0.8, 4);
      const roofMesh = new THREE.Mesh(roofGeo, orangeMaterial);
      roofMesh.position.set(0, 1.6, 0);
      roofMesh.rotation.y = Math.PI / 4; // Align square
      roofMesh.scale.set(1, 1, 0.7); // Flatten slightly
      roofMesh.castShadow = true;
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

    } else if (productType === 'CABIN') {
      // Security Cabin Logic - Rectangular with sliding windows
      const cabinGeo = new THREE.BoxGeometry(3, 2.8, 3);
      const cabinMesh = new THREE.Mesh(cabinGeo, grpMaterial);
      cabinMesh.castShadow = true;
      productGroup.add(cabinMesh);

      // Roof - Flat with slight overhang
      const roofGeo = new THREE.BoxGeometry(3.4, 0.2, 3.4);
      const roofMesh = new THREE.Mesh(roofGeo, greyGrpMaterial);
      roofMesh.position.set(0, 1.5, 0);
      roofMesh.castShadow = true;
      productGroup.add(roofMesh);

      // Windows (3 Sides)
      const windowGeo = new THREE.BoxGeometry(2, 1.2, 0.1);
      
      const frontWindow = new THREE.Mesh(windowGeo, glassMaterial);
      frontWindow.position.set(0, 0.2, 1.51);
      productGroup.add(frontWindow);

      const leftWindow = new THREE.Mesh(windowGeo, glassMaterial);
      leftWindow.rotation.y = Math.PI / 2;
      leftWindow.position.set(-1.51, 0.2, 0);
      productGroup.add(leftWindow);

      const rightWindow = new THREE.Mesh(windowGeo, glassMaterial);
      rightWindow.rotation.y = Math.PI / 2;
      rightWindow.position.set(1.51, 0.2, 0);
      productGroup.add(rightWindow);

      // Door (Rear)
      const doorGeo = new THREE.BoxGeometry(1.2, 2.2, 0.1);
      const doorMesh = new THREE.Mesh(doorGeo, greyGrpMaterial);
      doorMesh.position.set(0, -0.3, -1.51);
      productGroup.add(doorMesh);

    } else if (productType === 'SMART_CABIN') {
      // Xpod Style Logic
      
      // 1. Main Shell (Rounded look via box with smaller boxes for interior)
      const shellGeo = new THREE.BoxGeometry(4, 2.2, 2);
      const shellMesh = new THREE.Mesh(shellGeo, grpMaterial);
      shellMesh.castShadow = true;
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
      roofMesh.castShadow = true;
      productGroup.add(roofMesh);

      // 4. Floor / Deck
      const deckGeo = new THREE.BoxGeometry(4.4, 0.2, 3);
      const deckMesh = new THREE.Mesh(deckGeo, darkRubberMaterial);
      deckMesh.position.set(0, -1.2, 0.4);
      deckMesh.receiveShadow = true;
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
      panelMesh.castShadow = true;
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
      controls.dispose(); // IMPORTANT: Dispose controls
      
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
    <div className={`w-full h-full relative group ${isInteracting ? 'cursor-grabbing' : 'cursor-move'} touch-none bg-slate-900/20`}>
       <div ref={mountRef} className="w-full h-full" />
       
       {/* Internal Loading Overlay with Skeleton/Wireframe Style */}
       {isLoading && (
         <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-md transition-opacity duration-500">
            <div className="flex flex-col items-center w-64">
                {/* 3D Wireframe Icon Animation */}
                <div className="relative w-16 h-16 mb-8">
                  <div className="absolute inset-0 border border-emphz-orange/20 rounded-lg animate-[spin_3s_linear_infinite]"></div>
                  <div className="absolute inset-2 border border-emphz-orange/40 rounded-lg animate-[spin_4s_linear_infinite_reverse]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Box className="w-8 h-8 text-emphz-orange animate-pulse" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <div className="flex justify-between items-end">
                      <span className="text-[10px] font-bold text-emphz-orange font-display tracking-[0.2em] animate-pulse">INITIALIZING</span>
                      <span className="text-xs font-mono text-white font-bold">{progress}%</span>
                  </div>
                  
                  {/* Tech Progress Bar */}
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden relative">
                      <div 
                          className="h-full bg-emphz-orange shadow-[0_0_10px_#00ADB5] transition-all duration-100 ease-out"
                          style={{ width: `${progress}%` }}
                      />
                  </div>
                  
                  <div className="flex justify-between text-[8px] text-gray-600 font-mono uppercase">
                      <span>Geo: Load</span>
                      <span>Tex: Gen</span>
                      <span>Light: Bake</span>
                  </div>
                </div>
            </div>
         </div>
       )}

       {!isLoading && (
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-[10px] px-3 py-1.5 rounded-full backdrop-blur pointer-events-none flex items-center gap-2 animate-fade-in border border-white/10">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></div>
          <span className="font-mono tracking-wide">INTERACTIVE 3D</span>
        </div>
       )}
    </div>
  );
};

export default ThreeProductViewer;