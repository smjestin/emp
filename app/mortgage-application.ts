import { Employment }    from './employment';

export class MortgageApplication {

  constructor(
    public applicantName: string,
    public houseID: number,
    public insuranceQuote: Object,
    public mortgageID: string,
    public mortgageValue: number,
    public employment: Employment
  ) {  }

}