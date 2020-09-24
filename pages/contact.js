import Layout from '../components/Layout';
import Link from 'next/link';
import ContactForm from '../components/form/ContactForm';

const Contact = () => {
    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 offset-md-2 mt-3">
                        <h2 style={{color: 'green'}}>
                            Bizimle İletişime Geçebilirsiniz
                        </h2>
                        <p>
                            İstek ve şikayetleriniz ile ilgili olarak bizimle iletişime geçebilirsiniz. 
                            Sistem uzmanlarımız en kısa sürede sizinle iletişime geçeceklerdir.
                        </p>
                        <hr />
                        <ContactForm />
                        <hr />
                    </div>                   
                </div>
            </div>
        </Layout>
    );
};


export default Contact;