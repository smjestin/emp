import {Employment} from "./employment";
export class MortgageApplication {
    applicantName: string;
    mortgageValue: number;
    houseID: number;
    mortgageID: string;
    employment: Employment;
    
    constructor() {
        this.applicantName = '';
        this.mortgageValue = 0;
        this.houseID = 0;
    }
};