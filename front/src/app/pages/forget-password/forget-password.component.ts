import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export default class ForgetPasswordComponent implements OnInit {

  forgetForm!: FormGroup;
  authService=inject(AuthService);
  fbl=inject (FormBuilder);
  ngOnInit(): void {
    this.forgetForm=this.fbl.group({
      email:['',Validators.compose([Validators.required,Validators.email])]
    });
  }
  submit(){
    this.authService.sendEmailService(this.forgetForm.value.email).subscribe(
      {
        next:(res)=>{
          Swal.fire({
            title: 'Success!',
            text: 'email sent successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.forgetForm.reset();
        },
        error:(err)=>{
          Swal.fire({
            title: 'Error!',
            text: 'There was an error sending the email',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    )
  }

}
