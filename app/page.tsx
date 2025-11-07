import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Frame Motion and Animation Studies
        </h1>
        <p className={styles.subtitle}>
          Mini-curso de animações e motion design no React/Next.js
        </p>
        
        <div className={styles.modules}>
          <Link href="/modulo-1" className={styles.moduleCard}>
            <div className={styles.moduleNumber}>01</div>
            <h2>Framer Motion</h2>
            <p>Micro-animações e polimento em toda a UI</p>
          </Link>
          
          <Link href="/modulo-2" className={styles.moduleCard}>
            <div className={styles.moduleNumber}>02</div>
            <h2>GSAP</h2>
            <p>Animações complexas baseadas em scroll</p>
          </Link>
          
          <Link href="/modulo-3" className={styles.moduleCard}>
            <div className={styles.moduleNumber}>03</div>
            <h2>React Three Fiber</h2>
            <p>Elementos 3D de alto impacto</p>
          </Link>
        </div>
      </div>
    </main>
  )
}

