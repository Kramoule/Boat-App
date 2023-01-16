import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void { }


  public login(values: {username?: string| null, password?: string| null}): void {
    this.auth.login(values.username, values.password).subscribe({
      next: (res: any) => {
        const token = res["content"];
        this.auth.registerToken(token);
        this.router.navigateByUrl('/boat-list/' + values.username);
      },
      error: (err) => {
        const msg = err.error["content"];
        console.error(msg);
        this.hasInfo = true;
        this.textInfo = msg;
      }});
  }

  public register(values: {username?: string | null, password?: string| null}): void {
    if(this.loginForm.status !== 'VALID') {
      return;
    }
    this.auth.register(values.username, values.password).subscribe(
      (res) => {
        this.hasInfo = true;
        this.textInfo = 'Account successfully created !';
        this.loginForm.reset();
    },
    (err) => {
      const msg = err.error["content"];
      console.error(msg);
      this.hasInfo = true;
      this.textInfo = msg;
    });
  }
}
