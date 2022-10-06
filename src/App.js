import './App.css';
import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import ParticlesBg from 'particles-bg'
import Clarifai from 'clarifai';
import { Component } from 'react';


//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: '50a9296f9a264cdea019ba77f569182d'
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
      input : ''
    }
  }
  
  onInputChange=(evento)=>{
    console.log(evento.target.value)
  }

  onButtonSubmit=()=>{
    console.log("click")

    app.models
      .predict(
    // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
    // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
    // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
    // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
    // is to use a different version of their model that works like the ones found here: https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
    // so you would change from:
    // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    // to:
    // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        console.log('hi', response)
      })
      .catch(err => console.log(err));
  }


  render(){
    return (
      <div className="App">
        <ParticlesBg className="particles" type="random" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
            />
        <FaceRecognition />
      </div>
    );
  }
}

export default App;
