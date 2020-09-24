import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import Link from 'next/link';

const AdminIndex = () => {
    return (
    <Layout>
        <Admin>
            <div className="container-fluid">
                <div className="row">
                    
                    <div className="col-md-12 pt-5 pb-5 ml-5">
                        <h2 style={{color: 'green'}}>Admin Panel</h2>
                        <hr/>
                    </div>

                        <ul className="list-group ml-5">
                            
                            <li className="list-group-item">
                                <Link href="/admin/crud/category-tag">
                                    <a>Tür - Alt-tür Kategorisi Aç</a>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <a href="/admin/crud/product">Yeni İlan Oluştur (Admin)</a>
                            </li>

                            <li className="list-group-item">
                                <Link href="/admin/crud/products">
                                    <a>İlanları Değiştir/Sil</a>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <a href="/admin/crud/blog">
                                    Yeni Blog Oluştur
                                </a>
                            </li>

                            <li className="list-group-item">
                                <Link href="/admin/crud/blogs">
                                    <a>Blogları Sil</a>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link href="/user/update">
                                    <a>Profilinizi Güncelleyin</a>
                                </Link>
                            </li>
                            
                        </ul>
                </div>
            </div>
        </Admin>
    </Layout>
    );
};


export default AdminIndex;