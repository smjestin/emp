import { Component, OnInit } from 'angular2/core';
import { DemoService } from './demo.service';
import { Mortgage } from './mortgage';
import { Login }    from './login';
import { Employment } from "./employment";
import { MortgageApplication } from "./mortgage-application";
import { HTTP_PROVIDERS } from "angular2/http";

@Component({
  selector: 'demo-app',
  templateUrl: 'app/login-form.component.html',
    providers: [
        HTTP_PROVIDERS,
        DemoService
    ]
})
export class AppComponent implements OnInit {

  public logins;

  public mortgageApplication: MortgageApplication;

  active = true;
  valid = true;
  validCombination = true;
  processed = false;
  model = new Login();
  submitted = false;
  correctPassword = true;
  mortgage = new Mortgage('0');

    ngOnInit() { this.getLogins(); }
    
    constructor(private _demoService: DemoService) { }

    getLogins() {
    this._demoService.getLogins().subscribe(
      data => { this.logins = data },
      err => console.error(err),
      () => console.log('done loading logins')
    );
  }
    
  onLoginSubmit() {
	var password = "";
	var location = -1;
  	for(var i = 0; i < this.logins.length; i++) {
  		if(this.logins[i]["username"] == this.model.username) {
  			password = this.logins[i]["password"];
  			location = i;
  		}
  	}
  	if(password == this.model.password) {
  		this.submitted = true;
  		this.validCombination = true;
  		this.loadModel(location);
  	}
  	else {
  		console.log("Invalid password.");
  		this.validCombination = false;
  	}
  }
  
  loadModel(location: number) {
  	this.model.name = this.logins[location]["name"];
  	this.model.salary = this.logins[location]["salary"];
  	this.model.start_date = this.logins[location]["start_date"];
  }
  
  onSubmitEmpInfo() {
	let empInfo = new Employment(this.model.salary, this.model.start_date.toString());
  	console.log(empInfo); 
  	this._demoService.getMBR(this.mortgage.mortID).subscribe(
      data => { this.mortgageApplication = data },
      err => this.valid = false,
      () => this._demoService.putMBR(this.mortgageApplication, empInfo).subscribe(
      	data => this.processed = true, this.submitted = false,
      	err => this.valid = false
      	)
      );
  }
}