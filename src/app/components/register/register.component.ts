import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles: string[] = ['VILLA_OWNER', 'ASSOCIATION_MEMBER'];
  registrationError = '';
  registrationSuccess = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobileNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10}$')]
        ],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        roles: [[], Validators.required]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  // ✅ Check if passwords match
  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { mismatch: true }
      : null;
  }

  // ✅ Toggle role selection
  toggleRole(role: string) {
    const currentRoles = this.registerForm.value.roles || [];
    const updatedRoles = currentRoles.includes(role)
      ? currentRoles.filter((r: string) => r !== role)
      : [...currentRoles, role];

    this.registerForm.patchValue({ roles: updatedRoles });
    this.registerForm.get('roles')?.updateValueAndValidity();
  }

  // ✅ Handle form submission
  onSubmit() {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;

      this.authService.register(data).subscribe({
        next: (res) => {
          console.log('✅ Registration successful:', res);
          this.registrationSuccess = true;
          this.registrationError = '';
          this.successMessage =
            'Registration successful! Please check your email to verify your account.';
          setTimeout(() => this.router.navigate(['/login']), 5000);
        },
        error: (err) => {
          console.error('❌ Registration failed:', err);
          this.registrationError =
            err?.error?.message || 'Registration failed. Please try again.';
          this.registrationSuccess = false;
          this.successMessage = '';
        }
      });
    } else {
      this.registrationError = 'Please fill all required fields correctly.';
      this.registrationSuccess = false;
      this.successMessage = '';
    }
  }

  // ✅ Navigate to login page
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
