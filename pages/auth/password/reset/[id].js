import {useState, useEffect} from 'react'
import Layout from '../../../../components/Layout'
import {withRouter} from 'next/router'
import {resetPassword} from '../../../../actions/auth'

const ResetPassword = ({router}) => {
    const [values, setValues] = useState({
        name: '',
        newPassword: '',
        error: '',
        message: '',
        showForm: true
    }) 

    const {showForm, name, newPassword, error, message} = values

    const handleSubmit = e => {
        e.preventDefault()
        resetPassword({
            newPassword,
            resetPasswordLink: router.query.id
        }).then(data => {
            if (data.error) {
                setValues({...values, error: data.error, showForm: false, newPassword: ''})
            } else {
                setValues({...values, message: data.message, showForm: false, newPassword: '', error: false})
            }
        })
    }

    const passwordResetForm = () => (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group pt-5">
                    <input 
                        type="password" 
                        onChange={e => setValues({...values, newPassword: e.target.value})} 
                        className="form-control" 
                        value={newPassword} 
                        placeholder="Yeni şifrenizi girin" 
                        required
                    />
                </div>
                <div>
                    <p>
                        Şifreniz en az 6 karakter uzunluğunda olmalı ve içinde en az bir sayı barındırmalıdır.
                    </p>
                </div>
                <div>
                    <button className="btn btn-success">
                        Şifremi değiştir
                    </button>
                </div>
                <br />
                <br />
                <br />
            </form>
        </div>
    );
    
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : '');
    
    return (
        <Layout>
            <div className="container-fluid">
                <div style={{marginLeft: "270px"}}>
                    <h2 style={{color: 'green'}}>Şifreni Değiştir</h2>
                </div>
                <hr />
                <div>
                    {showMessage()}
                    {showError()}
                    {passwordResetForm()}
                </div>
            </div>
        </Layout>
    );
};

export default withRouter(ResetPassword);