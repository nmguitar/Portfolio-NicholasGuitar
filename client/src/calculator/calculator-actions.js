export const NUMPRESS = 'NUMPRESS';

export const numPress = (number) => {
  return {
    type: NUMPRESS,
    number: number
    };
}

export const OPERPRESS = 'OPERPRESS';

export const operPress = (operation) => {
  return {
    type: OPERPRESS,
    operation: operation
    };
}

export const CLEARPRESS = 'CLEARPRESS';

export const clearPress = (clear) => {
  return {
    type: CLEARPRESS,
    clear: clear
    };
}

export const EQUALPRESS = 'EQUALPRESS';

export const equalPress = (equals) => {
  return {
    type: EQUALPRESS,
    equals: equals
    };
}

export const UPDATE_EQUATION = 'UPDATE_EQUATION';

export const updateEquation = (update) => {
  return {
    type: UPDATE_EQUATION,
    update: update
  }
}

export const DECPRESS = 'DECPRESS';

export const decPress = (decimal) => {
  return {
    type: DECPRESS,
    decimal: decimal
  }
}

export const ZEROPRESS = 'ZEROPRESS';

export const zeroPress = (zero) => {
  return {
    type: ZEROPRESS,
    zero: zero
  }
}