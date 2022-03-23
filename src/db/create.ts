import { EntityManager } from "@mikro-orm/postgresql";
import { Bar } from "../entities/bar.entity";
import { BazEntity } from "../entities/baz.entity";
import { FooEntity } from "../entities/foo.entity";
import { RequestContext } from "@mikro-orm/core";
import { init } from "./init";
import { Fiz } from "../entities/fiz.entity";

async function create(em: EntityManager) {
    const foo = new FooEntity([
        new Bar("bar1", [
            new Fiz("fiz-1-1", new BazEntity("baz-1-1-1")),
            new Fiz("fiz-1-2", new BazEntity("baz-1-2-1"))
        ]),
        new Bar("bar2", [
            new Fiz("fiz-2-1", new BazEntity("baz-2-1-1")),
            new Fiz("fiz-2-2", new BazEntity("baz-2-2-1"))
        ])
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