import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styled from '@emotion/styled';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';

const GlobeContainer = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  margin-right: 8px;
  margin-left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  canvas {
    width: 100% !important;
    height: 100% !important;
    border-radius: 50%;
    background-color: #f0f0f0;
  }
`;

interface SceneRef {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  earth?: THREE.Mesh;
  ocean?: THREE.Mesh;
}

const Globe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneRef | null>(null);

  // 初始化场景
  const initScene = () => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 12; // 调整相机距离

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(40, 40); // 增加渲染尺寸以提高清晰度
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    return { scene, camera, renderer };
  };

  // 创建地球和海洋
  const createEarthAndOcean = (scene: THREE.Scene) => {
    const earthGeometry = new THREE.SphereGeometry(4, 64, 64); // 增加分段数
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,
      emissive: 0x000000,
      shininess: 0
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);

    const oceanGeometry = new THREE.SphereGeometry(3.99, 64, 64); // 增加分段数
    const oceanMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      emissive: 0x000000,
      shininess: 0,
      transparent: true,
      opacity: 0.8
    });
    const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);

    scene.add(earth);
    scene.add(ocean);

    return { earth, ocean, earthMaterial };
  };

  // 设置灯光
  const setupLights = (scene: THREE.Scene) => {
    const ambient = new THREE.AmbientLight(0xFFFFFF, 1);
    const frontLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    const backLight = new THREE.DirectionalLight(0x666666, 0.5);

    frontLight.position.set(0, 0, 10);
    backLight.position.set(0, 0, -10);

    scene.add(ambient);
    scene.add(frontLight);
    scene.add(backLight);
  };

  // 创建地图纹理
  const createMapTexture = async (material: THREE.MeshPhongMaterial) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    if (!context) return;

    // 设置背景
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 设置投影
    const projection = d3.geoEquirectangular()
      .scale(canvas.width / (2 * Math.PI))
      .translate([canvas.width / 2, canvas.height / 2]);

    const path = d3.geoPath()
      .projection(projection)
      .context(context);

    try {
      const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
      const world = await response.json();
      
      context.beginPath();
      context.fillStyle = '#FFFFFF';
      path(topojson.feature(world, world.objects.countries));
      context.fill();

      const texture = new THREE.CanvasTexture(canvas);
      material.map = texture;
      material.needsUpdate = true;
    } catch (error) {
      console.error('加载地理数据失败:', error);
    }
  };

  useEffect(() => {
    // 初始化场景
    const { scene, camera, renderer } = initScene() || {};
    if (!scene || !camera || !renderer) return;

    // 创建地球和海洋
    const { earth, ocean, earthMaterial } = createEarthAndOcean(scene);
    
    // 设置灯光
    setupLights(scene);
    
    // 保存引用
    sceneRef.current = { scene, camera, renderer, earth, ocean };

    // 加载地图纹理
    createMapTexture(earthMaterial);

    // 动画循环
    const animate = () => {
      if (!sceneRef.current) return;
      
      requestAnimationFrame(animate);
      if (sceneRef.current.earth) {
        sceneRef.current.earth.rotation.y += 0.008;
      }
      if (sceneRef.current.ocean) {
        sceneRef.current.ocean.rotation.y += 0.008;
      }
      sceneRef.current.renderer.render(scene, camera);
    };
    animate();

    // 清理函数
    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <GlobeContainer ref={containerRef} />;
};

export default Globe; 