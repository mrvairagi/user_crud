import express from 'express';
import path from 'path'
import cors from 'cors'
import helmet from "helmet";
import './config/db.js'
import routes from './routes/index.js';
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

const app = express();
const dirname = path.resolve();

const port = process.env.PORT || 4000

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

routes(app);

app.use(notFound)
app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
