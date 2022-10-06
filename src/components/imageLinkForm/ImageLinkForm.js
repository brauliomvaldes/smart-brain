import './ImageLinkForm.css'
const ImageLinkForm = ({onInputChange, onButtonSubmit})=>{
    return (
            <div>
                <p className="f3">
                    {'Esta es Magic Brain que detecta caras en tus fotografias, dale una oportunidad'}
                </p>
                <div className="center">
                    <div className="form center pa4 br3 shadow-5">
                        <input className="w-70 f4 pa2" type='tex' onChange={onInputChange} />
                        <button className="w-30 f4 pa2 dib white bg-light-purple"
                                onClick={onButtonSubmit} >Detectar</button>
                    </div>
                </div>
            </div>
    )
}

export default ImageLinkForm;