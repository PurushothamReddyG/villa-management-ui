import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddVillaComponent } from './add-villa.component';

describe('AddVillaComponent', () => {
  let component: AddVillaComponent;
  let fixture: ComponentFixture<AddVillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVillaComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddVillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AddVillaComponent', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.villaForm.valid).toBeFalse();
  });

  it('form should be valid when required fields are filled', () => {
    component.villaForm.setValue({
      ownerName: 'John Doe',
      villaNumber: 'A101',
      phoneNumber: '9876543210',
      email: 'john@example.com'
    });
    expect(component.villaForm.valid).toBeTrue();
  });
});
