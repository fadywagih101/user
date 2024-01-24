import express from 'express';
import { dataSource } from '../dataSources';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { loggerMiddleware } from './middlewares/loggermiddleware';
import mainRouter from './api/routes/mainRouter';
import { errorHandlerMiddleware } from './middlewares/errorhandlermiddleware';

dotenv.config();
dataSource.initialize()
    .then(() => {
        const app = express();
        const port = 3000;
        app.use(express.json());
        app.use(morgan('dev'));
        app.use(loggerMiddleware);


        app.use((req, res, next) => {
            // console.log(`Method: ${req.method}, URL: ${req.url}, IP: ${req.ip} , BODY ${req.body}`);
            next();
        });
        app.use('/api', mainRouter);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        app.use(errorHandlerMiddleware);
    })
    .catch(error => {
        console.error('Error establishing database connection:', error);
    });
