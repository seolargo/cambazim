import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link';

const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5 pl-5">
                            <h2 style={{color: 'green'}}>Senin Sayfan</h2>
                            <hr/>
                        </div>
                        <div className="col-md-4 pl-5">
                            <ul className="list-group">

                                <li className="list-group-item">
                                    <a href="/user/crud/product" style={{color: 'green'}}>Yeni İlan Oluştur</a>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/user/crud/products">
                                        <a style={{color: 'green'}}>İlanlarını Değiştir/Sil</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <a href="/user/update" style={{color: 'green'}}>Profilini Güncelle</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
            </Private>
        </Layout>
    );
};


export default UserIndex;