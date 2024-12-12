import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ToastController } from '@ionic/angular';
import { RefresherCustomEvent } from '@ionic/angular'; // Añade esta importación

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage {
  constructor(
    private notificationService: NotificationService,
    private toastController: ToastController
  ) {}

  async doRefresh(event: RefresherCustomEvent) {
    try {
      // Mostrar las tres notificaciones con un pequeño delay entre ellas
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
