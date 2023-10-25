import express from 'express';
import mongoose from 'mongoose';
import router from './routes/route.js'
import methodOverride from 'method-override';
import cors from 'cors';

const port = 3000
const app = express();
app.use(express.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());
app.set('port', port);

app.use('/api',router)

// Connection to MongoDb

mongoose.connect('mongodb://localhost:27017/Books',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('error', function(){
    console.error('MongoDB connection failed')
})

mongoose.connection.once('open', function(){
    console.log('MongoDB connection Successful...')
})

app.listen(port, ()=>
console.log('Server listening on port',port))