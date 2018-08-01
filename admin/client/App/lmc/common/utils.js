export const StoolColormap = {
    1: '#4575b4',
    2: '#91bfdb',
    3: '#e0f3f8',
    4: '#efefbf',
    5: '#edd187',
    6: '#fc8d59',
    7: '#d73027',
};

export function isStool ({ item }) {
    return item && item.match(/stool/i);
};

export function isStoolBloody ({ description }) {
    return description.match(/was bloody/i);
};

export function isStoolOffensive ({ description }) {
    return description.match(/offensive smelling/i);
};

export function isStoolMucus ({ description }) {
    return description.match(/contained mucus/i);
};

export function getStoolColor ({ description }) {
    const p = new RegExp('stool\\swas\\s[a-zA-Z]+', 'i');
    let stoolColor = description.match(p);
    return stoolColor ? stoolColor[0].split(' ').slice(-1) : null;
};
