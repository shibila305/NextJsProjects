"use client"
import React, { useState } from 'react';


const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };




  return (
    <div className="Container">

      <div style={{ position: 'relative', width: '80%', margin: 'auto' }}>
      <button onClick={prevImage} style={{ position: 'absolute', top: '40%', left: '5px' , background: 'transparent' , border: 'none' ,color:'white' }}>
        {'<'}
      </button>
      <img className="img"
        src={images[currentIndex]}
        style={{ width: '100%', borderRadius: '8px' }}
      />
      <button onClick={nextImage} style={{ position: 'absolute', top: '40%', right: '10px', border:'none', background:'transparent', color:'white' }}>
        {'>'}
      </button>
    </div>

    </div>
    
  );
};

const App = () => {
  const images = [
    "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
  
  return (
    <div>
      <h1>Image Carousel</h1>
      <Carousel images={images} />
    </div>
  );
};

export default App;