import xhr from 'xhr';

const getJSON = ({ url }) => {
    return new Promise((resolve, reject) => {
        xhr({
            url,
            responseType: 'json',
            method: 'GET',
            headers: Object.assign({}, Keystone.csrf.header)
        }, (err, res) => {
            if (err) {
                console.log(err);
                reject({
                    message: "The logs could not be loaded at this time."
                });
            } else {
                resolve(res.body);
            };
        });
    });
}

export const fetchResidentLogs = (residentId) => {
    const url = `${Keystone.adminPath}/api/reports/logs/${residentId}`;
    return getJSON({ url });
};

export const fetchResidentInfo = (residentId) => {
    const url = `${Keystone.adminPath}/api/residents/${residentId}`;
    return getJSON({ url });
};

export const fetchResidentsList = () => {
    // admin/api/residents
    const url = `${Keystone.adminPath}/api/reports/residents`;
    return getJSON({ url });
}

export default fetchResidentLogs;

