import { useState } from 'react';
import Link from 'next/link';
import { emailContactForm } from '../../actions/form';

import Recaptcha from 'react-recaptcha';

const ContactForm = ({ authorEmail }) => {
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

    const { message, name, email, sent, buttonText, success, error } = values;

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Gönderiliyor...' });
        //console.log(authorEmail);
        //console.log(JSON.stringify(authorEmail));

        emailContactForm({ authorEmail, name, email, message }).then((data) => {
            console.log('data: ', JSON.stringify(data));
            //console.log('data-parse: ', JSON.parse(data));
            if (data.error) {
                setValues({ ...values, error: data.error });
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
    };

    const handleChange = (name) => (e) => {
        setValues({ ...values, [name]: e.target.value, error: false, success: false, buttonText: 'Gönder' });
    };

    const showSuccessMessage = () =>
        success && <div className="alert alert-info">Bizimle iletişime geçtiğiniz için teşekkür ederiz.</div>;

    const showErrorMessage = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

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
            });
        }
    };

    const contactForm = () => {
        return (
            <form onSubmit={clickSubmit} className="pb-5">
                <div className="form-group">
                    <label className="lead">Mesajınız</label>
                    <textarea
                        onChange={handleChange('message')}
                        type="text"
                        className="form-control"
                        value={message}
                        required
                        rows="10"
                    ></textarea>
                    <p>Mesajınız en az 5 karakter uzunluğunda olmalıdır.</p>
                </div>

                <div className="form-group">
                    <label className="lead">İsminiz ve Soyisminiz</label>
                    <input type="text" onChange={handleChange('name')} className="form-control" value={name} required />
                </div>

                <div className="form-group">
                    <label className="lead">E-posta adresiniz</label>
                    <input
                        type="email"
                        onChange={handleChange('email')}
                        className="form-control"
                        value={email}
                        required
                    />
                    <p>
                        E-postanızı lütfen doğru giriniz. E-postanız onaylanmadığı takdirde mesajınız karşı tarafa
                        iletilmez.
                    </p>
                </div>
                <br />
                <button className="btn btn-success">{buttonText}</button>
            </form>
        );
    };

    return (
        <React.Fragment>
            {showSuccessMessage()}
            {showErrorMessage()}
            {contactForm()}
        </React.Fragment>
    );
};

export default ContactForm;
