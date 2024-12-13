import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from './../services/firebase.service';
import { UtilsService } from './../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  async onSubmit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      const { email, password } = this.form.value;
      if (email && password) {
        this.firebaseSvc.signIn({ email, password }).then(async res => {
          console.log('Usuario autenticado:', res.user);
          this.utilsSvc.saveInLocalStorage('user', res.user);
          this.utilsSvc.routerLink('/calificaciones');
        }).catch(err => {
          this.utilsSvc.presentToast({
            message: err.message,
            color: 'danger',
            position: 'top',  
            duration: 3000,
            icon: 'alert-circle-outline'
          });
          console.log(err);
        }).finally(() => {
          loading.dismiss();
        });
      }
    }
  }
}