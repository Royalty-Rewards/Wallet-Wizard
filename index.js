/*
Firebase - Ethereum serverless functions
Copyright (C) 2018 Piers Mana @piersmana

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Web3 = require('web3');

admin.initializeApp(functions.config().firebase);
const database  = admin.database();
const firestore = admin.firestore();

const webZ = {
    "eth": {
        "mainnet": {
            "infura": new Web3(
                new Web3.providers.HttpProvider(functions.config().eth.mainnet.infura)
            )
        },
        "rinkeby": {
            "infura": new Web3(
                new Web3.providers.HttpProvider(functions.config().eth.rinkeby.infura)
            )
        }
    }
};

exports.webhook = functions.https.onRequest((request, response) => {
    //database.ref("/__gatekeeper/").push(request)
    //   .then(response.send)
    //  .catch(() => {response.send('{}');});
});

exports.onUserCreate = functions.auth.user().onCreate(event => {
    let uid = event.data.uid;
    let lpp = database.ref(uid);
    let _lpp = firestore.collection('z').doc(uid);

    let _eth_mainnet_infura = webZ.eth.mainnet.infura.eth.accounts.create(entropy(20));
    let _eth_rinkeby_infura = webZ.eth.rinkeby.infura.eth.accounts.create(entropy(20));

    let accounts = {
        "eth": {
            "mainnet": _eth_mainnet_infura.address,
            "rinkeby": _eth_rinkeby_infura.address
        },
        "verified": false
    };

    let _accounts = {
        "eth": {
            "mainnet": _eth_mainnet_infura.privateKey,
            "rinkeby": _eth_rinkeby_infura.privateKey
        },
        "verified": false
    }

    return _lpp.set(_accounts, { merge: true }).then(() => {
        return lpp.set(accounts);
    })
        .catch((error) => {
        });
});

exports.onUserDelete = functions.auth.user().onDelete((event) => {
    // Complicated stuff! Don't delete data but disconnect owned objects/rehome OPACs etc.
});

exports.onUserStart = functions.database.ref("/{uid}/start").onCreate(event => {
    start_session(event.params.uid,event.data);
});

exports.onUserRequest = functions.database.ref("/{uid}/service-account").onWrite(event => {
    service_account(event.params.uid,event.data);
});

exports.onUserQuit = functions.database.ref("/{uid}/quit").onCreate(event => {
});

exports.onUserUpdate = functions.database.ref("/{uid}").onUpdate(event => {
    end_session(event.params.uid,event.data);
});

exports.onUserRemove = functions.database.ref("/{uid}").onDelete(event => {
    end_session(event.params.uid,event.data);
});

function start_session(uid, data) {
}

function service_account(uid, session, data) {
    // Do work, write back
}

function end_session(uid, data) {
}

function entropy(bytes) {
    let b;
    if (bytes) {
        b = bytes;
    } else {
        b = 20;
    }
    return webZ.eth.mainnet.infura.utils.randomHex(b);
}
