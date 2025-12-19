const { Client } = require("pg");
(async () => {
	const conn = process.env.DATABASE_URL || "postgresql://localhost:5432/biotrack_db";
	const client = new Client({ connectionString: conn });
	await client.connect();
	const q = `
    SELECT c.conname,
           t.relname AS table_name,
           rt.relname AS ref_table_name,
           array_agg(a.attname) AS columns
    FROM pg_constraint c
    JOIN pg_class t ON c.conrelid = t.oid
    JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = ANY(c.conkey)
    JOIN pg_class rt ON c.confrelid = rt.oid
    WHERE c.contype='f' AND t.relname = 'storage'
    GROUP BY c.conname, t.relname, rt.relname
  `;
	const res = await client.query(q);
	console.log(JSON.stringify(res.rows, null, 2));
	await client.end();
})().catch((e) => {
	console.error(e);
	process.exit(1);
});
