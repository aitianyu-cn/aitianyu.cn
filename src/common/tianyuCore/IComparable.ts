export interface IComparable {
    /**
     * compareTo
     */
    compareTo(obj: object): number;
}

export interface IEquals {
    equals(obj: object): boolean;
}