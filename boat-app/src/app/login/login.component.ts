import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  hasInfo = false;
  textInfo = '';
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void { }


  public login(username: string, password: string): void {
    this.auth.login(username, password).subscribe(
      (res) => {
        const token = res['content'];
        this.auth.registerToken(token);
        this.router.navigateByUrl('/boat-list/'+username);
      },
      (err) => {
        const msg = err.error["content"];
        console.error(msg);
        this.hasInfo = true;
        this.textInfo = msg;
      });
  }

  public register(username: string, password: string): void {
    this.auth.register(username, password).subscribe(
      (res) => {
        this.hasInfo = true;
        this.textInfo = 'Account successfully created !';
    },
    (err) => {
      const msg = err.error["content"];
      console.error(msg);
      this.hasInfo = true;
      this.textInfo = msg;
    });
  }
}
