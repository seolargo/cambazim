import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import ProductUpdate from '../../../components/crud/ProductUpdate';
import Link from 'next/link';

const Blog = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5" style={{marginLeft: '15px'}}>
                            <h2 style={{color: 'green'}}>İlanınızı Güncelleyin</h2>
                        </div>
                        <div className="col-md-12">
                            <ProductUpdate />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};


export default Blog;