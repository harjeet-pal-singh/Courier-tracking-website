// src/components/HeroSection.jsx
import React from 'react';
import './components.css'; // Optional custom styles

import HeroCarousel from './HeroCarousel';
import OurServices from './OurServices';
import TrackForm from './TrackForm';

function HeroSection() {
  return (
    <>
    <div className='heroSection'><section style={{ marginTop: 'px' }}>
     <div id='home'> <HeroCarousel></HeroCarousel></div>
    </section>
    <div id='services'><OurServices></OurServices></div></div></>
  );
};

export default HeroSection;
