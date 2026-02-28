import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

export interface GroupItem {
  id?: string;
  name?: string;
  category?: string;
  level?: string;
  author?: string;
  members?: number;
  tickets?: number;
}

const STORAGE_KEY = 'groups_data';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    CommonModule, FormsModule, TagModule, CardModule, DividerModule,
    TableModule, ButtonModule, ToolbarModule, DialogModule, InputTextModule,
    InputNumberModule, SelectModule, ToastModule, ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './group.html',
  styleUrl: './group.css',
})
export class GroupComponent implements OnInit {
  groups: GroupItem[] = [];
  groupItem!: GroupItem;

  groupDialog: boolean = false;
  submitted: boolean = false;

  categoryOptions = [
    { label: 'Tecnología', value: 'Tecnología' },
    { label: 'Negocios', value: 'Negocios' },
    { label: 'Educación', value: 'Educación' },
    { label: 'Entretenimiento', value: 'Entretenimiento' }
  ];

  levelOptions = [
    { label: 'Principiante', value: 'Principiante' },
    { label: 'Intermedio', value: 'Intermedio' },
    { label: 'Avanzado', value: 'Avanzado' }
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      this.groups = JSON.parse(data);
    } else {
      // Mock data inicial
      this.groups = [
        { id: '1000', name: 'Angular Devs', category: 'Tecnología', level: 'Intermedio', author: 'Ana Bahena', members: 120, tickets: 5 }
      ];
      this.saveGroups();
    }
  }

  saveGroups() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.groups));
  }

  openNew() {
    this.groupItem = {};
    this.submitted = false;
    this.groupDialog = true;
  }

  editGroup(group: GroupItem) {
    this.groupItem = { ...group };
    this.groupDialog = true;
  }

  deleteGroup(group: GroupItem) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar el grupo ' + group.name + '?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.groups = this.groups.filter((val) => val.id !== group.id);
        this.saveGroups();
        this.groupItem = {};
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Grupo eliminado correctamente', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.groupDialog = false;
    this.submitted = false;
  }

  // Genera ID pseudo-aleatorio para simular PK
  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  saveGroup() {
    this.submitted = true;

    if (this.groupItem.name?.trim()) {
      if (this.groupItem.id) {
        // Edit mode
        const index = this.findIndexById(this.groupItem.id);
        if (index !== -1) {
          this.groups[index] = this.groupItem;
          this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Grupo modificado correctamente', life: 3000 });
        }
      } else {
        // Create mode
        this.groupItem.id = this.createId();
        this.groups.push(this.groupItem);
        this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Grupo añadido correctamente', life: 3000 });
      }

      this.groups = [...this.groups];
      this.saveGroups();
      this.groupDialog = false;
      this.groupItem = {};
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El nombre es obligatorio', life: 3000 });
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  N_get() {
    return this.groups.length;
  }
}
