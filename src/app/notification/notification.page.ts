import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ToastController } from '@ionic/angular';
import { RefresherCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage {
  notifications = [
    {
      title: '📚 Recordatorio de Examen',
      body: 'Tienes un examen de Matemáticas mañana a las 10:00 AM\nNo olvides llevar calculadora!',
      tag: 'exam',
    },
    {
      title: '📝 Tarea Pendiente',
      body: 'Entrega del proyecto final de Programación\nFecha límite: 20/12/2023',
      tag: 'task',
    },
    {
      title: '🎉 Evento Importante',
      body: 'Feria de Ciencias este viernes\nLugar: Auditorio Principal\nHora: 15:00',
      tag: 'event',
    },
  ];

  constructor(
    private notificationService: NotificationService,
    private toastController: ToastController
  ) {}

  async doRefresh(event: RefresherCustomEvent) {
    try {
      await this.notificationService.showTaskNotification();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await this.notificationService.showExamNotification();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await this.notificationService.showEventNotification();

      const toast = await this.toastController.create({
        message: 'Notificaciones enviadas!',
        duration: 2000,
        position: 'top',
        color: 'success',
      });

      await toast.present();
    } catch (error) {
      console.error('Error:', error);
      const toast = await this.toastController.create({
        message: 'Error al enviar notificaciones',
        duration: 2000,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
    } finally {
      event.target.complete();
    }
  }
}
