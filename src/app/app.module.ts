import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { AppComponent } from './app.component';
import { TaskPage } from './pages/tasks/tasks.page'; // Importa tu página
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, TaskPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),  // Añade IonicModule en el array de imports
    RouterModule.forRoot([
      { path: '', component: TaskPage }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
