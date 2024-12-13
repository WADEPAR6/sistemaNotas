import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalificacionesPageRoutingModule } from './calificaciones-routing.module';

import { CalificacionesPage } from './calificaciones.page';
import { AddCalificacionModalModule } from 'src/app/add-calificacion-modal/add-calificacion-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalificacionesPageRoutingModule,
    AddCalificacionModalModule
  ],
  declarations: [CalificacionesPage]
})
export class CalificacionesPageModule {}
