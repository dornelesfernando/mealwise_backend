import { File } from 'multer';

export type AuthUserPayload = {
  id: string;
  name: string;
  email: string;
  role?: string;
  roles?: string[];
  permissions?: string[];
};

declare global {
  namespace Express {
    export interface Request {
      user?: AuthUserPayload;
      file: File;
      files?: File[] | { [fieldname: string]: File[] };
    }
  }
}

export {};
