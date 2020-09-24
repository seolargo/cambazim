import {useState, useEffect}  from 'react';
import {signup, isAuth, preSignup} from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';

import Recaptcha from 'react-recaptcha';

const SignupComponent = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true,
        terms: false
    });

    const {name, email, password, error, loading, message, showForm, terms} = values;

    useEffect(() => {
        isAuth() && Router.push(`/`); //If we can get the authenticated user...    
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.table({name, email, password, error, loading, message, showForm});
        setValues({...values, loading: true, error: false});
        const user = {name, email, password} 

        preSignup(user).then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false});
            } else {
                setValues({
                    ...values, 
                    name: '', 
                    email: '', 
                    password: '', 
                    error: '', 
                    loading: false, 
                    message: data.message,
                    showForm: false,
                    terms: false
                });
            }
        })
    };

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

    const handleChange = name => (e) => {
        setValues({...values, error: false, [name]: e.target.value});
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Yükleniyor...</div> : '');
    const showError = () => (error ? <div className="alert alert-info">{error}...</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}...</div> : '');

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        value={name} 
                        onChange={handleChange('name')} 
                        type="text" 
                        className="form-control" 
                        placeholder="İsminizi girin"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={email}  
                        onChange={handleChange('email')} 
                        type="email" 
                        className="form-control" 
                        placeholder="E-posta adresinizi girin"
                    />
                </div>

                <div className="form-group">
                    <input 
                        value={password} 
                        onChange={handleChange('password')} 
                        type="password" 
                        className="form-control" 
                        placeholder="Şifrenizi girin"
                    />
                </div>
                <p>Şifreniz en az 6 haneli olmalı ve içinde en az 1 adet rakam olmalı.</p>
                <div className="form-group">
                    <label htmlFor="terms">Bu siteye kayıt olarak <a href="http://www.cambazim.com/uyeliksozlesmesi">üyelik sözleşmesini</a>, <a href="http://www.cambazim.com/kvkk">KVKK'yı</a>, <a href="http://www.cambazim.com/cerezpolitikasi">çerez politikamızı</a> ve <a href="http://www.cambazim.com/ilanreklamvermesozlesmesi">ilan-reklam verme sözleşmesini</a> kabul etmiş olursunuz.</label>
                </div>

                <div>
                    <button className="btn btn-success">Kayıt Ol</button>
                </div>
            </form>
        );
    }
    
    return  ( 
        <React.Fragment>   
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
            <br />
            <Link href="/auth/password/forgot">
                Şifremi unuttum
            </Link>
            <br/>
            <br/>
            <br/>
        </React.Fragment>
    );
}

export default SignupComponent;


