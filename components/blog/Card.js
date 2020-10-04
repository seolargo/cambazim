import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const Card = ({ blog }) => {
    const showBlogCategories = (blog) =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-success mr-1 ml-1">{c.name}</a>
            </Link>
        ));

    const showBlogTags = (blog) =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-success mr-1 ml-1">{t.name}</a>
            </Link>
        ));

    return (
        <div className="lead pb-4">
            <header>
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <h2 className="font-weight-bold" style={{ color: 'green' }} id="blogs-list">
                            {blog.title}
                        </h2>
                    </a>
                </Link>
            </header>

            <section>
                <p className="mark" id="blogs-list">
                    <Link href={`/profile/${blog.postedBy.username}`}>
                        <a style={{ color: 'green' }}>{blog.postedBy.username}</a>
                    </Link>{' '}
                    yazdı
                </p>
            </section>

            <section id="blogs-list">
                {showBlogCategories(blog)}
                {showBlogTags(blog)}
                <br />
                <br />
            </section>

            <div className="row">
                <div className="col-md-4">
                    <section id="blogs-list">
                        <img
                            className="img img-fluid"
                            id="pictureBlog"
                            style={{ maxHeight: 'auto', maxWidth: '60%' }}
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                        />
                    </section>
                </div>

                <div className="col-md-8" id="blogs-list">
                    <section>
                        <div className="pb-3" id="blogs-list-excerpt">
                            {renderHTML(blog.excerpt)}
                        </div>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className="btn btn-success pt-2" id="blogs-list-button">
                                Haberin Detayı İçin Tıklayın
                            </a>
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Card;
