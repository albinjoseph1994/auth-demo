import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { timer } from 'rxjs';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loader = false;
  errorData = null;

  constructor(
    private titleservice: Title,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.titleservice.setTitle('Sign In');
    this.loginForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/)] }],
      password: ['', { validators: [Validators.required, Validators.pattern(/(.*\S.*)/)] }]
    });

  }

  login() {
    this.submitted = true;
    // console.log('inside login', this.loginForm.valid, this.loginForm.value);
    if (this.loginForm.valid) {
      this.loader = true;
      this.authService.login(this.loginForm.value).subscribe(res => {
        console.log('Res', res);
        this.submitted = false;
        this.loginForm.reset();
        this.loader = false;
        if (res.status) {
          if (res.status === 'success') {
            if (res.data) {
              localStorage.setItem('devgroceryToken', JSON.stringify(res.data));
            }
          }
        }
      }, err => {
        console.log('Error', err);
        this.submitted = false;
        this.loginForm.reset();
        this.loader = false;
        window.scrollTo(0, 0);
        this.errorData = err.error;
        timer(6000).subscribe(t => {
          this.errorData = 'Invalid Login';
        });
      });
    }
  }

  get formValidator() {
    return this.loginForm.controls;
  }

}
