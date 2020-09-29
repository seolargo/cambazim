import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faYoutube, faFacebook, faTwitter, faInstagram);

export default function SocialFollow() {
    return (
        <div className="social-container">
            <a href="/" className="youtube social">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>

            <a href="https://www.facebook.com/Cambazim-113928107117730/" className="facebook social">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>

            <a href="https://twitter.com/cambazimtr" className="twitter social">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>

            <a href="https://www.instagram.com/p/CE9WKPFHMgM/" className="instagram social">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
        </div>
    );
}
