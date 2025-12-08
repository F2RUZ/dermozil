"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useAnimation,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import "./swiper.scss";
import OrderForm from "../form/OrderForm";

const videoUrl =
  "https://cdn.shopify.com/videos/c/o/v/b39d139978eb498fa1f52be8261cdfbb.mp4";

const initialCardData = [
  {
    id: 1,
    name: "Dildora - 32 yosh",
    text: "Meni anchadan beri bu muammo qiynab kelar edi. Har xil vositalarni qo‘llab ko‘rdim biroq foyda bermadi... Bir tanishim “Dermozil” keremini taklif qildi. Yana bir bor oyoq zamburug‘idan xalos bo‘lishga urinib ko‘dim. Bir haftadan so‘ng tirnoqlarim avvalgi sog‘lom ko‘rinishiga qaytdi.",
    img1: "./images/sale-cards-1-bottom.png",
    img2: "./images/sale-cards-1-top.png",
  },
  {
    id: 2,
    name: "Sarvar - 28 yosh",
    text: "Zamburug' sababli yozda ochiq poyabzal kiyishga uyalardim. Bu kremni ishlatganimdan so'ng, atigi 10 kun ichida katta natijani ko'rdim. Endi tirnoqlarim toza va sog'lom!",
    img1: "./images/sale-cards-2-bottom.png",
    img2: "./images/sale-cards-2-top.png",
  },
  {
    id: 3,
    name: "Fotima - 45 yosh",
    text: "Uzoq yillar davomida kurashdim. Dermozil boshqa sinab ko'rgan dorilarimdan farq qildi. Ta'siri tez va doimiy bo'ldi. Hammaga tavsiya qilaman.",
    img1: "./images/sale-cards-3-bottom.png",
    img2: "./images/sale-cards-3-top.png",
  },
  {
    id: 4,
    name: "Jasur - 35 yosh",
    text: "Sport bilan shug'ullanganim uchun tez-tez bu muammoga duch kelardim. Bu kremdan foydalanish oson va natijasi darhol seziladi. Endi profilaktika uchun ham qo'llayman.",
    img1: "./images/sale-cards-4-bottom.png",
    img2: "./images/sale-cards-4-top.png",
  },
];

const cardData = [
  ...initialCardData.map((card) => ({ ...card, uniqueId: `c-${card.id}-1` })),
  ...initialCardData.map((card) => ({
    ...card,
    name: card.name.replace(/\d+ yosh/, "30 yosh"),
    uniqueId: `c-${card.id}-2`,
  })),
  ...initialCardData.map((card) => ({
    ...card,
    name: card.name.replace(/\d+ yosh/, "40 yosh"),
    uniqueId: `c-${card.id}-3`,
  })),
];

const Swiper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const containerRef = useRef(null);
  const swiperControls = useAnimation();
  const x = useMotionValue(0);

  const [totalScrollWidth, setTotalScrollWidth] = useState(0);

  const titleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    const calculateWidth = () => {
      if (containerRef.current) {
        const cards = Array.from(containerRef.current.children);
        if (cards.length > 0) {
          const cardCount = initialCardData.length;

          // CSS o'zgaruvchisidan "--card-gap" ni olish
          const gapValue =
            parseFloat(
              getComputedStyle(document.documentElement)
                .getPropertyValue("--card-gap")
                .replace("px", "")
            ) || 120; // Agar topa olmasa default 120px

          // Birinchi elementning haqiqiy kengligi
          const singleCardWidth = cards[0]?.offsetWidth || 571; // .sale__items default kengligi

          // Animatsiya faqat bitta asl to'plamning (4 ta karta) kengligiga aylanadi.
          // totalScrollWidth = (kartalar soni * karta kengligi) + (kartalar soni * gap)
          const widthOfOneSet =
            singleCardWidth * cardCount + gapValue * cardCount;

          setTotalScrollWidth(widthOfOneSet);
        }
      }
    };

    calculateWidth();
    const timeoutId = setTimeout(calculateWidth, 100);

    window.addEventListener("resize", calculateWidth);

    return () => {
      window.removeEventListener("resize", calculateWidth);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (totalScrollWidth === 0) return;

    const startAnimation = async () => {
      await swiperControls.start({
        x: -totalScrollWidth,
        transition: {
          x: {
            duration: 30,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        },
      });
    };

    startAnimation();

    return () => {
      swiperControls.stop();
      x.set(0);
    };
  }, [totalScrollWidth, swiperControls, x]);

  return (
    <section className={`sale contain ${isModalOpen ? "modal-open" : ""}`}>
      <motion.h2
        className="what-brings__title"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        Ariza qoldiring va <span className="sale__span">50% chegirmaga</span>{" "}
        ega bo‘ling va tirnoqlaringizdagi zamburug‘dan butunlay xalos bo‘ling
      </motion.h2>

      <motion.div
        className="intro__form "
        initial={{ y: 20, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, delay: 0.2 },
        }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.button
          type="button"
          className="intro__button"
          onClick={openModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Buyurtma berish
        </motion.button>
        <p className="intro__bottom-form-text">50% chegirma</p>
      </motion.div>

      <div className="sale__swiper-wrapper">
        <motion.div
          className="sale__cards"
          ref={containerRef}
          animate={swiperControls}
          style={{ x }}
          initial={{ x: 0, opacity: 1 }} // Opacityni 1 qoldirdik
          whileInView={{ opacity: 1 }} // Animatsiya ishlayotganda yo'qolmasligi uchun
          viewport={{ once: false, amount: 0.05 }}
        >
          {cardData.map((card) => (
            <motion.div key={card.uniqueId} className="sale__items">
              {/* Har bir item ichida bitta rasm turadi */}
              <img
                src="/comment.svg"
                alt="Foydalanuvchi fikri fon rasmi"
                className="sale__item-image" // Yangi klass qo'shildi
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="sale__video-container"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        style={{
          maxWidth: "1500px",
          margin: "0 auto 40px auto",
          width: "100%",
        }}
      >
        <video
          src={videoUrl}
          controls
          playsInline
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            maxHeight: "500px",
            objectFit: "cover",
            borderRadius: "20px",
          }}
        >
          Browseringiz video tagini qo'llab-quvvatlamaydi.
        </video>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>

              <OrderForm onCloseModal={closeModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Swiper;
