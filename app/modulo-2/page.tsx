'use client'

import Link from 'next/link'
import { GSAPExamples } from '@/components/modulo-2/GSAPExamples'
import styles from '../page.module.css'

export default function Modulo2() {
  return (
    <main className={styles.main} style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
      <div className={styles.container}>
        <Link href="/" style={{ color: 'white', marginBottom: '2rem', display: 'inline-block' }}>
          ← Voltar
        </Link>
        <h1 className={styles.title}>Módulo 2: GSAP</h1>
        <p className={styles.subtitle}>Animações complexas baseadas em scroll - Scrollytelling</p>
        <GSAPExamples />
      </div>
    </main>
  )
}

