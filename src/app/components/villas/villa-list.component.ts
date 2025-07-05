import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VillaService } from '@app/services/villa.service';
import { Villa } from '@app/models/villa.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-villa-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './villa-list.component.html'
})
export class VillaListComponent implements OnInit {
  villas: Villa[] = [];
  filteredVillas: Villa[] = [];
  searchQuery: string = '';

  constructor(private villaService: VillaService, private router: Router) {}

  ngOnInit(): void {
    this.fetchVillas();
  }

  fetchVillas(): void {
    this.villaService.getAllVillas().subscribe((data) => {
      this.villas = data;
      this.filteredVillas = data;
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredVillas = this.villas.filter((villa) =>
      villa.villaNumber.toString().includes(query) ||
      villa.ownerName?.toLowerCase().includes(query) ||
      villa.ownerEmail?.toLowerCase().includes(query)
    );
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filteredVillas = this.villas;
  }

  onEdit(villaNumber: string): void {
    this.router.navigate(['/edit-villa', villaNumber]);
  }

  onDelete(villaNumber: string): void {
    if (confirm('Are you sure you want to delete this villa?')) {
      this.villaService.deleteVilla(villaNumber).subscribe(() => {
        this.fetchVillas();
      });
    }
  }

  onView(villaNumber: string): void {
    this.router.navigate(['/view-villa', villaNumber]);
  }
}
