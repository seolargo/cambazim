import Link from 'next/link';
import {useState, useEffect} from 'react';
import {getCookie, isAuth} from '../../actions/auth';
import {list, removeProduct} from '../../actions/product';

import moment from 'moment';

const ProductRead = ({username}) => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadProducts()
    }, []);

    const loadProducts = () => {
        list(username).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const deleteProduct = (slug) => {
        removeProduct(slug, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadProducts(); 
            }
        });
    };

    const deleteConfirm = (slug) => {
        let answer = window.confirm('Bu ilanı silmek istediğinize emin misiniz?');
        if (answer) {
            deleteProduct(slug);
        }
    }

    const showUpdateButton = (product) => {
        //If they are regular user... (isAuth().role === 1)
        //console.log('Authentication identity: ', isAuth());
        //console.log('Authentication Role: ', isAuth().role);
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/${product.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning">İlanı Değiştir</a>
                </Link>
            );
        } else if(isAuth() && isAuth().role === 1) {
            //If the user is admin... (isAuth().role === 1)
            //CRUD: Create-Read-Update-Delete
            return (
                <Link href={`/admin/crud/${product.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning">İlanı Değiştir</a>
                </Link>
            );
        }
    };

    const showAllProducts = () => {
        return products.map((product, i) => {
            return (
                <div key={i} className="pb-5">
                    <h3>{product.title}</h3>
                    
                    <p className="mark">
                        İlanın yayımlanma tarihi: {moment(product.createdAt, "YYYY-MM-DDThh-mm-ssZ").format('DD/MM/YYYY')}
                        <br />
                        Hayvanın Türü: {product.animalType}-{product.poultry}-{product.animalSubCategories}-{product.animalVariety}
                        <br />
                        Fiyatı (Tekil Fiyat): {product.price}₺
                        <br />
                        Satış Adedi: {product.quantity}
                        <br />
                        Hayvanın Yaşı: {product.age}
                        <br />
                        Hayvanın Tahmini Kilosu: {product.estimatedWeight} kg
                        <br />
                        Konum: {product.city} - {product.town} - {product.village}
                        <br />
                        Açık Adres: {product.sellerAddress}
                        <br />
                        Üretici Cep Tel No: {product.sellerCellphone}
                        <br />
                        Lat: {product.lat}
                        <br />
                        Lng: {product.lng}
                    </p>
                    
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(product.slug)}>
                        İlanı Sil
                    </button>
                    
                    {showUpdateButton(product)}
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    {message && 
                        <div className="alert alert-warning">
                            {message}
                        </div>
                    }
                    {showAllProducts()}
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProductRead;