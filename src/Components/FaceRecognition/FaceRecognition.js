import React from 'react';
import './FR.css'
const FaceRecognition = ({imageurl ,box}) => {
    return(
      <div className='center ma'>
        <div className='absolute mt2' >
          <img id='inputimage' alt='' src={imageurl} width='500px' height='auto'/>  
          <div className='bounding-box' style = {{top:box.toprow, right: box.rightcol , bottom:box.bottomrow , left:box.leftcol }}></div>
        </div>  
      </div>
      );
}

export default FaceRecognition;