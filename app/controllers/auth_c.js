import { validationResult } from 'express-validator'
import auth_m from "../models/auth_m.js";

class auth_c {

    static register = async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let params = req.body
        let result = await auth_m.register(params)
        res.json(result)
    }

    static login = async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        let params = req.body
        let result = await auth_m.login(params)
        res.json(result)
    }
}

export default auth_c