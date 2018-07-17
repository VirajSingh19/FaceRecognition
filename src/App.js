import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageLink from './Components/ImageLink/ImageLink'
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
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
      imageurl:'',
    }
  }

  oninputchange = (event) =>{
    this.setState({input:event.target.value});
  }

  onsubmit = ()=>{
    console.log("clicked");
    this.setState({imageurl:this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        console.log(err);
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
        <FaceRecognition imageurl={this.state.imageurl}/>
      </div>
    );
  }
}

export default App;
