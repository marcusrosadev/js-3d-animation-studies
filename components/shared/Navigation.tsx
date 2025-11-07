'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navigation.module.css'

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <Link href="/" className={pathname === '/' ? styles.active : ''}>
        Home
      </Link>
      <Link href="/modulo-1" className={pathname === '/modulo-1' ? styles.active : ''}>
        Módulo 1
      </Link>
      <Link href="/modulo-2" className={pathname === '/modulo-2' ? styles.active : ''}>
        Módulo 2
      </Link>
      <Link href="/modulo-3" className={pathname === '/modulo-3' ? styles.active : ''}>
        Módulo 3
      </Link>
    </nav>
  )
}

