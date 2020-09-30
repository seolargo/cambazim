import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import {
    AiFillMail,
    AiFillPhone,
    AiOutlineHome,
    AiFillFacebook,
    AiFillTwitterSquare,
    AiOutlineInstagram
} from 'react-icons/ai';
import '../static/css/styles.css';

import Cardd from '../components/product/Card';
import { listProductsAll } from '../actions/product';

import { getFilteredProducts } from '../actions/product';

import prices from './fixedPrices.json';
import cities from './cities.json';
import towns from './towns.json';
import animals from './Animals.json';
import animalSubs from './AnimalCategories.json';

import * as ReactBootStrap from 'react-bootstrap';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { GiFarmer } from 'react-icons/gi';
import { BsFillPersonFill, BsSearch } from 'react-icons/bs';

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

import Loader from 'react-loader-spinner';

import { RadioBoxForPricesNew } from './RadioBoxForPricesNew';

//import RadioBoxForVillages from './RadioBoxForVillages';
//import RadioBoxForCities from './RadioBoxForCities';
//import RadioBoxForTowns from './RadioBoxForTowns';
//import RadioBoxForPrices from './RadioBoxForPrices';

import Search from '../components/product/Search';

import Footer from '../components/Footer';
import AdvancedSearch from '../components/product/AdvancedSearch';

import { Dropdown } from 'react-bootstrap';
import { Accordion, Card, Button, FormCheck, Form } from 'react-bootstrap';

import axios from 'axios';
import { handleResponse } from '../actions/auth';

import Scroll from '../components/scroll';

const Index = ({ products, totalProducts, productsLimit, productSkip, router }) => {
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(50); //It limits the amount of notices we have in the index page. First 50 notices will be published.
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [size, setSize] = useState(totalProducts);
    const [loadedProducts, setLoadedProducts] = useState([]);

    const [cityValue, setCityValue] = useState('');
    const [townValue, setTownValue] = useState('');
    const [villageValue, setVillageValue] = useState('');
    const [animalValue, setAnimalValue] = useState('');
    const [animalSubValue, setAnimalSubValue] = useState('');

    const [myFilters, setMyFilters] = useState({
        filters: {
            price: [],
            city: [],
            town: [],
            village: [],
            animalType: [],
            poultry: []
        }
    });

    const loadFilteredResults = (newFilters) => {
        getFilteredProducts(skip, limit, newFilters).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                console.log('newFilters: ', newFilters);
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
        if (filterBy === 'price') {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        if (filterBy === 'city') {
            setCityValue(handleCity(filters));
            let cityValuee = handleCity(filters);
            newFilters.filters[filterBy] = cityValuee;
        }
        if (filterBy === 'town' && cityValue) {
            setTownValue(handleTown(filters));
            let townValuee = handleTown(filters);
            newFilters.filters[filterBy] = townValuee;
        }
        if (filterBy === 'village') {
            if (cityValue === 'ADANA') {
                setVillageValue(handleVillage(filters, villagesAdana));
                let villageValuee = handleVillage(filters, villagesAdana);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ADIYAMAN') {
                setVillageValue(handleVillage(filters, villagesAdiyaman));
                let villageValuee = handleVillage(filters, villagesAdiyaman);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'AFYONKARAHİSAR') {
                setVillageValue(handleVillage(filters, villagesAfyonkarahisar));
                let villageValuee = handleVillage(filters, villagesAfyonkarahisar);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'AĞRI') {
                setVillageValue(handleVillage(filters, villagesAgri));
                let villageValuee = handleVillage(filters, villagesAgri);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'AKSARAY') {
                setVillageValue(handleVillage(filters, villagesAksaray));
                let villageValuee = handleVillage(filters, villagesAksaray);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'AMASYA') {
                setVillageValue(handleVillage(filters, villagesAmasya));
                let villageValuee = handleVillage(filters, villagesAmasya);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ANKARA') {
                setVillageValue(handleVillage(filters, villagesAnkara));
                let villageValuee = handleVillage(filters, villagesAnkara);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ANTALYA') {
                setVillageValue(handleVillage(filters, villagesAntalya));
                let villageValuee = handleVillage(filters, villagesAntalya);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ARDAHAN') {
                setVillageValue(handleVillage(filters, villagesArdahan));
                let villageValuee = handleVillage(filters, villagesArdahan);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ARTVİN') {
                setVillageValue(handleVillage(filters, villagesArtvin));
                let villageValuee = handleVillage(filters, villagesArtvin);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'AYDIN') {
                setVillageValue(handleVillage(filters, villagesAydin));
                let villageValuee = handleVillage(filters, villagesAydin);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'BALIKESİR') {
                setVillageValue(handleVillage(filters, villagesBalikesir));
                let villageValuee = handleVillage(filters, villagesBalikesir);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'BARTIN') {
                setVillageValue(handleVillage(filters, villagesBartin));
                let villageValuee = handleVillage(filters, villagesBartin);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'BATMAN') {
                setVillageValue(handleVillage(filters, villagesBatman));
                let villageValuee = handleVillage(filters, villagesBatman);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'BAYBURT') {
                setVillageValue(handleVillage(filters, villagesBayburt));
                let villageValuee = handleVillage(filters, villagesBayburt);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'BİLECİK') {
                setVillageValue(handleVillage(filters, villagesBilecik));
                let villageValuee = handleVillage(filters, villagesBilecik);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'BİNGÖL') {
                setVillageValue(handleVillage(filters, villagesBingol));
                let villageValuee = handleVillage(filters, villagesBingol);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'BİTLİS') {
                setVillageValue(handleVillage(filters, villagesBitlis));
                let villageValuee = handleVillage(filters, villagesBitlis);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'BOLU') {
                setVillageValue(handleVillage(filters, villagesBolu));
                let villageValuee = handleVillage(filters, villagesBolu);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'BURDUR') {
                setVillageValue(handleVillage(filters, villagesBurdur));
                let villageValuee = handleVillage(filters, villagesBurdur);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'BURSA') {
                setVillageValue(handleVillage(filters, villagesBursa));
                let villageValuee = handleVillage(filters, villagesBursa);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ÇANAKKALE') {
                setVillageValue(handleVillage(filters, villagesCanakkale));
                let villageValuee = handleVillage(filters, villagesCanakkale);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ÇANKIRI') {
                setVillageValue(handleVillage(filters, villagesCankiri));
                let villageValuee = handleVillage(filters, villagesCankiri);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ÇORUM') {
                setVillageValue(handleVillage(filters, villagesCorum));
                let villageValuee = handleVillage(filters, villagesCorum);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'DENİZLİ') {
                setVillageValue(handleVillage(filters, villagesDenizli));
                let villageValuee = handleVillage(filters, villagesDenizli);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'DİYARBAKIR') {
                setVillageValue(handleVillage(filters, villagesDiyarbakir));
                let villageValuee = handleVillage(filters, villagesDiyarbakir);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'DÜZCE') {
                setVillageValue(handleVillage(filters, villagesDuzce));
                let villageValuee = handleVillage(filters, villagesDuzce);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'EDİRNE') {
                setVillageValue(handleVillage(filters, villagesEdirne));
                let villageValuee = handleVillage(filters, villagesEdirne);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ELAZIĞ') {
                setVillageValue(handleVillage(filters, villagesElazig));
                let villageValuee = handleVillage(filters, villagesElazig);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ERZİNCAN') {
                setVillageValue(handleVillage(filters, villagesErzincan));
                let villageValuee = handleVillage(filters, villagesErzincan);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ERZURUM') {
                setVillageValue(handleVillage(filters, villagesErzurum));
                let villageValuee = handleVillage(filters, villagesErzurum);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ESKİŞEHİR') {
                setVillageValue(handleVillage(filters, villagesEskisehir));
                let villageValuee = handleVillage(filters, villagesEskisehir);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'GAZİANTEP') {
                setVillageValue(handleVillage(filters, villagesGaziantep));
                let villageValuee = handleVillage(filters, villagesGaziantep);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'GİRESUN') {
                setVillageValue(handleVillage(filters, villagesGiresun));
                let villageValuee = handleVillage(filters, villagesGiresun);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'GÜMÜŞHANE') {
                setVillageValue(handleVillage(filters, villagesGumushane));
                let villageValuee = handleVillage(filters, villagesGumushane);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'HAKKARİ') {
                setVillageValue(handleVillage(filters, villagesHakkari));
                let villageValuee = handleVillage(filters, villagesHakkari);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'HATAY') {
                setVillageValue(handleVillage(filters, villagesHatay));
                let villageValuee = handleVillage(filters, villagesHatay);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'IĞDIR') {
                setVillageValue(handleVillage(filters, villagesIgdir));
                let villageValuee = handleVillage(filters, villagesIgdir);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ISPARTA') {
                setVillageValue(handleVillage(filters, villagesIsparta));
                let villageValuee = handleVillage(filters, villagesIsparta);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'İSTANBUL') {
                setVillageValue(handleVillage(filters, villagesIstanbul));
                let villageValuee = handleVillage(filters, villagesIstanbul);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'İZMİR') {
                setVillageValue(handleVillage(filters, villagesIzmir));
                let villageValuee = handleVillage(filters, villagesIzmir);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'KAHRAMANMARAŞ') {
                setVillageValue(handleVillage(filters, villagesKahramanmaras));
                let villageValuee = handleVillage(filters, villagesKahramanmaras);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'KARABÜK') {
                setVillageValue(handleVillage(filters, villagesKarabuk));
                let villageValuee = handleVillage(filters, villagesKarabuk);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'KARAMAN') {
                setVillageValue(handleVillage(filters, villagesKaraman));
                let villageValuee = handleVillage(filters, villagesKaraman);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'KARS') {
                setVillageValue(handleVillage(filters, villagesKars));
                let villageValuee = handleVillage(filters, villagesKars);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'KASTAMONU') {
                setVillageValue(handleVillage(filters, villagesKastamonu));
                let villageValuee = handleVillage(filters, villagesKastamonu);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'KAYSERİ') {
                setVillageValue(handleVillage(filters, villagesKayseri));
                let villageValuee = handleVillage(filters, villagesKayseri);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'KİLİS') {
                setVillageValue(handleVillage(filters, villagesKilis));
                let villageValuee = handleVillage(filters, villagesKilis);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'KIRIKKALE') {
                setVillageValue(handleVillage(filters, villagesKirikkale));
                let villageValuee = handleVillage(filters, villagesKirikkale);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'KIRKLARELİ') {
                setVillageValue(handleVillage(filters, villagesKirklareli));
                let villageValuee = handleVillage(filters, villagesKirklareli);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'KIRŞEHİR') {
                setVillageValue(handleVillage(filters, villagesKirsehir));
                let villageValuee = handleVillage(filters, villagesKirsehir);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'KOCAELİ') {
                setVillageValue(handleVillage(filters, villagesKocaeli));
                let villageValuee = handleVillage(filters, villagesKocaeli);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'KONYA') {
                setVillageValue(handleVillage(filters, villagesKonya));
                let villageValuee = handleVillage(filters, villagesKonya);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'KÜTAHYA') {
                setVillageValue(handleVillage(filters, villagesKutahya));
                let villageValuee = handleVillage(filters, villagesKutahya);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'MALATYA') {
                setVillageValue(handleVillage(filters, villagesMalatya));
                let villageValuee = handleVillage(filters, villagesMalatya);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'MANİSA') {
                setVillageValue(handleVillage(filters, villagesManisa));
                let villageValuee = handleVillage(filters, villagesManisa);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'MARDİN') {
                setVillageValue(handleVillage(filters, villagesMardin));
                let villageValuee = handleVillage(filters, villagesMardin);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'MERSİN') {
                setVillageValue(handleVillage(filters, villagesMersin));
                let villageValuee = handleVillage(filters, villagesMersin);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'MUĞLA') {
                setVillageValue(handleVillage(filters, villagesMugla));
                let villageValuee = handleVillage(filters, villagesMugla);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'MUŞ') {
                setVillageValue(handleVillage(filters, villagesMus));
                let villageValuee = handleVillage(filters, villagesMus);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'NEVŞEHİR') {
                setVillageValue(handleVillage(filters, villagesNevsehir));
                let villageValuee = handleVillage(filters, villagesNevsehir);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'NİĞDE') {
                setVillageValue(handleVillage(filters, villagesNigde));
                let villageValuee = handleVillage(filters, villagesNigde);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ORDU') {
                setVillageValue(handleVillage(filters, villagesOrdu));
                let villageValuee = handleVillage(filters, villagesOrdu);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'OSMANİYE') {
                setVillageValue(handleVillage(filters, villagesOsmaniye));
                let villageValuee = handleVillage(filters, villagesOsmaniye);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'RİZE') {
                setVillageValue(handleVillage(filters, villagesRize));
                let villageValuee = handleVillage(filters, villagesRize);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'SAKARYA') {
                setVillageValue(handleVillage(filters, villagesSakarya));
                let villageValuee = handleVillage(filters, villagesSakarya);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'SAMSUN') {
                setVillageValue(handleVillage(filters, villagesSamsun));
                let villageValuee = handleVillage(filters, villagesSamsun);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ŞANLIURFA') {
                setVillageValue(handleVillage(filters, villagesSanliurfa));
                let villageValuee = handleVillage(filters, villagesSanliurfa);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'SİİRT') {
                setVillageValue(handleVillage(filters, villagesSiirt));
                let villageValuee = handleVillage(filters, villagesSiirt);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'SİNOP') {
                setVillageValue(handleVillage(filters, villagesSinop));
                let villageValuee = handleVillage(filters, villagesSinop);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ŞIRNAK') {
                setVillageValue(handleVillage(filters, villagesSirnak));
                let villageValuee = handleVillage(filters, villagesSirnak);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'SİVAS') {
                setVillageValue(handleVillage(filters, villagesSivas));
                let villageValuee = handleVillage(filters, villagesSivas);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'TEKİRDAĞ') {
                setVillageValue(handleVillage(filters, villagesTekirdag));
                let villageValuee = handleVillage(filters, villagesTekirdag);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'TOKAT') {
                setVillageValue(handleVillage(filters, villagesTokat));
                let villageValuee = handleVillage(filters, villagesTokat);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'TRABZON') {
                setVillageValue(handleVillage(filters, villagesTrabzon));
                let villageValuee = handleVillage(filters, villagesTrabzon);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'TUNCELİ') {
                setVillageValue(handleVillage(filters, villagesTunceli));
                let villageValuee = handleVillage(filters, villagesTunceli);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'UŞAK') {
                setVillageValue(handleVillage(filters, villagesUsak));
                let villageValuee = handleVillage(filters, villagesUsak);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'VAN') {
                setVillageValue(handleVillage(filters, villagesVan));
                let villageValuee = handleVillage(filters, villagesVan);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'YALOVA') {
                setVillageValue(handleVillage(filters, villagesYalova));
                let villageValuee = handleVillage(filters, villagesYalova);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'YOZGAT') {
                setVillageValue(handleVillage(filters, villagesYozgat));
                let villageValuee = handleVillage(filters, villagesYozgat);
                newFilters.filters[filterBy] = villageValuee;
            } else if (cityValue === 'ZONGULDAK') {
                setVillageValue(handleVillage(filters, villagesZonguldak));
                let villageValuee = handleVillage(filters, villagesZonguldak);
                newFilters.filters[filterBy] = villageValuee;
            }
        }
        if (filterBy === 'animalType') {
            setAnimalValue(handleAnimal(filters));
            let animalValuee = handleAnimal(filters);
            newFilters.filters[filterBy] = animalValuee;
        }
        if (filterBy === 'poultry' && animalValue) {
            setAnimalSubValue(handleAnimalSub(filters));
            let animalSubValuee = handleAnimalSub(filters);
            newFilters.filters[filterBy] = animalSubValuee;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = (value) => {
        const data = prices;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    const handleCity = (value) => {
        const data = cities;
        for (let key in data) {
            if (data[key].name === value) {
                name = data[key].name;
            }
        }
        return name;
    };

    const handleTown = (value) => {
        const data = towns;
        for (let key in data) {
            if (data[key].name === value) {
                name = data[key].name;
            }
        }
        return name;
    };

    const handleVillage = (value, villagesCity) => {
        const data = villagesCity; //data = villagesBursa
        for (let key in data) {
            if (data[key].Mahalle === value) {
                name = data[key].Mahalle;
            }
        }
        return name;
    };

    const handleAnimal = (value) => {
        const data = animals;
        for (let key in data) {
            if (data[key].usttur === value) {
                name = data[key].usttur;
            }
        }
        return name;
    };

    const handleAnimalSub = (value) => {
        const data = animalSubs;
        for (let key in data) {
            if (data[key].animalSub === value) {
                name = data[key].animalSub;
            }
        }
        return name;
    };

    const RadioBoxForPrices = ({ prices, handleFilters }) => {
        const [value, setValue] = useState(0);
        const handleChange = (event) => {
            handleFilters(event.target.value);
            setValue(event.target.value);
        };
        return prices.map((p, i) => (
            <li key={i} className="list-unstyled">
                <input onChange={handleChange} value={`${p._id}`} name={p} type="radio" className="mr-2" />
                <label className="form-check-label">{p.name}</label>
            </li>
        ));
    };

    const RadioBoxForCities = ({ cities, handleFilters }) => {
        const [value, setValue] = useState(0);
        const handleChange = (event) => {
            setValue(event.target.value);
            handleFilters(event.target.value);
        };

        /*<label>Options:</label>
                            <input type="radio" name="radSize" id="sizeSmall" value="small" />
                            <label for="sizeSmall">Small</label>

                            <input type="radio" name="radSize" id="sizeMed" value="medium" />
                            <label for="sizeMed">Medium</label>

                            <input type="radio" name="radSize" id="sizeLarge" value="large" />
        <label for="sizeLarge">Large</label>*/

        return cities.map((ci, i) => (
            <li key={i} className="list-unstyled">
                <input
                    type="radio"
                    name="cities"
                    id={`${ci.name}`}
                    onChange={handleChange}
                    value={`${ci.name}`}
                    className="mr-2"
                />
                <label className="form-check-label" htmlFor={`${ci.name}`}>
                    {ci.name}
                </label>
            </li>
        ));
        //return null;
    };

    const RadioBoxForTowns = ({ selectedCity, towns, handleFilters }) => {
        const [value, setValue] = useState(0);
        const handleChange = (event) => {
            handleFilters(event.target.value);
            setValue(event.target.value);
        };
        return towns.map((t, i) =>
            t.cname === selectedCity ? (
                <li key={i} className="list-unstyled">
                    <input onChange={handleChange} value={`${t.name}`} name={t.name} type="radio" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ) : (
                ''
            )
        );
    };

    const RadioBoxForVillages = ({ selectedTown, villages, handleFilters }) => {
        const [value, setValue] = useState(0);
        const handleChange = (event) => {
            handleFilters(event.target.value);
            setValue(event.target.value);
        };
        return villages.map((v, i) =>
            v.tname === selectedTown ? (
                <li key={i} className="list-unstyled">
                    <input onChange={handleChange} value={`${v.Mahalle}`} name={v} type="radio" className="mr-2" />
                    <label className="form-check-label">{v.Mahalle}</label>
                </li>
            ) : (
                ''
            )
        );
    };

    const RadioBoxForAnimals = ({ animals, handleFilters }) => {
        const [value, setValue] = useState(0);
        const handleChange = (event) => {
            handleFilters(event.target.value);
            setValue(event.target.value);
        };
        return animals.map((a, i) => (
            <li key={i} className="list-unstyled" id="cc-selector">
                <input onChange={handleChange} value={`${a.usttur}`} name={a} type="radio" className="mr-2" />
                <label className="form-check-label">{a.usttur}</label>
            </li>
        ));
    };

    const RadioBoxForAnimalSubs = ({ selectedAnimalType, animalSubs, handleFilters }) => {
        const [value, setValue] = useState(0);
        const handleChange = (event) => {
            handleFilters(event.target.value);
            setValue(event.target.value);
        };
        return animalSubs.map((as, i) =>
            as.animal === selectedAnimalType ? (
                <li key={i} className="list-unstyled">
                    <input onChange={handleChange} value={`${as.animalSub}`} name={as} type="radio" className="mr-2" />
                    <label className="form-check-label">{as.animalSub}</label>
                </li>
            ) : (
                ''
            )
        );
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        size > 0 && size >= limit && (
            <button onClick={loadMore} className="btn btn-outline-success btn-lg">
                Daha fazla göster
            </button>
        );
    };

    /*const showAllProducts = (start, end) => {
        return products.slice(start,end).map((product, i) => {
            
                <article key={i}>
                    <Card product={product}/>
                    <hr/>
                </article>
            );
        });
    };*/

    useEffect(() => {
        loadFilteredResults(skip, limit, myFilters.filters);
        console.log(myFilters.filters);
    }, []);

    useEffect(() => {
        setCityValue(cityValue);
        setTownValue('');
        setVillageValue('');
    }, [cityValue]);

    useEffect(() => {
        setTownValue(townValue);
        setVillageValue('');
    }, [townValue]);

    useEffect(() => {
        setVillageValue(villageValue);
    }, [villageValue]);

    useEffect(() => {
        setAnimalValue(animalValue);
        setAnimalSubValue('');
    }, [animalValue]);

    useEffect(() => {
        setAnimalSubValue(animalSubValue);
    }, [animalSubValue]);

    return (
        <Layout>
            <div id="search-bar">
                <Search />
            </div>
            <div id="scroll">
                <Scroll showBelow={250} />
            </div>
            {/*<h1 className="rev-block" style={{ color: '#02a500' }}>
                <span>Cambazım</span>
            </h1>
            <h1 className="rev-block" id="onemore" style={{ color: '#02a500' }}>
                <span>hayvancılığa dair her şey</span>
            </h1>*/}
            {/* RESİM */}
            {/*<br />
            <br />
            <br />
            <br />
            <br />*/}
            <div className="imagesThree"></div>
            <div className="cambazim-logo-309-48">
                <p id="my-image">
                    <img src="https://res.cloudinary.com/dmci3ih0i/image/upload/v1601497430/cambazim-logo-309x48_egsq1i.png" />
                </p>
            </div>
            {/*<div style={{ textAlign: 'center', color: 'green' }} id="list-mobile">
                Hayvancılığa dair her şey
                <br />
                <br />
                <br />
            </div>*/}
            <div className="list-mobile">
                <div style={{ color: 'green', marginLeft: '60px', marginBottom: '10px' }} id="list-mobile">
                    <GiFarmer size={32} /> Emekçilerimiz! Hayvanlarınızı daha yüksek ücretlerle satın. Üstelik sizlerden
                    komisyon almıyoruz!
                </div>
                <div style={{ color: 'green', marginLeft: '60px', marginBottom: '10px' }} id="list-mobile">
                    <BsFillPersonFill size={32} /> Virüsten kaçının! Çiftlik hayvanlarına 'uzaktan' bakın.
                </div>
                <div style={{ color: 'green', marginLeft: '60px', marginBottom: '10px' }} id="list-mobile">
                    <BsSearch size={32} /> Detaylı arama yaparak çevrenizdeki hayvanları görüntüleyin!
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-4" id="detailed-search">
                        <h4 style={{ color: 'green' }} id="detayli-arama">
                            Detaylı Arama
                        </h4>
                        <hr />
                        <h4 style={{ color: 'green' }}>Hayvan Türü</h4>
                        <ul id="animal_id">
                            <RadioBoxForAnimals
                                animals={animals}
                                handleFilters={(filters) => handleFilters(filters, 'animalType')}
                            />
                        </ul>
                        {animalValue && (
                            <div>
                                <h4 style={{ color: 'green' }}>Hayvan Alt Türü</h4>
                                <ul id="animalSub_id">
                                    <RadioBoxForAnimalSubs
                                        selectedAnimalType={animalValue}
                                        animalSubs={animalSubs}
                                        handleFilters={(filters) => handleFilters(filters, 'poultry')}
                                    />
                                </ul>
                            </div>
                        )}
                        <h4 style={{ color: 'green' }}>Fiyat</h4>
                        <ul id="price_id">
                            <RadioBoxForPricesNew
                                prices={prices}
                                handleFilters={(filters) => handleFilters(filters, 'price')}
                            />
                        </ul>
                        <h4 style={{ color: 'green' }}>Şehir</h4>
                        <ul id="city_id">
                            <RadioBoxForCities
                                cities={cities}
                                handleFilters={(filters) => handleFilters(filters, 'city')}
                            />
                        </ul>
                        {cityValue && (
                            <div>
                                <h4 style={{ color: 'green' }}>İlçe</h4>
                                <ul id="town_id">
                                    <RadioBoxForTowns
                                        selectedCity={cityValue}
                                        towns={towns}
                                        handleFilters={(filters) => handleFilters(filters, 'town')}
                                    />
                                </ul>
                            </div>
                        )}
                        {townValue && (
                            <div>
                                <h4 style={{ color: 'green' }}>Mahalle</h4>
                                <ul id="village_id">
                                    {cityValue && cityValue === 'ADANA' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesAdana}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ADIYAMAN' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesAdiyaman}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'AFYONKARAHİSAR' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesAfyonkarahisar}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'AĞRI' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesAgri}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'AKSARAY' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesAksaray}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'AMASYA' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesAmasya}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ANKARA' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesAnkara}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ANTALYA' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesAntalya}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ARDAHAN' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesArdahan}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ARTVİN' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesArtvin}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'AYDIN' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesAydin}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'BALIKESİR' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesBalikesir}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'BARTIN' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesBartin}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'BATMAN' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesBatman}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'BAYBURT' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesBayburt}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'BİLECİK' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesBilecik}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'BİNGÖL' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesBingol}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'BİTLİS' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesBitlis}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'BOLU' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesBolu}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'BURDUR' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesBurdur}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'BURSA' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesBursa}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ÇANAKKALE' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesCanakkale}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ÇANKIRI' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesCankiri}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ÇORUM' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesCorum}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'DENİZLİ' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesDenizli}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'DİYARBAKIR' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesDiyarbakir}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'DÜZCE' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesDuzce}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'EDİRNE' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesEdirne}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ELAZIĞ' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesElazig}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ERZİNCAN' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesErzincan}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ERZURUM' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesErzurum}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ESKİŞEHİR' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesEskisehir}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'GAZİANTEP' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesGaziantep}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'GİRESUN' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesGiresun}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'GÜMÜŞHANE' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesGumushane}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'HAKKARİ' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesHakkari}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'HATAY' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesHatay}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'IĞDIR' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesIgdir}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ISPARTA' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesIsparta}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'İSTANBUL' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesIstanbul}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'İZMİR' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesIzmir}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'KAHRAMANMARAŞ' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesKahramanmaras}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'KARABÜK' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesKarabuk}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'KARAMAN' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesKaraman}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'KARS' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesKars}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'KASTAMONU' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesKastamonu}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'KAYSERİ' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesKayseri}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'KİLİS' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesKilis}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'KIRIKKALE' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesKirikkale}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'KIRKLARELİ' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesKirklareli}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'KIRŞEHİR' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesKirsehir}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'KOCAELİ' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesKocaeli}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'KONYA' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesKonya}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'KÜTAHYA' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesKutahya}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'MALATYA' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesMalatya}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'MANİSA' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesManisa}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'MARDİN' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesMardin}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'MERSİN' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesMersin}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'MUĞLA' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesMugla}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'MUŞ' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesMus}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'NEVŞEHİR' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesNevsehir}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'NİĞDE' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesNigde}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ORDU' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesOrdu}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'OSMANİYE' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesOsmaniye}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'RİZE' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesRize}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'SAKARYA' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesSakarya}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'SAMSUN' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesSamsun}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ŞANLIURFA' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesSanliurfa}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'SİİRT' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesSiirt}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'SİNOP' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesSinop}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'SİVAS' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesSivas}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ŞIRNAK' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesSirnak}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'TEKİRDAĞ' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesTekirdag}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'TOKAT' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesTokat}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'TRABZON' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesTrabzon}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'TUNCELİ' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesTunceli}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'UŞAK' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesUsak}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'VAN' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesVan}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'YALOVA' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesYalova}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'YOZGAT' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesYozgat}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : cityValue === 'ZONGULDAK' ? (
                                        <RadioBoxForVillages
                                            selectedTown={townValue}
                                            villages={villagesZonguldak}
                                            handleFilters={(filters) => handleFilters(filters, 'village')}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/*<div className="col-sm">
                        {showAllProducts()}
                        {showLoadedProducts()}
                        {loadMoreButton()}
                            </div>
                    */}
                    <div className="col-8" id="show-all-notices">
                        <h2 className="mb-4" style={{ textAlign: 'left', color: 'green' }} id="show-all-notices-text">
                            İlanları Görüntülüyorsunuz
                        </h2>
                        <div className="row">
                            {filteredResults.map((product, i) => (
                                <Cardd key={i} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

//getInitialProps can be used only on pages, not in components.
Index.getInitialProps = () => {
    let skip = 0;
    let limit = 8; //8
    return listProductsAll(skip, limit).then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                products: data.products,
                totalProducts: data.size,
                productsLimit: limit,
                productSkip: skip
            };
        }
    });
};

export default Index;
