import React from "react";
import dynamic from "next/dynamic";
import "../styles/fonts.css";

import Header from "@/components/header/Header";
import Brings from "@/components/bring/Brings";
import Effect from "@/components/effect-symp/Effect";
import Best from "@/components/best/Best";
import Faq from "@/components/faq/Faq";
import Swiper from "@/components/swiper/Swiper";

const Page = () => {
  return (
    <div>
      <Header />
      <Brings />
      <Effect />
      <Best />
      <Swiper />
      <Faq />
    </div>
  );
};

export default Page;
