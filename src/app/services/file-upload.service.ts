import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private storage: AngularFireStorage) {}

  // Subir archivo a Firebase Storage
  uploadFile(file: File, path: string): Observable<any> {
    const filePath = `${path}/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    return task.snapshotChanges();
  }

  // Obtener URL de descarga del archivo
  getDownloadURL(path: string): Observable<string> {
    const fileRef = this.storage.ref(path);
    return fileRef.getDownloadURL();
  }
}
