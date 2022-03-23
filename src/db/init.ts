import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { CustomNamingStrategy } from "./customNamingStrategy";

export function init() {
    return MikroORM.init<PostgreSqlDriver>({
        entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`
        entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
        type: 'postgresql',
        host: "localhost",
        port: 5432,
        dbName: "embeddables",
        user: "postgres",
        password: "test123",
        debug: true,
        namingStrategy: CustomNamingStrategy
    });
}