import mongoose from 'mongoose';

// con then connect to database

// const connectDatabase = () => {
//     mongoose.connect(process.env.DB_LOCAL_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }).then(con => {
//         console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);   
// };

// Con async and wait
const connectDatabase = async() => {
    try {
        const con = await mongoose.connect(process.env.DB_LOCAL_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    } catch (error) {
        console.log({
            msg : error
        });
    }
}

export default connectDatabase;
