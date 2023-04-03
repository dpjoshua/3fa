import React, { useState } from 'react';

import image1 from './Images/image1.jpg';

import image2 from './Images/image2.jpg';
import image3 from './Images/image3.jpg';
import image4 from './Images/image4.jpg';
import image5 from './Images/image5.jpg';
import image6 from './Images/image6.jpg';
import image7 from './Images/image7.jpg';
import image8 from './Images/image8.jpg';
import image9 from './Images/image9.jpg';



function ImageSelector() {
  const [selectedImage, setSelectedImage] = useState(null);

  function handleImageClick(image) {
    setSelectedImage(image);
  }

  const images = [
    { src: image1, alt: 'Image 1' },
    { src: image2, alt: 'Image 2' },
    { src: image3, alt: 'Image 3' },
    { src: image4, alt: 'Image 4' },
    { src: image5, alt: 'Image 5' },
    { src: image6, alt: 'Image 6' },
    { src: image7, alt: 'Image 7' },
    { src: image8, alt: 'Image 8' },
    { src: image9, alt: 'Image 9' },
  ];

  return (
    <div>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          onClick={() => handleImageClick(image)}
          style={{ border: selectedImage === image ? '2px solid red' : 'none' }}
        />
      ))}
      <p>Selected Image: {selectedImage ? selectedImage.alt : 'None'}</p>
    </div>
  );
}

export default ImageSelector;
