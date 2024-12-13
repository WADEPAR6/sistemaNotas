import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskCompletionService {
  constructor(private firestore: AngularFirestore) {}

  // Registrar actividad completada por un estudiante
  registerActivity(studentId: string, taskId: string, completionDate: Date): Observable<any> {
    return this.firestore.collection('activities').add({
      studentId: studentId,
      taskId: taskId,
      completionDate: completionDate
    });
  }

  // Obtener tareas completadas por un estudiante
  getCompletedTasks(studentId: string): Observable<any[]> {
    return this.firestore.collection('activities', ref => ref.where('studentId', '==', studentId)).valueChanges();
  }
}
