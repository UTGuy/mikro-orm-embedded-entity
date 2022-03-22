import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { IdCreator } from "../idCreator";

@Entity()
export class Baz {
    constructor(name: string) {
        this.id = IdCreator.create();
        this.name = name;
    }

    @PrimaryKey()
    readonly id!: string;

    @Property()
    name: string;
}