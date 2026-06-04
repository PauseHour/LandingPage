import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface PointData {
  ox: number; oy: number; oz: number; // Origin
  tx: number; ty: number; tz: number; // Target base
  angle: number;
  radius: number;
  yOffset: number;
  phase: number;
  type: 'shell' | 'core' | 'ring';
  ax: number; ay: number; az: number; // Ambient destinations
  ambientSpeed: number;
}

function generateHourglassData(pointCount: number, xOffset: number): PointData[] {
  const points: PointData[] = [];
  
  const coreCount = Math.floor(pointCount * 0.08); 
  const ringCount = 0; // Removed for minimalism
  const shellCount = pointCount - coreCount - ringCount;

  // Outer Hourglass Shell (The "Flow" of Time / Transit)
  for (let i = 0; i < shellCount; i++) {
    const y = (Math.random() - 0.5) * 8.0; // Height from -4.0 to 4.0
    const normalizedY = (y / 4.0);
    const radius = 0.4 + 1.6 * (normalizedY * normalizedY); 
    const angle = Math.random() * Math.PI * 2;
    
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    const ambientRadius = 8 + Math.random() * 25;
    const ambientAngle = Math.random() * Math.PI * 2;

    points.push({
      ox: xOffset + (Math.random()-0.5)*20, oy: -15 - Math.random() * 10, oz: (Math.random()-0.5)*20,
      tx: xOffset + x, ty: y, tz: z,
      angle: angle,
      radius: radius,
      yOffset: y,
      phase: Math.random(),
      type: 'shell',
      ax: Math.cos(ambientAngle) * ambientRadius,
      ay: (Math.random() - 0.5) * 50,
      az: Math.sin(ambientAngle) * ambientRadius,
      ambientSpeed: 0.05 + Math.random() * 0.15,
    });
  }

  // Inner Glowing Core (The "Pause" / Oasis)
  for (let i = 0; i < coreCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 0.85 * Math.cbrt(Math.random()); 
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.cos(phi); 
    const z = r * Math.sin(phi) * Math.sin(theta);

    const ambientRadius = 2 + Math.random() * 30;
    const ambientAngle = Math.random() * Math.PI * 2;

    points.push({
      ox: xOffset + (Math.random()-0.5)*5, oy: 15 + Math.random() * 10, oz: (Math.random()-0.5)*5, 
      tx: xOffset + x, ty: y, tz: z,
      angle: theta,
      radius: r, 
      yOffset: y,
      phase: Math.random(),
      type: 'core',
      ax: Math.cos(ambientAngle) * ambientRadius,
      ay: (Math.random() - 0.5) * 50,
      az: Math.sin(ambientAngle) * ambientRadius,
      ambientSpeed: 0.05 + Math.random() * 0.15,
    });
  }

  // Orbiting Data Ring removed for a more minimalist aesthetic

  return points;
}

function getTargetColor(type: string): THREE.Color {
  switch (type) {
    case 'shell': return new THREE.Color(0xf5f2ea); // Parchment/White
    case 'core': return new THREE.Color(0xff3b00); // Vermilion Orange
    case 'ring': return new THREE.Color(0xff3b00);
    default: return new THREE.Color(0xf5f2ea);
  }
}

function getColorIntensity(type: string): number {
  switch (type) {
    case 'shell': return 0.25; // Ghostly, elegant outer shell
    case 'core': return 0.8;  // Highly intense glowing core
    case 'ring': return 0.8;
    default: return 0.5;
  }
}

export default function WireframeHotel() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const isMobile = window.innerWidth < 768;
    const pointCount = isMobile ? 4000 : 8000;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.008);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const camY = isMobile ? -3.5 : 0;
    camera.position.set(0, camY, isMobile ? 15.5 : 7.0); // Shift entire scene up on mobile
    camera.lookAt(0, camY, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a0a, 0);
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const targetOffset = isMobile ? 0 : 2.2;
    const points = generateHourglassData(pointCount, targetOffset);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(points.length * 3);
    const colors = new Float32Array(points.length * 3);
    const coldColor = new THREE.Color(0x050505);

    for (let i = 0; i < points.length; i++) {
      positions[i * 3] = points[i].ox;
      positions[i * 3 + 1] = points[i].oy;
      positions[i * 3 + 2] = points[i].oz;
      colors[i * 3] = coldColor.r;
      colors[i * 3 + 1] = coldColor.g;
      colors[i * 3 + 2] = coldColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    let startTime = performance.now();
    const assemblyDuration = 3000;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const easeOutExp = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    let currentScrollY = window.scrollY;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = performance.now() * 0.001;
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / assemblyDuration, 1);
      
      // SMOOTH LERP: Glide towards the actual scroll value for buttery transitions
      currentScrollY += (window.scrollY - currentScrollY) * 0.06;
      
      // Calculate scroll-based breaking
      const breakProgress = Math.max(0, Math.min(currentScrollY / (window.innerHeight * 0.8), 1.0));
      // Use an even smoother easing function for the transition
      const easedBreak = breakProgress < 0.5 
        ? 4 * breakProgress * breakProgress * breakProgress 
        : 1 - Math.pow(-2 * breakProgress + 2, 3) / 2;

      
      const posArr = geometry.attributes.position.array as Float32Array;
      const colArr = geometry.attributes.color.array as Float32Array;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Stagger assembly
        const stagger = p.phase * 0.4;
        const localProgress = Math.max(0, Math.min(1, (progress - stagger) / (1 - stagger)));
        const easedLocal = easeOutExp(localProgress);

        let structuredTx = p.tx;
        let structuredTy = p.ty;
        let structuredTz = p.tz;

        // Mathematical Flow Animation
        if (p.type === 'shell') {
           let flowY = p.yOffset - time * 0.35; 
           flowY = ((flowY + 4.0) % 8.0 + 8.0) % 8.0 - 4.0;
           
           const normalizedY = (flowY / 4.0);
           const radius = 0.4 + 1.6 * (normalizedY * normalizedY);
           const currentAngle = p.angle + time * 0.1 + normalizedY * 1.5;

           structuredTx = targetOffset + Math.cos(currentAngle) * radius;
           structuredTy = flowY;
           structuredTz = Math.sin(currentAngle) * radius;
        } 
        else if (p.type === 'core') {
           const dx = p.tx - targetOffset;
           const dz = p.tz;
           const r2d = Math.sqrt(dx*dx + dz*dz);
           const baseAngle = Math.atan2(dz, dx);
           const newAngle = baseAngle - time * 0.4;
           const pulse = 1.0 + 0.08 * Math.sin(time * 1.5 + p.phase * Math.PI * 2);

           structuredTx = targetOffset + Math.cos(newAngle) * r2d * pulse;
           structuredTy = p.yOffset * pulse + Math.sin(time * 0.8) * 0.05; 
           structuredTz = Math.sin(newAngle) * r2d * pulse;
        }

        // Majestic Swirling Galaxy Animation (when broken by scroll)
        const aRadius = Math.sqrt(p.ax * p.ax + p.az * p.az);
        const aAngle = Math.atan2(p.az, p.ax) + time * p.ambientSpeed;
        
        const ambientTx = Math.cos(aAngle) * aRadius;
        let ambientTy = p.ay + time * 1.5 * p.ambientSpeed; // drift slowly upwards
        ambientTy = ((ambientTy + 40) % 80) - 40; // wrap gracefully within large vertical bounds
        const ambientTz = -12 + Math.sin(aAngle) * aRadius;

        // Blend based on smooth scroll
        const currentTx = structuredTx * (1 - easedBreak) + ambientTx * easedBreak;
        const currentTy = structuredTy * (1 - easedBreak) + ambientTy * easedBreak;
        const currentTz = structuredTz * (1 - easedBreak) + ambientTz * easedBreak;

        // Interpolate between origin and target for initial assembly
        posArr[i * 3] = p.ox + (currentTx - p.ox) * easedLocal;
        posArr[i * 3 + 1] = p.oy + (currentTy - p.oy) * easedLocal;
        posArr[i * 3 + 2] = p.oz + (currentTz - p.oz) * easedLocal;

        // Color and glow
        let intensity = getColorIntensity(p.type);
        if (p.type === 'core') {
          intensity *= 0.7 + 0.3 * Math.sin(time * 4.0 + p.phase * 5.0);
        }
        
        // Dim the particles moderately when they break into the background so they stay beautifully visible
        intensity = intensity * (1 - easedBreak * 0.45);

        const targetColor = getTargetColor(p.type);
        const colorProgress = Math.max(0, localProgress - 0.2);
        const easedColor = easeOutExp(colorProgress);

        colArr[i * 3] = coldColor.r + (targetColor.r * intensity - coldColor.r) * easedColor;
        colArr[i * 3 + 1] = coldColor.g + (targetColor.g * intensity - coldColor.g) * easedColor;
        colArr[i * 3 + 2] = coldColor.b + (targetColor.b * intensity - coldColor.b) * easedColor;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
      material.opacity = Math.min(1, progress * 2);

      // Mouse parallax
      const targetCamX = mouseX * 0.8;
      const targetCamY = camY + mouseY * 0.8;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, camY, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
      role="presentation"
    />
  );
}
