declare module "multer" {
  import { RequestHandler } from "express";

  export interface StorageEngine {
    _handleFile: (
      req: any,
      file: any,
      callback: (error?: any, info?: any) => void
    ) => void;
    _removeFile: (req: any, file: any, callback: (error: Error) => void) => void;
  }

  export interface Multer {
    single(fieldName: string): RequestHandler;
    array(fieldName: string, maxCount?: number): RequestHandler;
    fields(fields: Array<{ name: string; maxCount?: number }>): RequestHandler;
    none(): RequestHandler;
    any(): RequestHandler;
  }

  export interface MulterOptions {
    storage?: StorageEngine;
    limits?: any;
    fileFilter?: (req: any, file: any, callback: FileFilterCallback) => void;
    preservePath?: boolean;
  }

  export type FileFilterCallback = (error: Error | null, acceptFile?: boolean) => void;

  function multer(options?: MulterOptions): Multer;

  namespace multer {
    function diskStorage(options: {
      destination: (req: any, file: any, callback: (error: Error | null, destination: string) => void) => void;
      filename: (req: any, file: any, callback: (error: Error | null, filename: string) => void) => void;
    }): StorageEngine;
  }

  export = multer;
}
