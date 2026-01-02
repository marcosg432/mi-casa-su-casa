import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import "./ParallaxScrollSecond.css";

export const ParallaxScrollSecond = ({
  images,
  className = "",
}) => {
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateYFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateXFirst = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const translateYThird = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXThird = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotateXThird = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      className={`parallax-scroll-container ${className}`}
      ref={gridRef}
    >
      <div className="parallax-scroll-grid">
        <div className="parallax-scroll-column">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{
                y: translateYFirst,
                x: translateXFirst,
                rotateZ: rotateXFirst,
              }}
              key={"grid-1" + idx}
            >
              <img
                src={el}
                className="parallax-scroll-image"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="parallax-scroll-column">
          {secondPart.map((el, idx) => (
            <motion.div key={"grid-2" + idx}>
              <img
                src={el}
                className="parallax-scroll-image"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="parallax-scroll-column">
          {thirdPart.map((el, idx) => (
            <motion.div
              style={{
                y: translateYThird,
                x: translateXThird,
                rotateZ: rotateXThird,
              }}
              key={"grid-3" + idx}
            >
              <img
                src={el}
                className="parallax-scroll-image"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
