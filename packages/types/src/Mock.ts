export const mockSymbol = Symbol("isMock");

export interface Mock extends Function {
  calls: any[][];
  returns: any[];
  errors: any[];
  reset: () => void;
  [mockSymbol]: true;
}

// Spy prop
export type Prop = string | number | symbol;
