import dotenv from 'dotenv';
import app from './app.js';
import connectDatabase from './config/database.js';

dotenv.config({ path: 'backend/config/config.env' });

const port = process.env.PORT;
const node_env = process.env.NODE_ENV;

connectDatabase();

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port} in ${node_env} mode`);
});
