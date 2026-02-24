import { Component } from '@angular/core';
//import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ ButtonModule, CardModule],
  templateUrl: './landing.html'
})
export class LandingPage {
  features = [
    {
      icon: 'pi pi-shield',
      title: 'Seguridad',
      description: 'Tus datos protegidos con los más altos estándares de seguridad.',
    }
  ];
}
