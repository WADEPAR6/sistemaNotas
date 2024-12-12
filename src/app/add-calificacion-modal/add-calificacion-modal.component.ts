import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilsService } from './../services/utils.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-add-calificacion-modal',
  templateUrl: './add-calificacion-modal.component.html',
  styleUrls: ['./add-calificacion-modal.component.scss'],
})
export class AddCalificacionModalComponent {
  nombre: string = '';
  estadoMatricula: string = '';
  nota: number | null = null;
  userId: string | null = null;

  constructor(private modalController: ModalController, private utilsService: UtilsService) {
    const auth = getAuth();
    const user = auth.currentUser ;
    this.userId = user ? user.uid : null; // Obtener el UID del usuario
  }

  async addCalificacion() {
    if (this.userId && this.nombre && this.estadoMatricula && this.nota !== null) {
      const calificacionData = {
        nombre: this.nombre,
        estadoMatricula: this.estadoMatricula,
        nota: this.nota,
        estudiante: this.userId,
      };

      try {
        await this.utilsService.addCalificacion(calificacionData);
        this.modalController.dismiss(); // Cerrar el modal
      } catch (error) {
        console.error('Error al añadir la calificación', error);
      }
    } else {
      console.error('Por favor, completa todos los campos.');
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}