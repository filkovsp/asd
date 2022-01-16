import { Pool } from "pg";

const dbUrl = process.env.DATABASE_URL || "postgres://localhost:5432/asd";

export const pool = new Pool({
	// connectionString: dbUrl,
	host: "localhost",
	port: 5432,
	database: "asd",
	user: "postgres",
	password: "postgres",
	connectionTimeoutMillis: 5000,
	ssl: dbUrl.includes("localhost") ? false : { rejectUnauthorized: false },
});

export const connectDb = async () => {
	let client;
	try {
		client = await pool.connect();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	console.log("Postgres connected to", client.database);
	client.release();
};

export const disconnectDb = () => pool.close();
export default { query: pool.query.bind(pool) };
