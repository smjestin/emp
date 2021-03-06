import {Injectable} from 'angular2/core';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Employment} from './employment';
import {MortgageApplication} from "./mortgage-application";

@Injectable()
export class DemoService {

  constructor(private http:Http) { }

  private loginURL = 'http://54.175.15.171:3000/api/employees';
  private empURL = 'http://ec2-52-91-177-77.compute-1.amazonaws.com/api/MortgageApplications/';
  private mortID; 

  // Uses http.get() to load a single JSON file
  getLogins() {
    return this.http.get(this.loginURL).map((res:Response) => res.json());
  }
  
  getMBR(mortID: string) {
  	this.mortID = mortID;
  	return this.http.get(this.empURL + mortID).map((res:Response) => res.json());
  }

  //56fafa1d64a8298953f3f1af
  putMBR(mortgageApplication: MortgageApplication, empInfo: Employment) {
  	mortgageApplication.employment = empInfo;
  	let body = JSON.stringify(mortgageApplication);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.put(this.empURL + this.mortID, body, options)
            .map((res:Response) => res.json());
  }
}
