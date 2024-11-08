const userServices = require("../services/userServices")
const { encrypt, decrypt } = require("../utils/encryptor")
const utils = require("../utils")


const userController = {
    createUser: async(req, res)=>{
        try {
            const {name, email, password} = req.body
    
            if(!name|| !email || !password){
                return utils.errorResponse(res, undefined, "Please provide all mandatory fields!!")
            }
            const encryptedPassword = encrypt(password)
            const userCreated = await userServices.createUser(name, email, encryptedPassword)

            return userCreated?utils.successResponse(res, userCreated, "User Signed in successfully!!"): utils.errorResponse(res, undefined,"Couldnt create user, Please try again!!")

        } catch (error) {
            return utils.errorResponse(res, error, "Error in creating user, Please try again!!")
        }
    },
    login: async(req, res)=>{
        try {
            const {email, password} = req.body
            if(!email){
                return utils.errorResponse(res, undefined, "Please provide login credentials!!")
            }

            const user = await userServices.getUserByEmail(email)
            if(!user){
                return utils.errorResponse(res, undefined, "Invalid email or password!!")
            }

            if(decrypt(user.password) == password){
                const response = {
                    userName: user.name,
                    userEmail: user.email,
                }
                response.token = encrypt(JSON.stringify(response))
                return utils.successResponse(res, response, "User login Successful!!")
            }
            return utils.errorResponse(res, undefined, "Invalid email or password!!")
        } catch (error) {
            return utils.errorResponse(res, error, "Error in user login!, Please try again!!")
        }
    }
}

module.exports = userController