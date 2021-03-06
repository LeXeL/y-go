import Request from './request'

//Example
// export const getAllItems = () =>
//     Request.get('/allitems', {
//         'Content-Type': 'application/json',
//     })

//USERS
export const updateUserWithInfo = data =>
    Request.post('/updateUserWithInfo', data, {
        'Content-Type': 'application/json',
    })
export const createuserondatabase = data =>
    Request.post('/createUserOnDatabase', data, {
        'Content-Type': 'application/json',
    })
export const getUserInformationById = data =>
    Request.post('/getUserInformationById', data, {
        'Content-Type': 'application/json',
    })
export const UpdateUserInformationById = data =>
    Request.post('/UpdateUserInformationById', data, {
        'Content-Type': 'application/json',
    })
export const ReturnAllUsers = data =>
    Request.post('/ReturnAllUsers', data, {
        'Content-Type': 'application/json',
    })
export const ReturnAllAffiliateCardNo = data =>
    Request.post('/ReturnAllAffiliateCardNo', data, {
        'Content-Type': 'application/json',
    })
export const DeleteAffiliateCardNo = data =>
    Request.post('/DeleteAffiliateCardNo', data, {
        'Content-Type': 'application/json',
    })
export const ApproveBusinessRequest = data =>
    Request.post('/ApproveBusinessRequest', data, {
        'Content-Type': 'application/json',
    })
//PACKAGES
export const CreatePackageOnDatabase = data =>
    Request.post('/CreatePackageOnDatabase', data, {
        'Content-Type': 'application/json',
    })
export const createPackagesFromXls = data =>
    Request.post('/createPackagesFromXls', data, {
        'Content-Type': 'application/json',
    })
export const UpdatePackageInformationById = data =>
    Request.post('/UpdatePackageInformationById', data, {
        'Content-Type': 'application/json',
    })
export const UpdateGroupPackages = data =>
    Request.post('/UpdateGroupPackages', data, {
        'Content-Type': 'application/json',
    })
export const DeletePackageOnDatabase = data =>
    Request.post('/DeletePackageOnDatabase', data, {
        'Content-Type': 'application/json',
    })
export const ReturnAllPackages = data =>
    Request.post('/ReturnAllPackages', data, {
        'Content-Type': 'application/json',
    })
export const ReturnAllPackagesWithoutInvoice = data =>
    Request.post('/ReturnAllPackagesWithoutInvoice', data, {
        'Content-Type': 'application/json',
    })
export const ReturnAllPackagesWithInvoice = data =>
    Request.post('/ReturnAllPackagesWithInvoice', data, {
        'Content-Type': 'application/json',
    })

//RATES
export const CreateRateOnDatabase = data =>
    Request.post('/CreateRateOnDatabase', data, {
        'Content-Type': 'application/json',
    })
export const UpdateRateInformationById = data =>
    Request.post('/UpdateRateInformationById', data, {
        'Content-Type': 'application/json',
    })
export const DeleteRateOnDatabase = data =>
    Request.post('/DeleteRateOnDatabase', data, {
        'Content-Type': 'application/json',
    })
export const ReturnAllRates = data =>
    Request.post('/ReturnAllRates', data, {
        'Content-Type': 'application/json',
    })
//INVOICES
export const CreateInvoiceOnDatabase = data =>
    Request.post('/CreateInvoiceOnDatabase', data, {
        'Content-Type': 'application/json',
    })
export const returnAllInvoices = data =>
    Request.post('/returnAllInvoices', data, {
        'Content-Type': 'application/json',
    })
export const returnInvoiceById = data =>
    Request.post('/returnInvoiceById', data, {
        'Content-Type': 'application/json',
    })
export const returnAllInvoiceByUid = data =>
    Request.post('/returnAllInvoiceByUid', data, {
        'Content-Type': 'application/json',
    })
export const UpdateInvoiceInformationById = data =>
    Request.post('/UpdateInvoiceInformationById', data, {
        'Content-Type': 'application/json',
    })
export const payInvoices = data =>
    Request.post('/payInvoices', data, {
        'Content-Type': 'application/json',
    })
//USER PROFILE
export const returnUserProfileInformation = data =>
    Request.post('/returnUserProfileInformation', data, {
        'Content-Type': 'application/json',
    })
