import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.page.html',
  styleUrls: ['./calificaciones.page.scss'],
})
export class CalificacionesPage implements OnInit {
  materias: any[] = []; 
  userId: string | null = null; // Inicializamos como null

  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    // Obtener el UID del usuario actual
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userId = user.uid; // Asignamos el UID del usuario
        this.loadCalificaciones(); // Cargamos las calificaciones
      } else {
        console.log('No hay usuario autenticado.');
      }
    });
  }

  loadCalificaciones() {
    if (this.userId) {
      // Llamada al servicio para obtener las calificaciones desde Firebase
      this.utilsService.getCalificaciones(this.userId).subscribe({
        next: (data) => {
          this.materias = data || [];  // Asignamos los datos obtenidos a la propiedad
          console.log('Calificaciones obtenidas:', this.materias); // Imprimimos las calificaciones en la consola
        },
        error: (err) => {
          console.error('Error al cargar las calificaciones', err);
        }
      });
    }
  }
}