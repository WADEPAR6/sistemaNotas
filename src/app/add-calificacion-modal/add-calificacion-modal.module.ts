import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddCalificacionModalComponent } from './add-calificacion-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddCalificacionModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [AddCalificacionModalComponent]
})
export class AddCalificacionModalModule {}