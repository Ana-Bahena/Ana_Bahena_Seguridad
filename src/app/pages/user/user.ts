import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';

import { UserService, UserProfile } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule, CardModule, AvatarModule, DividerModule, TagModule, MessageModule,
    ButtonModule, ToastModule, InputTextModule, FloatLabelModule, DatePickerModule,
    ReactiveFormsModule, TooltipModule
  ],
  providers: [MessageService],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserComponent implements OnInit {
  profile: UserProfile | null = null;
  editMode = false;
  editForm!: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profile = this.userService.getProfile();
    this.initForm();
  }

  initForm(): void {
    if (this.profile) {
      this.editForm = this.fb.group({
        fullName: [this.profile.fullName, [Validators.required]],
        email: [this.profile.email, [Validators.required, Validators.email]],
        phone: [this.profile.phone, [Validators.required, Validators.pattern('^[0-9]+$')]],
        address: [this.profile.address, [Validators.required]],
        birthDate: [this.profile.birthDate ? new Date(this.profile.birthDate) : '', [Validators.required, this.ageValidator]],
      });
    }
  }

  // Validador de mayoría de edad (18+)
  ageValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age < 18 ? { underAge: true } : null;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.initForm();
    }
  }

  saveProfile(): void {
    if (this.editForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor complete todos los campos correctamente.' });
      return;
    }

    if (this.profile) {
      const updatedProfile: UserProfile = {
        ...this.profile,
        fullName: this.editForm.value.fullName,
        email: this.editForm.value.email,
        phone: this.editForm.value.phone,
        address: this.editForm.value.address,
        birthDate: this.editForm.value.birthDate
      };
      this.userService.saveProfile(updatedProfile);
      this.profile = updatedProfile;
      this.editMode = false;
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Perfil actualizado correctamente.' });
    }
  }

  deleteProfile(): void {
    if (confirm('¿Estás seguro de que deseas eliminar tu perfil de forma permanente?')) {
      this.userService.clearProfile();
      this.profile = null;
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Perfil eliminado correctamente.' });
      setTimeout(() => {
        this.router.navigate(['/']); // redirect to home/login
      }, 1500);
    }
  }

  /** Calcula la edad a partir de la fecha de nacimiento guardada */
  getAge(): number | null {
    if (!this.profile?.birthDate) return null;
    const birth = new Date(this.profile.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  /** Formatea la fecha en dd/mm/aaaa */
  formatDate(date: string | Date | undefined): string {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
}
