import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; 


import loadRoute from './routes/load.routes';


const app = express();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));


app.get('/', (req, res) => {
  res.json({ message: 'Seminario de sistemas 1 - 2S2023 '});
})


app.use('/api', loadRoute);

export default app;