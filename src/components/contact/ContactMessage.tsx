import './contact-style.css'

export default function ContactMessage() {
    return (
        <div className='inter-text form-container'>
            <h3 className='garet-title text-white'> O escríbeme directamente</h3>
            <p className='inter-text text-white'>Cuéntame brevemente qué tienes en mente y te responderé lo antes posible.</p>
            <form className='contact-form'>
                <label className='contact-form-label'>
                    Email:
                    <input className='contact-form-input' type="email" name="email" id='cf-email' placeholder='¿Cómo te llamas?' required/>
                </label>
                <label className='contact-form-label'>
                    Nombre:
                    <input className='contact-form-input' type="text" name="nombre" id='cf-nombre' placeholder='¿Dónde puedo responderte?' required/>
                </label>
                <label className='contact-form-label'>
                    Asunto:
                    <input className='contact-form-input' type="text" name="asunto" id='cf-asunto' placeholder='¿Sobre qué quieres hablar?' required/>
                </label>
                <label className='contact-form-label'>
                    Mensaje:
                    <textarea className='contact-form-textarea' name="mensaje" id='cf-mensaje' placeholder='Cuéntame un poco más...' required/>
                </label>
                <label className='contact-form-label hidden' style={{padding: '0'}}>
                    <textarea className='contact-form-textarea hidden' name="thePit" id='cf-thePit'/>
                </label>
                <div className='d-flex gap-4' style={{paddingLeft: '2em'}}>
                    <button type='submit' className='btn btn-primary '>
                        Enviar
                    </button>
                    <button type='reset' className='btn btn-primary '>
                        Reset
                    </button>
                </div>
            </form>
        </div>
    )
}