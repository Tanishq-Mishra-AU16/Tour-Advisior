const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

dotenv.config({ path: './config.env'});

// Connection with LocalServer
mongoose.connect('mongodb://localhost/natours-test');

mongoose.connection.once('open', function(){
    console.log("Connection has been made");
}).on('error', function(error){
    console.log('Connection error', error);
});

// READ JSON FILE
// const dat = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
// console.log(dat)
// const tours = JSON.parse(dat);

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours.json`, 'utf-8')
  );
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
  );
const review = JSON.parse(
    fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
  );
// console.log(tours)  

// IMPORT DATA INTO DB
const importData = async () => {
    try{
        await Tour.create(tours);
        await User.create(users, { validateBeforeSave: false});
        await Review.create(review);
        console.log('Data successfully loaded!')
    }
    catch (err) {
        console.log(err);
    }
};

// DELETE ALL DATA FROM DB 
const deleteData = async() => {
    try{
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log('Data successfully deleted!')
    }
    catch (err) {
        console.log(err);
    }
};


if (process.argv[2] === '--import') {
    importData();
}else if (process.argv[2] === '--delete') {
    deleteData();
};

// console.log(process.argv);

