import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  formLogin:FormGroup

  constructor(private fb: FormBuilder, private login: LoginService, private router: Router){}

  ngOnInit(): void{
    this.formLogin = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  inicio(){
    this.login.getUsuario(this.formLogin.value.user, this.formLogin.value.password).subscribe((response: any)=>{
      if(response.response=='OK'){
        localStorage.setItem('user', this.formLogin.value.user)
        this.router.navigate(['/home']);
      }else{
        console.log(response.response)
      }
    })
  }
}
