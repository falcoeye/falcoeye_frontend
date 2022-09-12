// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import MediaVideo from './MediaVideo/MediaVideo';
import { useRef } from 'react';
import { Fragment } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import Chip from '../../../../../Components/UI/Chip/Chip';

const MediaCarousel = (props) => {
    const { files, id } = props;
    const swiper = useRef();
    const [prevDisabled, setPrevDisabled] = useState(true) 
    const [nextDisabled, setNextDisabled] = useState(false) 

    const prevClickHandler = ( ) => {
        swiper.current.slidePrev()
        setPrevDisabled(swiper?.current?.isBeginning)
        setNextDisabled(swiper?.current?.isEnd)
    }
    const nextClickHandler = ( ) => {
        swiper.current.slideNext()
        setPrevDisabled(swiper?.current?.isBeginning)
        setNextDisabled(swiper?.current?.isEnd)
    }
    
    const firstClickHandler = () => {
        swiper.current.slideTo(0)
        setPrevDisabled(swiper?.current?.isBeginning)
        setNextDisabled(swiper?.current?.isEnd)
    }
    const middleClickHandler = () => {
        swiper.current.slideTo(Math.floor((files.length - 1) / 2))
        setPrevDisabled(swiper?.current?.isBeginning)
        setNextDisabled(swiper?.current?.isEnd)
    }
    const lastClickHandler = () => {
        swiper.current.slideTo(files.length)
        setPrevDisabled(swiper?.current?.isBeginning)
        setNextDisabled(swiper?.current?.isEnd)
    }

    let content = files.map((file, index) => {
        return (
            <SwiperSlide key={index}>
                <MediaVideo file={file} id={id} />
            </SwiperSlide>
        );
    });

    return (
        <Fragment>
            <div className="flex justify-between mb-3 gap-3">
                <button disabled={prevDisabled} className="shrink-0 bg-lime-500 hover:bg-lime-600 text-white  transition duration-300 font-bold p-2 rounded-full inline-flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={prevClickHandler} >
                    <FaChevronLeft />
                </button>
                <div className='grow hidden md:flex gap-3 justify-center' >
                    <Chip small active={prevDisabled} clickHandler={firstClickHandler} >first</Chip>
                    <Chip small active={Math.floor((files.length - 1) / 2) === swiper?.current?.activeIndex} clickHandler={middleClickHandler} >middle</Chip>
                    <Chip small active={nextDisabled}  clickHandler={lastClickHandler} >last</Chip>
                </div>
                <button disabled={nextDisabled} className="shrink-0 bg-lime-500 hover:bg-lime-600 text-white  transition duration-300 font-bold p-2 rounded-full inline-flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={nextClickHandler} >
                    <FaChevronRight />
                </button>
            </div>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                onSwiper={(s) => {
                    swiper.current = s;
                }}
            >
                {content}
            </Swiper>
        </Fragment>
    );
};
export default MediaCarousel;
