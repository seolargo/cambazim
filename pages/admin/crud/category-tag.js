import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Category from '../../../components/crud/Category';
import Tag from '../../../components/crud/Tag';

const CategoryTag = () => {
    return (
    <Layout>
        <Admin>
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-12 pt-5 pb-5 ml-3">
                        <h2 style={{color: 'green'}}>Hayvan Kategorisi ve Alt Türler</h2>
                    </div>
                    
                    <div className="col-md-8 ml-3">
                        <Category />
                    </div>
                    
                    <div className="col-md-8 ml-3">
                    <br />
                    <br />
                        <Tag />
                    </div>

                </div>
            </div>
        </Admin>
    </Layout>
    );
};


export default CategoryTag;