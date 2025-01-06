export interface MsgGenerator {
  generate: (diff: string) => Promise<string>;
}
