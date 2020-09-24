import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import ProductCreate from '../../../components/crud/ProductCreate';

const CreateProduct = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        
                        <div className="col-md-12 pt-5 pb-5 ml-3">
                            <h2 style={{color: 'green'}}>Yeni İlan Oluştur</h2>
                        </div>
                        
                        <div className="col-md-12">
                            <ProductCreate />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};


export default CreateProduct;