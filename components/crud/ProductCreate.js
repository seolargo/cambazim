import { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie } from '../../actions/auth';

import { createProduct } from '../../actions/product';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';

import il from './il-bolge.json';
import ilce from './il-ilce.json';
import animalCategories from './AnimalCategories.json';
import animals from './Animals.json';
import animalSubCategories from './AnimalSubCategories.json';
import animalVarieties from './AnimalVarieties.json';

import villagesAdana from './villagesAdana.json';
import villagesAdiyaman from './villagesAdiyaman.json';
import villagesAfyonkarahisar from './villagesAfyonkarahisar.json';
import villagesAgri from './villagesAgri.json';
import villagesAksaray from './villagesAksaray.json';
import villagesAmasya from './villagesAmasya.json';
import villagesAnkara from './villagesAnkara.json';
import villagesAntalya from './villagesAntalya.json';
import villagesArdahan from './villagesArdahan.json';
import villagesArtvin from './villagesArtvin.json';
import villagesAydin from './villagesAydin.json';
import villagesBalikesir from './villagesBalikesir.json';
import villagesBartin from './villagesBartin.json';
import villagesBatman from './villagesBatman.json';
import villagesBayburt from './villagesBayburt.json';
import villagesBilecik from './villagesBilecik.json';
import villagesBingol from './villagesBingol.json';
import villagesBitlis from './villagesBitlis.json';
import villagesBolu from './villagesBolu.json';
import villagesBurdur from './villagesBurdur.json';
import villagesBursa from './villagesBursa.json';
import villagesCanakkale from './villagesCanakkale.json';
import villagesCankiri from './villagesCankiri.json';
import villagesCorum from './villagesCorum.json';
import villagesDenizli from './villagesDenizli.json';
import villagesDiyarbakir from './villagesDiyarbakir.json';
import villagesDuzce from './villagesDuzce.json';
import villagesEdirne from './villagesEdirne.json';
import villagesElazig from './villagesElazig.json';
import villagesErzincan from './villagesErzincan.json';
import villagesErzurum from './villagesErzurum.json';
import villagesEskisehir from './villagesEskisehir.json';
import villagesGaziantep from './villagesGaziantep.json';
import villagesGiresun from './villagesGiresun.json';
import villagesGumushane from './villagesGumushane.json';
import villagesHakkari from './villagesHakkari.json';
import villagesHatay from './villagesHatay.json';
import villagesIgdir from './villagesIgdir.json';
import villagesIsparta from './villagesIsparta.json';
import villagesIstanbul from './villagesIstanbul.json';
import villagesIzmir from './villagesIzmir.json';
import villagesKahramanmaras from './villagesKahramanmaras.json';
import villagesKarabuk from './villagesKarabuk.json';
import villagesKaraman from './villagesKaraman.json';
import villagesKars from './villagesKars.json';
import villagesKastamonu from './villagesKastamonu.json';
import villagesKayseri from './villagesKayseri.json';
import villagesKirikkale from './villagesKirikkale.json';
import villagesKirklareli from './villagesKirklareli.json';
import villagesKirsehir from './villagesKirsehir.json';
import villagesKilis from './villagesKilis.json';
import villagesKocaeli from './villagesKocaeli.json';
import villagesKonya from './villagesKonya.json';
import villagesKutahya from './villagesKutahya.json';
import villagesMalatya from './villagesMalatya.json';
import villagesManisa from './villagesManisa.json';
import villagesMardin from './villagesMardin.json';
import villagesMersin from './villagesMersin.json';
import villagesMugla from './villagesMugla.json';
import villagesMus from './villagesMus.json';
import villagesNevsehir from './villagesNevsehir.json';
import villagesNigde from './villagesNigde.json';
import villagesOrdu from './villagesOrdu.json';
import villagesOsmaniye from './villagesOsmaniye.json';
import villagesRize from './villagesRize.json';
import villagesSakarya from './villagesSakarya.json';
import villagesSamsun from './villagesSamsun.json';
import villagesSiirt from './villagesSiirt.json';
import villagesSinop from './villagesSinop.json';
import villagesSivas from './villagesSivas.json';
import villagesSanliurfa from './villagesSanliurfa.json';
import villagesSirnak from './villagesSirnak.json';
import villagesTekirdag from './villagesTekirdag.json';
import villagesTokat from './villagesTokat.json';
import villagesTrabzon from './villagesTrabzon.json';
import villagesTunceli from './villagesTunceli.json';
import villagesUsak from './villagesUsak.json';
import villagesVan from './villagesVan.json';
import villagesYalova from './villagesYalova.json';
import villagesYozgat from './villagesYozgat.json';
import villagesZonguldak from './villagesZonguldak.json';

const CreateProduct = ({ router }) => {
    //product form local storage
    const productFormLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('product')) {
            return JSON.parse(localStorage.getItem('product'));
        } else {
            return false;
        }
    };

    const [image, setImage] = useState({
        preview: '',
        raw: ''
    });
    const [array, setArray] = useState('');

    const [array1, setArray1] = useState('');
    const [array2, setArray2] = useState('');
    const [array3, setArray3] = useState('');
    const [array4, setArray4] = useState('');
    const [array5, setArray5] = useState('');
    const [array6, setArray6] = useState('');

    /**
     ** In the body, we will have values that is stored in the local storage.
     **/
    const [body, setBody] = useState(productFormLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false,

        //Added later
        price: '',
        quantity: '',
        age: '',

        city: '',
        town: '',
        village: '',

        sellerCellphone: '',
        sellerAddress: '',

        sellerType: '',
        estimatedWeight: '',
        animalType: '',
        poultry: '',
        animalSubCategory: '',
        animalVariety: ''
    });

    const {
        error,
        sizeError,
        success,
        formData,
        title,
        price,
        age,
        quantity,

        city,
        town,
        village,

        sellerCellphone,
        sellerAddress,

        animalVariety,
        poultry,
        sellerType,
        animalSubCategory,
        estimatedWeight,
        animalType,
        hidePublishButton
    } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
    }, [router]);

    const publishProduct = (e) => {
        e.preventDefault();
        createProduct(formData, token).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                //If response was successful, we need to clear the fields.
                setValues({
                    ...values,
                    title: '',
                    error: '',
                    price: '',
                    quantity: '',
                    age: '',
                    variety: '',

                    city: '',
                    town: '',
                    village: '',

                    sellerCellphone: '',
                    sellerAddress: '',

                    sellerType: '',
                    estimatedWeight: '',
                    animalcategory: '',
                    animalType: '',
                    poultry: '',
                    animalSubCategory: '',
                    animalVariety: '',
                    success: `"${data.title}" başlıklı yeni ilanınız yayımlandı.`
                });
                setBody('');
            }
        });
    };

    const handleChangeForPhoto1 = (name) => (e) => {
        const value = name === 'photo1' ? e.target.files[0] : e.target.value;
        formData.append(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo1') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(1);
                setArray1(1);
            }
        }
    };

    const handleChangeForPhoto2 = (name) => (e) => {
        const value = name === 'photo2' ? e.target.files[0] : e.target.value;
        formData.append(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo2') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(2);
                setArray2(2);
            }
        }
    };

    const handleChangeForPhoto3 = (name) => (e) => {
        const value = name === 'photo3' ? e.target.files[0] : e.target.value;
        formData.append(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo3') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(3);
                setArray3(3);
            }
        }
    };

    const handleChangeForPhoto4 = (name) => (e) => {
        const value = name === 'photo4' ? e.target.files[0] : e.target.value;
        formData.append(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo4') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(4);
                setArray4(4);
            }
        }
    };

    const handleChangeForPhoto5 = (name) => (e) => {
        const value = name === 'photo5' ? e.target.files[0] : e.target.value;
        formData.append(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo5') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(5);
                setArray5(5);
            }
        }
    };

    const handleChangeForPhoto6 = (name) => (e) => {
        const value = name === 'photo6' ? e.target.files[0] : e.target.value;
        formData.append(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo6') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(6);
                setArray6(6);
            }
        }
    };

    const handleChange = (name) => (e) => {
        const value = e.target.value;
        formData.append(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBody = (e) => {
        setBody(e);
        formData.set('body', e);
        if (typeof window !== 'undefined') {
            //Accessing the local storage.
            localStorage.setItem('product', JSON.stringify(e));
        }
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );

    const createProductForm = () => {
        return (
            <form onSubmit={publishProduct}>
                <div className="form-group">
                    <label className="text-muted">İlan Başlığı</label>
                    <br />
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                    <br />
                    <label className="text-muted">Hayvanın Yaşı</label>
                    <br />
                    <input type="text" className="form-control" value={age} onChange={handleChange('age')} />
                    <br />
                    <label className="text-muted">Kaç Adet Satıyorsunuz (Sadece Sayı Giriniz)</label>
                    <br />
                    <input type="text" className="form-control" value={quantity} onChange={handleChange('quantity')} />
                    <br />
                    <label className="text-muted">Hayvanın Fiyatı (Tekil Fiyat Giriniz)</label>
                    <br />
                    <input type="text" className="form-control" value={price} onChange={handleChange('price')} />
                    <br />
                    <label className="text-muted">Hayvanın Tahmini Kilosu (Tekil Hayvan İçin Giriniz)</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        value={estimatedWeight}
                        onChange={handleChange('estimatedWeight')}
                    />
                    <br />
                    <label className="text-muted">Cep Telefon Numaranız (Herkese Gözükür)</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        value={sellerCellphone}
                        onChange={handleChange('sellerCellphone')}
                    />
                    <br />
                    <label className="text-muted">Açık Adresiniz (Herkese Gözükür)</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        value={sellerAddress}
                        onChange={handleChange('sellerAddress')}
                    />
                    <br />
                    <label className="text-muted">Satış Türü</label>
                    <br />
                    <select onChange={handleChange('sellerType')} className="form-control">
                        <option>Lütfen Seçiniz</option>
                        <option value="Toptan">Toptan</option>
                        <option value="Perakende">Perakende</option>
                    </select>
                    <br />
                    <label className="text-muted">Şehrinizi Seçiniz</label>
                    <br />
                    <select onChange={handleChange('city')} className="form-control">
                        <option>Lütfen Seçiniz</option>
                        {il.map((postDetail, index) => {
                            return (
                                <option key={index} value={postDetail.il}>
                                    {postDetail.il}
                                </option>
                            );
                        })}
                    </select>
                    <br />
                    <label className="text-muted">İlçenizi Seçiniz</label>
                    <br />
                    <select onChange={handleChange('town')} className="form-control">
                        <option>Lütfen Seçiniz</option>
                        {ilce.map((postDetail, index) => {
                            return postDetail.il === city ? (
                                <option key={index} value={postDetail.ilce}>
                                    {postDetail.ilce}
                                </option>
                            ) : (
                                ''
                            );
                        })}
                    </select>
                    <br />
                    <label className="text-muted">Mahallenizi (Köyünüzü) Seçiniz</label>
                    <br />
                    <select onChange={handleChange('village')} className="form-control">
                        <option>Lütfen Seçiniz</option>
                        {city === 'ADANA'
                            ? villagesAdana.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ADIYAMAN'
                            ? villagesAdiyaman.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'AFYONKARAHİSAR'
                            ? villagesAfyonkarahisar.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'AĞRI'
                            ? villagesAgri.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'AKSARAY'
                            ? villagesAksaray.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'AMASYA'
                            ? villagesAmasya.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ANKARA'
                            ? villagesAnkara.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ANTALYA'
                            ? villagesAntalya.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ARDAHAN'
                            ? villagesArdahan.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ARTVİN'
                            ? villagesArtvin.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'AYDIN'
                            ? villagesAydin.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'BALIKESİR'
                            ? villagesBalikesir.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'BARTIN'
                            ? villagesBartin.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'BATMAN'
                            ? villagesBatman.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'BAYBURT'
                            ? villagesBayburt.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'BİLECİK'
                            ? villagesBilecik.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'BİNGÖL'
                            ? villagesBingol.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'BİTLİS'
                            ? villagesBitlis.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'BOLU'
                            ? villagesBolu.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'BURDUR'
                            ? villagesBurdur.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'BURSA'
                            ? villagesBursa.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ÇANAKKALE'
                            ? villagesCanakkale.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ÇANKIRI'
                            ? villagesCankiri.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ÇORUM'
                            ? villagesCorum.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'DENİZLİ'
                            ? villagesDenizli.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'DİYARBAKIR'
                            ? villagesDiyarbakir.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'DÜZCE'
                            ? villagesDuzce.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'EDİRNE'
                            ? villagesEdirne.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ELAZIĞ'
                            ? villagesElazig.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ERZİNCAN'
                            ? villagesErzincan.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ERZURUM'
                            ? villagesErzurum.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ESKİŞEHİR'
                            ? villagesEskisehir.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'GAZİANTEP'
                            ? villagesGaziantep.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'GİRESUN'
                            ? villagesGiresun.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'GÜMÜŞHANE'
                            ? villagesGumushane.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'HAKKARİ'
                            ? villagesHakkari.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'HATAY'
                            ? villagesHatay.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'IĞDIR'
                            ? villagesIgdir.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ISPARTA'
                            ? villagesIsparta.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'İSTANBUL'
                            ? villagesIstanbul.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'İZMİR'
                            ? villagesIzmir.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'KAHRAMANMARAŞ'
                            ? villagesKahramanmaras.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'KARABÜK'
                            ? villagesKarabuk.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'KARAMAN'
                            ? villagesKaraman.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'KARS'
                            ? villagesKars.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'KASTAMONU'
                            ? villagesKastamonu.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'KAYSERİ'
                            ? villagesKayseri.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'KİLİS'
                            ? villagesKilis.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'KIRIKKALE'
                            ? villagesKirikkale.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'KIRKLARELİ'
                            ? villagesKirklareli.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'KIRŞEHİR'
                            ? villagesKirsehir.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'KOCAELİ'
                            ? villagesKocaeli.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'KONYA'
                            ? villagesKonya.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'KÜTAHYA'
                            ? villagesKutahya.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'MALATYA'
                            ? villagesMalatya.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'MANİSA'
                            ? villagesManisa.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'MARDİN'
                            ? villagesMardin.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'MERSİN'
                            ? villagesMersin.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'MUĞLA'
                            ? villagesMugla.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'MUŞ'
                            ? villagesMus.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'NEVŞEHİR'
                            ? villagesNevsehir.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'NİĞDE'
                            ? villagesNigde.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ORDU'
                            ? villagesOrdu.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'OSMANİYE'
                            ? villagesOsmaniye.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'RİZE'
                            ? villagesRize.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'SAKARYA'
                            ? villagesSakarya.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'SAMSUN'
                            ? villagesSamsun.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ŞANLIURFA'
                            ? villagesSanliurfa.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'SİİRT'
                            ? villagesSiirt.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'SİNOP'
                            ? villagesSinop.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ŞIRNAK'
                            ? villagesSirnak.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'SİVAS'
                            ? villagesSivas.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'TEKİRDAĞ'
                            ? villagesTekirdag.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'TOKAT'
                            ? villagesTokat.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'TRABZON'
                            ? villagesTrabzon.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'TUNCELİ'
                            ? villagesTunceli.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'UŞAK'
                            ? villagesUsak.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'VAN'
                            ? villagesVan.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'YALOVA'
                            ? villagesYalova.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'YOZGAT'
                            ? villagesYozgat.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : city === 'ZONGULDAK'
                            ? villagesZonguldak.map((postDetail, index) => {
                                  return postDetail.tname === town ? (
                                      <option key={index} value={postDetail.Mahalle}>
                                          {postDetail.Mahalle}
                                      </option>
                                  ) : (
                                      ''
                                  );
                              })
                            : ''}
                    </select>
                    <br />
                    <label className="text-muted">Hayvanınızın Türünü Seçiniz</label>
                    <br />
                    <select onChange={handleChange('animalType')} className="form-control">
                        <option>Lütfen Seçiniz</option>
                        {animals.map((postDetail, index) => {
                            return (
                                <option key={index} value={postDetail.usttur}>
                                    {postDetail.usttur}
                                </option>
                            );
                        })}
                    </select>
                    <br />
                    <label className="text-muted">Alt Türü Seçiniz</label>
                    <br />
                    <select onChange={handleChange('poultry')} className="form-control">
                        <option>Lütfen Seçiniz</option>
                        {animalCategories.map((postDetail, index) => {
                            return postDetail.usttur === animalType ? (
                                <option key={index} value={postDetail.tur}>
                                    {postDetail.tur}
                                </option>
                            ) : (
                                ''
                            );
                        })}
                    </select>
                    <br />
                    <label className="text-muted">Tipini Seçiniz</label>
                    <br />
                    <select onChange={handleChange('animalSubCategory')} className="form-control">
                        <option>Lütfen Seçiniz</option>
                        {animalSubCategories.map((postDetail, index) => {
                            return postDetail.tur === poultry ? (
                                <option key={index} value={postDetail.subtur}>
                                    {postDetail.subtur}
                                </option>
                            ) : (
                                ''
                            );
                        })}
                    </select>
                    <br />
                    <label className="text-muted">Cinsini Seçiniz</label>
                    <br />
                    <select onChange={handleChange('animalVariety')} className="form-control">
                        <option>Lütfen Seçiniz</option>
                        {animalVarieties.map((postDetail, index) => {
                            return postDetail.tur === poultry ? (
                                <option key={index} value={postDetail.animalVariety}>
                                    {postDetail.animalVariety}
                                </option>
                            ) : (
                                ''
                            );
                        })}
                    </select>
                </div>

                {/* User writes his own notice */}
                <label className="text-muted">İlanınızı Bize Anlatın</label>
                <div className="form-group">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder="İlanınızı girin"
                        onChange={handleBody}
                    />
                </div>
            </form>
        );
    };

    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    {createProductForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>

                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5 style={{ color: 'green' }}>Hayvanlarınızın Resmini Ekleyin</h5>
                            <hr />
                            <p className="text-muted">
                                Her bir resim için maksimum resim boyutu: 1MB (En az bir (zorunlu) en fazla altı resim
                                yükleyebilirsiniz)
                            </p>
                            <br />
                            {(image.preview && array === 1) || array1 === 1 ? (
                                <label className="btn btn-outline-success">
                                    <p id="text-inside-photo-button">Eklediğiniz 1. resmi değiştirin</p>
                                    <input
                                        onChange={handleChangeForPhoto1('photo1')}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            ) : (
                                <label className="btn btn-outline-success">
                                    <p id="text-inside-photo-button">İlk resmi ekleyin</p>
                                    <input
                                        onChange={handleChangeForPhoto1('photo1')}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            )}
                            {/* preview of picture */}
                            {image.preview && array === 1 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>İlk eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxheight="auto" />
                                </React.Fragment>
                            ) : (
                                ''
                            )}
                            <br />
                            <br />
                            {(image.preview && array === 2) || array2 === 2 ? (
                                <label className="btn btn-outline-success">
                                    <p id="text-inside-photo-button">Eklediğiniz 2. resmi değiştirin</p>
                                    <input
                                        onChange={handleChangeForPhoto2('photo2')}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            ) : (
                                <label className="btn btn-outline-success">
                                    <p id="text-inside-photo-button">İkinci resmi ekleyin</p>
                                    <input
                                        onChange={handleChangeForPhoto2('photo2')}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            )}
                            {/* preview of picture */}
                            {image.preview && array === 2 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>İkinci eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxheight="auto" />
                                </React.Fragment>
                            ) : (
                                ''
                            )}
                            <br />
                            <br />
                            {(image.preview && array === 3) || array3 === 3 ? (
                                <label className="btn btn-outline-success">
                                    <p id="text-inside-photo-button">Eklediğiniz 3. resmi değiştirin</p>
                                    <input
                                        onChange={handleChangeForPhoto3('photo3')}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            ) : (
                                <label className="btn btn-outline-success">
                                    <p id="text-inside-photo-button">Üçüncü resmi ekleyin</p>
                                    <input
                                        onChange={handleChangeForPhoto3('photo3')}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            )}
                            {/* preview of picture */}
                            {image.preview && array === 3 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>Üçüncü eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxheight="auto" />
                                </React.Fragment>
                            ) : (
                                ''
                            )}
                            <br />
                            <br />
                            {(image.preview && array === 4) || array4 === 4 ? (
                                <label className="btn btn-outline-success">
                                    <p id="text-inside-photo-button">Eklediğiniz 4. resmi değiştirin</p>
                                    <input
                                        onChange={handleChangeForPhoto4('photo4')}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            ) : (
                                <label className="btn btn-outline-success">
                                    <p id="text-inside-photo-button">Dördüncü resmi ekleyin</p>
                                    <input
                                        onChange={handleChangeForPhoto4('photo4')}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            )}
                            {/* preview of picture */}
                            {image.preview && array === 4 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>Dördüncü eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxheight="auto" />
                                </React.Fragment>
                            ) : (
                                ''
                            )}
                            <br />
                            <br />
                            {(image.preview && array === 5) || array5 === 5 ? (
                                <label className="btn btn-outline-success">
                                    <p id="text-inside-photo-button">Eklediğiniz 5. resmi değiştirin</p>
                                    <input
                                        onChange={handleChangeForPhoto5('photo5')}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            ) : (
                                <label className="btn btn-outline-success">
                                    <p id="text-inside-photo-button">Beşinci resmi ekleyin</p>
                                    <input
                                        onChange={handleChangeForPhoto5('photo5')}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            )}
                            {/* preview of picture */}
                            {image.preview && array === 5 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>Beşinci eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxheight="auto" />
                                </React.Fragment>
                            ) : (
                                ''
                            )}
                            <br />
                            <br />
                            {(image.preview && array === 6) || array6 === 6 ? (
                                <label className="btn btn-outline-success">
                                    <p id="text-inside-photo-button">Eklediğiniz resmi değiştirin</p>
                                    <input
                                        onChange={handleChangeForPhoto6('photo6')}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            ) : (
                                <label className="btn btn-outline-success">
                                    <p id="text-inside-photo-button">Altıncı resmi ekleyin</p>
                                    <input
                                        onChange={handleChangeForPhoto6('photo6')}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            )}
                            {/* preview of picture */}
                            {image.preview && array === 6 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>Altıncı eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxheight="auto" />
                                </React.Fragment>
                            ) : (
                                ''
                            )}
                            <br />
                            <div id="publish-notice-button">
                                <button type="submit" className="btn btn-success mt-5">
                                    İlanı Yayımla
                                </button>
                            </div>
                            <br />
                            <div>
                                Cambazım, hayvanlarınızın çalınma ihtimaline karşı, spesifik konum bilgilerinizi bu
                                platform aracılığıyla paylaşmanızı istememektedir. Müşterileriniz ile görüşürken
                                mesajlaşma programları aracılığıyla kendi konumunuzu paylaşabilirsiniz.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/*
    With withRouter, you will have access to next/router.
*/
export default withRouter(CreateProduct);
