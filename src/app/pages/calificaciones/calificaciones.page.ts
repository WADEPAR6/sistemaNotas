import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AddCalificacionModalComponent } from '../../add-calificacion-modal/add-calificacion-modal.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.page.html',
  styleUrls: ['./calificaciones.page.scss'],
})
export class CalificacionesPage implements OnInit {
  calificaciones: any[] = [];
  materias: any[] = [];
  userId: string | null = null;

  constructor(
    private utilsService: UtilsService,
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userId = user.uid;
        this.loadCalificaciones();
      } else {
        console.log('No hay usuario autenticado.');
      }
    });
  }

  async openAddCalificacionModal() {
    const modal = await this.modalController.create({
      component: AddCalificacionModalComponent,
    });
    return await modal.present();
  }

  loadCalificaciones() {
    if (this.userId) {
      this.utilsService.getCalificaciones(this.userId).subscribe({
        next: (data) => {
          console.log('Calificaciones obtenidas:', data);
          this.materias = data.map((doc: any) => {
            console.log('Calificación:', doc.id);
            return { id: doc.id, ...doc };
          }) || [];
          console.log('Materias:', this.materias);
        },
        error: (err) => {
          console.error('Error al cargar las calificaciones', err);
        }
      });
    }
  }

  // Método para simular la descarga de un documento
  downloadDocument(nombreMateria: string) {
    const fileName = `${nombreMateria}.txt`;
    const fileContent = 'Esta es tu tarea'; // Contenido del archivo
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url); // Libera el objeto URL
  }

  // Método para eliminar una calificación
  async deleteCalificacion(idmateria: string) {
    try {
      console.log('Eliminando calificación:', idmateria);
      await this.utilsService.deleteCalificacion(idmateria); // Llama al método del servicio
      this.calificaciones = this.calificaciones.filter(calificacion => calificacion.idmateria !== idmateria); // Actualiza la lista
      console.log('Calificación eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la calificación', error);
    }
  }

  async editCalificacion(materia: any) {
    const modal = await this.modalController.create({
      component: AddCalificacionModalComponent,
      componentProps: { calificacion: materia }, // Pasa la calificación a editar
    });
    return await modal.present();
  }

  navigateToNotifications() {
    this.router.navigate(['/notification']); // Método para navegar a la ruta de notificaciones
  }
}