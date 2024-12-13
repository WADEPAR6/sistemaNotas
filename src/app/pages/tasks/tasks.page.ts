import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './tasks.page.html',  // Asegúrate de que la ruta sea correcta
  styleUrls: ['./tasks.page.scss'],
})
export class TaskPage implements OnInit {
  taskId: string | null = '';

  constructor() {}

  ngOnInit(): void {
    // Lógica de inicialización
  }

  registerActivity(): void {
    console.log('Actividad registrada');
    // Lógica para registrar la actividad completada
  }
}
