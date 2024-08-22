#! /usr/bin/env node
require("dotenv").config();
const fs = require("node:fs/promises");

const { Client } = require("pg");

async function main() {
  const query = await fs.readFile("./db/populatedb.sql", { encoding: "utf-8" });

  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.POSTGRES_DATABASE_URL,
  });
  await client.connect();

  await client.query(query);

  await client.end();
  console.log("done");
}

main();
