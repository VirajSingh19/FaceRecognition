import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageLink from './Components/ImageLink/ImageLink'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>
        <Logo/>
        <ImageLink/>
        {/*<FaceRecognition/> */}
      </div>
    );
  }
}

export default App;
