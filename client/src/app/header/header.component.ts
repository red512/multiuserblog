import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _flashMessagesService: FlashMessagesService,
    public AuthService: AuthService,
    private router: Router
  ) { }
  ngOnInit(): void {
  }

  logoutUser(){
    this.AuthService.logout();
    this._flashMessagesService.show("You are logged out", { cssClass: 'alert-success', timeout: 5000 });
    this.router.navigate(['/auth'])
  }

  ifAuth(){
    return this.AuthService.isAuthenticated
  }

}
