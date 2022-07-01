import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Button from '../Button'

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


import { Autoplay, Navigation } from "swiper";
const SwiperSlider = props => {
    
    return (
        <>
            <Swiper 
             
                navigation={true} 
                centeredSlides={true}
                modules={[Autoplay,Navigation]}
                loop
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                className="mySwiper">


                {
                    props.data.map((item, index) => (
                        <SwiperSlide key={index} className = "">
                            <div className="swiper-slide__item__info">
                                <div className="swiper-slide__item__info__subtitle">
                                    <span>{item.subtitle}</span>
                                </div>
                                <div className="swiper-slide__item__info__title">
                                    <span>{item.title}</span>
                                </div>
                                <div className="swiper-slide__item__info__btn">
                                    <Button>
                                        Shop Now
                                    </Button>
                                </div>
                            </div>
                            <div className="swiper-slide__item__image">
                                <img src={item.img} alt="" />

                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
}
export default SwiperSlider