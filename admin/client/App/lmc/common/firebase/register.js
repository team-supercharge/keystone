import xhr from 'xhr'
import { browserName } from 'react-device-detect'

const register = (token) => {
    return new Promise((resolve, reject) => {
        xhr({
            url: `${Keystone.adminPath}/api/devices/register`,
            method: 'POST',
            headers: Object.assign({}, Keystone.csrf.header),
            json: {
                token,
                deviceID: Keystone.user.id,
                deviceType: 'Browser',
                platform: browserName
            }
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