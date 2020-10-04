import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories, create } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';

const CreateBlog = ({ router }) => {
    //Blog form local storage.
    const blogFormLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        } else {
            return false;
        }
    };

    const [categories, setCategories] = useState([]); //
    const [tags, setTags] = useState([]); //

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags

    /*
        In the body, we will have values that is stored in the local storage.
    */
    const [body, setBody] = useState(blogFormLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    });

    const { error, sizeError, success, formData, title, hidePublishButton } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initCategories();
        initTags();
    }, [router]);

    /*
        With this way we can see our categories and tags are in the state.
    */
    const initCategories = () => {
        getCategories().then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const initTags = () => {
        getTags().then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTags(data);
            }
        });
    };

    const publishBlog = (e) => {
        e.preventDefault();
        //console.log('ready to publishBlog');
        createBlog(formData, token).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                //If response was successful, we need to clear the fields.
                setValues({
                    ...values,
                    title: '',
                    error: '',
                    success: `"${data.title}" başlıklı yeni ilanınız yayımlandı.`
                });
                setBody('');
                setCategories([]);
                setTags([]);
            }
        });
    };

    const handleChange = (name) => (e) => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        //const val2 = name === 'photo' ? e.target.files[1]  : e.target.value;
        /*let value=[];
        if(name==='photo') {
            let i=0;
            while(e.target.files[i]!==null) {
                value[i] = e.target.files[i];
                i++;
            }
        } else {
            value = e.target.value;
        }*/
        //formData.set(name, value);
        formData.append(name, value);
        //formData.append(name, val2);
        //setValues({...values, [name]: value, formData, error: ''});
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBody = (e) => {
        setBody(e);
        formData.set('body', e);
        if (typeof window !== 'undefined') {
            //Accessing the local storage.
            localStorage.setItem('blog', JSON.stringify(e));
        }
    };

    /*
        If this category id does not already exist in the state,
        that means we can push to 'all' variable.

        {params}: c: category id.

        We returned another function here.
    */
    const handleToggle = (c) => () => {
        setValues({ ...values, error: '' });
        //return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1); //we will take it.
        }
        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    };

    const handleTagsToggle = (t) => () => {
        setValues({ ...values, error: '' });
        //return the first index or -1
        const clickedTag = checkedTag.indexOf(t);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            //If it was not found
            all.push(t);
        } else {
            //If it was found
            all.splice(clickedTag, 1); //Splice the one item out. We will take it.
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all);
    };

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        );
    };

    const showTags = () => {
        return (
            tags &&
            tags.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleTagsToggle(t._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );

    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="text-muted">Blog Başlığı</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>

                <div className="form-group">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder="Blog içeriğini girin"
                        onChange={handleBody}
                    />
                </div>
            </form>
        );
    };

    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    {createBlogForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>

                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5 style={{ color: 'green' }}>Resim Ekleyin</h5>
                            <hr />

                            <small className="text-muted">Maksimum boyut: 1MB</small>
                            <br />
                            <label className="btn btn-outline-success">
                                Resim Ekleyin
                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h5 style={{ color: 'green' }}>Hayvan Kategorileri</h5>
                        <hr />
                        <ul style={{ maxHeight: '100px', overflowY: 'scroll' }}>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5 style={{ color: 'green' }}>Alt-tür Kategoriler</h5>
                        <hr />
                        <ul style={{ maxHeight: '100px', overflowY: 'scroll' }}>{showTags()}</ul>
                    </div>
                </div>

                <div>
                    <button type="submit" className="btn btn-success mt-5">
                        Blogu Yayımla
                    </button>
                </div>
            </div>
        </div>
    );
};

/*
    With withRouter, you will have access to next/router.
*/
export default withRouter(CreateBlog);
