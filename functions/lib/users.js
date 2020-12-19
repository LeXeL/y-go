const admin = require('firebase-admin')
const db = admin.firestore()
const rates = require('./rates')

async function addPoundsToUid(uid, packages) {
    // Sum the pounds to uid
    let pounds = 0
    packages.forEach(package => {
        pounds +=
            package.volumetricWeight === 0
                ? parseInt(package.weight)
                : parseInt(package.volumetricWeight)
    })
    db.collection('users')
        .doc(uid)
        .update({poundsCount: admin.firestore.FieldValue.increment(parseInt(pounds))})
}
async function addToLastId() {
    // Sum the count of each shard in the subcollection
    return await db
        .collection('general')
        .doc('lastId')
        .update({lastId: admin.firestore.FieldValue.increment(1)})
}
async function getLastId() {
    // Sum the count of each shard in the subcollection
    return await db
        .collection('general')
        .doc('lastId')
        .get()
        .then(doc => {
            return doc.data()
        })
}

async function createDatabaseWithUserInfo(user) {
    return db
        .collection('users')
        .doc(user.uid)
        .set({
            email: user.email,
            creationTime: Date.now(),
            role: 'user',
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function updateDatabaseWithUserInfo(uid, obj) {
    let lastId = await getLastId()
    return db
        .collection('users')
        .doc(uid)
        .update({
            name: obj.name,
            lastName: obj.lastName,
            box: `YGO${parseInt(lastId.lastId)}`,
            logs: [],
            poundsCount: 0,
            isUpdated: false,
        })
        .then(() => {
            addToLastId()
            console.log('Document successfully written!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function returnUserById(uid) {
    return db
        .collection('users')
        .doc(uid)
        .get()
        .then(doc => {
            if (doc.exists) {
                return doc.data()
            } else {
                console.log('Document no existe')
            }
        })
        .catch(error => {
            return error
        })
}
async function updateUserInfo(uid, userObj) {
    return db
        .collection('users')
        .doc(uid)
        .update(userObj)
        .then(() => {
            console.log('Document successfully written!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function changeVerified(uid, user) {
    return db
        .collection('users')
        .doc(uid)
        .update({isVerified: !user.isVerified})
        .then(() => {
            console.log('Document successfully written!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function returnAllUsers() {
    let users = []
    await db
        .collection('users')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                users.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return users
}
async function returnUserRateByBox(box) {
    let users = await returnAllUsers()
    let allRates = await rates.returnAllRates()
    let currentSelectedUser = users.find(user => user.box === box)
    return allRates.find(rate => currentSelectedUser.rate === rate.id)
}

async function returnUserUidByBox(box) {
    let users = await returnAllUsers()
    let currentSelectedUser = users.find(user => user.box === box)
    return currentSelectedUser !== undefined ? currentSelectedUser.id : 'none'
}
async function returnUserEmailByBox(box) {
    let users = await returnAllUsers()
    let currentSelectedUser = users.find(user => user.box === box)
    return currentSelectedUser !== undefined ? currentSelectedUser.email : 'none'
}
async function returnUserNameByBox(box) {
    let users = await returnAllUsers()
    let currentSelectedUser = users.find(user => user.box === box)
    return currentSelectedUser !== undefined
        ? `${currentSelectedUser.name} ${currentSelectedUser.lastName}`
        : 'none'
}
module.exports = {
    addPoundsToUid,
    createDatabaseWithUserInfo,
    updateDatabaseWithUserInfo,
    returnUserById,
    updateUserInfo,
    changeVerified,
    returnAllUsers,
    returnUserRateByBox,
    returnUserUidByBox,
    returnUserEmailByBox,
    returnUserNameByBox,
}
