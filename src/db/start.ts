import { RequestContext } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { FooEntity } from "../entities/foo.entity";
import { init } from "./init";

async function load(em: EntityManager, populate: any) {
    const repo = em.getRepository(FooEntity);
    const [foo] = await repo.findAll({
        populate: true
    });
    console.log(`--------------- populate: ${populate} ----------------------`)
    const [bar1, bar2] = foo.bar;
    console.log("bar1", bar1);
    console.log("bar2", bar2);
}

async function run() {
    const orm = await init();

    try {
        await RequestContext.createAsync(orm.em, async () => {
            await load(orm.em, true); // Does not work
            await load(orm.em, ['bar', 'bar.baz']); // Works
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