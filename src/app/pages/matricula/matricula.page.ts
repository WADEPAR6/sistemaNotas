import { Component, OnInit } from '@angular/core';
import { AcademicaService } from '../../services/academica.service';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.page.html',
  styleUrls: ['./matricula.page.scss'],
})
export class MatriculaPage implements OnInit {
  estadoMatricula: string = '';
  fechaRegistro: string = '';

  constructor(private academicaService: AcademicaService) {}

  ngOnInit() {
    this.academicaService.getEstadoMatricula().subscribe(data => {
      this.estadoMatricula = data.estado;
      this.fechaRegistro = data.fechaRegistro;
    });
  }
}
