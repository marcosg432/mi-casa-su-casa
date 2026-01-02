import { useState, useCallback, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import "./VerticalImageStack.css"

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    alt: "Praia tropical",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    alt: "Resort luxuoso",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    alt: "Montanhas",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
    alt: "Quarto de hotel",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
    alt: "Suíte premium",
  },
]

export function VerticalImageStack() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 400 // ms between navigations

  const navigate = useCallback((newDirection) => {
    const now = Date.now()
    if (now - lastNavigationTime.current < navigationCooldown) return
    lastNavigationTime.current = now

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === images.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? images.length - 1 : prev - 1
    })
  }, [])

  const handleDragEnd = (_, info) => {
    const threshold = 50
    if (info.offset.y < -threshold) {
      navigate(1)
    } else if (info.offset.y > threshold) {
      navigate(-1)
    }
  }



  const getCardStyle = (index) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 }
    } else if (diff === -1) {
      return { y: -120, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: 8 }
    } else if (diff === -2) {
      return { y: -200, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: 15 }
    } else if (diff === 1) {
      return { y: 120, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: -8 }
    } else if (diff === 2) {
      return { y: 200, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: -15 }
    } else {
      return { y: diff > 0 ? 300 : -300, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -20 : 20 }
    }
  }

  const isVisible = (index) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  return (
    <div className="vertical-image-stack-container">
      {/* Subtle ambient glow */}
      <div className="vertical-image-stack-glow" />

      {/* Card Stack */}
      <div className="vertical-image-stack-wrapper" style={{ perspective: "1200px" }}>
        {images.map((image, index) => {
          if (!isVisible(index)) return null

          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <motion.div
              key={image.id}
              className="vertical-image-card"
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotateX: style.rotateX,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              drag={isCurrent ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
              }}
            >
              <div
                className={`vertical-image-card-inner ${isCurrent ? "vertical-image-card-current" : ""}`}
              >
                {/* Card inner glow */}
                <div className="vertical-image-card-glow" />

                <img
                  src={image.src}
                  alt={image.alt}
                  className="vertical-image-img"
                  draggable={false}
                />

                {/* Bottom gradient overlay */}
                <div className="vertical-image-gradient" />
              </div>
            </motion.div>
          )
        })}

        {/* Navigation arrows */}
        <div className="vertical-image-arrows-container">
        <button
          className="vertical-image-arrow vertical-image-arrow-up"
          onClick={() => navigate(-1)}
          aria-label="Previous image"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>

        <button
          className="vertical-image-arrow vertical-image-arrow-down"
          onClick={() => navigate(1)}
          aria-label="Next image"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </button>
        </div>
      </div>
    </div>
  )
}
