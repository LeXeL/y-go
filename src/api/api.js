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
export const ChangeUserVerified = data =>
    Request.post('/ChangeUserVerified', data, {
        'Content-Type': 'application/json',
    })
export const ReturnAllUsers = data =>
    Request.post('/ReturnAllUsers', data, {
        'Content-Type': 'application/json',
    })

//CATEGORIES
export const CreateCategoryInDatabase = data =>
    Request.post('/CreateCategoryInDatabase', data, {
        'Content-Type': 'application/json',
    })
export const DeleteCategoryInDatabase = data =>
    Request.post('/DeleteCategoryInDatabase', data, {
        'Content-Type': 'application/json',
    })
export const ReturnAllCategories = data =>
    Request.post('/ReturnAllCategories', data, {
        'Content-Type': 'application/json',
    })

//SUBCATEGORIES
export const CreateSubCategoryInDatabase = data =>
    Request.post('/CreateSubCategoryInDatabase', data, {
        'Content-Type': 'application/json',
    })
export const DeleteSubCategoryInDatabase = data =>
    Request.post('/DeleteSubCategoryInDatabase', data, {
        'Content-Type': 'application/json',
    })
export const ReturnAllSubCategories = data =>
    Request.post('/ReturnAllSubCategories', data, {
        'Content-Type': 'application/json',
    })

//SERVICES
export const CreateServiceInDatabase = data =>
    Request.post('/CreateServiceInDatabase', data, {
        'Content-Type': 'application/json',
    })
export const DeleteServiceInDatabase = data =>
    Request.post('/DeleteServiceInDatabase', data, {
        'Content-Type': 'application/json',
    })
export const ReturnAllServices = data =>
    Request.post('/ReturnAllServices', data, {
        'Content-Type': 'application/json',
    })

//PUBLICATIONS
export const CreatePublicationInDatabase = data =>
    Request.post('/CreatePublicationInDatabase', data, {
        'Content-Type': 'application/json',
    })
export const DeletePublicationInDatabase = data =>
    Request.post('/DeletePublicationInDatabase', data, {
        'Content-Type': 'application/json',
    })
export const ReturnAllPublicationsByUserId = data =>
    Request.post('/ReturnAllPublicationsByUserId', data, {
        'Content-Type': 'application/json',
    })
export const ReturnAllPublicationsByService = data =>
    Request.post('/ReturnAllPublicationsByService', data, {
        'Content-Type': 'application/json',
    })
export const ReturnAllRecentPublications = data =>
    Request.post('/ReturnAllRecentPublications', data, {
        'Content-Type': 'application/json',
    })
export const ReturnAllPublications = data =>
    Request.post('/ReturnAllPublications', data, {
        'Content-Type': 'application/json',
    })
