// src/app/services/activity.service.ts

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private firestore: AngularFirestore) {}

  // Método para registrar una actividad completada
  registerActivity(studentId: string, taskId: string, completed: boolean) {
    return this.firestore.collection('students').doc(studentId).collection('activities').add({
      taskId,
      completed,
      timestamp: new Date()
    });
  }
}
