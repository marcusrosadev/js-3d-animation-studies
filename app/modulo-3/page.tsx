'use client'

import Link from 'next/link'
import { R3FExamples } from '@/components/modulo-3/R3FExamples'
import { SkillsAtom } from '@/components/modulo-3/SkillsAtom'
import { TagCloud3D } from '@/components/modulo-3/TagCloud3D'
import styles from '../page.module.css'

export default function Modulo3() {
  return (
    <main className={styles.main} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className={styles.container}>
        <Link href="/" style={{ color: 'white', marginBottom: '2rem', display: 'inline-block' }}>
          ← Voltar
        </Link>
        <h1 className={styles.title}>Módulo 3: React Three Fiber</h1>
        <p className={styles.subtitle}>Elementos 3D de alto impacto com interação</p>
        
        {/* Nuvem de Tags 3D - Exemplo de Portfólio */}
        <div style={{ marginBottom: '4rem', background: 'transparent', padding: '2rem', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '1rem', textAlign: 'center' }}>
            ☁️ Nuvem de Tags 3D - Portfólio Interativo
          </h2>
          <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem' }}>
            Visualização 3D interativa das suas skills e tecnologias
          </p>
          <TagCloud3D />
        </div>

        {/* Átomo de Skills - Exemplo Alternativo */}
        <div style={{ marginBottom: '4rem', background: 'white', padding: '2rem', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '2rem', color: '#333', marginBottom: '1rem', textAlign: 'center' }}>
            🎯 Átomo de Skills - Exemplo Alternativo
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
            Versão com órbitas em múltiplos planos
          </p>
          <SkillsAtom />
        </div>

        {/* Exemplos Básicos */}
        <R3FExamples />
      </div>
    </main>
  )
}

