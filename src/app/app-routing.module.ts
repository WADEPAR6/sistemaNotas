import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskPage } from './pages/tasks/tasks.page';


const routes: Routes = [
  {
    path: 'task/:id',  // Asegúrate de que la ruta tenga el parámetro 'id'
    component: TaskPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
