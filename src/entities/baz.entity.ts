import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { IdCreator } from "../idCreator";

@Entity()
export class BazEntity {
    constructor(name: string) {
        this.id = IdCreator.create();
        this.name = name;
    }

    @PrimaryKey()
    readonly id!: string;

    @Property()
    public name: string;
}