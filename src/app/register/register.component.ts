import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AuthService } from '../common/services/auth.service';
import { MustMatch } from '../common/validators/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  loader = false;
  errorData = null;

  constructor(
    private titleservice: Title,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.titleservice.setTitle('Sign Up');
    this.registerForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/)] }],
      password: ['', { validators: [Validators.required, Validators.pattern(/(.*\S.*)/), Validators.minLength(8)] }],
      password_confirmation: ['', [Validators.required, Validators.pattern(/(.*\S.*)/), Validators.minLength(8)]]
    },
      {
        validator: MustMatch('password', 'password_confirmation')
      }
    );

  }

  register() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loader = true;
      this.authService.register(this.registerForm.value).subscribe(res => {
        console.log('Res', res);
        this.submitted = false;
        this.registerForm.reset();
        this.loader = false;
        if (res.status) {
          if (res.status === 'success') {
            this.router.navigate[('/')];
          }
        }
      }, err => {
        console.log('Error', err);
        this.submitted = false;
        this.registerForm.reset();
        this.loader = false;
        window.scrollTo(0, 0);
        this.errorData = err.error;
        timer(6000).subscribe(t => {
          this.errorData = 'Registration Failed';
        });
      });
    }
  }

  get formValidator() {
    return this.registerForm.controls;
  }


}
