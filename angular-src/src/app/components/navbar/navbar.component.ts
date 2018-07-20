import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private flashmessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogOutClick(){
    this.authService.logout();
    this.flashmessage.show("You are logged out", {
      cssClass: 'alert-success', timeout: 5000
    });

    this.router.navigate(['home']);

  }

}
