import { Embeddable, ManyToOne, Property } from "@mikro-orm/core";
import { Baz } from "./baz.entity";

@Embeddable()
export class Bar {
    constructor(name: string, baz: Baz) {
        this.name = name;
        this.baz = baz;
    }

    @Property()
    public name: string;

    @ManyToOne({ entity: () => Baz, eager: true })
    public baz: Baz;
}