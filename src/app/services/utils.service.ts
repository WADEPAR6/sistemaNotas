import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  // Método para mostrar un toast
  async presentToast(options: { message: string; color: string; position: string; duration: number; icon?: string }) {
    const toast = await this.toastController.create({
      message: options.message,
      color: options.color,
      duration: options.duration,
      buttons: options.icon ? [{ icon: options.icon, side: 'start' }] : []
    });
    await toast.present();
  }

  // Método para mostrar un loading
  async loading(message: string = 'Cargando...') {
    const loading = await this.loadingController.create({
      message: message,
      spinner: 'crescent'
    });
    return loading;
  }

  // Método para navegar a una ruta
  routerLink(path: string) {
    this.router.navigate([path]);
  }

  // Método para guardar en localStorage
  saveInLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Método para obtener de localStorage
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  // Método para eliminar de localStorage
  removeFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  // Método para obtener las calificaciones del usuario
  getCalificaciones(userId: string): Observable<any[]> {
    return this.firestore.collection('calificaciones', ref => ref.where('userId', '==', userId)).valueChanges();
  }

  addCalificacion(calificacionData: any): Promise<void> {
    const id = this.firestore.createId(); // Generar un ID único para la calificación
    return this.firestore.collection('calificaciones').doc(id).set(calificacionData);
  }
}