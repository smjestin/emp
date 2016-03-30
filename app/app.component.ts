import {Component} from 'angular2/core';
import {DemoService} from './demo.service';
import {Mortgage} from './mortgage';
import { Login }    from './login';
import {Employment} from "./employment";
import {MortgageApplication} from "./mortgage-application";

@Component({
  selector: 'demo-app',
  templateUrl: 'app/login-form.component.html'
})
export class AppComponent {

  public logins;

  public mortgageApplication: MortgageApplication;

  active = true;
  valid = true;
  model = new Login();
  submitted = false;
  mortgage = new Mortgage('0');

  constructor(private _demoService: DemoService) { }
  ngOnInit() { this.getLogins(); }
  
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
  		this.loadModel(location);
  	}
  	else {
  		console.log("Invalid password.");
  		this.valid = false;
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
      err => console.error(err),
      () => this._demoService.putMBR(this.mortgageApplication, empInfo).subscribe(
      	data => console.log('done mortgage processing!'),
      	err => console.error(err)
      	)
      );
  }
}