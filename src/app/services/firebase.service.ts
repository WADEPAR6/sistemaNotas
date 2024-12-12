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

  constructor() {}

  async signIn(credentials: { email: string; password: string }) {
    const { email, password } = credentials;
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  getCollectionData(path: string, collectionQuery?: any): Observable<any[]> {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, ...collectionQuery), { idField: 'id' });
  }
}