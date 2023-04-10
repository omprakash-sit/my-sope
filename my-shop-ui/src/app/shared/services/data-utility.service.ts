import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataUtilityService {

  constructor() { }

  // convert to sql date format
  formatedDate(date: Date, format?: string): string {
    const _date = new Date(date);
    const dateObj = {
      D: this.twoDigit(_date.getDate()),
      M: this.twoDigit(_date.getMonth() + 1),
      Y: _date.getFullYear(),
      t: _date.toLocaleString().split(' ')[1]
    };
    let formatedDate = '';
    if (format === 'sql') {
      formatedDate = `${dateObj.Y}-${dateObj.M}-${dateObj.D}-${dateObj.t}`;
    } else {
      formatedDate = `${dateObj.D}-${dateObj.M}-${dateObj.Y}`;
    }
    return formatedDate;
  }
  twoDigit(num: number): string {
    num = Number(num);
    return num < 10 ? '0' + num : num.toString();
  }
}
