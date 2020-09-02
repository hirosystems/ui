export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: any;
    }
  }
}
