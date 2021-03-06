import { AuthService } from './../../services/auth.service';
import { ValidateService } from './../../services/validate.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //registeration parameters initialization
  name: String;
  username: String;
  email: String;
  password: String;

  constructor( 
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
     const user = {
       name: this.name,
       email: this.email,
       username: this.username,
       password: this.password
     }

     //Required field
     if(!this.validateService.validateRegister(user)){
       this.flashMessage.show("Please fill in all fields.", {cssClass: 'alert-danger', timeout: 3000});
       return false;
     }

     //validate email
     if(!this.validateService.validateEmail(user.email)){
       this.flashMessage.show("Enter a valid email.", {cssClass: 'alert-danger', timeout: 3000});
       return false;
     }

    
  // Register User
  this.authService.registerUser(user)
     .subscribe(response => {
        if(response.success){
          this.flashMessage.show(
            "You're now registered and can log in", 
            {cssClass: 'alert-success', timeout: 3000}
          );
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.show("Registeration failed, please try again", {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/register']);
        }
     });
  }

}
