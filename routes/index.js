import auth from './auth.js'
import users from './users.js'

const API_INITIAL = '/api/v1'

function initialize(app) {
    app.use(`${API_INITIAL}/auth`, auth);
    app.use(`${API_INITIAL}/user`, users);
}

export default initialize;