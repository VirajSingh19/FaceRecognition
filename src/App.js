import React, { Component } from 'react';
import './App.css';
import Signin from './Components/Signin/Signin';
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
      box:{},
      route:'signin',
    }
  }

  oninputchange = (event) =>{
    this.setState({input:event.target.value});
  }

  calculateFaceLocation = (data)=>{
      const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return{
        leftcol : clarifaiFace.left_col * width,
        toprow : clarifaiFace.top_row * height,
        rightcol: width - (clarifaiFace.right_col * width),
        bottomrow : height - (clarifaiFace.bottom_row * height), 
      }
  }

  displayfacebox = (box) =>{
    console.log(box);
    this.setState({box:box});
  } 



  onsubmit = ()=>{
    console.log("clicked");
    this.setState({imageurl:this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayfacebox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
  }


  onRouteChange = (route) =>{
    this.setState({route:route});
  }
  
  render() {
    return (
      <div className="App">
       <Particles className="p" params={praticleoptions}/>
       { (this.state.route==='signin')
         ? <Signin  onRouteChange={this.onRouteChange}/>
        :<div>
        <Navigation onRouteChange={this.onRouteChange}/>
        <Logo/>
        <Rank/>
        <ImageLink oninputchange={this.oninputchange} onsubmit ={this.onsubmit}/>
        <FaceRecognition box ={this.state.box} imageurl={this.state.imageurl}/>
      </div>
       }
       </div>
    );
  }
}

export default App;
