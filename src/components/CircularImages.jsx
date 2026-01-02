import React, { useEffect, useRef, useState, useMemo } from "react";
import "./CircularImages.css";

function calculateGap(width) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 140;
  const maxGap = 220;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return maxGap;
  return (
    minGap +
    (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
  );
}

export const CircularImages = ({
  testimonials,
  autoplay = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const imageContainerRef = useRef(null);
  const autoplayIntervalRef = useRef(null);

  const testimonialsLength = useMemo(
    () => testimonials.length,
    [testimonials]
  );

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!autoplay) return;

    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    }, 5000);

    return () => {
      if (autoplayIntervalRef.current)
        clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  const getImageStyle = (index) => {
    const gap = calculateGap(containerWidth);
    const lift = gap * 0.25;

    const isActive = index === activeIndex;
    const isLeft =
      (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight =
      (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        transform: "translateX(0px) scale(1)",
        transition: "all 0.9s cubic-bezier(.4,2,.3,1)",
      };
    }

    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        transform: `translateX(-${gap}px) translateY(-${lift}px) scale(0.9)`,
        transition: "all 0.9s cubic-bezier(.4,2,.3,1)",
      };
    }

    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        transform: `translateX(${gap}px) translateY(-${lift}px) scale(0.9)`,
        transition: "all 0.9s cubic-bezier(.4,2,.3,1)",
      };
    }

    return {
      opacity: 0,
      pointerEvents: "none",
    };
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-image-container" ref={imageContainerRef}>
        {testimonials.map((item, index) => (
          <img
            key={item.src}
            src={item.src}
            className="carousel-image"
            style={getImageStyle(index)}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default CircularImages;




