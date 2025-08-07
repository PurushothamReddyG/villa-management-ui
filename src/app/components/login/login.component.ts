import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // correct relative path

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService], // 👈 Add this if using standalone
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // ✅ ADD THIS
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule // ✅ needed for routerLink in template
  ]
})

export class LoginComponent {
  loginForm: FormGroup;
  loginError = '';

  constructor(
  private fb: FormBuilder,
  private authService: AuthService, // ✅ This must point to a real, injectable service
  private router: Router
) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
  next: (response) => {
    localStorage.setItem('token', response.token); // ✅ token saved
    this.loginError = '';
    this.router.navigate(['/dashboard']); // ✅ navigate
  },
  error: (error) => {
    this.loginError = 'Invalid email or password.';
    console.error('Login error:', error);
  }
});
    } else {
      this.loginError = 'Please enter valid email and password.';
    }
  }
}
