import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private readonly firestore: AngularFirestore,
    private readonly utilsService: UtilsService
  ) {
    this.requestPermission();
  }

  async requestPermission() {
    if (!('Notification' in window)) {
      console.log('Este navegador no soporta notificaciones');
      return;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  async showExamNotification() {
    if (Notification.permission === 'granted') {
      new Notification('📚 Recordatorio de Examen', {
        body: 'Tienes un examen de Matemáticas mañana a las 10:00 AM\nNo olvides llevar calculadora!',
        icon: 'assets/icon/favicon.png',
        badge: 'assets/icon/favicon.png',
        tag: 'exam',
      });
    }
  }

  async showTaskNotification() {
    if (Notification.permission === 'granted') {
      new Notification('📝 Tarea Pendiente', {
        body: 'Entrega del proyecto final de Programación\nFecha límite: 20/12/2023',
        icon: 'assets/icon/favicon.png',
        badge: 'assets/icon/favicon.png',
        tag: 'task',
      });
    }
  }

  async showEventNotification() {
    if (Notification.permission === 'granted') {
      new Notification('🎉 Evento Importante', {
        body: 'Feria de Ciencias este viernes\nLugar: Auditorio Principal\nHora: 15:00',
        icon: 'assets/icon/favicon.png',
        badge: 'assets/icon/favicon.png',
        tag: 'event',
      });
    }
  }
  //Notificacion de cada usuario//
  getUserNotifications(): Observable<any[]> {
    const user = this.utilsService.getFromLocalStorage('user'); // Obtén el usuario logueado
    if (!user || !user.uid) {
      return new Observable<any[]>((subscriber) => subscriber.next([])); // Devuelve un observable vacío si no hay usuario
    }

    return this.firestore.collection('notificaciones', ref => ref.where('userId', '==', user.uid))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as object;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  async addNotification(data: any) {
    const user = this.utilsService.getFromLocalStorage('user');
    if (!user) return;

    try {
      console.log('Agregando notificación a firestore:', data);
      await this.firestore.collection('notificaciones').add({
        ...data,
        userId: user.uid,
        createdAt: new Date(),
        read: false,
      });

      // Muestra la notificación en el navegador
      if (Notification.permission === 'granted') {
        new Notification(data.title, {
          body: data.body,
          icon: 'assets/icon/favicon.png',
          badge: 'assets/icon/favicon.png',
        });
      }
    } catch (error) {
      console.error('Error al agregar notificación:', error);
    }
  }
}
