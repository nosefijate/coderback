import knex from "knex";
import { configSql2 } from "./config.js";
async function crearTablaProductos() {
  const db = knex(configSql2);
  try {
    const exist = await db.schema.hasTable("productos");
    if (!exist) {
      await db.schema.createTable("productos", (table) => {
        table.increments("id").primary().notNullable()
        table.string("name", 50).notNullable()
        table.text("description").notNullable()
        table.text("imgUrl").notNullable()
        table.integer("price").notNullable()
        table.integer("stock").notNullable()
        table.integer("codebar").notNullable()
        table.timestamp("timestamp").notNullable()
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    db.destroy();
  }
}
async function crearTablaMensajes() {
  const db = knex(configSql2);
  try {
    const exist = await db.schema.hasTable("productos");
    if (!exist) {
      await db.schema.createTable("productos", (table) => {
        table.increments("id").primary().notNullable();
        table.string('usuario').notNullable();
        table.string('mensaje').notNullable();
        table.timestamp("timestamp").notNullable();
        console.log("Tabla creada");
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    db.destroy();
  }
} 