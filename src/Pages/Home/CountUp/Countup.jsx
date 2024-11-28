import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import './countup.css'
const Countup = () => {
    const [counterOn, setCounterOn] = useState(false)
    return (
        <div className="counter mx-auto bg-fixed">

           <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(false)}>
           <div className="flex justify-around items-center text-white gap-48">
                <div className="flex gap-3">
                    <h1 className="text-3xl font-bold">
                        {counterOn && <CountUp start={0} end={20} duration={2} delay={0}/>} +
                        <p className="text-2xl font-bold">Company's First Choice</p>
                    </h1>
                </div>
                <div className="flex gap-3">
                    <h1 className="text-3xl font-bold">
                        {counterOn && <CountUp start={0} end={96} duration={2} delay={0}/>} %
                        <p className="text-2xl font-bold">Happy Clients</p>
                    </h1>
                </div>
                <div className="flex gap-3">
                    <h1 className="text-3xl font-bold">
                        {counterOn && <CountUp start={0} end={7} duration={2} delay={0}/>} +
                        <p className="text-2xl font-bold">Years Experience</p>
                    </h1>
                </div>
            </div>
           </ScrollTrigger>
    
        </div>
    );
};

export default Countup;