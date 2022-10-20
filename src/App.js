import { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import SignIn from './components/signin/SignIn';
import Register from './components/registro/Register';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import ParticlesBg from 'particles-bg'
import './App.css';

 const initState = {
  input : '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user : {
    id : '',
    name : '',
    email : '',
    entries : 0,
    joined : ''
  }
 }

class App extends Component {
  constructor(){
    super();
    this.state = initState;
  }
  
  loadUser = (data)=>{
    this.setState( {user : { 
          id : data.id,
          name : data.name,
          email : data.email,
          entries : data.entries,
          joined : data.joined
        }
      }
    )
  }


  // hook del ciclo de via de la app una vez montada la app
  /*
  // prueba conexion con el servidor
  componentDidMount(){
    fetch('http://localhost:3000')
    .then(response => response.json())
    .then(console.log);
  }
*/

calculateFaceLocation = (data) => {
  //console.log('frontend data:'+data)
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  //console.log("ancho:", width, "alto:",height)
  //console.log("leftCol:", clarifaiFace.left_col * width);
  //console.log("topRow: ",clarifaiFace.top_row * height);
  //console.log("rightCol: ",width - (clarifaiFace.right_col * width));
  //console.log("bottomRow:", height - (clarifaiFace.bottom_row * height));
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box)=>{
  this.setState({box: box})
}

onInputChange=(event)=>{
  this.setState({input: event.target.value});
}
// FACE_DETECT_MODEL
onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://app-smartbrain-clarifai.herokuapp.com/imagenurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response=>response.json())
    .then(response => {
      if (response) {
        this.displayFaceBox(this.calculateFaceLocation(response));
        fetch('https://app-smartbrain-clarifai.herokuapp.com/imagen', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            //console.log('entredas front devueltas:', count, 'tipo:', typeof(count))
            this.setState(Object.assign(this.state.user, { entries: parseInt(count.entries)}))
          })
          .catch(console.log())
      }
    }
    )
    .catch(err => console.log(err));
}

  onRouteChange = (route)=>{
    if(route === 'signout'){
      this.setState(initState)
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }   

  render(){
    // desectructuramos para evitar usar this.state
    const { isSignedIn, imageUrl, box, route } = this.state;
    return (
      <div className="App">
        <ParticlesBg className="particles" type="random" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <div>
              <Logo />
              <Rank name={ this.state.user.name} entries={this.state.user.entries } />
              <ImageLinkForm 
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
              route === 'signin'
              ? <SignIn loadUser={ this.loadUser } onRouteChange={this.onRouteChange}/>
              : <Register loadUser={ this.loadUser } onRouteChange={this.onRouteChange}/>
            )
        }
      </div> 
    );
  }
} 

export default App;
