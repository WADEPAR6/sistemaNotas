import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { environment } from '../../environments/environment';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth = getAuth(initializeApp(environment.firebaseConfig));

  constructor() {}

  async signIn(credentials: { email: string; password: string }) {
    const { email, password } = credentials;
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}