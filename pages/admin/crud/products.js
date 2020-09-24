import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import ProductRead from '../../../components/crud/ProductRead';
import Link from 'next/link';

const Product = () => {
    return (
        <Layout>
            <Admin>
                <div className="container">
                    <div className="row">
                        
                        <div className="col-md-12 pt-5 pb-5">
                            <h2 style={{color: 'green'}}>İlanları Değiştir/Sil</h2>
                            <hr />
                        </div>

                        <div className="col-md-12">
                            <ProductRead />
                        </div>
                    
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};


export default Product;