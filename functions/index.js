const functions = require('firebase-functions')
const admin = require('firebase-admin')

var serviceAccount = require('./credentials.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://tareax-bfce8.firebaseio.com',
})

const cors = require('cors')({
    origin: true,
})
const users = require('./lib/users')
const packages = require('./lib/packages')
const rates = require('./lib/rates')
const invoices = require('./lib/invoices')

exports.createUserOnDatabase = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await users.createDatabaseWithUserInfo(req.body.user)
            functions.logger.info('createDatabaseWithUserInfo', {
                userCreated: req.body.user,
            })
            res.status(200).send({status: 'Created'})
        } catch (err) {
            functions.logger.error('createDatabaseWithUserInfo', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})

exports.updateUserWithInfo = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await users.updateDatabaseWithUserInfo(req.body.uid, req.body.obj)
            functions.logger.info('updateDatabaseWithUserInfo', {
                userUpdated: req.body.uid,
                userInfo: req.body.obj,
            })
            res.status(200).send({status: 'Updated'})
        } catch (err) {
            functions.logger.error('updateUserWithInfo', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})

exports.getUserInformationById = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await users.returnUserById(req.body.uid)
            functions.logger.info('getUserInformationById', {
                userUpdated: req.body.uid,
            })
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('getUserInformationById', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.UpdateUserInformationById = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await users.updateUserInfo(req.body.uid, req.body.user)
            functions.logger.info('UpdateUserInformationById', {
                userUpdated: req.body.uid,
                userInfo: req.body.user,
            })
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('UpdateUserInformationById', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.ReturnAllUsers = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await users.returnAllUsers()
            functions.logger.info('ReturnAllUsers')
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('ReturnAllUsers', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})

//PACKAGES
exports.CreatePackageOnDatabase = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await packages.createPackage(req.body.package)
            functions.logger.info('CreatePackageOnDatabase', {
                package: req.body.package,
            })
            res.status(200).send({status: 'Created'})
        } catch (err) {
            functions.logger.error('CreatePackageOnDatabase', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.createPackagesFromXls = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await packages.createPackagesFromXls(req.body.packages)
            functions.logger.info('createPackagesFromXls', {
                package: req.body.packages,
            })
            res.status(200).send({status: 'Created'})
        } catch (err) {
            functions.logger.error('createPackagesFromXls', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.UpdatePackageInformationById = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await packages.updatePackage(req.body.id, req.body.package)
            functions.logger.info('UpdatePackageInformationById', {
                packageUpdated: req.body.id,
                packageInfo: req.body.package,
            })
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('UpdatePackageInformationById', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.DeletePackageOnDatabase = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await packages.deletePackage(req.body.id)
            functions.logger.info('DeletePackageOnDatabase', {
                packageId: req.body.id,
            })
            res.status(200).send({status: 'Created'})
        } catch (err) {
            functions.logger.error('DeletePackageOnDatabase', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.ReturnAllPackages = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await packages.returnAllPackages()
            functions.logger.info('ReturnAllPackages')
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('ReturnAllPackages', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.ReturnAllPackagesWithoutInvoice = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await packages.returnAllPackagesWithoutInvoice()
            functions.logger.info('ReturnAllPackagesWithoutInvoice')
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('ReturnAllPackagesWithoutInvoice', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.ReturnAllPackagesWithInvoice = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await packages.returnAllPackagesWithInvoice()
            functions.logger.info('ReturnAllPackagesWithInvoice')
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('ReturnAllPackagesWithInvoice', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})

//RATES
exports.CreateRateOnDatabase = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await rates.createRate(req.body.rate)
            functions.logger.info('CreateRateOnDatabase', {
                rate: req.body.rate,
            })
            res.status(200).send({status: 'Created'})
        } catch (err) {
            functions.logger.error('CreateRateOnDatabase', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.UpdateRateInformationById = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await rates.updateRate(req.body.id, req.body.rate)
            functions.logger.info('UpdateRateInformationById', {
                rateUpdated: req.body.id,
                rateInfo: req.body.rate,
            })
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('UpdateRateInformationById', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.DeleteRateOnDatabase = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await rates.deleteRate(req.body.id)
            functions.logger.info('DeleteRateOnDatabase', {
                rateId: req.body.id,
            })
            res.status(200).send({status: 'Created'})
        } catch (err) {
            functions.logger.error('DeleteRateOnDatabase', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.ReturnAllRates = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await rates.returnAllRates()
            functions.logger.info('ReturnAllRates')
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('ReturnAllRates', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
//INVOICES
exports.CreateInvoiceOnDatabase = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await invoices.createInvoice(req.body.by)
            functions.logger.info('CreateRateOnDatabase')
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('CreateRateOnDatabase', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.returnAllInvoices = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await invoices.returnAllInvoices()
            functions.logger.info('returnAllInvoices')
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('returnAllInvoices', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.returnInvoiceById = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await invoices.returnInvoiceById(req.body.id)
            functions.logger.info('returnAllInvoices', {id: req.body.id})
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('returnAllInvoices', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
