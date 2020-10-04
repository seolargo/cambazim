import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';

import { singleProduct, updateProduct } from '../../actions/product';

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

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import { API } from '../../config';

const ProductUpdate = ({ router }) => {
    const [body, setBody] = useState('');

    const [values, setValues] = useState({
        title: '',
        error: '',

        sizeError: '',

        success: '',
        formData: '',
        body: '',

        price: '',
        quantity: '',
        age: '',
        city: '',
        town: '',
        village: '',
        sellerType: '',
        estimatedWeight: '',
        animalType: '',
        poultry: '',
        animalSubCategory: '',
        animalVariety: ''
    });

    const {
        error,
        success,
        formData,
        title,
        price,
        quantity,
        age,

        city,
        town,
        village,

        sellerType,
        estimatedWeight,
        animalType,
        poultry,
        animalSubCategory,
        animalVariety
    } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initProduct();
    }, [router]);

    const [image, setImage] = useState({
        preview: '',
        raw: ''
    });
    const [array, setArray] = useState('');

    const initProduct = () => {
        if (router.query.slug) {
            singleProduct(router.query.slug).then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({
                        ...values,
                        title: data.title,
                        age: data.age,
                        quantity: data.quantity,
                        city: data.city,
                        town: data.town,
                        price: data.price,
                        sellerType: data.sellerType,
                        estimatedWeight: data.estimatedWeight,
                        animalType: data.animalType,
                        poultry: data.poultry,
                        animalSubCategory: data.animalSubCategory,
                        animalVariety: data.animalVariety,
                        village: data.village
                    });
                    setBody(data.body);
                }
            });
        }
    };

    const handleChangeForPhoto1 = (name) => (e) => {
        const value = name === 'photo1' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo1') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(1);
            }
        }
    };

    const handleChangeForPhoto2 = (name) => (e) => {
        const value = name === 'photo2' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo2') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(2);
            }
        }
    };

    const handleChangeForPhoto3 = (name) => (e) => {
        const value = name === 'photo3' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo3') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(3);
            }
        }
    };

    const handleChangeForPhoto4 = (name) => (e) => {
        const value = name === 'photo4' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo4') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(4);
            }
        }
    };

    const handleChangeForPhoto5 = (name) => (e) => {
        const value = name === 'photo5' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo5') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(5);
            }
        }
    };

    const handleChangeForPhoto6 = (name) => (e) => {
        const value = name === 'photo6' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo6') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(6);
            }
        }
    };

    const handleChange = (name) => (e) => {
        // console.log(e.target.value);
        var value;

        value = name === 'photo1' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo1') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(1);
            }
        }

        value = name === 'photo2' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo2') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(2);
            }
        }

        value = name === 'photo3' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo3') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(3);
            }
        }

        value = name === 'photo4' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo4') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(4);
            }
        }

        value = name === 'photo5' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo5') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(5);
            }
        }

        value = name === 'photo6' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });

        if (name === 'photo6') {
            if (e.target.files.length) {
                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                setArray(6);
            }
        }
    };

    const handleBody = (e) => {
        setBody(e);
        formData.set('body', e);
    };

    const editProduct = (e) => {
        e.preventDefault(); //So that browser does not reload.
        updateProduct(formData, token, router.query.slug).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    title: '',
                    price: '',
                    quantity: '',
                    age: '',
                    city: '',
                    town: '',
                    village: '',
                    sellerType: '',
                    estimatedWeight: '',
                    animalType: '',
                    poultry: '',
                    animalSubCategories: '',
                    animalVariety: '',
                    success: `"${data.title}" başlıklı ilanınız güncellendi`
                });
                //Let's redirect.
                if (isAuth() && isAuth().role === 1) {
                    //Router.replace(`/admin/crud/${router.query.slug}`);
                    Router.replace(`/admin`);
                } else if (isAuth() && isAuth().role === 0) {
                    //Router.replace(`/user/crud/${router.query.slug}`);
                    Router.replace(`/user`);
                }
            }
        });
    };

    const showError = () => {
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>;
    };

    const showSuccess = () => {
        <div className="alert alert-danger" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>;
    };

    const updateProductForm = () => {
        return (
            <form onSubmit={editProduct}>
                <div className="form-group">
                    <label className="text-muted">İlan Başlığı</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                    <br />
                    <label className="text-muted">Hayvanın Yaşı</label>
                    <input type="text" className="form-control" value={age} onChange={handleChange('age')} />
                    <br />
                    <label className="text-muted">Kaç Adet Satıyorsunuz (Sadece Sayı Giriniz)</label>
                    <input type="text" className="form-control" value={quantity} onChange={handleChange('quantity')} />
                    <br />
                    <label className="text-muted">Hayvanın Fiyatı (Tekil Fiyat Giriniz)</label>
                    <input type="text" className="form-control" value={price} onChange={handleChange('price')} />
                    <br />
                    <label className="text-muted">Hayvanın Tahmini Kilosu (Tekil Hayvan İçin Giriniz)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={estimatedWeight}
                        onChange={handleChange('estimatedWeight')}
                    />
                    <br />
                    <label className="text-muted">Satış Türü</label>
                    <select onChange={handleChange('sellerType')} className="form-control">
                        <option>Lütfen Seçiniz</option>
                        <option value="Toptan">Toptan</option>
                        <option value="Perakende">Perakende</option>
                    </select>
                    <br />
                    <label className="text-muted">Şehrinizi Seçiniz</label>
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
                <label className="text-muted">İlanın İçeriği</label>
                <div className="form-group">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder="Type something amazing"
                        onChange={handleBody}
                    />
                </div>

                <div>
                    <button type="submit" className="btn btn-success">
                        Güncelle
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    {updateProductForm()}
                    <div className="pt-3">
                        {showSuccess()}
                        {showError()}
                    </div>
                </div>

                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5 style={{ color: 'green' }}>Hayvanlarınızın Resmini Ekleyin/Değiştirin</h5>
                            <hr />
                            <p className="text-muted">
                                Her bir resim için maksimum resim boyutu: 1MB <br />
                                (En az bir (zorunlu) en fazla altı resim yükleyebilirsiniz)
                            </p>
                            <br />
                            <label className="btn btn-outline-success">
                                İlk resmi ekleyin
                                <input onChange={handleChangeForPhoto1('photo1')} type="file" accept="image/*" hidden />
                            </label>
                            {/* preview of file */}
                            {image.preview && array === 1 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>İlk eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxHeight="auto" />
                                </React.Fragment>
                            ) : (
                                ''
                            )}
                            <br />
                            <br />
                            <label className="btn btn-outline-success">
                                İkinci resmi ekleyin
                                <input onChange={handleChangeForPhoto2('photo2')} type="file" accept="image/*" hidden />
                            </label>
                            {/* preview of file */}
                            {image.preview && array === 2 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>İkinci eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxHeight="auto" />
                                </React.Fragment>
                            ) : (
                                ''
                            )}
                            <br />
                            <br />
                            <label className="btn btn-outline-success">
                                Üçüncü resmi ekleyin
                                <input onChange={handleChangeForPhoto3('photo3')} type="file" accept="image/*" hidden />
                            </label>
                            {/* preview of file */}
                            {image.preview && array === 3 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>Üçüncü eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxHeight="auto" />
                                </React.Fragment>
                            ) : (
                                ''
                            )}
                            <br />
                            <br />
                            <label className="btn btn-outline-success">
                                Dördüncü resmi ekleyin
                                <input onChange={handleChangeForPhoto4('photo4')} type="file" accept="image/*" hidden />
                            </label>
                            {/* preview of file */}
                            {image.preview && array === 4 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>Dördüncü eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxHeight="auto" />
                                </React.Fragment>
                            ) : (
                                ''
                            )}
                            <br />
                            <br />
                            <label className="btn btn-outline-success">
                                Beşinci resmi ekleyin
                                <input onChange={handleChangeForPhoto5('photo5')} type="file" accept="image/*" hidden />
                            </label>
                            {/* preview of file */}
                            {image.preview && array === 5 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>Beşinci eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxHeight="auto" />
                                </React.Fragment>
                            ) : (
                                ''
                            )}
                            <br />
                            <br />
                            <label className="btn btn-outline-success">
                                Altıncı resmi ekleyin
                                <input onChange={handleChangeForPhoto6('photo6')} type="file" accept="image/*" hidden />
                            </label>
                            {/* preview of file */}
                            {image.preview && array === 6 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>Altıncı eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxHeight="auto" />
                                </React.Fragment>
                            ) : (
                                ''
                            )}
                            <br />
                            <br />
                            <div className="row ml-2">
                                <h5 style={{ color: 'green' }}>Önceden Eklediğiniz Resimler</h5>
                            </div>
                            {/* PHOTOS */}
                            <br />
                            <p className="row ml-2">Eklediğiniz ilk resim: </p>
                            <br />
                            {body && (
                                <img
                                    src={`${API}/product/photo1/${router.query.slug}`}
                                    alt={title}
                                    style={{ width: '50%' }}
                                />
                            )}
                            <br />
                            <br />
                            <br />
                            <p className="row ml-2">Eklediğiniz ikinci resim: </p>
                            <br />
                            {body && (
                                <img
                                    src={`${API}/product/photo2/${router.query.slug}`}
                                    alt={title}
                                    style={{ width: '50%' }}
                                />
                            )}
                            <br />
                            <br />
                            <p className="row ml-2">Eklediğiniz üçüncü resim: </p>
                            <br />
                            {body && (
                                <img
                                    src={`${API}/product/photo3/${router.query.slug}`}
                                    alt={title}
                                    style={{ width: '50%' }}
                                />
                            )}
                            <br />
                            <br />
                            <p className="row ml-2">Eklediğiniz dördüncü resim: </p>
                            <hr />
                            {body && (
                                <img
                                    src={`${API}/product/photo4/${router.query.slug}`}
                                    alt={title}
                                    style={{ width: '50%' }}
                                />
                            )}
                            <br />
                            <br />
                            <p className="row ml-2">Eklediğiniz beşinci resim: </p>
                            <br />
                            {body && (
                                <img
                                    src={`${API}/product/photo5/${router.query.slug}`}
                                    alt={title}
                                    style={{ width: '50%' }}
                                />
                            )}
                            <br />
                            <br />
                            <p className="row ml-2">Eklediğiniz altıncı resim: </p>
                            <br />
                            {body && (
                                <img
                                    src={`${API}/product/photo6/${router.query.slug}`}
                                    alt={title}
                                    style={{ width: '50%' }}
                                />
                            )}
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(ProductUpdate);
