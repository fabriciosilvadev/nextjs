import { IncomingMessage } from "http";

export interface Request extends IncomingMessage {
  headers: {
    authorization?: string;
  };
}

export interface AuthRegister {
  email: string;
  password: string;
  name: string;
}
