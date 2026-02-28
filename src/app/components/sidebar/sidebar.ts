import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, PanelMenuModule, DividerModule, TagModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  appVersion = '1.0.0';

  items: MenuItem[] = [
    {
      label: 'Group',
      icon: 'pi pi-users',
      routerLink: ['/home/group'],
    },
    {
      label: 'User',
      icon: 'pi pi-user',
      routerLink: ['/home/user'],
    },
  ];
}
