'use client'

import Link from 'next/link'
import { FramerMotionExamples } from '@/components/modulo-1/FramerMotionExamples'
import styles from '../page.module.css'

export default function Modulo1() {
  return (
    <main className={styles.main} style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
      <div className={styles.container}>
        <Link href="/" style={{ color: 'white', marginBottom: '2rem', display: 'inline-block' }}>
          ← Voltar
        </Link>
        <h1 className={styles.title}>Módulo 1: Framer Motion</h1>
        <p className={styles.subtitle}>Micro-animações e polimento em toda a UI</p>
        <FramerMotionExamples />
      </div>
    </main>
  )
}

