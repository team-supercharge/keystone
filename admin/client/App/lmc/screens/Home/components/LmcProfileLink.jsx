
import { Link } from 'react-router';
import React from 'react';

const PLACEHOLDER_IMAGE = 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092141/profile_pic_placeholder.png';

const formatName = (name) => {
    let n = name.split(' ');
    n = (n.length > 1)
        ? `${ n[0] } ${ n[1][0] }`
        : name;
    if (n.length > 9) n = n.substr(0, 7) + '..';
    return n;
};


const LmcProfileLink = ({ picture, name, to, key }) => {

    return (
        <Link key={key}
            to={to}
            alt={name}
            className="lmc-profile-link">
            <div className="lmc-profile-picture" style={{ background: `url(${picture || PLACEHOLDER_IMAGE})` }}></div>
            <p style={{ fontSize: 11, color: 'black', opacity: 0.5 }}>
                { formatName(name) }
            </p>
        </Link>
    )
}

export default LmcProfileLink;
