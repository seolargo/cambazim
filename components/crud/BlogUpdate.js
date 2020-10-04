import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';

import { getCookie, isAuth } from '../../actions/auth';
import { getCategories, create } from '../../actions/category';
import { getTags } from '../../actions/tag';

import { singleBlog, updateBlog } from '../../actions/blog';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import { API } from '../../config';

const BlogUpdate = ({ router }) => {
    const [body, setBody] = useState('');

    const [categories, setCategories] = useState([]); //
    const [tags, setTags] = useState([]); //

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags

    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: '',
        title: '',
        body: ''
    });

    const { error, success, formData, title } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initBlog();
        //This will make request to backend to load this blog.
        initCategories();
        initTags();
    }, [router]);

    const initBlog = () => {
        if (router.query.slug) {
            singleBlog(router.query.slug).then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, title: data.title });
                    setBody(data.body);
                    setCategoriesArray(data.categories);
                    setTagsArray(data.tags);
                }
            });
        }
    };

    const setCategoriesArray = (blogCategories) => {
        let ca = [];
        blogCategories.map((c, i) => {
            ca.push(c._id);
        });
        setChecked(ca);
    };

    const setTagsArray = (blogTags) => {
        let ta = [];
        blogTags.map((t, i) => {
            ta.push(t._id);
        });
        setCheckedTag(ta);
    };

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
        console.log(clickedCategory);
        const all = [...checked];
        console.log(all);
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

    const findOutCategory = (c) => {
        //We are looping all those categories.
        //We are using this method to find out.
        //If they are found in there...
        const result = checked.indexOf(c); // unfound: -1 OR found: true
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const findOutTag = (t) => {
        //We are looping all those categories.
        //We are using this method to find out.
        //If they are found in there...
        const result = checkedTag.indexOf(t); // unfound: -1 OR found: true
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input
                        onChange={handleToggle(c._id)}
                        checked={findOutCategory(c._id)}
                        type="checkbox"
                        className="mr-2"
                    />
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
                    <input
                        onChange={handleTagsToggle(t._id)}
                        checked={findOutTag(t._id)}
                        type="checkbox"
                        className="mr-2"
                    />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };

    const handleChange = (name) => (e) => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBody = (e) => {
        setBody(e);
        formData.set('body', e);
    };

    const editBlog = (e) => {
        e.preventDefault(); //So that browser does not reload.
        updateBlog(formData, token, router.query.slug).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    title: '',
                    success: `"${data.title}" isimli blog yazınız başarıyla güncellendi.`
                });
                //Let's redirect.
                if (isAuth() && isAuth().role === 1) {
                    //Router.replace(`/admin/crud/${router.query.slug}`);
                    Router.replace(`/admin`);
                }
            }
        });
    };

    const showError = () => {
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>;
    };

    const showSuccess = () => {
        <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>;
    };

    const updateBlogForm = () => {
        return (
            <form onSubmit={editBlog}>
                <div className="form-group">
                    <label className="text-muted">Blog başlığı</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>
                <div className="form-group">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder="Buraya bir blog yazısı girin"
                        onChange={handleBody}
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-success">
                        Güncelle
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    {updateBlogForm()}
                    <div className="pt-3">
                        {showSuccess()}
                        {showError()}
                    </div>

                    <div className="row ml-2">
                        <h5 style={{ color: 'green' }}>Eklediğiniz Resim</h5>
                    </div>

                    {body && (
                        <img src={`${API}/blog/photo/${router.query.slug}`} alt={title} style={{ width: '30%' }} />
                    )}
                </div>

                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5 style={{ color: 'green' }}>Resimler</h5>
                            <hr />
                            <small className="text-muted">Maksimum Resim Boyutu: 1MB </small>
                            <div></div>
                            <label className="btn btn-outline-success">
                                Resim Ekleyin
                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden multiple />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h5 style={{ color: 'green' }}>Hayvan Kategorileri</h5>
                        <hr />
                        <ul style={{ maxHeight: '100px', overflowY: 'scroll' }}>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5 style={{ color: 'green' }}>Alt Kategoriler</h5>
                        <hr />
                        <ul style={{ maxHeight: '100px', overflowY: 'scroll' }}>{showTags()}</ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(BlogUpdate);
