import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  authService=inject(AuthService);
  fb=inject (FormBuilder);
  loginForm!:FormGroup;
  router=inject(Router);

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      
      email:['', Validators.compose([Validators.required, Validators.email])],
      
      password:['', Validators.required]
      
    })

 
}

  login (){
      this.authService.loginService(this.loginForm.value).subscribe({
        next: (res)=>{
        
          Swal.fire({
            title: 'Success!',
            text: '.Login successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.loginForm.reset();
          this.router.navigate(['home']);
        },
        error: (err)=>{
          Swal.fire({
            title: 'Error!',
            text: 'There was an error during the login.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.log(err);
        }
      })
  }
}
