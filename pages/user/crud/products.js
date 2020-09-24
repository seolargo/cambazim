import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import ProductRead from '../../../components/crud/ProductRead';
import Link from 'next/link';
import {isAuth} from '../../../actions/auth';

const Product = () => {
    const username=isAuth() && isAuth().username;
    
    return (
        <Layout>
            <Private>
                <div className="container">
                    <div className="row">
                        
                        <div className="col-md-12 pt-5 pb-5">
                            <h2 style={{color: 'green'}}>İlanlarını Değiştir/Sil</h2>
                            <hr />
                        </div>

                        <div className="col-md-12">
                            <ProductRead username={username}/>
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default Product;