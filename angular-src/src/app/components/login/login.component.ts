import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit()  {
    
    const userLoginDetails = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticate(userLoginDetails)
      .subscribe(response => {
        if(response.success){
          //storing user data for further use..
          this.authService.storeUserData(response.token, response.user);

          this.flashMessage.show("You're now logged in !!!", {
            cssClass: 'alert-success',
             timeout: 5000
            }
          );
          this.router.navigate(['dashboard']);

        }else{
          this.flashMessage.show(response.msg, {
            cssClass: 'alert-danger',
             timeout: 5000
            }
          );
          this.router.navigate(['login']);
        }
      })
  }

}
