import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService, User } from '../../services/user.service'; // Adjust path as needed

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  username: string = 'User';
  role: string = 'USER';
  villasOccupied = 24;
  totalVillas = 30;
  pendingPayments = 12000;
  totalMembers = 76;

  latestNotices: string[] = [
    "Water shutdown on Friday",
    "Lift maintenance update",
    "RWA meeting on Sunday"
  ];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.username = user.name || user.email;
        this.role = user.role;
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
        this.logout();
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  logout(): void {
    localStorage.removeItem('token'); // Clear JWT
    this.router.navigate(['/login']);
  }
}
