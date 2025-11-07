'use client'

import React, { useRef, useState } from 'react'
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
import * as THREE from 'three'
import styles from './SkillsAtom.module.css'

// Dados de exemplo das skills
interface SkillData {
  id: string
  name: string
  icon?: string
  experience: string
  projects: string[]
  color: string
}

// Dados de exemplo (você pode substituir pelos seus dados reais)
const skillsData: SkillData[] = [
  {
    id: 'react',
    name: 'React',
    experience: '3 anos',
    projects: ['E-commerce Platform', 'Dashboard Admin', 'Social Media App'],
    color: '#61dafb'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    experience: '2 anos',
    projects: ['Portfolio Site', 'Blog Platform', 'E-commerce'],
    color: '#000000'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    experience: '2.5 anos',
    projects: ['All React Projects', 'Node.js APIs'],
    color: '#3178c6'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    experience: '2 anos',
    projects: ['REST APIs', 'Real-time Chat', 'Microservices'],
    color: '#339933'
  },
  {
    id: 'python',
    name: 'Python',
    experience: '4 anos',
    projects: ['Data Analysis', 'ML Models', 'Automation Scripts'],
    color: '#3776ab'
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    experience: '1 ano',
    projects: ['Portfolio Animations', 'UI Components'],
    color: '#ff0055'
  },
  {
    id: 'gsap',
    name: 'GSAP',
    experience: '1 ano',
    projects: ['Scroll Animations', 'Interactive Websites'],
    color: '#88ce02'
  },
  {
    id: 'threejs',
    name: 'Three.js',
    experience: '6 meses',
    projects: ['3D Portfolio', 'Interactive Experiences'],
    color: '#000000'
  }
]

// Componente do Núcleo (centro do átomo)
function Nucleus({ paused }: { paused: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state: any) => {
    if (meshRef.current && !paused) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial
        color="#667eea"
        emissive="#667eea"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
      <pointLight position={[0, 0, 0]} intensity={1} distance={5} />
    </mesh>
  )
}

// Componente de Órbita (anel visual) com orientação 3D
function OrbitRing({ 
  radius, 
  color, 
  rotation 
}: { 
  radius: number
  color: string
  rotation: [number, number, number]
}) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.01, 16, 100]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.2}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

// Tipo para orientação da órbita
interface OrbitOrientation {
  rotation: [number, number, number] // Rotação do plano da órbita
  axis: 'x' | 'y' | 'z' // Eixo principal da órbita
}

// Componente de Elétron (skill/stack) com órbita 3D
function Electron({
  skill,
  radius,
  angle,
  orbitSpeed,
  onHover,
  onClick,
  hovered,
  paused,
  orbitOrientation
}: {
  skill: SkillData
  radius: number
  angle: number
  orbitSpeed: number
  onHover: (skill: SkillData | null) => void
  onClick: (skill: SkillData) => void
  hovered: boolean
  paused: boolean
  orbitOrientation: OrbitOrientation
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialAngle = angle
  const savedAngleRef = useRef(angle)
  const savedTimeRef = useRef(0)
  const isInitializedRef = useRef(false)

  useFrame((state: any) => {
    if (meshRef.current) {
      if (!isInitializedRef.current) {
        // Inicializa a posição no primeiro frame baseado na orientação da órbita
        let x, y, z
        if (orbitOrientation.axis === 'x') {
          // Órbita no plano Y-Z
          y = Math.cos(initialAngle) * radius
          z = Math.sin(initialAngle) * radius
          x = 0
        } else if (orbitOrientation.axis === 'y') {
          // Órbita no plano X-Z
          x = Math.cos(initialAngle) * radius
          z = Math.sin(initialAngle) * radius
          y = 0
        } else {
          // Órbita no plano X-Y (padrão)
          x = Math.cos(initialAngle) * radius
          y = Math.sin(initialAngle) * radius
          z = 0
        }
        
        // Aplica a rotação do plano
        const vec = new THREE.Vector3(x, y, z)
        const euler = new THREE.Euler(...orbitOrientation.rotation)
        vec.applyEuler(euler)
        
        meshRef.current.position.set(vec.x, vec.y, vec.z)
        savedAngleRef.current = initialAngle
        savedTimeRef.current = state.clock.elapsedTime
        isInitializedRef.current = true
      }

      if (paused) {
        // Quando pausado, mantém a posição atual
      } else {
        // Quando não pausado, continua animando
        const timeDelta = state.clock.elapsedTime - savedTimeRef.current
        const currentAngle = savedAngleRef.current + timeDelta * orbitSpeed
        
        // Calcula a posição baseada no eixo da órbita
        let x, y, z
        if (orbitOrientation.axis === 'x') {
          y = Math.cos(currentAngle) * radius
          z = Math.sin(currentAngle) * radius
          x = 0
        } else if (orbitOrientation.axis === 'y') {
          x = Math.cos(currentAngle) * radius
          z = Math.sin(currentAngle) * radius
          y = 0
        } else {
          x = Math.cos(currentAngle) * radius
          y = Math.sin(currentAngle) * radius
          z = 0
        }
        
        // Aplica a rotação do plano da órbita
        const vec = new THREE.Vector3(x, y, z)
        const euler = new THREE.Euler(...orbitOrientation.rotation)
        vec.applyEuler(euler)
        
        meshRef.current.position.set(vec.x, vec.y, vec.z)
        meshRef.current.rotation.x += 0.02
        meshRef.current.rotation.y += 0.02
        
        savedAngleRef.current = currentAngle
        savedTimeRef.current = state.clock.elapsedTime
      }
    }
  })

  return (
      <mesh
      ref={meshRef}
      onPointerOver={() => onHover(skill)}
      onPointerOut={() => onHover(null)}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        onClick(skill)
      }}
      scale={hovered ? 1.5 : 1}
    >
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color={skill.color}
        emissive={skill.color}
        emissiveIntensity={hovered ? 0.8 : 0.3}
        metalness={0.7}
        roughness={0.3}
      />
      {hovered && (
        <pointLight
          position={[0, 0, 0]}
          color={skill.color}
          intensity={2}
          distance={3}
        />
      )}
    </mesh>
  )
}

// Componente da Cena 3D
function AtomScene({
  onSkillClick,
  hoveredSkill,
  onHover,
  paused
}: {
  onSkillClick: (skill: SkillData) => void
  hoveredSkill: SkillData | null
  onHover: (skill: SkillData | null) => void
  paused: boolean
}) {
  // Dividir skills em múltiplas órbitas com diferentes orientações 3D
  // Cada órbita tem uma orientação diferente (plano diferente) para simular um átomo real
  const orbits = [
    {
      skills: skillsData.slice(0, 3),
      radius: 2.5,
      color: '#667eea',
      rotation: [0, 0, 0] as [number, number, number], // Plano X-Y (horizontal)
      axis: 'z' as const,
      speed: 0.3
    },
    {
      skills: skillsData.slice(3, 5),
      radius: 2.5,
      color: '#4facfe',
      rotation: [Math.PI / 2, 0, 0] as [number, number, number], // Plano Y-Z (vertical)
      axis: 'x' as const,
      speed: -0.25
    },
    {
      skills: skillsData.slice(5, 6),
      radius: 2.5,
      color: '#f5576c',
      rotation: [Math.PI / 4, Math.PI / 4, 0] as [number, number, number], // Inclinado
      axis: 'z' as const,
      speed: 0.2
    },
    {
      skills: skillsData.slice(6, 7),
      radius: 3.5,
      color: '#764ba2',
      rotation: [0, Math.PI / 2, 0] as [number, number, number], // Plano X-Z (vertical)
      axis: 'y' as const,
      speed: 0.2
    },
    {
      skills: skillsData.slice(7, 8),
      radius: 3.5,
      color: '#88ce02',
      rotation: [Math.PI / 3, Math.PI / 6, Math.PI / 4] as [number, number, number], // Inclinado em múltiplos eixos
      axis: 'z' as const,
      speed: -0.15
    }
  ]

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />

      {/* Núcleo */}
      <Nucleus paused={paused} />

      {/* Renderiza cada órbita com sua orientação - sem linhas visíveis */}
      {orbits.map((orbit, orbitIndex) => 
        orbit.skills.map((skill, index) => {
          const angle = (index / orbit.skills.length) * Math.PI * 2
          return (
            <Electron
              key={skill.id}
              skill={skill}
              radius={orbit.radius}
              angle={angle}
              orbitSpeed={orbit.speed}
              onHover={onHover}
              onClick={onSkillClick}
              hovered={hoveredSkill?.id === skill.id}
              paused={paused}
              orbitOrientation={{
                rotation: orbit.rotation,
                axis: orbit.axis
              }}
            />
          )
        })
      )}

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        minDistance={5}
        maxDistance={10}
      />
    </>
  )
}

// Componente principal
export function SkillsAtom() {
  const [hoveredSkill, setHoveredSkill] = useState<SkillData | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<SkillData | null>(null)
  const [isMouseOverCanvas, setIsMouseOverCanvas] = useState(false)

  // Pausa quando o mouse está sobre o canvas OU quando há uma skill em hover
  const isPaused = isMouseOverCanvas || hoveredSkill !== null

  return (
    <div className={styles.container}>
      <div 
        className={styles.canvasWrapper}
        onMouseEnter={() => setIsMouseOverCanvas(true)}
        onMouseLeave={() => setIsMouseOverCanvas(false)}
      >
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <AtomScene
            onSkillClick={setSelectedSkill}
            hoveredSkill={hoveredSkill}
            onHover={setHoveredSkill}
            paused={isPaused}
          />
        </Canvas>

        {/* Tooltip de hover */}
        {hoveredSkill && !selectedSkill && (
          <div className={styles.tooltip}>
            <h3>{hoveredSkill.name}</h3>
            <p>Clique para mais detalhes</p>
          </div>
        )}
      </div>

      {/* Modal de detalhes */}
      {selectedSkill && (
        <div className={styles.modal} onClick={() => setSelectedSkill(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={() => setSelectedSkill(null)}
            >
              ×
            </button>
            <div
              className={styles.modalHeader}
              style={{ borderLeftColor: selectedSkill.color }}
            >
              <div
                className={styles.skillIcon}
                style={{ backgroundColor: selectedSkill.color }}
              >
                {selectedSkill.name.charAt(0)}
              </div>
              <div>
                <h2>{selectedSkill.name}</h2>
                <p className={styles.experience}>
                  Experiência: {selectedSkill.experience}
                </p>
              </div>
            </div>
            <div className={styles.modalBody}>
              <h3>Projetos que utilizei esta stack:</h3>
              <ul className={styles.projectsList}>
                {selectedSkill.projects.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Instruções */}
      <div className={styles.instructions}>
        <p>💡 Passe o mouse sobre as esferas para ver as skills</p>
        <p>🖱️ Clique em uma esfera para ver detalhes</p>
        <p>🔄 Arraste para rotacionar o átomo</p>
        <p>⏸️ As animações pausam automaticamente quando você passa o mouse sobre o átomo</p>
      </div>
    </div>
  )
}

