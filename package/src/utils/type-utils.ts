export interface NestedRecord<T> {
	[key: string]: T | NestedRecord<T>;
}
