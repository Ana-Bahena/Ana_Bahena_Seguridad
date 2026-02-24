import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        RouterLink,
        FormsModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        CardModule,
        FloatLabelModule,
        DividerModule,
        SelectModule,
        ToastModule,
    ],
    providers: [MessageService],
    templateUrl: './register.html',
})
export class RegisterPage {
    name = '';
    email = '';
    password = '';
    confirmPassword = '';
    role: string | null = null;
    loading = signal(false);

    roles = [
        { label: 'Estudiante', value: 'student' },
        { label: 'Docente', value: 'teacher' },
        { label: 'Administrador', value: 'admin' },
    ];

    constructor(
        private router: Router,
        private messageService: MessageService
    ) { }

    onRegister() {
        if (!this.name || !this.email || !this.password || !this.confirmPassword) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Campos requeridos',
                detail: 'Por favor completa todos los campos.',
            });
            return;
        }
        if (this.password !== this.confirmPassword) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Las contraseñas no coinciden.',
            });
            return;
        }
        this.loading.set(true);
        setTimeout(() => {
            this.loading.set(false);
            this.router.navigate(['/login']);
        }, 1500);
    }
}
