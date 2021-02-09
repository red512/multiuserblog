import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  login: string
  password: string

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signIn() {

    const user = {
      login: this.login,
      password: this.password
    }

    if (!user.login) {
      this._flashMessagesService.show('Enter your login', { cssClass: 'alert-danger', timeout: 5000 });
      return false
    }
    else if (!user.password) {
      this._flashMessagesService.show('Enter your password', { cssClass: 'alert-danger', timeout: 5000 });
      return false
    }

    this.authService.authUser(user).subscribe(data=>{
      if (!data.success) {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
      }else if (data.success) {
        this._flashMessagesService.show("You have successfully logged In", { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/dashboard'])
        this.authService.storeUser(data.token, data.user)
      }

    })


  }

}
