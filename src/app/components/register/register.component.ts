import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles: string[] = ['VILLA_OWNER', 'ASSOCIATION_MEMBER'];
  registrationError = '';
  registrationSuccess = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roles: [[], Validators.required]
    });
  }

  toggleRole(role: string) {
    const currentRoles = this.registerForm.value.roles || [];
    const updatedRoles = currentRoles.includes(role)
      ? currentRoles.filter((r: string) => r !== role)
      : [...currentRoles, role];

    this.registerForm.patchValue({ roles: updatedRoles });
    this.registerForm.get('roles')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;

      this.authService.register(data).subscribe({
        next: (res) => {
          console.log('✅ Registration successful:', res);
          this.registrationSuccess = true;
          this.registrationError = '';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          console.error('❌ Registration failed:', err);
          this.registrationError = 'Registration failed. Please try again.';
          this.registrationSuccess = false;
        }
      });

    } else {
      this.registrationError = 'Please fill all required fields correctly.';
      this.registrationSuccess = false;
    }
  }
}
