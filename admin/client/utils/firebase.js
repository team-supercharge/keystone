import firebase from 'firebase/app'
import cloudMessaging from 'firebase/messaging'

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDrgw5aHG9His4a9x-xU9EhwkHtCsdQ80g",
    authDomain: "logmycare.firebaseapp.com",
    databaseURL: "https://logmycare.firebaseio.com",
    projectId: "logmycare",
    storageBucket: "logmycare.appspot.com",
    messagingSenderId: "337870171244"
};

const register = (token) => {
    console.log(Keystone.user, token)
}

export default () => {
    if (firebase.messaging.isSupported()) {
        firebase.initializeApp(FIREBASE_CONFIG);
        const messaging = firebase.messaging();
        messaging.usePublicVapidKey('BGGJ6DUZjryd06qgcEU-T1RsxbLK4cWVDLP7m4snIf0YUK6Iw3TvQtd359QNyqXxDU2A5juyrcWR7z23Sc-w75I');

        messaging.requestPermission()
        .then(() => {
            console.log('Got permission')
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