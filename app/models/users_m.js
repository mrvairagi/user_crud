import Users from '../schema/users.js'

class users_m {
    static getAll = async() => {
        let result = await Users.find()
        return {status: true, msg: '', data: result}
    }

    static create = async(params) => {
        let user = await Users.findOne({email: params.email}).lean()
        if(!user){
            let hashPass = await Users.encPassword(params.password)
            let token = await Users.verificationToken()
            let saveUser = {
                name: params.name,
                email: params.email,
                password: hashPass,
                authToken: token
            }
            try{
                let isCreated = await Users.create(saveUser)
                delete isCreated.password
                return {status: true, msg: 'User created successfully', data: isCreated}
            } catch(err) {
                return {status: false, msg: err.message, data: {}}
            }
        } else {
            return {status: false, msg: 'Email alreayd exist', data: {}}
        }
    }

    static update = async(params) => {
        let where = {email: params.email}
        let user = await Users.findOne(where).lean()
        if(user){
            let saveData = {}
            if(params?.name) saveData.name = params.name

            try{
                let isUpdated = await Users.updateOne(where, saveData)
                return {status: true, msg: 'Data saved successfully', data: {}}
            } catch(err) {
                return {status: false, msg: err.message, data: {}}
            }
        }else {
            return {status: false, msg: 'User does not exist', data: {}}
        }
    }

    static delete = async(params) => {
        let where = {_id: params.id}
        let user = await Users.findOne(where).lean()

        if(user){
            try{
                let isDeleted = await Users.deleteOne(where)
                return {status: true, msg: 'Data deleted successfully', data: {}}
            } catch(err) {
                return {status: false, msg: err.message, data: {}}
            }
        }else {
            return {status: false, msg: 'User does not exist', data: {}}
        }
    }
}

export default users_m