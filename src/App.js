import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageLink from './Components/ImageLink/ImageLink'
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';

const praticleoptions = {
  particles: {
    number :{
      value:190,
      density:{
        enable:true,
        value_area:800
      }
    }
    
  }
}



class App extends Component {
  constructor()
  {
    super();
    this.state={
      input:'',
    }
  }

  oninputchange = (event) =>{
    console.log(event.target.value);
  }
  onsubmit = ()=>{
    console.log("clicked");
  }
  
  render() {
    return (
      <div className="App">
       <Particles className="p"
              params={praticleoptions}
            />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLink oninputchange={this.oninputchange} onsubmit ={this.onsubmit}/>
        {/*<FaceRecognition/> */}
      </div>
    );
  }
}

export default App;
