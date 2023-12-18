"use client";

import styles from "./ProductSlider.module.css";
// import productList from "../../utils/products";
import ProductContainer from "../ProductContainer/ProductContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

interface IProductSlider {
  title: string;
}

const defaultResolutionBreakpoints = {
  0: {
    slidesPerView: 1,
  },
  460: {
    slidesPerView: 1,
  },
  768: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 3,
  },
  1280: {
    slidesPerView: 4,
  },
  1536: {
    slidesPerView: 5,
  },
};

export default function ProductSlider({ title }: IProductSlider) {
  return (
    <div className={styles.product_slider}>
      {title && <h2 className={styles.product_slider_title}>{title}</h2>}
      <Swiper
        slidesPerView={3}
        spaceBetween={60}
        modules={[Navigation]}
        navigation={true}
        // watchOverflow={true}
        className={styles.product_slider_slider}
        breakpoints={defaultResolutionBreakpoints}
      >
        {/* {productList.map((product) => {
          return (
            <SwiperSlide>
              <ProductContainer
                name={product.name}
                price={product.price}
                description={product.description}
                imageUrl={product.imageUrl}
                isBestseller={product.isBestseller}
                isNew={product.isNew}
                category={product.category}
                currency={product.currency}
              />
            </SwiperSlide>
          );
        })} */}
      </Swiper>
    </div>
  );
}
