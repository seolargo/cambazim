import Link from 'next/link';
import {useState, useEffect} from 'react';
import Router from 'next/router';
import {getCookie, isAuth} from '../../actions/auth';
import {list, removeBlog} from '../../actions/blog';
import moment from 'moment';

const BlogRead = ({username}) => {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadBlogs()
    }, []);

    const loadBlogs = () => {
        list(username).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setBlogs(data);
            }
        });
    };

    const deleteBlog = (slug) => {
        removeBlog(slug, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadBlogs(); 
            }
        });
    };

    const deleteConfirm = (slug) => {
        let answer = window.confirm('Bu blog yazısını silmek istediğinize emin misiniz?');
        if (answer) {
            deleteBlog(slug);
        }
    }

    /*const showUpdateButton = (blog) => {
        //If they are regular user... (isAuth().role === 1)
        //console.log('Authentication identity: ', isAuth());
        //console.log('Authentication Role: ', isAuth().role);
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/${blog.slug}`}>
                    <a className="ml-2 btn btn-sm btn-success">Blogu Değiştir</a>
                </Link>
            );
        } else if(isAuth() && isAuth().role === 1) {
            //If the user is admin... (isAuth().role === 1)
            //CRUD: Create-Read-Update-Delete
            return (
                <Link href={`/admin/crud/${blog.slug}`}>
                    <a className="ml-2 btn btn-sm btn-success">Blogu Değiştir</a>
                </Link>
            );
        }
    };*/

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div key={i} className="pb-5">
                    <h3>{blog.title}</h3>
                    <p className="mark">
                        {blog.postedBy.name}'in blog yazısı
                    </p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(blog.slug)}>
                        Blogu Sil
                    </button>
                    {/*showUpdateButton(blog)*/}
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    {message && 
                        <div className="alert alert-success">
                            {message}
                        </div>
                    }
                    {showAllBlogs()}
                </div>
            </div>
        </React.Fragment>
    );
}

export default BlogRead;
