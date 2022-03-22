import { Embedded, Entity, PrimaryKey } from "@mikro-orm/core";
import { IdCreator } from "../idCreator";
import { Bar } from "./bar.entity";

@Entity()
export class FooEntity {
    constructor() {
        this.id = IdCreator.create();
    }

    @PrimaryKey()
    readonly id!: string;

    @Embedded(() => Bar, { array: true })
    bar: Bar[] = [];
}