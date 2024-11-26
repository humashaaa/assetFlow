import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { 
  Autoplay,
   Pagination, Navigation } from 'swiper/modules';
import "./homeSlider.css"

import { Link } from 'react-router-dom';
const Slidder = () => {
    return (
       <div className='w-full h-[40rem]' >
         <Swiper
        // spaceBetween={30}
        // centeredSlides={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[
          Autoplay, 
          Pagination, Navigation]}
        className="mySwiper "
      >
        <SwiperSlide>
            <div className='slider1 mx-auto '>
            <div className=' text-center w-2/4 text-white '>
                <h1 className='text-4xl font-bold mb-5' >Join Us and Innovate Asset Management</h1>
                <p>At AssetFlow, we're seeking passionate individuals to help transform how businesses manage their assets. Be part of a forward-thinking team where your ideas and skills can drive impactful change. Ready to make a difference?</p>

                <Link  to='/employee' className="inline-flex items-center w-full px-5 py-3 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-blue-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700">
                Join as Employee
    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</Link>



               
            </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='slider2 mx-auto'>

            <div className=' text-center w-2/4 text-white '>
                <h1 className='text-4xl font-bold mb-5' >Join Us and Innovate Asset Management</h1>
                <p>At AssetFlow, we're seeking passionate individuals to help transform how businesses manage their assets. Be part of a forward-thinking team where your ideas and skills can drive impactful change. Ready to make a difference?</p>

                <Link  to='/HRmanager' className="inline-flex items-center w-full px-5 py-3 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-blue-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700">
                Join as HR Manger
    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</Link>



               
            </div>




            {/* <div className=' text-white '>
                <h1 className='text-4xl font-bold mb-5' >Join as HR Manager</h1>
                <Link  className="btn rounded-2xl  p-3  border-b-2 border-b-blue-700 hover:bg-blue-400">view details</Link>
            </div> */}
            </div>
        </SwiperSlide>
        
        
      </Swiper>
       </div>
    );
};

export default Slidder;