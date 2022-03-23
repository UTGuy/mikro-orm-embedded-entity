import { Embeddable, ManyToOne, Property } from "@mikro-orm/core";
import { Baz } from "./baz.entity";

@Embeddable()
export class Bar {
    constructor(name: string, baz: Baz) {
        this.name = name;
        this._baz = baz;
    }

    @Property()
    public name: string;

    @ManyToOne({ entity: () => Baz, eager: true })
    private _baz: Baz;

    public get baz() {
        return this._baz;
    }
}