'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import styles from './R3FExamples.module.css'

// Componente de Box animado
function AnimatedBox({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.5 : 1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? '#f5576c' : '#667eea'} />
    </mesh>
  )
}

// Componente de Sphere que segue o mouse
function MouseFollowSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = (state.mouse.x * state.viewport.width) / 2
      meshRef.current.position.y = (state.mouse.y * state.viewport.height) / 2
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#764ba2" />
    </mesh>
  )
}

// Componente de Torus animado
function AnimatedTorus() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.5
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial color="#4facfe" />
    </mesh>
  )
}

// Componente de múltiplas esferas
function MultipleSpheres() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color={`hsl(${(i * 360) / 20}, 70%, 50%)`} />
          </mesh>
        )
      })}
    </>
  )
}

// Componente de cena completa
function Scene({ example }: { example: number }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[0, 5, 5]} intensity={1} />

      {example === 1 && (
        <>
          <AnimatedBox position={[-2, 0, 0]} />
          <AnimatedBox position={[0, 0, 0]} />
          <AnimatedBox position={[2, 0, 0]} />
        </>
      )}

      {example === 2 && <MouseFollowSphere />}

      {example === 3 && <AnimatedTorus />}

      {example === 4 && <MultipleSpheres />}

      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </>
  )
}

export function R3FExamples() {
  const [activeExample, setActiveExample] = useState(1)

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Exemplos de React Three Fiber</h2>
        
        <div className={styles.controls}>
          <button
            onClick={() => setActiveExample(1)}
            className={activeExample === 1 ? styles.activeButton : styles.button}
          >
            Exemplo 1: Boxes Animados
          </button>
          <button
            onClick={() => setActiveExample(2)}
            className={activeExample === 2 ? styles.activeButton : styles.button}
          >
            Exemplo 2: Esfera Segue Mouse
          </button>
          <button
            onClick={() => setActiveExample(3)}
            className={activeExample === 3 ? styles.activeButton : styles.button}
          >
            Exemplo 3: Torus Animado
          </button>
          <button
            onClick={() => setActiveExample(4)}
            className={activeExample === 4 ? styles.activeButton : styles.button}
          >
            Exemplo 4: Múltiplas Esferas
          </button>
        </div>

        <div className={styles.canvasContainer}>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Scene example={activeExample} />
          </Canvas>
        </div>

        <div className={styles.description}>
          {activeExample === 1 && (
            <div>
              <h3>Exemplo 1: Boxes Animados com Hover</h3>
              <p>Três cubos que rotacionam continuamente e respondem ao hover do mouse.</p>
            </div>
          )}
          {activeExample === 2 && (
            <div>
              <h3>Exemplo 2: Esfera que Segue o Mouse</h3>
              <p>Uma esfera que segue o movimento do cursor na tela.</p>
            </div>
          )}
          {activeExample === 3 && (
            <div>
              <h3>Exemplo 3: Torus Animado</h3>
              <p>Um torus (dona) com rotação baseada em seno para movimento suave.</p>
            </div>
          )}
          {activeExample === 4 && (
            <div>
              <h3>Exemplo 4: Círculo de Esferas</h3>
              <p>Múltiplas esferas dispostas em círculo com cores diferentes.</p>
            </div>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Instruções</h2>
        <ul className={styles.instructions}>
          <li>Use o mouse para rotacionar a câmera (arraste)</li>
          <li>Use a roda do mouse para zoom</li>
          <li>Clique nos botões acima para trocar entre exemplos</li>
          <li>Alguns elementos respondem ao hover do mouse</li>
        </ul>
      </section>
    </div>
  )
}

