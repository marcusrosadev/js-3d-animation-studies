'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './GSAPExamples.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function GSAPExamples() {
  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Exemplo 1: Fade In ao scroll
    if (section1Ref.current) {
      gsap.fromTo(
        section1Ref.current.children,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // Exemplo 2: Animação de escala
    if (section2Ref.current) {
      gsap.fromTo(
        section2Ref.current,
        {
          scale: 0.8,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // Exemplo 3: Rotação e movimento
    if (section3Ref.current) {
      const cards = section3Ref.current.children
      gsap.fromTo(
        cards,
        {
          rotation: -45,
          x: -100,
          opacity: 0
        },
        {
          rotation: 0,
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: section3Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // Exemplo 4: Parallax
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: parallaxRef.current.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    }

    // Exemplo 5: Pin (fixar elemento)
    if (pinRef.current) {
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: '+=2000',
        pin: true,
        pinSpacing: true
      })

      // Animar elementos dentro do pinned
      const items = pinRef.current.querySelectorAll('.pin-item')
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            scale: 0.5
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: item,
              start: 'top center',
              end: 'bottom center',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className={styles.container}>
      {/* Exemplo 1: Fade In Staggered */}
      <section ref={section1Ref} className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Fade In com Stagger</h2>
        <div className={styles.card}>Card 1</div>
        <div className={styles.card}>Card 2</div>
        <div className={styles.card}>Card 3</div>
      </section>

      {/* Exemplo 2: Scale Animation */}
      <section ref={section2Ref} className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Animação de Escala</h2>
        <div className={styles.scaleCard}>
          <h3>Este elemento escala ao entrar na viewport</h3>
          <p>GSAP com ScrollTrigger</p>
        </div>
      </section>

      {/* Exemplo 3: Rotation e Movement */}
      <section ref={section3Ref} className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Rotação e Movimento</h2>
        <div className={styles.rotationGrid}>
          <div className={styles.rotationCard}>Item 1</div>
          <div className={styles.rotationCard}>Item 2</div>
          <div className={styles.rotationCard}>Item 3</div>
          <div className={styles.rotationCard}>Item 4</div>
        </div>
      </section>

      {/* Exemplo 4: Parallax */}
      <section className={styles.parallaxSection}>
        <div ref={parallaxRef} className={styles.parallaxContent}>
          <h2 className={styles.sectionTitle}>4. Efeito Parallax</h2>
          <p>Role a página para ver o efeito parallax</p>
        </div>
      </section>

      {/* Exemplo 5: Pin (Sticky) */}
      <section className={styles.pinSection}>
        <div ref={pinRef} className={styles.pinContainer}>
          <h2 className={styles.sectionTitle}>5. Pin (Elemento Fixo)</h2>
          <div className={styles.pinItems}>
            <div className="pin-item" style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '2rem',
              borderRadius: '12px',
              color: 'white',
              marginBottom: '2rem'
            }}>
              <h3>Item 1</h3>
              <p>Role para ver este elemento fixado</p>
            </div>
            <div className="pin-item" style={{ 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              padding: '2rem',
              borderRadius: '12px',
              color: 'white',
              marginBottom: '2rem'
            }}>
              <h3>Item 2</h3>
              <p>Continue rolando...</p>
            </div>
            <div className="pin-item" style={{ 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              padding: '2rem',
              borderRadius: '12px',
              color: 'white',
              marginBottom: '2rem'
            }}>
              <h3>Item 3</h3>
              <p>Último item!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Espaço para scroll */}
      <div style={{ height: '100vh' }}></div>
    </div>
  )
}

