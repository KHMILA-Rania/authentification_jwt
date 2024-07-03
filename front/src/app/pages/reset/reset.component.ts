import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirmPassword.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export default class ResetComponent implements OnInit {

 fb=inject(FormBuilder);
 
 activatedRoute=inject(ActivatedRoute);
 router=inject(Router);
  resetForm!:FormGroup;
  token!:String;
authService=inject(AuthService);
  
  ngOnInit(): void {
    this.resetForm=this.fb.group({
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    },
    {
      validator:confirmPasswordValidator('password','confirmPassword')
    })
    this.activatedRoute.params.subscribe(val=>{
      this.token=val['token'];
      console.log(this.token);
    }
  )
  }

  reset(){
    if (this.resetForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    const resetObj={
      token:this.token,
      password:this.resetForm.value.password
    }
    console.log('Reset object:', resetObj);

    this.authService.resetPasswordService(resetObj).subscribe(
      {
        next:(res)=>{
          console.log('Password reset request sent successfully', res);
          alert('Password reset  successfully');
          this.resetForm.reset();
          this.router.navigate(['login'])
        },
        error:(err)=>{
          console.error('Error during password reset request:', err);
          alert('error');
        }
      }
    )
  }
}
