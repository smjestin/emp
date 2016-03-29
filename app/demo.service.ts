import {Injectable} from 'angular2/core';
import {Http, Header, Response, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {MortgageApplication} from './mortgage-application'

@Injectable()
export class DemoService {

  constructor(private http:Http) { }

  private loginURL = 'app/login.json';
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
  
  putMBR(mortgageApplication: string, empInfo: string) {
  	console.log(mortgageApplication);
  	mortgageApplication.employment = empInfo;
  	let body = mortgageApplication;
  	body.employment = empInfo;
  	console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.put(this.empURL + this.mortID, body, options)
            .map((res:Response) => res.json());
  }}
}
