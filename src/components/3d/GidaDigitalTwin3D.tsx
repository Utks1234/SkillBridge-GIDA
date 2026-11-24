import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCw,
  Maximize2,
  Minimize2,
  Eye,
  Building,
  Sparkles,
  MapPin,
  Layers,
  Cpu,
  Zap,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GidaDigitalTwin3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useApp();

  const [activeHotspot, setActiveHotspot] = useState<{
    title: string;
    sector: string;
    stats: string;
    description: string;
  } | null>({
    title: 'GIDA Sector 13 · Gallantt Steel Hub',
    sector: 'Heavy Engineering Corridor',
    stats: '245 Open CNC Positions · 1850 Active Industrial Workforce',
    description: 'Precision machining, continuous casting mills, and heavy steel fabrication workshops.'
  });

  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [cameraPreset, setCameraPreset] = useState<'overview' | 'sector13' | 'bridge' | 'plastic'>('overview');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060b17);
    scene.fog = new THREE.FogExp2(0x060b17, 0.022);

    const width = container.clientWidth;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(24, 22, 28);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x10b981, 2.5);
    dirLight.position.set(20, 40, 20);
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 3, 50);
    blueLight.position.set(-15, 10, -10);
    scene.add(blueLight);

    const goldLight = new THREE.PointLight(0xf59e0b, 2.5, 40);
    goldLight.position.set(15, 12, -15);
    scene.add(goldLight);

    // 3. Grid & Ground Plane
    const gridHelper = new THREE.GridHelper(60, 40, 0x10b981, 0x1e293b);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // River Plane (Ami River / Gorakhpur water corridor)
    const riverGeo = new THREE.PlaneGeometry(14, 60);
    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x0f2744,
      roughness: 0.1,
      metalness: 0.8,
      emissive: 0x051b33
    });
    const river = new THREE.Mesh(riverGeo, riverMat);
    river.rotation.x = -Math.PI / 2;
    river.position.set(0, 0.01, 0);
    scene.add(river);

    // 4. Sector 13 (Heavy Engineering & Gallantt Ispat) - Left Bank
    const groupSec13 = new THREE.Group();
    groupSec13.position.set(-14, 0, 0);

    // Factory Hall 1
    const hall1Geo = new THREE.BoxGeometry(6, 4, 10);
    const hall1Mat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.3 });
    const hall1 = new THREE.Mesh(hall1Geo, hall1Mat);
    hall1.position.set(0, 2, 0);
    groupSec13.add(hall1);

    // Sawtooth Roof
    const roofGeo = new THREE.ConeGeometry(3.5, 2, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x10b981, wireframe: true });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 5, 0);
    roof.rotation.y = Math.PI / 4;
    groupSec13.add(roof);

    // Blast Furnace Cylinders & Chimneys
    for (let i = 0; i < 3; i++) {
      const chimneyGeo = new THREE.CylinderGeometry(0.4, 0.6, 8 + i * 2, 16);
      const chimneyMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
      const chimney = new THREE.Mesh(chimneyGeo, chimneyMat);
      chimney.position.set(-4 + i * 1.5, (8 + i * 2) / 2, -4);
      groupSec13.add(chimney);

      // Glowing Rings on Chimney
      const ringGeo = new THREE.TorusGeometry(0.65, 0.08, 8, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(-4 + i * 1.5, 7 + i * 2, -4);
      ring.rotation.x = Math.PI / 2;
      groupSec13.add(ring);
    }
    scene.add(groupSec13);

    // 5. The Central SkillBridge (Connecting Student Bank to Factory Bank)
    const bridgeGroup = new THREE.Group();
    // Bridge Arch
    const archCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-10, 0, 0),
      new THREE.Vector3(0, 8, 0),
      new THREE.Vector3(10, 0, 0)
    );
    const archPoints = archCurve.getPoints(40);
    const archGeo = new THREE.BufferGeometry().setFromPoints(archPoints);
    const archMat = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 4 });
    const archLine1 = new THREE.Line(archGeo, archMat);
    archLine1.position.z = -1.5;
    const archLine2 = new THREE.Line(archGeo, archMat);
    archLine2.position.z = 1.5;
    bridgeGroup.add(archLine1);
    bridgeGroup.add(archLine2);

    // Deck
    const deckGeo = new THREE.BoxGeometry(20, 0.4, 3.5);
    const deckMat = new THREE.MeshStandardMaterial({ color: 0x064e3b, emissive: 0x047857 });
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.set(0, 2, 0);
    bridgeGroup.add(deck);

    // Vertical Suspension Cables
    for (let x = -8; x <= 8; x += 2) {
      const cableGeo = new THREE.CylinderGeometry(0.04, 0.04, 5, 8);
      const cableMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
      const cable1 = new THREE.Mesh(cableGeo, cableMat);
      cable1.position.set(x, 4, -1.5);
      const cable2 = new THREE.Mesh(cableGeo, cableMat);
      cable2.position.set(x, 4, 1.5);
      bridgeGroup.add(cable1);
      bridgeGroup.add(cable2);
    }
    scene.add(bridgeGroup);

    // 6. Sector 27 (Plastic Park & Toolroom) - Right Bank
    const groupSec27 = new THREE.Group();
    groupSec27.position.set(14, 0, -4);

    // Geodesic Polymer Dome
    const domeGeo = new THREE.SphereGeometry(3.5, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      wireframe: true,
      emissive: 0x0369a1
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.set(0, 0, 0);
    groupSec27.add(dome);

    // Modern Toolroom Blocks
    const toolroomGeo = new THREE.BoxGeometry(8, 3.5, 6);
    const toolroomMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.2, metalness: 0.5 });
    const toolroom = new THREE.Mesh(toolroomGeo, toolroomMat);
    toolroom.position.set(0, 1.75, 6);
    groupSec27.add(toolroom);

    // Cyan Neon Edge outline
    const edges = new THREE.EdgesGeometry(toolroomGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8 });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    wireframe.position.copy(toolroom.position);
    groupSec27.add(wireframe);

    scene.add(groupSec27);

    // 7. Student Academic / ITI Hub (Chargawan & Sahjanwa)
    const itiGroup = new THREE.Group();
    itiGroup.position.set(13, 0, 12);
    const itiBuildingGeo = new THREE.BoxGeometry(6, 4, 6);
    const itiBuildingMat = new THREE.MeshStandardMaterial({ color: 0x111c38 });
    const itiBuilding = new THREE.Mesh(itiBuildingGeo, itiBuildingMat);
    itiBuilding.position.set(0, 2, 0);
    itiGroup.add(itiBuilding);

    // Floating Hologram Cap on ITI
    const capGeo = new THREE.OctahedronGeometry(1.2, 0);
    const capMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(0, 5.5, 0);
    itiGroup.add(cap);
    scene.add(itiGroup);

    // 8. Glowing Data Particle Streams crossing the Bridge
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 36;
      particlePositions[i * 3 + 1] = 1 + Math.random() * 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16;
      particleSpeeds.push(0.08 + Math.random() * 0.12);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.35,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 9. Interactive Hotspot Markers (Pulsing 3D Spheres)
    const hotspots = [
      {
        pos: new THREE.Vector3(-14, 5, 0),
        data: {
          title: 'GIDA Sector 13 · Gallantt Steel Hub',
          sector: 'Heavy Engineering Corridor',
          stats: '245 Open CNC Positions · 1850 Active Industrial Workforce',
          description: 'Precision machining, continuous casting mills, and heavy steel fabrication workshops.'
        }
      },
      {
        pos: new THREE.Vector3(0, 4.5, 0),
        data: {
          title: 'SkillBridge GIDA (कौशल सेतु)',
          sector: 'Connecting Youth to Factories',
          stats: '648 Certified Placements · 38.4% Migration Reduction',
          description: 'AI-driven bridge linking rural Purvanchal youth from ITIs directly to factory payrolls.'
        }
      },
      {
        pos: new THREE.Vector3(14, 4.5, -4),
        data: {
          title: 'GIDA Sector 27 · Plastic Park',
          sector: 'Purvanchal Polymers & Tooling',
          stats: '190 Mold Technicians Needed · High Tonnage Injection Molding',
          description: 'State-of-the-art PET bottle preform molding, masterbatch compounding and toolroom.'
        }
      },
      {
        pos: new THREE.Vector3(13, 5, 12),
        data: {
          title: 'Govt ITI Chargawan & Sahjanwa',
          sector: 'Academic Training Centers',
          stats: '1,490 Students in 12-Week AI Roadmaps · 84.5% Placement Rate',
          description: 'Centers of Excellence for Fanuc CNC milling, PLC automation, and CIPET plastic mold maintenance.'
        }
      }
    ];

    const hotspotMeshes: THREE.Mesh[] = [];
    hotspots.forEach(h => {
      const hGeo = new THREE.SphereGeometry(0.65, 16, 16);
      const hMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true });
      const hMesh = new THREE.Mesh(hGeo, hMat);
      hMesh.position.copy(h.pos);
      scene.add(hMesh);
      hotspotMeshes.push(hMesh);
    });

    // 10. Animation Loop
    let angle = 0;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotating Camera Orbit if active
      if (isRotating) {
        angle += 0.0035;
        if (cameraPreset === 'overview') {
          camera.position.x = Math.sin(angle) * 32;
          camera.position.z = Math.cos(angle) * 32;
          camera.lookAt(0, 3, 0);
        }
      }

      // Rotate Cap and Roofs
      cap.rotation.y += 0.03;
      dome.rotation.y += 0.005;

      // Animate bridge data particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let x = posAttr.getX(i);
        x += particleSpeeds[i];
        if (x > 20) x = -20;
        posAttr.setX(i, x);
      }
      posAttr.needsUpdate = true;

      // Pulse Hotspots
      const scale = 1 + Math.sin(Date.now() * 0.005) * 0.25;
      hotspotMeshes.forEach(m => m.scale.set(scale, scale, scale));

      renderer.render(scene, camera);
    };

    animate();

    // 11. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container) container.innerHTML = '';
    };
  }, [isRotating, cameraPreset]);

  return (
    <div className={`relative bg-navy-950 border border-navy-700/80 rounded-3xl overflow-hidden shadow-2xl transition-all ${
      isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[440px] sm:h-[480px]'
    }`}>
      
      {/* 3D WebGL Canvas Viewport */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Overlay: Title & UP State Badge */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="bg-navy-900/90 backdrop-blur-md border border-navy-700 px-3.5 py-2 rounded-2xl shadow-xl pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-extrabold text-white text-xs sm:text-sm tracking-wide flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" />
              GIDA 3D Digital Twin · Gorakhpur Industrial Corridor
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              60 FPS WebGL
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Real-time 3D simulation of Sector 13 (Gallantt), Sector 27 (Plastic Park), and Central SkillBridge.
          </p>
        </div>

        {/* Controls Overlay */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-xl text-xs font-semibold backdrop-blur-md border transition ${
              isRotating
                ? 'bg-emerald-600/90 text-white border-emerald-400 shadow-md shadow-emerald-950/40'
                : 'bg-navy-900/90 text-slate-300 border-navy-700 hover:bg-navy-800'
            }`}
            title="Toggle 3D Orbit Rotation"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-navy-900/90 hover:bg-navy-800 text-slate-300 border border-navy-700 backdrop-blur-md"
            title="Toggle Fullscreen 3D Exploration"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Preset Camera Navigation Buttons */}
      <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2 pointer-events-auto">
        {[
          { id: 'overview', label: '3D Overview (सम्पूर्ण दृश्य)' },
          { id: 'sector13', label: 'Sector 13 Heavy Hub (Gallantt)' },
          { id: 'bridge', label: 'SkillBridge Arch (कौशल सेतु)' },
          { id: 'plastic', label: 'Sector 27 Plastic Park' }
        ].map(preset => (
          <button
            key={preset.id}
            onClick={() => setCameraPreset(preset.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md border transition ${
              cameraPreset === preset.id
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-950/40'
                : 'bg-navy-900/80 text-slate-300 border-navy-700 hover:bg-navy-800'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Interactive 3D Telemetry Card (Bottom Right) */}
      {activeHotspot && (
        <div className="absolute bottom-4 right-4 max-w-sm bg-navy-900/95 backdrop-blur-md border border-emerald-500/40 p-4 rounded-2xl shadow-2xl pointer-events-auto space-y-1.5 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              {activeHotspot.sector}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-600/30">
              Live Hotspot
            </span>
          </div>

          <h4 className="text-sm font-bold text-white">{activeHotspot.title}</h4>
          <p className="text-xs text-emerald-300 font-semibold">{activeHotspot.stats}</p>
          <p className="text-[11px] text-slate-300 leading-relaxed">{activeHotspot.description}</p>
        </div>
      )}

    </div>
  );
};
