import Users from '../schema/users.js'


class auth_m {

    static register = async(params) => {
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
                return {status: false, msg: 'User registration successful', data: isCreated}
            } catch(err) {
                return {status: false, msg: err.message, data: {}}
            }
        } else {
            return {status: false, msg: 'Email alreayd exist', data: {}}
        }
    }

    static login = async(params) => {
        let hashPass = await Users.encPassword(params.password) 
        let user = await Users.findOne({email: params.email, password: hashPass}).lean()
        if(user){
            return {status: false, msg: 'User login successful', data: user}
        } else {
            return {status: false, msg: 'Wrong credential', data: {}}
        }
    }
}

export default auth_m