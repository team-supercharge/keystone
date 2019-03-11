import xhr from 'xhr'
import { browserName } from 'react-device-detect'

const register = (token) => {
    return new Promise((resolve, reject) => {
        xhr({
            url: `${Keystone.adminPath}/api/notifications/subscribe`,
            method: 'POST',
            headers: Object.assign({}, Keystone.csrf.header),
            json: { token }
        }, (err, resp, body) => {
            if (err || body && body.error) {
                reject({
                    message: body.error
                })
            } else {
                resolve(resp)
            }
        })
    })
}

export default register