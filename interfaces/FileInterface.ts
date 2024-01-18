export interface FileInterface {
  arrayBuffer: () => Promise<ArrayBuffer>;
  name: string;
}