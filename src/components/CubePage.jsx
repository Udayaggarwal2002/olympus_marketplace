import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import styled, { keyframes } from 'styled-components';
import { useTimer } from '../context/TimerContext';

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #106ac2, #5cc9ed); /* Gradient of blue */

  min-height: 100vh;
  justify-content: center;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #f53636; /* Red color */
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Poppins', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const SceneContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin: 2rem 0;
`;

const Timer = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #282c34; /* Dark text color for contrast */
  font-weight: bold;
  background: #00BFFF; /* Bright Sky Blue */
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  font-family: 'Poppins', sans-serif;
`;

const Cube = () => {
  const mesh = useRef();
  const { timeLeft } = useTimer();
  const [rotation, setRotation] = useState(false);

  useFrame(() => {
    if (rotation) {
      mesh.current.rotation.x += 0.1;
      mesh.current.rotation.y += 0.1;
    } else {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    if (timeLeft === 0) {
      setRotation(true);
      setTimeout(() => {
        setRotation(false);
        const randomRotation = Math.floor(Math.random() * 4) * Math.PI / 2;
        mesh.current.rotation.x = randomRotation;
        mesh.current.rotation.y = randomRotation;
      }, 2000);
    }
  }, [timeLeft]);

  return (
    <mesh ref={mesh} position={[4, 0, 0]} scale={[2, 2, 2]} animation={floatAnimation}>
      <boxGeometry args={[2, 2, 2]} />
      {Array.from({ length: 6 }).map((_, i) => (
        <meshStandardMaterial attach={`material-${i}`} key={i} color="#FF4500"> {/* Bright orange color */}
          <canvasTexture attach="map" image={drawTextOnCanvas(i + 1)} />
        </meshStandardMaterial>
      ))}
    </mesh>
  );
};

const drawTextOnCanvas = (text) => {
  const size = 512;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = size;
  canvas.height = size;
  context.fillStyle = '#FF4500'; /* Bright orange color */
  context.fillRect(0, 0, size, size);
  context.fillStyle = 'white';
  context.font = 'bold 200px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, size / 2, size / 2);
  return canvas;
};

const Coin = () => {
  const mesh = useRef();
  const { timeLeft } = useTimer();
  const [flip, setFlip] = useState(false);

  useFrame(() => {
    if (flip) {
      mesh.current.rotation.x += 0.1;
    } else {
      mesh.current.rotation.x = Math.PI / 2;
    }
  });

  useEffect(() => {
    if (timeLeft === 0) {
      setFlip(true);
      setTimeout(() => {
        setFlip(false);
        const isHeads = Math.random() > 0.5;
        mesh.current.rotation.x = isHeads ? 0 : Math.PI;
        mesh.current.rotation.y = 0;
      }, 2000);
    }
  }, [timeLeft]);

  return (
    <mesh ref={mesh} position={[-4, 0, 0]} scale={[2, 2, 2]} animation={floatAnimation}>
      <cylinderGeometry args={[1, 1, 0.1, 32]} />
      <meshStandardMaterial color={'#FFD700'}> {/* Brighter Gold */}
        <canvasTexture attach="map" image={drawCoinFace('H')} />
      </meshStandardMaterial>
      <meshStandardMaterial color={'#FFD700'}> {/* Brighter Gold */}
        <canvasTexture attach="map" image={drawCoinFace('T')} />
      </meshStandardMaterial>
    </mesh>
  );
};

const drawCoinFace = (text) => {
  const size = 512;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = size;
  canvas.height = size;
  context.fillStyle = '#FFD700'; /* Brighter Gold */
  context.fillRect(0, 0, size, size);
  context.fillStyle = 'black';
  context.font = 'bold 300px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, size / 2, size / 2);
  return canvas;
};

function CubePage() {
  const { timeLeft } = useTimer();

  return (
    <Container>
      <Heading>
        Get Ready to Start Your Betting Adventure!
      </Heading>
      <Timer>
        Time left: {timeLeft}s
      </Timer>
      <SceneContainer>
        <Canvas shadows>
          <ambientLight intensity={0.7} />
          <spotLight position={[10, 20, 10]} angle={0.2} penumbra={1} castShadow />
          <pointLight position={[-10, -10, -10]} />
          <Coin />
          <Cube />
        </Canvas>
      </SceneContainer>
    </Container>
  );
}

export default CubePage;
