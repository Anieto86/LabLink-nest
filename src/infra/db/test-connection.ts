import { db } from './client';

async function testDbConnection() {
  try {
    // Try a simple query (replace 'users' with your table name)
    const result = await db.query.users.findMany();
    console.log('✅ DB connection successful! Users:', result);
  } catch (error) {
    console.error('❌ DB connection failed:', error);
    process.exit(1);
  }
}

testDbConnection();
