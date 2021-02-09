import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  category: string
  title: string
  photo: string
  text: string
  author: string

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private AuthService: AuthService,
    private router: Router
  ) {

   }

  ngOnInit(): void {
  }

  createPost() {
    const post = {
      category: this.category,
      title: this.title,
      photo: this.photo,
      text: this.text,
      author: JSON.parse(localStorage.getItem("user")).login,
      date: new Date()
    }
    if (!post.category) {
      this._flashMessagesService.show('Select your category', { cssClass: 'alert-danger', timeout: 5000 });
      return false
    }
    else if (!post.title) {
      this._flashMessagesService.show('Enter your title', { cssClass: 'alert-danger', timeout: 5000 });
      return false
    }
    else if (!post.photo) {
      this._flashMessagesService.show('Insert a photo', { cssClass: 'alert-danger', timeout: 5000 });
      return false
    }
    else if (!post.text) {
      this._flashMessagesService.show('Enter your text', { cssClass: 'alert-danger', timeout: 5000 });
      return false
    }


    this.AuthService.createPost(post).subscribe(data=>{
      if (!data.success) {
        console.log(data);
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
      }else if (data.success) {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/'])
      }

    })




  }

}
