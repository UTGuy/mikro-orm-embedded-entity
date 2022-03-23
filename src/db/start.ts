import { RequestContext } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { FooEntity } from "../entities/foo.entity";
import { init } from "./init";

async function load(em: EntityManager) {
    const repo = em.getRepository(FooEntity);
    const foos = await repo.findAll({
        populate: true
    });
    console.log(JSON.stringify(foos));
}

async function run() {
    const orm = await init();

    try {
        await RequestContext.createAsync(orm.em, async () => {
            await load(orm.em);
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