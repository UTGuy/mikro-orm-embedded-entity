import { EntityManager } from "@mikro-orm/postgresql";
import { Bar } from "../entities/bar.entity";
import { BazEntity } from "../entities/baz.entity";
import { FooEntity } from "../entities/foo.entity";
import { RequestContext } from "@mikro-orm/core";
import { init } from "./init";

async function create(em: EntityManager) {
    const foo = new FooEntity([
        new Bar("bar1", new BazEntity("baz1")),
        new Bar("bar2", new BazEntity("baz2"))
    ]);
    em.persist(foo);
}

async function run() {
    const orm = await init();

    try {
        await RequestContext.createAsync(orm.em, async () => {
            const generator = orm.getSchemaGenerator();
            await generator.refreshDatabase();
            await generator.dropSchema();
            await generator.createSchema();
        });

        await RequestContext.createAsync(orm.em, async () => {
            await create(orm.em);
            await orm.em.flush();
        });
    } finally {
        await orm.close(true);
    }
}

process.on('unhandledRejection', err => console.log);

run().catch(ex => {
    console.log(ex);
    process.exit();
});