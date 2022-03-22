import * as uuid from 'uuid';

export class IdCreator {
    static create(): string {
        return uuid.v4();
    }
}