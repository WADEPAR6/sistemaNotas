// src/app/services/file.service.ts

import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage) {}

  // Método para subir un archivo
  uploadFile(file: File): Observable<any> {
    const filePath = `tareas/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    return task.snapshotChanges(); // Puedes manejar el progreso y los metadatos aquí
  }

  // Método para obtener la URL de descarga de un archivo
  getFileUrl(filePath: string): Observable<string> {
    const fileRef = this.storage.ref(filePath);
    return fileRef.getDownloadURL();
  }
}
