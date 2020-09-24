import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const SmallCard = ({ product }) => {
    return (
        <div className="card">
            <section>
                <Link href={`/products/${product.slug}`}>
                    <a>
                        <img
                            className="img img-fluid"
                            style={{ maxHeight: 'auto', width: '100%' }}
                            src={`${API}/product/photo/${product.slug}`}
                            alt={product.title}
                        />
                    </a>
                </Link>
            </section>

            <div className="card-body">
                <section>
                    <Link href={`/products/${product.slug}`}>
                        <a>
                            <h5 className="card-title">{product.title}</h5>
                        </a>
                    </Link>
                    <div className="card-text">{renderHTML(product.excerpt)}</div>
                </section>
            </div>

            <div className="card-body">
                Posted {moment(product.updatedAt).fromNow()} by{' '}
                <Link href={`/profile/${product.postedBy.username}`}>
                    <a>{product.postedBy.username}</a>
                </Link>
            </div>
        </div>
    );
};

export default SmallCard;
