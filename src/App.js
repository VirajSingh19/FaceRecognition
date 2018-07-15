import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageLink from './Components/ImageLink/ImageLink'
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
// const Clarifai = require('clarifai');
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: 'e43127196a6e4dd897b46f624c0e6d06'
 });
 

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

    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
      function(response) {
        // do something with response
        console.log(response);
      },
      function(err) {
        // there was an error
      }
    );
  
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
