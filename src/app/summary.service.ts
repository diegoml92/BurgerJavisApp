import { Summary } from './summary';
import { SUMMARY_DATA } from './mock-data';

export class SummaryService {

  summaryData: Summary;

  constructor() {
    this.summaryData = SUMMARY_DATA
  }

  getSummaryData(): Promise<Summary> {
    // TO-DO: Calculate stats from finished orders in server-side
    return new Promise(resolve => {
      setTimeout(() => resolve(this.summaryData), 1500);
    })
  }

}