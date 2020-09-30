import Layout from '../components/Layout';
import CartComponent from '../components/auth/CartComponent';

const cart = () => {
    return (
        <Layout>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <CartComponent />
                </div>
            </div>
        </Layout>
    );
};

export default cart;
