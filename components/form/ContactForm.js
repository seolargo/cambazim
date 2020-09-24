import {useState} from 'react'
import Link from 'next/link'
import {emailContactForm} from '../../actions/form'

import Recaptcha from 'react-recaptcha';

const ContactForm = ({authorEmail}) => {
    const [values, setValues] = useState({
        message: '',
        name: '',
        email: '',
        sent: false,
        buttonText: 'Gönder',
        success: false,
        error: false,
        isVerified: false
    });

    const {message, name, email, sent, buttonText, success, error} = values;

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, buttonText: 'Gönderiliyor...'});
        emailContactForm({authorEmail, name, email, message})
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error})
                } else {
                    setValues({
                        ...values, 
                        sent: true, 
                        name: '', 
                        email: '', 
                        message: '', 
                        buttonText: 'Gönder', 
                        success: data.success
                    });
                }
            });
    }

    const handleChange = name => e => {
        setValues({...values, [name]: e.target.value, error: false, success: false, buttonText: 'Gönder'});
    };

    const showSuccessMessage = () => success && (<div className="alert alert-info">
        Bizimle iletişime geçtiğiniz için teşekkür ederiz. Sistem uzmanlarımız tarafından en yakın zamanda sizinle iletişime geçilecektir.
    </div>)

    const showErrorMessage = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    // specifying your onload callback function
    var callback = function () {
        console.log('Done!!!!');
    };
    
    // specifying verify callback function
    var verifyCallback = function (response) {
        console.log(response);
        if (response) {
            setValues({
                ...values,
                isVerified: true
            })
        }
    };

    const contactForm = () => {
        return (
            <form onSubmit={clickSubmit} className="pb-5">
                <div className="form-group">
                    <label className="lead">
                        Mesajınız
                    </label>
                    <textarea 
                        onChange={handleChange('message')} 
                        type="text" 
                        className="form-control" 
                        value={message} 
                        required 
                        rows="10"
                    ></textarea>
                    <p>
                        Mesajınız en az 5 karakter uzunluğunda olmalıdır.
                    </p>
                </div>

                <div className="form-group">
                    <label className="lead">
                        İsminiz ve Soyisminiz
                    </label>
                    <input 
                        type="text" 
                        onChange={handleChange('name')} 
                        className="form-control" 
                        value={name} 
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="lead">
                        E-posta adresiniz
                    </label>
                    <input 
                        type="email" 
                        onChange={handleChange('email')} 
                        className="form-control" 
                        value={email} 
                        required
                    />
                    <p>
                        E-postanızı lütfen doğru giriniz. E-postanız onaylanmadığı takdirde mesajınız karşı tarafa iletilmez.
                    </p>
                </div>
                <br />
                <Recaptcha 
                    sitekey="6LfwGc0ZAAAAAB0yZ5jT1kQbe88-OWz8SBk0SiCz"
                    render="explicit"
                    verifyCallback={verifyCallback}
                    onloadCallback={callback}
                />
                <br />
                <p>Recaptcha'yı onayladığınızda buton gösterilecektir.</p>
                {values.isVerified ? <button className="btn btn-success">{buttonText}</button> : ''}
            </form>
        );
    }

    return (
        <React.Fragment>
            <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
            {showSuccessMessage()}
            {showErrorMessage()}
            {contactForm()}
        </React.Fragment>
    );
}

export default ContactForm;