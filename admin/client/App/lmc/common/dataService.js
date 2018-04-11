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

export function fetchResidentLogs (residentId) {
    const url = `${Keystone.adminPath}/api/reports/logs/${residentId}`;
    return getJSON({ url });
};

export function fetchResidentInfo (residentId) {
    const url = `${Keystone.adminPath}/api/residents/${residentId}`;
    return getJSON({ url });
};

export function fetchResidents () {
    const url = `${Keystone.adminPath}/api/residents`;
    return getJSON({ url });
}

// export function fetchLogs () {
//     const url = `${Keystone.adminPath}/api/logs`;
//     return getJSON({ url });
// }

export function fetchDailyLogs () {
    const url = `${Keystone.adminPath}/api/daily/logs`;
    return getJSON({ url });
}

export function fetchTasks () {
    const url = `${Keystone.adminPath}/api/tasks`;
    return getJSON({ url });
}

export function fetchDailyTasks () {
    const url = `${Keystone.adminPath}/api/daily/tasks`;
    return getJSON({ url });
}

export function fetchCarers () {
    const url = `${Keystone.adminPath}/api/users`;
    return getJSON({ url });
}

export function fetchHome () {
    const url = `${Keystone.adminPath}/api/homes`;
    return getJSON({ url });
}
