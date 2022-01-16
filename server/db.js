import { Pool } from "pg";

const dbUrl = process.env.DATABASE_URL || "postgres://localhost:5432/asd";

export const pool = new Pool({
	connectionString: dbUrl,
	connectionTimeoutMillis: 5000,
	ssl: dbUrl.includes("localhost") ? false : { rejectUnauthorized: false },
});

/**
 * above `connectionString` will require system user being able to access the `asd` db
 * if not allowed, then you might see error:
 * 	Error: role "Pavel" does not exist
 * troubleshooting:
 * loging to psql and connect to the asd db, the run below script:
 * create user "Pavel" with login;
 */

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
