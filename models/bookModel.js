import mongoose from 'mongoose';

let bookSchema = new mongoose.Schema({
    title:{type:String},
    author:{type:String},
    description:{type:String},
    publishedYear:{type: Date},
    ISBN:{type:String},
    date_time: { type: String },
});

let bookModel = mongoose.model('Books',bookSchema);
export default bookModel;