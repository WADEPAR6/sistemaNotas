import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificationPageRoutingModule } from './notification-routing.module';
import { NotificationPage } from './notification.page';
import { NotificationService } from '../services/notification.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule,
    AngularFirestoreModule,
  ],
  declarations: [NotificationPage],
  providers: [NotificationService],
})
export class NotificationPageModule {}
