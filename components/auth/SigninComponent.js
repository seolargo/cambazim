import {useState, useEffect} from 'react';
import {signin, authenticate, isAuth} from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';

import Recaptcha from 'react-recaptcha';

const SigninComponent = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true,
    });

    const {email, password, error, loading, message, showForm} = values;

    useEffect(() => {
        isAuth() && Router.push(`/`); //If we can get the authenticated user...    
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.table({name, email, password, error, loading, message, showForm});
        setValues({...values, loading: true, error: false});
        const user = {email, password} 

        signin(user).then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false});
            } else {
                //Save user token to cookie
                //Save user info to local storage
                //Authenticate user
                authenticate(data, () => {
                    //If it is the user admin...
                    if(isAuth() && isAuth().role === 1) {
                        Router.push(`/admin`);
                    } else {
                        Router.push(`/user`);
                    }
                })
            }
        })
    };

    const handleChange = name => (e) => {
        setValues({...values, error: false, [name]: e.target.value});
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Yükleniyor...</div> : '');
    const showError = () => (error ? <div className="alert alert-info">{error}...</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}...</div> : '');

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group" id="email-input">
                    <input
                        value={email}  
                        onChange={handleChange('email')} 
                        type="email" 
                        className="form-control" 
                        placeholder="E-posta adresinizi girin"
                    />
                </div>

                <div className="form-group" id="password-input">
                    <input 
                        value={password} 
                        onChange={handleChange('password')} 
                        type="password" 
                        className="form-control" 
                        placeholder="Şifrenizi girin"
                    />
                </div>
                <p id="password-explanation">Şifreniz en az 6 haneliydi ve içinde en az 1 adet rakam vardı ;)</p>
                <br/>
                <div>
                    <button className="btn btn-success" id="giris-yap-button">Giriş Yap</button>
                </div>
            </form>
        );
    }
    
    return  ( 
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
            <br />
            <LoginGoogle />
            <br />
            {/*<Facebook />*/}
            <br />
            <div id="forgot-password">
                <Link href="/auth/password/forgot">
                    Şifremi Unuttum
                </Link>
            </div>
            <br/>
            <br/>
            <br/>
        </React.Fragment>
    );
}

export default SigninComponent;