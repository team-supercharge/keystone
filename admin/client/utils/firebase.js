import firebase from 'firebase/app'
import cloudMessaging from 'firebase/messaging'
import xhr from 'xhr'
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

        messaging.onMessage((payload) => {
            console.log('onMessage', payload)
        })
    }
}