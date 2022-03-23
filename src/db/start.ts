import { RequestContext } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { Fiz } from "../entities/fiz.entity";
import { FooEntity } from "../entities/foo.entity";
import { init } from "./init";

async function load(em: EntityManager, populate: any) {
    const repo = em.getRepository(FooEntity);
    const [foo] = await repo.findAll({
        populate
    });
    console.log(`--------------- populate: ${populate} ----------------------`)
    const [bar1, bar2] = foo._bar;
    const [fiz11, fiz12] = bar1._fiz;
    const [fiz21, fiz22] = bar2._fiz;
    const log = (fiz: Fiz) => console.log(fiz._baz.name, fiz._baz);
    [fiz11, fiz12, fiz21, fiz22].forEach(log);
}

async function run() {
    const orm = await init();

    try {
        await RequestContext.createAsync(orm.em, async () => {
            await load(orm.em, true); // Does not work
            await load(orm.em, ['_bar._fiz._baz']); // Works
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