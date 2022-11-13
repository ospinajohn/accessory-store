import dotenv from 'dotenv';
import app from './app.js';
import connectDatabase from './config/database.js';
import cloudinary from 'cloudinary';

dotenv.config({ path: 'backend/config/config.env' });

// configure clodonary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT;
const node_env = process.env.NODE_ENV;

connectDatabase();

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port} in ${node_env} mode`);
});
