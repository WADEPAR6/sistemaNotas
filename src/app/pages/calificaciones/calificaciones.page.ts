import { Component, OnInit } from '@angular/core';
import { AcademicaService } from '../../services/academica.service';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.page.html',
  styleUrls: ['./calificaciones.page.scss'],
})
export class CalificacionesPage implements OnInit {
  // Datos estáticos de ejemplo, con el nuevo campo 'estado'
  materias = [
    { nombre: 'Matemáticas', estudiante: 'Juan Pérez', nota: 8.5, estado: 'Activo' },
    { nombre: 'Historia', estudiante: 'Ana Gómez', nota: 9.2, estado: 'Activo' },
    { nombre: 'Ciencias', estudiante: 'Carlos López', nota: 7.8, estado: 'Inactivo' },
    { nombre: 'Inglés', estudiante: 'María Torres', nota: 9.5, estado: 'Activo' },
    { nombre: 'Inglés', estudiante: 'María Torres', nota: 9.5, estado: 'Activo' }
  ]; 

  constructor(private academicaService: AcademicaService) {}

  ngOnInit() {
    // Llamada al servicio para obtener las calificaciones desde Firebase
    this.academicaService.getCalificaciones().subscribe({
      next: (data) => {
        this.materias = data || [];  // Asignamos los datos obtenidos a la propiedad
      },
      error: (err) => {
        console.error('Error al cargar las calificaciones', err);
      }
    });
  }
}
