import { CONSOLE_COLORS } from './../../constants';

export class strGenerate {
  path: string;
  method: string;
  id: string;
  type: string;

  getVerbose(args: string[]) {
    const [path, method, type, id] = args;
    this.path = path;
    this.method = method;
    this.id = id;
    return this.id
      ? `${CONSOLE_COLORS.BGblue} VERBOSE:${CONSOLE_COLORS.reset}${CONSOLE_COLORS.blue} METHOD:${this.method} MSG:Getting ${type} with id ${this.id}...`
      : `${CONSOLE_COLORS.BGblue} VERBOSE:${CONSOLE_COLORS.reset}${CONSOLE_COLORS.blue} METHOD:${this.method} MSG:Getting all ${type}s...`;
  }
  getLog(args: string[]) {
    const [path, method, type, id] = args;
    this.path = path;
    this.method = method;
    this.id = id;
    return this.id
      ? `${CONSOLE_COLORS.BGgreen} LOG:${CONSOLE_COLORS.reset}${CONSOLE_COLORS.green} METHOD:${this.method} STATUS_CODE:200 MSG:${type} with id ${this.id} successfully received `
      : `${CONSOLE_COLORS.BGgreen} LOG:${CONSOLE_COLORS.reset}${CONSOLE_COLORS.green} METHOD:${this.method} STATUS_CODE:200 MSG:All ${type}s successfully received`;
  }

  postVerbose(args: string[]) {
    const [path, method, type, id] = args;
    this.path = path;
    this.method = method;
    this.id = id;
    return `${CONSOLE_COLORS.BGblue} VERBOSE:${CONSOLE_COLORS.reset} ${CONSOLE_COLORS.blue} METHOD:${this.method} MSG:Post ${type} with id ${this.id}...`;
  }
  postLog(args: string[]) {
    const [path, method, type, id] = args;
    this.path = path;
    this.method = method;
    this.id = id;
    return `${CONSOLE_COLORS.BGgreen} LOG:${CONSOLE_COLORS.reset}${CONSOLE_COLORS.green} METHOD:${this.method} STATUS_CODE:201 MSG:${type} with id ${this.id} successfully added `;
  }
  putVerbose(args: string[]) {
    const [path, method, type, id] = args;
    return `${CONSOLE_COLORS.BGblue} VERBOSE:${CONSOLE_COLORS.reset}${CONSOLE_COLORS.blue} METHOD:${method} MSG:Updating ${type} with id ${id}...`;
  }
  putLog(args: string[]) {
    const [path, method, type, id] = args;
    return `${CONSOLE_COLORS.BGgreen} LOG:${CONSOLE_COLORS.reset}${CONSOLE_COLORS.green} METHOD:${method} MSG:Update ${type} with id ${id}`;
  }
  deleteVerbose(args: string[]) {
    const [path, method, type, id] = args;
    return `${CONSOLE_COLORS.BGblue} VERBOSE:${CONSOLE_COLORS.reset}${CONSOLE_COLORS.blue} METHOD:${method} MSG:Deleting ${type} with id ${id}...`;
  }
  deleteLog(args: string[]) {
    const [path, method, type, id] = args;
    return `${CONSOLE_COLORS.BGgreen} LOG:${CONSOLE_COLORS.reset}${CONSOLE_COLORS.green} METHOD:${method} MSG:Delete ${type} with id ${id}`;
  }
}
