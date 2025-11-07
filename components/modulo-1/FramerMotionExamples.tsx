'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import styles from './FramerMotionExamples.module.css'

export function FramerMotionExamples() {
  const [isVisible, setIsVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div className={styles.container}>
      {/* Exemplo 1: Animações básicas */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Animações Básicas</h2>
        <div className={styles.examplesGrid}>
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Fade In + Slide</h3>
            <p>Aparece com fade e desliza para cima</p>
          </motion.div>

          <motion.div
            className={styles.card}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <h3>Spring Animation</h3>
            <p>Animação com física spring</p>
          </motion.div>

          <motion.div
            className={styles.card}
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <h3>Loop Animation</h3>
            <p>Animação contínua</p>
          </motion.div>
        </div>
      </section>

      {/* Exemplo 2: Hover e Interações */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Interações Hover</h2>
        <div className={styles.examplesGrid}>
          <motion.div
            className={styles.interactiveCard}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <h3>Hover Effect</h3>
            <p>Passe o mouse</p>
          </motion.div>

          <motion.div
            className={styles.interactiveCard}
            whileHover={{ 
              rotate: 5,
              backgroundColor: "#f5576c",
              color: "white"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>Hover Complexo</h3>
            <p>Múltiplas propriedades</p>
          </motion.div>

          <motion.div
            className={styles.interactiveCard}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            animate={{
              backgroundColor: hovered ? "#764ba2" : "#fff",
              color: hovered ? "white" : "#333"
            }}
          >
            <h3>Hover Controlado</h3>
            <p>Estado controlado</p>
          </motion.div>
        </div>
      </section>

      {/* Exemplo 3: Variantes */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Variantes de Animação</h2>
        <motion.div
          className={styles.variantCard}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { staggerChildren: 0.2 }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className={styles.variantItem}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              Item {item}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Exemplo 4: Animações de Lista */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Animações de Lista</h2>
        <motion.ul className={styles.list}>
          {['Home', 'About', 'Projects', 'Contact'].map((item, index) => (
            <motion.li
              key={item}
              className={styles.listItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 10, color: "#f5576c" }}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* Exemplo 5: Toggle de Visibilidade */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Animações Condicionais</h2>
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className={styles.toggleButton}
        >
          {isVisible ? 'Ocultar' : 'Mostrar'} Conteúdo
        </button>
        <motion.div
          initial={false}
          animate={{
            height: isVisible ? "auto" : 0,
            opacity: isVisible ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <div className={styles.revealContent}>
            <h3>Conteúdo Revelado!</h3>
            <p>Esta animação usa height e opacity para um efeito suave.</p>
          </div>
        </motion.div>
      </section>

      {/* Exemplo 6: Layout Animations */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Layout Animations</h2>
        <motion.div
          className={styles.layoutBox}
          layout
          initial={{ borderRadius: 20 }}
          whileHover={{ borderRadius: 50 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.h3 layout="position">Layout Animation</motion.h3>
          <motion.p layout="position">
            Esta animação se adapta automaticamente a mudanças de layout
          </motion.p>
        </motion.div>
      </section>
    </div>
  )
}

