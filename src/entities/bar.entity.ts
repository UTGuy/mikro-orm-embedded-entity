import { Embeddable, Embedded, Property } from "@mikro-orm/core";
import { Fiz } from "./fiz.entity";

@Embeddable()
export class Bar {
    constructor(name: string, fiz: Fiz[]) {
        this.name = name;
        this._fiz = fiz;
    }

    @Property()
    public name: string;

    @Embedded(() => Fiz, { array: true })
    public _fiz: Fiz[] = [];
}