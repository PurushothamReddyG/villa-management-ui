import { Component, OnInit } from '@angular/core';
import { VillaService } from '../../services/villa.service';
import { Villa } from '../../models/villa.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  username = '';
  role = '';
  villas: Villa[] = [];
  totalVillas = 0;
  villasOccupied = 0;
  pendingPayments = 0;
  totalMembers = 0;
  latestNotices: string[] = [];

  constructor(private villaService: VillaService) {}

  ngOnInit(): void {
    this.setUsernameFromToken(); // get from localStorage/JWT
    this.fetchVillaStats();
    this.fetchNotices(); // optional
  }
  


  fetchVillaStats(): void {
    this.villaService.getAllVillas().subscribe({
      next: (villas: Villa[]) => {
        this.villas = villas;
        this.totalVillas = villas.length;
        this.villasOccupied = villas.filter(v => v.isOccupied).length;
        // You can update these once your backend provides data
        this.pendingPayments = 5000; // static/dummy
        this.totalMembers = villas.length; // or get from user API
      },
      error: (err) => {
        console.error('Error fetching villa stats:', err);
      }
    });
  }

  fetchNotices(): void {
    // optional stub for future API
    this.latestNotices = ['Society meeting on 10th July', 'Maintenance due by 15th July'];
  }

  goHome(): void {
    window.location.href = '/home';
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }

  setUsernameFromToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.username = payload.sub || 'User';
      this.role = payload.role || 'VILLA_OWNER';
    }
  }
}
