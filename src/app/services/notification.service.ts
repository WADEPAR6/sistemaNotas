import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private firestore: AngularFirestore,
    private utilsService: UtilsService
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
    const user = this.utilsService.getFromLocalStorage('user');
    if (!user) {
      return new Observable<any[]>((subscriber) => subscriber.next([]));
    }

    return this.firestore
      .collection('notifications', (ref) =>
        ref
          .where('userId', '==', user.uid)
          .orderBy('createdAt', 'desc')
          .limit(10)
      )
      .valueChanges();
  }

  async addNotification(data: any) {
    const user = this.utilsService.getFromLocalStorage('user');
    if (!user) return;

    try {
      await this.firestore.collection('notifications').add({
        ...data,
        userId: user.uid,
        createdAt: new Date(),
        read: false,
      });
    } catch (error) {
      console.error('Error al agregar notificación:', error);
    }
  }
}
