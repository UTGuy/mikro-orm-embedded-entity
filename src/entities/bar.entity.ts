import { Embeddable, ManyToOne, Property } from "@mikro-orm/core";
import { BazEntity } from "./baz.entity";

@Embeddable()
export class Bar {
    constructor(name: string, baz: BazEntity) {
        this.name = name;
        this.baz = baz;
    }

    @Property()
    public name: string;

    @ManyToOne({ entity: () => BazEntity, eager: true })
    public baz: BazEntity;
}