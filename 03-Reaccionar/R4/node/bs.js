import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_aGdRAwSQt59y@ep-rapid-mud-a2idvhuh.eu-central-1.aws.neon.tech/neondb?sslmode=require',
  ssl: {
    rejectUnauthorized: false
  }
});
