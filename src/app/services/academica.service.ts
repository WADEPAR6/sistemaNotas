import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcademicaService {
  // La URL base de tu API (ajusta según sea necesario)
  private apiUrl = 'https://api.universidadambato.edu.ec'; // Cambia esta URL

  constructor(private http: HttpClient) {}

  // Método para obtener las calificaciones
  getCalificaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/calificaciones`);
  }

  // Método para obtener el estado de la matrícula
  getEstadoMatricula(): Observable<any> {
    return this.http.get(`${this.apiUrl}/matricula`);
  }
}
