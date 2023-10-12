import api from "../../../shared/http";

type Desc = {
  id: number,
  date: string | undefined,
  city: string | undefined,
  familyStatus: string | undefined,
  work: string | undefined,
  telephone: string | undefined,
  quote: string | undefined,
}

const INITIAL_URL = '/user-desc';

export class DescApi {
  static async getDesc() {
    const response = await api.get<Desc>(INITIAL_URL + '/getDesc');
    return response.data;
  }

  static async updateDate(date: string) {
    const response = await api.post(
      INITIAL_URL + '/updateDate',
      {
        date,
      }
    )
  }

  static async updateFamilyStatus(familyStatus: string) {
    const response = await api.post(
      INITIAL_URL + '/updateFamilyStatus',
      {
        familyStatus,
      }
    )
  }
  
  static async updateWork(work: string) {
    const response = await api.post(
      INITIAL_URL + '/updateWork',
      {
        work,
      }
    )
  }
  static async updateTelephone(work: string) {
    const response = await api.post(
      INITIAL_URL + '/updateTelephone',
      {
        work,
      }
    )
  }

  static async updateQuote(quote: string) {
    const response = await api.post(
      INITIAL_URL + '/updateQuote',
      {
        quote,
      }
    )
  }
}