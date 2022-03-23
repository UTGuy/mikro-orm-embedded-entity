import { UnderscoreNamingStrategy } from "@mikro-orm/core";

function removeUnderscorePrefix(value: string): string {
    const [firstChar, ...theRest] = value;
    const isUnderscored = firstChar == '_';
    const newValue = theRest.join('');
    return isUnderscored ? newValue : value;
}

export class CustomNamingStrategy extends UnderscoreNamingStrategy {
    joinColumnName(propertyName: string): string {
        return removeUnderscorePrefix(super.joinColumnName(propertyName));
    }

    joinKeyColumnName(entityName: string, referencedColumnName?: string): string {
        return removeUnderscorePrefix(super.joinKeyColumnName(entityName, referencedColumnName));
    }

    propertyToColumnName(propertyName: string): string {
        return removeUnderscorePrefix(super.propertyToColumnName(propertyName));
    }

    referenceColumnName(): string {
        return removeUnderscorePrefix(super.referenceColumnName());
    }
}