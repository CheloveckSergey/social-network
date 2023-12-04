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

  constructor(date: string) {
    const regExp = /\d{4}-\d{2}-\d{2}/;
    const concidences = date.match(regExp);
    if (!concidences) {
      this.year = 0;
      this.day = 0;
      this.month = 0;
      return
    }
    const todayDate = concidences[0];
    const stringYear = todayDate.slice(0, 4);
    const stringMonth = todayDate.slice(5, 7);
    const stringDay = todayDate.slice(8, 10);
    this.year = Number(stringYear);
    this.month = Number(stringMonth);
    this.day = Number(stringDay);
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

  getStringDate(): string {
    const stringDay: string = this.day > 9 ? ''+this.day : '0' + this.day;
    const stringMonth: string = this.month > 9 ? ''+this.month : '0' + this.month;
    const stringYear: string = this.year > 9 ? ''+this.year : '0' + this.year;
    return `${stringDay}.${stringMonth}.${stringYear}`;
  }

  // isTheFirstToday(dates: MyDate[]): boolean {
  //   if 
  // }
}