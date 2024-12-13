import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { FirebaseService } from '../services/firebase.service';
import { NotificationService } from '../services/notification.service'; // Importa el servicio de notificaciones


@Component({
  selector: 'app-add-calificacion-modal',
  templateUrl: './add-calificacion-modal.component.html',
  styleUrls: ['./add-calificacion-modal.component.scss'],
})
export class AddCalificacionModalComponent implements OnInit {
  @Input() calificacion: any;
  nombre: string = '';
  estado: string = '';
  nota: number | null = null;
  userId: string | null = null;

  constructor(
    private modalController: ModalController,
    private firebaseService: FirebaseService,
    private notificationService: NotificationService
  ) {
    const auth = getAuth();
    const user = auth.currentUser ;
    this.userId = user ? user.uid : null;
  }

  ngOnInit() {
    if (this.calificacion) {
      this.nombre = this.calificacion.nombre;
      this.estado = this.calificacion.estado;
      this.nota = this.calificacion.nota;
    }
  }

  async addCalificacion() {
    if (this.userId && this.nombre && this.estado && this.nota !== null) {
      const calificacionData = {
        nombre: this.nombre,
        estado: this.estado,
        nota: this.nota,
        estudiante: this.userId,
      };

      try {
        if (this.calificacion) {
          await this.firebaseService.updateCalificacion(this.calificacion.id, calificacionData);
        } else {
          await this.firebaseService.addCalificacion(calificacionData);
          await this.notificationService.addNotification({
            title: 'Nueva Calificación',
            body: `Se ha añadido una nueva calificación: ${this.nombre} - ${this.nota}`,
            userId: this.userId,
          });
        }
        this.modalController.dismiss();
      } catch (error) {
        console.error('Error al añadir o actualizar la calificación', error);
      }
    } else {
      console.error('Por favor, completa todos los campos.');
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}