import firebase from 'firebase/app'
import cloudMessaging from 'firebase/messaging'
import xhr from 'xhr'
import Swal from 'sweetalert2'
import theme from '../theme'
import { browserName } from 'react-device-detect'

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDrgw5aHG9His4a9x-xU9EhwkHtCsdQ80g",
    authDomain: "logmycare.firebaseapp.com",
    databaseURL: "https://logmycare.firebaseio.com",
    projectId: "logmycare",
    storageBucket: "logmycare.appspot.com",
    messagingSenderId: "337870171244"
};

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

const handleIncident = (payload) => {
    const { carerName, residentName, itemName } = payload.data

    let text;
    if (itemName.match(/Fall/)) {
      text = `${residentName} has had a fall.`;
    }
    if (itemName.match(/Assault/)) {
      text = `${residentName} has been involved in an assault.`;
    }
    if (itemName.match(/Medication/)) {
      text = `${residentName} has had a medication error.`;
    }
    if (itemName.match(/Missing/)) {
      text = `${residentName} has been reported as missing.`;
    }
    if (itemName.match(/Injury/)) {
      text = `${residentName} has had an injury.`;
    }

    Swal.fire({
        title,
        type: 'warning',
        html: `<p>${text}</p><p>Logged by: ${carerName}</p>`,
        confirmButtonColor: theme.color.info,
    })
}

export default () => {
    if (firebase.messaging.isSupported()) {
        firebase.initializeApp(FIREBASE_CONFIG);
        const messaging = firebase.messaging();
        messaging.usePublicVapidKey('BGGJ6DUZjryd06qgcEU-T1RsxbLK4cWVDLP7m4snIf0YUK6Iw3TvQtd359QNyqXxDU2A5juyrcWR7z23Sc-w75I');

        messaging.requestPermission()
            .then(() => {
                return messaging.getToken()
            })
            .then((token) => {
                register(token)
            })
            .catch((err) => {
                console.log(err)
            })

        messaging.onMessage(payload => {
            switch (payload.data.type) {
                case 'incident':
                    handleIncident(payload)
                    break;
                default:
                    break;
            }
        })
    }
}