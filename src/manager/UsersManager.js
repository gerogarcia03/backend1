import { usersModel } from "../db/models/users.models.js";

class UsersManagers {

    async createUser(user){
        try {
            const newUser = await usersModel.create(user)
            return newUser
        } catch (error) {
            return error
        }
    } 

    async findUser(username) {
        try {
            const user = await usersModel.find({username})
            return user
        } catch (error) {
            return error
        }
    }

    async findUserById(id) {
        try {
            const user = await usersModel.findById(id)
            return user
        } catch (error) {
            return error
        }
    }

    async deleteUser(username) {
        try{
            const user = await usersModel.findOneAndDelete({username})
            return user
        } catch (error) {
            return error
        }
    }

}

export const usersManagers = new UsersManagers()