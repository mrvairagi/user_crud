import mongoose from "mongoose";
import crypto from 'node:crypto'


// Creating salt for all users
const salt = 'f849b09bf37c'
const iterations = 10

const { Model, Schema } = mongoose

const schema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    authToken: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

class Users extends Model {
    static async getByName() { return await this.findOne({ name: 'Jon' }).exec(); }

    static async encPassword(password) {
        // Hash user password and salt using 10 iterations
        let hash = crypto.pbkdf2Sync(password, salt, iterations, 20, `sha512`).toString(`hex`);
        return hash
    }

    static async verificationToken() {
        let token = crypto.randomBytes(40).toString('hex');
        return token
    }

}

const dbSchema = mongoose.model(Users, schema);
// OR
// const dbSchema = mongoose.model('users', schema);
export default dbSchema
