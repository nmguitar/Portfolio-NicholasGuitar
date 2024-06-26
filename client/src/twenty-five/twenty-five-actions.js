export const SESSCHG = 'SESSCHG';

export const sessChg = (number) => {
  return {
    type: SESSCHG,
    number: number
  }
}

export const BRKCHG = 'BRKCHG';

export const brkChg = (number) => {
  return {
    type: BRKCHG,
    number: number
  }
}

export const PLAYPAUSE = 'PLAYPAUSE';

export const playPause = (status) => {
  return {
    type: PLAYPAUSE,
    status: status
  }
}

export const RESETPRESS = 'RESETPRESS';

export const resetPress = (value) => {
  return {
    type: RESETPRESS,
    value: value
  }
}

export const MINUTECHG = 'MINUTECHG';

export const minuteChg = (numStr) => {
  return {
    type: MINUTECHG,
    numStr: numStr
  }
}

export const SECONDCHG = 'SECONDCHG';

export const secondChg = (numStr) => {
  return {
    type: SECONDCHG,
    numStr: numStr
  }
}

export const BRKSESS = 'BRKSESS';

export const brkSess = (status) => {
  return {
    type: BRKSESS,
    status: status
  }
}