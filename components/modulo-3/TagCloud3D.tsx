'use client'

import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import styles from './TagCloud3D.module.css'
import { tagsData, type TagData } from './tagsData'

// Função para distribuir pontos uniformemente em uma esfera (Fibonacci Sphere)
function fibonacciSphere(n: number): Array<[number, number, number]> {
  const points: Array<[number, number, number]> = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2 // y goes from 1 to -1
    const radius = Math.sqrt(1 - y * y) // radius at y
    const theta = goldenAngle * i // golden angle increment
    const x = Math.cos(theta) * radius
    const z = Math.sin(theta) * radius
    points.push([x, y, z])
  }

  return points
}

// Componente de Tag individual
function Tag({
  position,
  tag,
  index,
  total,
  onHover,
  onClick,
  hovered,
  paused
}: {
  position: [number, number, number]
  tag: TagData
  index: number
  total: number
  onHover: (tag: TagData | null) => void
  onClick: (tag: TagData) => void
  hovered: boolean
  paused: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [localHovered, setLocalHovered] = useState(false)
  const isHovered = hovered || localHovered

  // Tamanho baseado na posição (tags mais próximas são maiores)
  const scale = isHovered ? 1.5 : 1
  const fontSize = isHovered ? 0.3 : 0.2
  const opacity = isHovered ? 1 : 0.7

  // Rotação para sempre olhar para a câmera
  useFrame(({ camera }) => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position)
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        setLocalHovered(true)
        onHover(tag)
      }}
      onPointerOut={() => {
        setLocalHovered(false)
        onHover(null)
      }}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        onClick(tag)
      }}
    >
      <Text
        fontSize={fontSize}
        color={tag.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        fillOpacity={opacity}
      >
        {tag.name}
      </Text>
    </mesh>
  )
}

// Componente da cena 3D
function TagCloudScene({
  tags,
  onTagClick,
  hoveredTag,
  onHover,
  paused,
  rotationSpeed
}: {
  tags: TagData[]
  onTagClick: (tag: TagData) => void
  hoveredTag: TagData | null
  onHover: (tag: TagData | null) => void
  paused: boolean
  rotationSpeed: number
}) {
  const groupRef = useRef<THREE.Group>(null)

  // Calcula posições na esfera
  const positions = useMemo(() => {
    return fibonacciSphere(tags.length)
  }, [tags.length])

  // Rotação automática da esfera
  useFrame((state) => {
    if (groupRef.current && !paused) {
      groupRef.current.rotation.y += rotationSpeed * 0.001
      groupRef.current.rotation.x += rotationSpeed * 0.0005
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <group ref={groupRef}>
        {tags.map((tag, index) => (
          <Tag
            key={tag.id}
            position={[
              positions[index][0] * 5,
              positions[index][1] * 5,
              positions[index][2] * 5
            ]}
            tag={tag}
            index={index}
            total={tags.length}
            onHover={onHover}
            onClick={onTagClick}
            hovered={hoveredTag?.id === tag.id}
            paused={paused}
          />
        ))}
      </group>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        minDistance={8}
        maxDistance={15}
        autoRotate={false}
      />
    </>
  )
}

// Componente principal
export function TagCloud3D() {
  const [hoveredTag, setHoveredTag] = useState<TagData | null>(null)
  const [selectedTag, setSelectedTag] = useState<TagData | null>(null)
  const [isMouseOverCanvas, setIsMouseOverCanvas] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(1)

  // Pausa quando o mouse está sobre o canvas OU quando há uma tag em hover
  const isPaused = isMouseOverCanvas || hoveredTag !== null

  return (
    <div className={styles.container}>
      <div
        className={styles.canvasWrapper}
        onMouseEnter={() => setIsMouseOverCanvas(true)}
        onMouseLeave={() => setIsMouseOverCanvas(false)}
      >
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
          <TagCloudScene
            tags={tagsData}
            onTagClick={setSelectedTag}
            hoveredTag={hoveredTag}
            onHover={setHoveredTag}
            paused={isPaused}
            rotationSpeed={rotationSpeed}
          />
        </Canvas>

        {/* Tooltip de hover */}
        {hoveredTag && !selectedTag && (
          <div className={styles.tooltip}>
            <h3>{hoveredTag.name}</h3>
            <p>Experiência: {hoveredTag.experience}</p>
            <p className={styles.tooltipHint}>Clique para mais detalhes</p>
          </div>
        )}

        {/* Controles */}
        <div className={styles.controls}>
          <label>
            Velocidade de Rotação:
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
            />
            <span>{rotationSpeed.toFixed(1)}x</span>
          </label>
        </div>
      </div>

      {/* Modal de detalhes */}
      {selectedTag && (
        <div className={styles.modal} onClick={() => setSelectedTag(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={() => setSelectedTag(null)}
            >
              ×
            </button>
            <div
              className={styles.modalHeader}
              style={{ borderLeftColor: selectedTag.color }}
            >
              <div
                className={styles.tagIcon}
                style={{ backgroundColor: selectedTag.color }}
              >
                {selectedTag.name.charAt(0)}
              </div>
              <div>
                <h2>{selectedTag.name}</h2>
                <p className={styles.experience}>
                  Experiência: {selectedTag.experience}
                </p>
                {selectedTag.url && (
                  <a
                    href={selectedTag.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLink}
                  >
                    🔗 Site Oficial
                  </a>
                )}
              </div>
            </div>
            <div className={styles.modalBody}>
              <h3>Projetos que utilizei esta tecnologia:</h3>
              <ul className={styles.projectsList}>
                {selectedTag.projects.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Instruções */}
      <div className={styles.instructions}>
        <p>💡 Passe o mouse sobre as tags para ver informações</p>
        <p>🖱️ Clique em uma tag para ver detalhes completos</p>
        <p>🔄 Arraste para rotacionar a esfera manualmente</p>
        <p>⏸️ As animações pausam automaticamente quando você interage</p>
        <p>⚙️ Ajuste a velocidade de rotação com o controle acima</p>
      </div>
    </div>
  )
}
