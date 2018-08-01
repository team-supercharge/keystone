import _ from 'lodash';

export const StoolColormap = {
    1: '#4575b4',
    2: '#91bfdb',
    3: '#e0f3f8',
    4: '#efefbf',
    5: '#edd187',
    6: '#fc8d59',
    7: '#d73027',
};

export function isStoolBloody (desc) {
    return desc.match(/was bloody/i);
};

export function isStoolOffensive (desc) {
    return desc.match(/offensive smelling/i);
};

export function isStoolMucus (desc) {
    return desc.match(/contained mucus/i);
};

export function getStoolColor (desc) {
    const p = new RegExp('stool\\swas\\s[a-zA-Z]+', 'i');
    let stoolColor = desc.match(p);
    return stoolColor ? stoolColor[0].split(' ').slice(-1) : null;
};
