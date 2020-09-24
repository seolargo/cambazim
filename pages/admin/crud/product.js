import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import ProductCreate from '../../../components/crud/ProductCreate';

const Product = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        
                        <div className="col-md-12 pt-5 pb-5 ml-3">
                            <h2 style={{color: 'green'}}>Yeni bir ilan oluştur</h2>
                        </div>
                        
                        <div className="col-md-12">
                            <ProductCreate />
                        </div>

                    </div>
                </div>
            </Admin>
        </Layout>
    );
};


export default Product;