import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: Object;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile()
      .subscribe(profile => {
        this.user = profile.user;
      })
  }

}
