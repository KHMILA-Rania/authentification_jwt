import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../validators/confirmPassword.validator';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent implements OnInit{
  
  authService=inject(AuthService);
  fb=inject (FormBuilder);
  registerForm!:FormGroup;
  router=inject(Router);
  ngOnInit(): void {
    this.registerForm=this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', Validators.compose([Validators.required, Validators.email])],
      userName:['', Validators.required],
      password:['', Validators.required],
      confirmPassword:['', Validators.required]
    },
  {
    validator:confirmPasswordValidator('password','confirmPassword')
  });
  }

  register() {
    this.authService.registerService(this.registerForm.value).subscribe({
      next:(res)=>{
        alert('user Created');
        this.registerForm.reset();
        this.router.navigate(['login']);
      },
      error:(err)=>{console.log(err);}
    })
  }
}
