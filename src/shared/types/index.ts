export type Hook<Entity, Effects> = (entity: Entity, effects: Effects) => {
  headline: string,
  refetch: () => any,
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
}

export class MyDate {
  year: number;
  day: number;
  month: number;
  hour: number;
  minute: number;
  seconds: number;

  constructor(date: string) {
    const regExp = /\d{4}-\d{2}-\d{2}/;
    const concidences = date.match(regExp);
    if (!concidences) {
      this.year = 0;
      this.day = 0;
      this.month = 0;
    } else {
      const todayDate = concidences[0];
      const stringYear = todayDate.slice(0, 4);
      const stringMonth = todayDate.slice(5, 7);
      const stringDay = todayDate.slice(8, 10);
      this.year = Number(stringYear);
      this.month = Number(stringMonth);
      this.day = Number(stringDay);
    }
    
    const time = this.getTimeFromMySQLDate(date);
    if (time) {
      this.hour = time.hour;
      this.minute = time.minute;
      this.seconds = time.seconds;
    } else {
      this.hour = 0;
      this.minute = 0;
      this.seconds = 0;
    }
  }

  isMoreThen(date: MyDate): boolean {
    if (this.year > date.year) {
      return true;
    } else if ( this.year < date.year) {
      return false;
    }

    if (this.month > date.month) {
      return true;
    } else if ( this.month < date.month) {
      return false;
    }

    if (this.day > date.day) {
      return true;
    } else if ( this.day < date.day) {
      return false;
    }

    if (this.hour > date.hour) {
      return true;
    } else if ( this.hour < date.hour) {
      return false;
    }

    if (this.minute > date.minute) {
      return true;
    } else if ( this.minute < date.minute) {
      return false;
    }

    if (this.seconds > date.seconds) {
      return true;
    } else if ( this.seconds < date.seconds) {
      return false;
    }

    return false;
  }

  isEqualTo(date: MyDate): boolean {
    if (this.isMoreThen(date)) {
      return false;
    }
    if (date.isMoreThen(this)) {
      return false;
    }
    return true;
  }

  private getStringValue(value: number): string {
    const stringValue: string = value > 9 ? ''+value : '0' + value;
    return stringValue;
  }

  getStringDate(): string {
    const stringDay: string = this.day > 9 ? ''+this.day : '0' + this.day;
    const stringMonth: string = this.month > 9 ? ''+this.month : '0' + this.month;
    const stringYear: string = this.year > 9 ? ''+this.year : '0' + this.year;
    return `${stringDay}.${stringMonth}.${stringYear}`;
  }

  getStringTime(): string {
    const stringHour: string = this.getStringValue(this.hour);
    const stringMinute: string = this.getStringValue(this.minute);
    const stringSeconds: string = this.getStringValue(this.seconds);
    return stringHour + ':' + stringMinute + ':' + stringSeconds;
  }

  getDateAndTime(): string {
    const dateAndTime: string = this.getStringDate() + ' ' + this.getStringTime();
    return dateAndTime;
  }

  // getDateOrTime(): string {

  // }

  private getTimeFromMySQLDate(date: string): {hour: number, minute: number, seconds: number} | undefined {
    const regExp = /T\d{2}:\d{2}:\d{2}/;
    const concidences = date.match(regExp);
    if (concidences) {
      const hour = Number(concidences[0].slice(1, 3)) + 3;
      const minute = Number(concidences[0].slice(4, 6));
      const seconds = Number(concidences[0].slice(7, 9));
      return { hour, minute, seconds }
    } else {
      return undefined;
    }
  }

  // isTheFirstToday(dates: MyDate[]): boolean {
  //   if 
  // }
}