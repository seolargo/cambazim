import {useState, useEffect, useContext} from 'react';
import dynamic from 'next/dynamic';
import {withRouter} from 'next/router';
import {getCookie} from '../../actions/auth';

import {createProduct} from '../../actions/product';

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import '../../node_modules/react-quill/dist/quill.snow.css';
import {QuillModules, QuillFormats} from '../../helpers/quill';

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

import {
    InfoWindow,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';

import { Descriptions, Badge } from 'antd';

import Geocode from 'react-geocode';
Geocode.setApiKey("AIzaSyBOLlOXZVdk0T2wMOrKN5IMEnUGRpbMnC8");

import 'antd/dist/antd.css';

import AutoComplete from 'react-google-autocomplete'

const CreateProduct = ({router}) => {
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
    }
    
    const [image, setImage] = useState({ 
        preview: "", raw: ""
    });
    const [array, setArray] = useState('');
    
    const [state, setState] = useState ({
        address: "",
        city: "",
        area: "",
        state: "",
        zoom: 15,
        mapPosition: {
            lat:0,
            lng:0
        },
        markerPosition: {
            lat: 0,
            lng: 0
        }
    }
    );

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

    useEffect(()=>{
        setValues({...values, formData: new FormData()});

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setState(
                    {
                        mapPosition: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        markerPosition: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }, () => {
                        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude)
                            .then(response => {
                                //console.log('response', response)
                                const address = response.results[0].formatted_address,
                                    addressArray = response.results[0].address_components,
                                    city = getCity(addressArray),
                                    area = getArea(addressArray),
                                    state = getState(addressArray);
                                    
                                    setState({
                                        address: (address) ? address: "",
                                        area: (area) ? area : "", 
                                        city: (city) ? city : "",
                                        state: (state) ? state : ""
                                    })
                                    //setState ends
                            },
                            //response ends
                        );
                        //then ends
                    }
                    //() => ends
                )
                //setState ends
            }
            //position => ends
        )
        //getCurrentPosition ends
        }
    }, [router]);
    
    const publishProduct = (e) => {
        e.preventDefault();
        createProduct(formData, token).then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                //If response was successful, we need to clear the fields.
                setValues(
                    {   ...values, 
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
                    }
                );
                setBody('');
            }
        });
    };

    const handleChangeForPhoto1 = name => e => {
        const value = (name === 'photo1') ? e.target.files[0] : e.target.value;
        formData.append(name, value);
        setValues({...values, [name]: value, formData, error: ''});

        if(name === 'photo1') {
            if (e.target.files.length) {
                setImage({
                  preview: URL.createObjectURL(e.target.files[0]),
                  raw: e.target.files[0]
                });
                setArray(1);
            }
        }
    }

    const handleChangeForPhoto2 = name => e => {
        const value = (name === 'photo2') ? e.target.files[0] : e.target.value;
        formData.append(name, value);
        setValues({...values, [name]: value, formData, error: ''});

        if(name === 'photo2') {
            if (e.target.files.length) {
                setImage({
                  preview: URL.createObjectURL(e.target.files[0]),
                  raw: e.target.files[0]
                });
                setArray(2);
            }
        }
    }

    const handleChangeForPhoto3 = name => e => {
        const value = (name === 'photo3') ? e.target.files[0] : e.target.value;
        formData.append(name, value);
        setValues({...values, [name]: value, formData, error: ''});

        if(name === 'photo3') {
            if (e.target.files.length) {
                setImage({
                  preview: URL.createObjectURL(e.target.files[0]),
                  raw: e.target.files[0]
                });
                setArray(3);
            }
        }
    }

    const handleChangeForPhoto4 = name => e => {
        const value = (name === 'photo4') ? e.target.files[0] : e.target.value;
        formData.append(name, value);
        setValues({...values, [name]: value, formData, error: ''});

        if(name === 'photo4') {
            if (e.target.files.length) {
                setImage({
                  preview: URL.createObjectURL(e.target.files[0]),
                  raw: e.target.files[0]
                });
                setArray(4);
            }
        }
    }

    const handleChangeForPhoto5 = name => e => {
        const value = (name === 'photo5') ? e.target.files[0] : e.target.value;
        formData.append(name, value);
        setValues({...values, [name]: value, formData, error: ''});

        if(name === 'photo5') {
            if (e.target.files.length) {
                setImage({
                  preview: URL.createObjectURL(e.target.files[0]),
                  raw: e.target.files[0]
                });
                setArray(5);
            }
        }
    }

    const handleChangeForPhoto6 = name => e => {
        const value = (name === 'photo6') ? e.target.files[0] : e.target.value;
        formData.append(name, value);
        setValues({...values, [name]: value, formData, error: ''});

        if(name === 'photo6') {
            if (e.target.files.length) {
                setImage({
                  preview: URL.createObjectURL(e.target.files[0]),
                  raw: e.target.files[0]
                });
                setArray(6);
            }
        }
    }

    const handleChange = name => e => {
        console.log('name: ', name);     
        const value = e.target.value;
        console.log('value: ', value);
        formData.append(name, value);
        setValues({...values, [name]: value, formData, error: ''});
    };

    const getCity = (addressArray) => {
        let city = '';
        console.log(addressArray);
        for (let index=0; index < addressArray.length; index++) {
            if (addressArray[index].types[0] && 'administrative_area_level_2' === addressArray[index].types[0]) {
                city = addressArray[index].long_name;
                return city;
            }
        }
    }

    const getArea = (addressArray) => {
        let area = '';
        for (let index=0; index<addressArray.length; index++) {
            if (addressArray[index].types[0]) {
                for (let j=0; j<addressArray.length; j++) {
                    if ('sublocality_level_1' === addressArray[index].types[j] ||'locality' === addressArray[index].types[j]) {
                        area = addressArray[index].long_name;
                    }
                }
            }
        }
    }

    const onPlaceSelected = (place) => {
        console.log('place: ', place);
        console.log('address: ', address);
        console.log('addressArray: ', addressArray);
        console.log('city: ', city);
        console.log('area: ', area);
        console.log('state: ', state);
        console.log('newLat: ', newLat);
        console.log('newLng: ', newLng);
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = getCity(addressArray),
            area = getArea(addressArray),
            state = getState(addressArray),
            newLat = place.geometry.location.lat(),
            newLng = place.geometry.location.lng();

            //Our lat and lng...
            //latProduct = newLat;
            //lngProduct = newLng;

            setState({
                address: (address) ? address: "",
                area: (area) ? area : "", 
                city: (city) ? city : "",
                state: (state) ? state : "",
                markerPosition : {
                    lat: newLat,
                    lng: newLng 
                },
                mapPosition : {
                    lat: newLat,
                    lng: newLng
                }
            })
    }

    const getState = (addressArray) => {
        let state = '';
        for (let index=0; index < addressArray.length; index++) {
            if (addressArray[index].types[0] && 'administrative_area_level_1' === addressArray[index].types[0]) {
                state = addressArray[index].long_name;
                return state;
            }
        }
    }

    const onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat();
        let newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng)
        .then(response => {
            console.log('response', response)
            const address = response.results[0].formatted_address,
                  addressArray = response.results[0].address_components,
                  city = getCity(addressArray),
                  area = getArea(addressArray),
                  state = getState(addressArray);
                
                setState({
                    address: (address) ? address: "",
                    area: (area) ? area : "", 
                    city: (city) ? city : "",
                    state: (state) ? state : "",
                    markerPosition : {
                        lat: newLat,
                        lng: newLng 
                    },
                    mapPosition : {
                        lat: newLat,
                        lng: newLng
                    }
                })
        })
        //console.log('newLat', newLat);
    }

    const MapWithAMarker = withScriptjs(withGoogleMap(props => 
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{lat: state.mapPosition.lat, lng: state.mapPosition.lng}}
            >
            <Marker
                draggable={true}
                onDragEnd={onMarkerDragEnd} 
                position={{lat: state.markerPosition.lat, lng: state.markerPosition.lng}}
            >
                <InfoWindow>
                    <div>Şu anda buradasınız</div>
                </InfoWindow>
            </Marker>

            {/* For Auto complete Search Box */}
            <AutoComplete 
                style = 
                {
                    {
                        width: '100%',
                        height: '40px',
                        paddingLeft: 16,
                        marginTop: 2,
                        marginBottom: '2rem' 
                    }
                }
                onPlaceSelected={onPlaceSelected}
                types={['(regions)']}
            />
        </GoogleMap>
    ))

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
        if(typeof window !== 'undefined') {
            //Accessing the local storage.
            localStorage.setItem('product', JSON.stringify(e));    
        }
    };

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
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
                    <input type="text" className="form-control" value={estimatedWeight} onChange={handleChange('estimatedWeight')} />
                    <br />
                    <label className="text-muted">Cep Telefon Numaranız (Herkese Gözükür)</label>
                    <br />
                    <input type="text" className="form-control" value={sellerCellphone} onChange={handleChange('sellerCellphone')} />
                    <br />
                    <label className="text-muted">Açık Adresiniz (Herkese Gözükür)</label>
                    <br />
                    <input type="text" className="form-control" value={sellerAddress} onChange={handleChange('sellerAddress')} />
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
                                <option key={index} value={postDetail.il}>{postDetail.il}</option>  
                            )
                        })}
                    </select>
                    <br />
                    <label className="text-muted">İlçenizi Seçiniz</label>
                    <br />
                    <select onChange={handleChange('town')} className="form-control">
                        <option>Lütfen Seçiniz</option>
                        {ilce.map((postDetail, index) => {
                            return ( 
                                postDetail.il === city ? <option key={index} value={postDetail.ilce}>{postDetail.ilce}</option> : ''
                            )
                        })}
                    </select>
                    <br />
                    <label className="text-muted">Mahallenizi (Köyünüzü) Seçiniz</label>
                    <br />
                    <select onChange={handleChange('village')} className="form-control">
                        <option>Lütfen Seçiniz</option>
                        {   city === "ADANA" ? 
                            villagesAdana.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ADIYAMAN" ? 
                            villagesAdiyaman.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            : 
                            city === "AFYONKARAHİSAR" ? 
                            villagesAfyonkarahisar.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "AĞRI" ? 
                            villagesAgri.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "AKSARAY" ? 
                            villagesAksaray.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "AMASYA" ? 
                            villagesAmasya.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ANKARA" ? 
                            villagesAnkara.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ANTALYA" ? 
                            villagesAntalya.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ARDAHAN" ? 
                            villagesArdahan.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ARTVİN" ? 
                            villagesArtvin.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "AYDIN" ? 
                            villagesAydin.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "BALIKESİR" ? 
                            villagesBalikesir.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "BARTIN" ? 
                            villagesBartin.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "BATMAN" ? 
                            villagesBatman.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "BAYBURT" ? 
                            villagesBayburt.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "BİLECİK" ? 
                            villagesBilecik.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "BİNGÖL" ? 
                            villagesBingol.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "BİTLİS" ? 
                            villagesBitlis.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "BOLU" ? 
                            villagesBolu.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "BURDUR" ? 
                            villagesBurdur.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "BURSA" ? 
                            villagesBursa.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ÇANAKKALE" ? 
                            villagesCanakkale.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ÇANKIRI" ? 
                            villagesCankiri.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ÇORUM" ? 
                            villagesCorum.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "DENİZLİ" ? 
                            villagesDenizli.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "DİYARBAKIR" ? 
                            villagesDiyarbakir.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "DÜZCE" ? 
                            villagesDuzce.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "EDİRNE" ? 
                            villagesEdirne.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ELAZIĞ" ? 
                            villagesElazig.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ERZİNCAN" ? 
                            villagesErzincan.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ERZURUM" ? 
                            villagesErzurum.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ESKİŞEHİR" ? 
                            villagesEskisehir.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "GAZİANTEP" ? 
                            villagesGaziantep.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "GİRESUN" ? 
                            villagesGiresun.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "GÜMÜŞHANE" ? 
                            villagesGumushane.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "HAKKARİ" ? 
                            villagesHakkari.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "HATAY" ? 
                            villagesHatay.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "IĞDIR" ? 
                            villagesIgdir.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ISPARTA" ? 
                            villagesIsparta.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "İSTANBUL" ? 
                            villagesIstanbul.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "İZMİR" ? 
                            villagesIzmir.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "KAHRAMANMARAŞ" ? 
                            villagesKahramanmaras.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "KARABÜK" ? 
                            villagesKarabuk.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "KARAMAN" ? 
                            villagesKaraman.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "KARS" ? 
                            villagesKars.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "KASTAMONU" ? 
                            villagesKastamonu.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "KAYSERİ" ? 
                            villagesKayseri.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "KİLİS" ? 
                            villagesKilis.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "KIRIKKALE" ? 
                            villagesKirikkale.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "KIRKLARELİ" ? 
                            villagesKirklareli.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "KIRŞEHİR" ? 
                            villagesKirsehir.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "KOCAELİ" ? 
                            villagesKocaeli.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "KONYA" ? 
                            villagesKonya.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "KÜTAHYA" ? 
                            villagesKutahya.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "MALATYA" ? 
                            villagesMalatya.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "MANİSA" ? 
                            villagesManisa.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "MARDİN" ? 
                            villagesMardin.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "MERSİN" ? 
                            villagesMersin.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "MUĞLA" ? 
                            villagesMugla.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "MUŞ" ? 
                            villagesMus.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "NEVŞEHİR" ? 
                            villagesNevsehir.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "NİĞDE" ? 
                            villagesNigde.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ORDU" ? 
                            villagesOrdu.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "OSMANİYE" ? 
                            villagesOsmaniye.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "RİZE" ? 
                            villagesRize.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "SAKARYA" ? 
                            villagesSakarya.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "SAMSUN" ? 
                            villagesSamsun.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ŞANLIURFA" ? 
                            villagesSanliurfa.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "SİİRT" ? 
                            villagesSiirt.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "SİNOP" ? 
                            villagesSinop.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ŞIRNAK" ? 
                            villagesSirnak.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "SİVAS" ? 
                            villagesSivas.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "TEKİRDAĞ" ? 
                            villagesTekirdag.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "TOKAT" ? 
                            villagesTokat.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "TRABZON" ? 
                            villagesTrabzon.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "TUNCELİ" ? 
                            villagesTunceli.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "UŞAK" ? 
                            villagesUsak.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "VAN" ? 
                            villagesVan.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "YALOVA" ? 
                            villagesYalova.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "YOZGAT" ? 
                            villagesYozgat.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :
                            city === "ZONGULDAK" ? 
                            villagesZonguldak.map((postDetail, index) => {
                                return ( 
                                    postDetail.tname === town ? <option key={index} value={postDetail.Mahalle}>{postDetail.Mahalle}</option> : ''
                                )
                            }) 
                            :  
                            ''
                        }
                    </select>
                    <br />
                    <label className="text-muted">Hayvanınızın Türünü Seçiniz</label>
                    <br />
                    <select onChange={handleChange('animalType')} className="form-control">
                        <option>Lütfen Seçiniz</option>
                        {animals.map((postDetail, index) => {
                            return ( 
                                <option key={index} value={postDetail.usttur}>{postDetail.usttur}</option>  
                            )
                        })}
                    </select>
                    <br />
                    <label className="text-muted">Alt Türü Seçiniz</label>
                    <br />
                    <select onChange={handleChange('poultry')} className="form-control">
                        <option>Lütfen Seçiniz</option>
                        {animalCategories.map((postDetail, index) => {
                            return (
                                postDetail.usttur === animalType ? <option key={index} value={postDetail.tur}>{postDetail.tur}</option> : '' 
                            )
                        })}
                    </select>
                    <br />
                    <label className="text-muted">Tipini Seçiniz</label>
                    <br/>
                    <select onChange={handleChange('animalSubCategory')} className="form-control">
                        <option>Lütfen Seçiniz</option>
                        {animalSubCategories.map((postDetail, index) => {
                            return (
                                postDetail.tur === poultry ? <option key={index} value={postDetail.subtur}>{postDetail.subtur}</option> : ''         
                            )
                        })}
                    </select>
                    <br />
                    <label className="text-muted">Cinsini Seçiniz</label>
                    <br/>
                    <select onChange={handleChange('animalVariety')} className="form-control">
                        <option>Lütfen Seçiniz</option>
                        {animalVarieties.map((postDetail, index) => {
                            return (
                                postDetail.tur === poultry ? <option key={index} value={postDetail.animalVariety}>{postDetail.animalVariety}</option> : ''     
                            )
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

                <div>
                    <button type="submit" className="btn btn-success">
                        İlanı Yayımla
                    </button> 
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
                            <h5 style={{color: 'green'}}>Resim ekleyin</h5>
                            <hr />
                            <p className="text-muted">Her bir resim için maksimum resim boyutu: 1MB (En az bir (zorunlu) en fazla altı resim yükleyebilirsiniz)</p>
                            <br />
                            <label className="btn btn-outline-success">
                                İlk resmi ekleyin
                               <input onChange={handleChangeForPhoto1('photo1')} type="file" accept="image/*" hidden/>
                            </label>
                            {/* preview of file */}
                            {image.preview && array === 1 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>İlk eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxHeight="auto" />
                                </React.Fragment>
                            ): ''}                      
                            <br/>
                            <br />
                            <label className="btn btn-outline-success">
                                İkinci resmi ekleyin
                                <input onChange={handleChangeForPhoto2('photo2')} type="file" accept="image/*" hidden/>
                            </label>
                           
                            {/* preview of file */}
                            {image.preview && array === 2 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>İkinci eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxHeight="auto" />
                                </React.Fragment>
                            ): ''}                      
                            <br/>
                            <br />
                            <label className="btn btn-outline-success">
                                Üçüncü resmi ekleyin
                                <input onChange={handleChangeForPhoto3('photo3')} type="file" accept="image/*" hidden/>
                            </label>
                            {/* preview of file */}
                            {image.preview && array === 3 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>Üçüncü eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxHeight="auto" />
                                </React.Fragment>
                            ): ''}                      
                            <br/>
                            <br />
                            <label className="btn btn-outline-success">
                                Dördüncü resmi ekleyin
                                <input onChange={handleChangeForPhoto4('photo4')} type="file" accept="image/*" hidden/>
                            </label>
                            {/* preview of file */}
                            {image.preview && array === 4 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>Dördüncü eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxHeight="auto" />
                                </React.Fragment>
                            ): ''}                      
                            <br/>
                            <br />
                            <label className="btn btn-outline-success">
                                Beşinci resmi ekleyin
                                <input onChange={handleChangeForPhoto5('photo5')} type="file" accept="image/*" hidden/>
                            </label>
                            {/* preview of file */}
                            {image.preview && array === 5 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>Beşinci eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxHeight="auto" />
                                </React.Fragment>
                            ): ''}                      
                            <br/>
                            <br />
                            <label className="btn btn-outline-success">
                                Altıncı resmi ekleyin
                                <input onChange={handleChangeForPhoto6('photo6')} type="file" accept="image/*" hidden/>
                            </label>
                            {/* preview of file */}
                            {image.preview && array === 6 ? (
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <p>Altıncı eklediğiniz resim: </p>
                                    <img src={image.preview} alt="dummy" width="300" maxHeight="auto" />
                                </React.Fragment>
                            ): ''}                      
                            <br/>
                            <br />
                            <div>
                                <Descriptions bordered>
                                    <Descriptions.Item label="Adresiniz:">{state.address}</Descriptions.Item>
                                </Descriptions>
                            </div>
                            <MapWithAMarker
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBOLlOXZVdk0T2wMOrKN5IMEnUGRpbMnC8&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />} 
                            />    
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