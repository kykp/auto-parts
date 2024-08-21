export class UrlSanitizer {
  result = true;

  isNumber = (val: unknown) => {
    if (!this.result) return this;
    this.result = typeof val === 'string' && /^\d+$/.test(val);
    return this;
  };

  hasInArray = <T>(val: unknown, arr: T[]) => {
    if (!this.result) return this;
    this.result = arr.filter(el => el === val).length > 0;
    return this;
  };

  isDate = (val: unknown) => {
    if (!this.result) return this;
    if (typeof val === 'string') {
      const arrD = val.split('-');
      const d = new Date(parseInt(arrD[0]), parseInt(arrD[1]) - 1, parseInt(arrD[2]));
      this.result = (d.getFullYear() === parseInt(arrD[0])) && (d.getMonth() === parseInt(arrD[1]) - 1) && (d.getDate() === parseInt(arrD[2]));
    } else {
      this.result = false;
    }
    return this;
  };
}

export interface IUrlSanitizer {
  result: boolean,
  isNumber: (val: unknown) => this,
  hasInArray: (val: unknown, arr: unknown[]) => this,
  isDate: (val: unknown) => this,
}
