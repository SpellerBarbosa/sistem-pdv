import CreateTable from "../db/CreateTable";

export default function setup() {
  CreateTable(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
    )
    `);

  CreateTable(`
    CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brand TEXT,
    image TEXT,
    price REAL NOT NULL
    )
    `);

  CreateTable(`
    CREATE TABLE IF NOT EXISTS  stock (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    quantity REAL NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
    )
    `);

  CreateTable(`
    CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT DEFAULT (datetime('now')),
    operator_id INTEGER NOT NULL,
    client_id INTEGER,
    total REAL NOT NULL,
    quantity_total INTEGER NOT NULL,
    FOREIGN KEY (operator_id) REFERENCES users(id) 
    )
    `);

  CreateTable(`
    CREATE TABLE IF NOT EXISTS sale_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price_unit REAL NOT NULL,
    price_total REAL NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sales(id),
    FOREIGN KEY (product_id) REFERENCES products(id)    
    )
    `);
}
