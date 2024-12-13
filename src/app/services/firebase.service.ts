import { inject, Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { environment } from '../../environments/environment';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, collectionData, query } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth = getAuth(initializeApp(environment.firebaseConfig));
  firestore = inject(AngularFirestore);

  constructor() { }

  async signIn(credentials: { email: string; password: string }) {
    const { email, password } = credentials;
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  getCollectionData(path: string, collectionQuery?: any): Observable<any[]> {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, ...collectionQuery), { idField: 'id' });
  }

  async addCalificacion(calificacionData: any): Promise<void> {
    const idmateria = this.firestore.createId();
    const dataToSave = {
      ...calificacionData,
    };
    return this.firestore.collection('calificaciones').doc(idmateria).set(dataToSave);
  }
  // En firebase.service.ts
  updateCalificacion(id: string, calificacionData: any): Promise<void> {
    return this.firestore.collection('calificaciones').doc(id).update(calificacionData);
  }
}