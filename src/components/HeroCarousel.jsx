import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './components.css'; // Optional for custom styling
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import TrackForm from './TrackForm';
const HeroCarousel = () => {
  return (
    <><div className="hero-carousel">
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        <div>

          <img src={slide1} alt="Fast Delivery" />
          <p className="legend">Fast & Secure Courier Services</p>
        </div>
        <div>
          <img src={slide2} alt="Tracking" />
          <p className="legend">Real-Time Tracking & Updates</p>
        </div>
        <div>
          <img src={slide3} alt="Global Reach" />
          <p className="legend">Affordable & Global Reach</p>
        </div>
      </Carousel>

    </div><div className="wrapper">
        <div className="hero-text-anim">
          <h2>SINGH COURIER SERVICE</h2>
          <p>Track your package in real time with Singh Courier Service.</p>
        </div>
        <div className='herowrapper'>

          <TrackForm />
        </div></div></>
  );
};

export default HeroCarousel;
