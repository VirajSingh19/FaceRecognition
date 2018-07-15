import React from 'react';
import './I.css';
const ImageLink = ({oninputchange,onsubmit}) => {
    return(
      <div>
        <p>
            {'This magic brain will detect face in the pictures. Give it a shot!'}
        </p>
        <div className='center'>
            <div className='i center pa3 br4 shadow-5'>
                <input style={{width:'500px'}} className ="i f4 br3 pa2 w-70 center grow dim" placeholder="insert image url" type='text' onChange={oninputchange} />
                <button className="i w-30 br3 grow  dim f4 link ph3 pv2" onClick={onsubmit}>Detect</button>
            </div>
       </div>
      </div>
      );
}

export default ImageLink;