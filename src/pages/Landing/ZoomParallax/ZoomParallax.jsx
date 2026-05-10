import styles from "./styles.module.css";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function ZoomParallax() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: "https://images.pexels.com/photos/34016793/pexels-photo-34016793.jpeg",
      scale: scale4,
    },
    {
      src: "https://images.pexels.com/photos/30953649/pexels-photo-30953649.jpeg",
      scale: scale5,
    },
    {
      src: "https://images.pexels.com/photos/8571864/pexels-photo-8571864.jpeg",
      scale: scale6,
    },
    {
      src: "https://images.pexels.com/photos/5319297/pexels-photo-5319297.jpeg",
      scale: scale5,
    },
    {
      src: "https://images.pexels.com/photos/5319297/pexels-photo-5319297.jpeg",
      scale: scale6,
    },
    {
      src: "https://images.pexels.com/photos/6776718/pexels-photo-6776718.jpeg",
      scale: scale8,
    },
    {
      src: "https://images.pexels.com/photos/30953650/pexels-photo-30953650.jpeg",
      scale: scale9,
    },
  ];

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale }, index) => (
          <motion.div key={index} style={{ scale }} className={styles.el}>
            <div className={styles.imageContainer}>
              <img src={src} alt="fashion" loading="eager" decoding="async" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
