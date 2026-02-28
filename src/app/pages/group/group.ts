import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [TagModule, CardModule, DividerModule],
  templateUrl: './group.html',
  styleUrl: './group.css',
})
export class GroupComponent {
  N: number = 0;
}
