import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { FirebaseService } from '../services/firebase.service';

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
    private firebaseService: FirebaseService
  ) {
    const auth = getAuth();
    const user = auth.currentUser ;
    this.userId = user ? user.uid : null; // Obtener el UID del usuario
  }

  ngOnInit() {
    // Si hay una calificación, inicializa los campos
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
          // Si hay una calificación, actualiza
          await this.firebaseService.updateCalificacion(this.calificacion.id, calificacionData);
        } else {
          // Si no hay calificación, crea una nueva
          await this.firebaseService.addCalificacion(calificacionData);
        }
        this.modalController.dismiss(); // Cierra el modal
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