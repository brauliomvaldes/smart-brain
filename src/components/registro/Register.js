import { Component } from "react";

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            name : ''
        }
    }
    onNameChange = (event)=>{
        this.setState({ name : event.target.value });
    }
    onEmailChange = (event)=>{
        this.setState({ email : event.target.value });
    }
    onPasswordChange = (event)=>{
        this.setState({ password : event.target.value });
    }

    onSubmitRegisterIn = () => {
        fetch('https://app-smartbrain-clarifai.herokuapp.com/register', {
                method  : 'post',
                headers : {"content-type" : "application/json"},
                body    : JSON.stringify({
                    email : this.state.email,
                    password : this.state.password,
                    name : this.state.name
                })
            })
        .then(response=>response.json())
        .then(user=>{
            if(user){
                this.props.loadUser(user);
                this.props.onRouteChange('signin');
            }else{
                console.log("No fue exitoso");
            }
        })
    }

    render(){
        // se recibe funcion para rutas de vistas
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Registrarse</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Nombre</label>
                            <input 
                                onChange={ this.onNameChange }
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                onChange={ this.onEmailChange }
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email-address" 
                                name="email-address"  
                                id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                onChange={ this.onPasswordChange }
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                            onClick={ this.onSubmitRegisterIn }
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Registrarse"
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;