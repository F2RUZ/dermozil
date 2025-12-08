"use client";
import React from "react";
import { motion } from "framer-motion";
import "./best.scss";

// --- ANIMATSIYA VARIANTLARI ---

/**
 * Umumiy Konteyner (Ro'yxat elementlari uchun Stagger)
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

/**
 * Ro'yxatdagi alohida elementlar uchun animatsiya
 */
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

/**
 * Rasm va SVG uchun Animatsiya (Chap qism)
 */
const leftSideVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/**
 * Rasmni cheksiz aylantirish variantlari (avvalgi rectRotateVariants ishlatiladi)
 */
const rotateVariants = (direction) => ({
  rotate: direction === "right" ? 360 : -360,
  transition: {
    duration: 30,
    ease: "linear",
    repeat: Infinity,
    delay: Math.random() * 5,
  },
});

const Best = () => {
  return (
    <motion.section
      className="best"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="what-brings__title">
        Dermozil - Tirnoq zamburug‘iga qarshi eng yaxshi vosita, tarkibida:
      </h2>
      <div className="best__bottom">
        {/* CHAP QISM (Rasm va Aylanuvchi fon) */}
        <motion.div className="best__left" variants={leftSideVariants}>
          <img
            className="best__img"
            src="./images/best-main-img.png"
            alt="Dermozil mahsuloti"
          />

          {/* Yangi rasm tegi aylanma animatsiya bilan almashtirildi */}
          <motion.img
            className="best__svg" // CSS stillari saqlanadi
            src="/tree.svg"
            alt="Dekorativ fon rasmi"
            initial={{ rotate: 0 }}
            animate={rotateVariants("left")} // Masalan, chapga aylanish
          />
        </motion.div>

        {/* O'NG QISM (Tarkib elementlari) */}
        <motion.div className="best__right" variants={containerVariants}>
          <motion.div className="best__items" variants={itemVariants}>
            <img src="./images/best-imgs-1.png" alt="Triklozan tarkibi" />
            <p className="best__items-text">
              **Triklozan**: Yallig‘lanishga qarshi, antibakterial va
              zamburug‘larga qarshi xususiyatlarga ega
            </p>
          </motion.div>
          <motion.div className="best__items" variants={itemVariants}>
            <img src="./images/best-imgs-2.png" alt="D-pantenol tarkibi" />
            <p className="best__items-text">
              **D - pantenol**: Tirnoq plastinkasini namlaydi va yumshatadi,
              tirnoq atrofidagi terining ta’sirlanishi va quruqligini bartaraf
              etadi
            </p>
          </motion.div>
          <motion.div className="best__items" variants={itemVariants}>
            <img src="./images/best-imgs-3.png" alt="Mentol tarkibi" />
            <p className="best__items-text">
              **Mentol**: Oyoqlardagi og‘irlik va charchoq hissini yo‘qotadi,
              tinchlantiruvchi ta’sirga ega
            </p>
          </motion.div>
          <motion.div className="best__items" variants={itemVariants}>
            <img
              src="./images/best-imgs-4.png"
              alt="Moychechak ekstrakti tarkibi"
            />
            <p className="best__items-text">
              **Moychechak ekstrakti**: Teri qon aylanishini yaxshilaydi va
              yallig‘lanishga qarshi ta’sirga ega
            </p>
          </motion.div>
          <motion.div className="best__items" variants={itemVariants}>
            <img
              src="./images/best-imgs-5.png"
              alt="Shalfey ekstrakti tarkibi"
            />
            <p className="best__items-text">
              **Shalfey ekstrakti**: Ter bezlariga ta’sir qiladi, terlash
              jarayonini sekinlashtiradi
            </p>
          </motion.div>
          <motion.div className="best__items" variants={itemVariants}>
            <img src="./images/best-imgs-6.png" alt="A vitamini tarkibi" />
            <p className="best__items-text">
              **A vitamini**: Quruqlik belgilari paydo bo‘lishining oldini oladi
            </p>
          </motion.div>
          <motion.div className="best__items" variants={itemVariants}>
            <img src="./images/best-imgs-7.png" alt="E vitamini tarkibi" />
            <p className="best__items-text">
              **E vitamini**: Terining dag‘allashgan joylarini yumshatadi,
              tirnoqlarni oziqlantiradi va tiklaydi
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Best;
