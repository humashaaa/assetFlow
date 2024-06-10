import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import img1 from '../../assets/Blue and Orange Modern Hiring Team Poster (2).png'
import img2 from '../../assets/Blue and Orange Modern Hiring Team Poster (3).png'
import { Link } from 'react-router-dom';
const Slidder = () => {
    return (
       <div className='w-full h-[40rem]' >
         <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper "
      >
        <SwiperSlide>
            <div className='relative'>
            <img className='h-[40rem] w-full' src={img1} alt="" />
            <div className=' absolute top-60 left-32 text-white '>
                <h1 className='text-4xl font-bold mb-5' >Join as Employee</h1>
                <Link to='' className="btn rounded-2xl  p-3  border-b-2 border-b-blue-700 hover:bg-blue-400">view details</Link>
            </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='relative'>
            <img className='h-[40rem] w-full' src={img2} alt="" />
            <div className=' absolute top-60 left-32 text-white '>
                <h1 className='text-4xl font-bold mb-5' >Join as HR Manager</h1>
                <Link to='' className="btn rounded-2xl  p-3  border-b-2 border-b-blue-700 hover:bg-blue-400">view details</Link>
            </div>
            </div>
        </SwiperSlide>
        
        
      </Swiper>
       </div>
    );
};

export default Slidder;