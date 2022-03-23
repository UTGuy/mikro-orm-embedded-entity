import { Embedded, Entity, PrimaryKey } from "@mikro-orm/core";
import { IdCreator } from "../idCreator";
import { Bar } from "./bar.entity";

@Entity()
export class FooEntity {
    constructor(bar: Bar[]) {
        this.id = IdCreator.create();
        this._bar = bar;
    }

    @PrimaryKey()
    readonly id!: string;

    @Embedded(() => Bar, { array: true })
    private _bar: Bar[] = [];

    public get bar() {
        return [...(this._bar || [])];
    }
}