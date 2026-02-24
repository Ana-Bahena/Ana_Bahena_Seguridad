import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
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
        ToastModule,
    ],
    providers: [MessageService],
    templateUrl: './login.html',
})
export class LoginPage {
    email = '';
    password = '';
    loading = signal(false);

    constructor(
        private router: Router,
        private messageService: MessageService
    ) { }

    onLogin() {
        if (!this.email || !this.password) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Campos requeridos',
                detail: 'Por favor llena todos los campos.',
            });
            return;
        }
        this.loading.set(true);
        setTimeout(() => {
            this.loading.set(false);
            this.router.navigate(['/home']);
        }, 1500);
    }
}
