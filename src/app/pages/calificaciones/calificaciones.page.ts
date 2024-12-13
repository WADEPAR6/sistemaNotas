import { Component, OnInit } from '@angular/core';
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
    private modalController: ModalController
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


}