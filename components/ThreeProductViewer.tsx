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

    // Ground Plane & Grid
    let groundY = -1.5;
    if (productType === 'KIOSK') groundY = -1.45;
    if (productType === 'CABIN') groundY = -1.4;
    if (productType === 'SMART_CABIN') groundY = -1.3;
    if (productType === 'AUTOMOBILE') groundY = -0.1;
    
    const groundGeo = new THREE.PlaneGeometry(20, 20);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.1, roughness: 0.8 });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = groundY;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    const gridHelper = new THREE.GridHelper(20, 20, 0x00ADB5, 0x333333);
    gridHelper.position.y = groundY + 0.01;
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Materials
    const grpMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.2, metalness: 0.1 });
    const greyGrpMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.3, metalness: 0.1 });
    const darkRubberMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 });
    const orangeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ADB5, roughness: 0.4 });
    const glassMaterial = new THREE.MeshPhysicalMaterial({ color: 0x88ccff, metalness: 0.9, roughness: 0.05, transmission: 0.6, thickness: 0.5, transparent: true, opacity: 0.4 });
    const interiorLightMaterial = new THREE.MeshBasicMaterial({ color: 0x00ADB5 });

    const productGroup = new THREE.Group();
    productGroup.position.y = groundY;

    // --- GEOMETRY GENERATION ---
    if (productType === 'ENCLOSURE') {
      productGroup.position.y += 1.5;
      const bodyGeo = new THREE.BoxGeometry(2, 3, 1);
      const bodyMesh = new THREE.Mesh(bodyGeo, greyGrpMaterial);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      productGroup.add(bodyMesh);

      const doorGeo = new THREE.BoxGeometry(1.9, 2.9, 0.1);
      const doorMesh = new THREE.Mesh(doorGeo, greyGrpMaterial);
      doorMesh.position.set(0, 0, 0.52);
      doorMesh.castShadow = true;
      productGroup.add(doorMesh);

    } else if (productType === 'KIOSK') {
      productGroup.position.y += 1.45;
      const cabinGeo = new THREE.BoxGeometry(3, 2.5, 2);
      const cabinMesh = new THREE.Mesh(cabinGeo, greyGrpMaterial);
      cabinMesh.castShadow = true;
      productGroup.add(cabinMesh);

      const roofGeo = new THREE.ConeGeometry(2.5, 0.8, 4);
      const roofMesh = new THREE.Mesh(roofGeo, orangeMaterial);
      roofMesh.position.set(0, 1.6, 0);
      roofMesh.rotation.y = Math.PI / 4;
      roofMesh.scale.set(1, 1, 0.7);
      roofMesh.castShadow = true;
      productGroup.add(roofMesh);

      const plinthGeo = new THREE.BoxGeometry(3.2, 0.2, 2.2);
      const plinthMesh = new THREE.Mesh(plinthGeo, darkRubberMaterial);
      plinthMesh.position.set(0, -1.35, 0);
      productGroup.add(plinthMesh);

    } else if (productType === 'CABIN') {
      productGroup.position.y += 1.4;
      const cabinGeo = new THREE.BoxGeometry(3, 2.8, 3);
      const cabinMesh = new THREE.Mesh(cabinGeo, grpMaterial);
      cabinMesh.castShadow = true;
      productGroup.add(cabinMesh);

      const roofGeo = new THREE.BoxGeometry(3.4, 0.2, 3.4);
      const roofMesh = new THREE.Mesh(roofGeo, greyGrpMaterial);
      roofMesh.position.set(0, 1.5, 0);
      roofMesh.castShadow = true;
      productGroup.add(roofMesh);

      const windowGeo = new THREE.BoxGeometry(2, 1.2, 0.1);
      const frontWindow = new THREE.Mesh(windowGeo, glassMaterial);
      frontWindow.position.set(0, 0.2, 1.51);
      productGroup.add(frontWindow);

    } else if (productType === 'SMART_CABIN') {
      productGroup.position.y += 1.3;
      const shellGeo = new THREE.BoxGeometry(4, 2.2, 2);
      const shellMesh = new THREE.Mesh(shellGeo, grpMaterial);
      shellMesh.castShadow = true;
      productGroup.add(shellMesh);
      
      const glassGeo = new THREE.BoxGeometry(3.8, 2, 0.1);
      const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
      glassMesh.position.set(0, 0, 1.01);
      productGroup.add(glassMesh);

      const deckGeo = new THREE.BoxGeometry(4.4, 0.2, 3);
      const deckMesh = new THREE.Mesh(deckGeo, darkRubberMaterial);
      deckMesh.position.set(0, -1.2, 0.4);
      deckMesh.receiveShadow = true;
      productGroup.add(deckMesh);

    } else if (productType === 'AUTOMOBILE') {
      productGroup.position.y += 0.1;
      const panelGeo = new THREE.BoxGeometry(3.5, 0.15, 2.2);
      const panelMesh = new THREE.Mesh(panelGeo, darkRubberMaterial);
      panelMesh.castShadow = true;
      productGroup.add(panelMesh);
      
      for (let i = -0.8; i <= 0.8; i += 0.4) {
          const ribGeo = new THREE.BoxGeometry(3.5, 0.05, 0.1);
          const rib = new THREE.Mesh(ribGeo, orangeMaterial);
          rib.position.set(0, 0.1, i);
          productGroup.add(rib);
      }

    } else {
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
      controls.dispose();
      
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
           object.geometry.dispose();
           if (Array.isArray(object.material)) {
               object.material.forEach((m: THREE.Material) => m.dispose());
           } else if (object.material instanceof THREE.Material) {
               object.material.dispose();
           }
        }
      });
    };
  }, [productType]);

  return (
    <div className={`w-full h-full relative group ${isInteracting ? 'cursor-grabbing' : 'cursor-move'} touch-none bg-slate-900/20`}>
       <div ref={mountRef} className="w-full h-full" />
       
       {isLoading && (
         <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-md transition-opacity duration-500">
            <div className="flex flex-col items-center w-64">
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
