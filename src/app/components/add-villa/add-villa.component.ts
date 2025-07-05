import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VillaService, Villa } from '../../services/villa.service';

@Component({
  selector: 'app-add-villa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-villa.component.html',
  styleUrls: ['./add-villa.component.scss']
})
export class AddVillaComponent {
  villaNumber = '';
  roadNumber = '';
  ownerName = '';
  ownerEmail = '';
  contactNumber = '';
  isOccupied = false;
  errorMessage = '';

  constructor(private villaService: VillaService, private router: Router) {}

  onSubmit() {
    const villa: Villa = {
      villaNumber: this.villaNumber,
      roadNumber: this.roadNumber,
      ownerName: this.ownerName,
      ownerEmail: this.ownerEmail,
      contactNumber: this.contactNumber,
      isOccupied: this.isOccupied
    };

    this.villaService.addVilla(villa).subscribe({
      next: () => {
        alert('Villa added successfully!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to add villa.';
        alert(this.errorMessage);
      }
    });
  }
}
