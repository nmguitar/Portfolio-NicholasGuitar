export const GOCOMP = 'GOCOMP';

export const goComp = (component) => {
  return {
    type: GOCOMP,
    component: component
  }
}