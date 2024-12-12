import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddCalificacionModalComponent } from './add-calificacion-modal.component';

@NgModule({
  declarations: [AddCalificacionModalComponent],
  imports: [
    CommonModule,
    IonicModule // Ensure IonicModule is imported here
  ],
  exports: [AddCalificacionModalComponent]
})
export class AddCalificacionModalModule {}