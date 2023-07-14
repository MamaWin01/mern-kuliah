import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

// Routes
import userRoutes from './routes/userRoutes.js'
import karyawanRoutes from './routes/karyawanRoutes.js'
import jabatanRoutes from './routes/jabatanRoutes.js'
import kehadiranRoutes from './routes/kehadiranRoutes.js'

// setup process.env
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const port = process.env.PORT;

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(cors())

app.use('/', userRoutes);
app.use('/', karyawanRoutes);
app.use('/', jabatanRoutes);
app.use('/', kehadiranRoutes);

// Auth = Login Register Logout

// Data karyawan = Create, read, update, delete

// Data Jabatan

// Data kehadiran = Create, read, update, delete

// Data Gaji
// https://www.youtube.com/watch?v=jqnDsRzwRag
app.listen(port, () => {
  console.log(`Server running on port http://127.0.0.1:${port}`);
});