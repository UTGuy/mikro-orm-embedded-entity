import { Embeddable, ManyToOne, Property } from "@mikro-orm/core";
import { BazEntity } from "./baz.entity";

@Embeddable()
export class Fiz {
    constructor(name: string, baz: BazEntity) {
        this.name = name;
        this._baz = baz;
    }

    @Property()
    public name: string;

    @ManyToOne({ entity: () => BazEntity, eager: true })
    public _baz: BazEntity;
}