export interface FileInterface {
  encoding: string;
  buffer?: Buffer;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}

export type OptionArray<T> = T | T[];

