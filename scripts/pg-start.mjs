import EmbeddedPostgres from "embedded-postgres";

const pg = new EmbeddedPostgres({
  databaseDir: "/tmp/rrh-pgdata",
  user: "rrh",
  password: "rrh",
  port: 5433,
  persistent: true,
});

const fresh = process.argv.includes("--init");
if (fresh) {
  await pg.initialise();
}
await pg.start();
try {
  await pg.createDatabase("rrh");
} catch (e) {
  if (!String(e).includes("already exists")) console.error(String(e).slice(0, 200));
}
console.log("postgres ready on 5433");
