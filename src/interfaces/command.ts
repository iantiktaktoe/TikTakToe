export interface Command {
  command: string;
  outputs: string[];
  isTyping?: boolean; // Whether this output is currently being typed
  teletypeIndex?: number; // Index of the output being typed (for multiple outputs)
}
