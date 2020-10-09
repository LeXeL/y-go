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
//PACKAGES
export const CreatePackageOnDatabase = data =>
    Request.post('/CreatePackageOnDatabase', data, {
        'Content-Type': 'application/json',
    })
export const UpdatePackageInformationById = data =>
    Request.post('/UpdatePackageInformationById', data, {
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
