const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
// const { seedDB } = require('./seed');
// const { doesNotThrow } = require('node:assert');

dotenv.config({ path: './config.env'});

// Connection with Atlas

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
// mongoose
//     .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindModify: false
// })
// .then(con => {
//     console.log(con.connections);
//     console.log('DB connection successful');
// });

// Connection with LocalServer
mongoose.connect('mongodb://localhost/natours-test');
mongoose.set('useNewUrlParser', true);

mongoose.connection.once('open', function(){
    console.log("Connection has been made");

    // seedDB()
}).on('error', function(error){
    console.log('Connection error', error);
});


// console.log(process.env);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION! Shutting down...');
    server.close(() => {
        process.exit(1);
    })
})
process.on('unhandledException', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED EXCEPTION! Shutting down...');
    server.close(() => {
        process.exit(1);
    })
})
