import React, { Component } from 'react';
import './App.css';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
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
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) =>{
    this.setState({user: {
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
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
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
        
        }
      
      
      this.displayfacebox(this.calculateFaceLocation(response))
      })
    .catch(err => console.log(err))
  }


  onRouteChange = (route) =>{
    this.setState({route:route});
  }
  
  render() {
    return (
      <div className="App">
       <Particles className="p" params={praticleoptions}/>
       { (this.state.route==='home')
         ? 
         <div>
        <Navigation onRouteChange={this.onRouteChange}/>
        <Logo/>
        <Rank name = {this.state.user} entries = {this.state.user.entries} />
        <ImageLink oninputchange={this.oninputchange} onsubmit ={this.onsubmit}/>
        <FaceRecognition box ={this.state.box} imageurl={this.state.imageurl}/>
          </div>
        : (
          this.state.route==='signin'
            ?<Signin onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
       }
       </div>
    );
  }
}

export default App;
