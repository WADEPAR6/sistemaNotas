import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TaskPage } from './pages/tasks/tasks.page';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'home', loadChildren: () => import('./pages/calificaciones/calificaciones.module').then(m => m.CalificacionesPageModule) },
  { path: 'calificaciones', loadChildren: () => import('./pages/calificaciones/calificaciones.module').then(m => m.CalificacionesPageModule) },
  // {
  //   path: 'task/:id',
  //   component: TaskPage
  // },
  {
    path: 'notification',
    loadChildren: () =>
      import('./notification/notification.module').then(
        (m) => m.NotificationPageModule
      ),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
