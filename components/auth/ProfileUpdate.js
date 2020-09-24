import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { API } from '../../config';

const ProfileUpdate = () => {
    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        about: '',
        password: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: '',
        cellphone: '',
        homeAddress: ''
    });

    const token = getCookie('token');
    const { 
        username, 
        name, 
        email, 
        about, 
        password, 
        cellphone, 
        homeAddress, 
        error, 
        success, 
        loading, 
        photo, 
        userData 
    } = values;

    const [image, setImage] = useState({ 
        preview: "", raw: ""
    });
    const [array, setArray] = useState('');

    const init = () => {
        getProfile(token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    username: data.username,
                    name: data.name,
                    email: data.email,
                    about: data.about,
                    cellphone: data.cellphone,
                    homeAddress: data.homeAddress
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        let userFormData = new FormData();
        userFormData.set(name, value);
        setValues({ ...values, [name]: value, userData: userFormData, error: false, success: false });

        if(name === 'photo') {
            if (e.target.files.length) {
                setImage({
                  preview: URL.createObjectURL(e.target.files[0]),
                  raw: e.target.files[0]
                });
                setArray(1);
            }
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true });
        update(token, userData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false, loading: false });
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        username: data.username,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        cellphone: data.cellphone,
                        homeAddress: data.homeAddress,
                        password: '',
                        success: true,
                        loading: false
                    });
                });
            }
        });
    };

    const profileUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-success">
                    Profil fotoğrafı ekleyin / Profil fotoğrafınızı değiştirin
                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Kullanıcı Adınız</label>
                <input onChange={handleChange('username')} type="text" value={username} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">İsminiz ve Soyisminiz</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">E-postanız</label>
                <input onChange={handleChange('email')} type="text" value={email} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Kendinizi ve Yaptığınız İşi Tanıtın</label>
                <textarea onChange={handleChange('about')} type="text" value={about} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Şifrenizi Değiştirebilirsiniz (Yeni şifrenizi girin)</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Cep Telefon Numaranız</label>
                <input onChange={handleChange('cellphone')} type="text" value={cellphone} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Ev Adresiniz</label>
                <input onChange={handleChange('homeAddress')} type="text" value={homeAddress} className="form-control" />
            </div>
            <div>
                <button type="submit" className="btn btn-success">
                    Gönder
                </button>
            </div>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            Profiliniz güncellendi
        </div>
    );

    const showLoading = () => (
        <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
            Yükleniyor...
        </div>
    );

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <br />
                        <p style={{color: 'green'}} className="ml-6">Profil Resminiz</p>
                        <br />
                        {
                            image.preview && array === 1 ? 
                            (
                            <img 
                                src={image.preview} 
                                alt="dummy" 
                                width="300" 
                                maxHeight="auto" 
                            /> 
                            )    
                            :
                            <img
                                src={`${API}/user/photo/${username}`}
                                className="img img-fluid img-thumbnail mb-3"
                                style={{ maxHeight: 'auto', maxWidth: '100%' }}
                            />
                        }
                    </div>
                    <div className="col-md-8 mb-5">
                        {showSuccess()}
                        {showError()}
                        {showLoading()}
                        {profileUpdateForm()}
                    </div>
                </div>
            </div>  
        </React.Fragment>
    );
};

export default ProfileUpdate;