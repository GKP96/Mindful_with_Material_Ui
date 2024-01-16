import React from 'react';
import Imagesrc from '../../assets/images/loading-gif.gif';

export default function LoaderImage() {
  return (
    <div className='flex justify-center items-center h-screen' >
      <img
        src={Imagesrc}
        alt="Loading GIF"
      />
    </div>
  );
}
