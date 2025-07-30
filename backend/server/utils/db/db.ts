import Database from "better-sqlite3";

const db = new Database(
  "./server/utils/db/pdv_databse.sqlite"
);

export default db;
