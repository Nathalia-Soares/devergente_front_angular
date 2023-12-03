import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { validadorUnicaSelecao } from 'src/app/enviroments/unica-selecao';

@Component({
  selector: 'app-menu-curriculum',
  templateUrl: './menu-curriculum.component.html',
  styleUrls: ['./menu-curriculum.component.css']
})
export class MenuCurriculumComponent {
  public formularioCurriculum!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router) {

  }

  ngOnInit() {
    this.formularioCurriculum = this.formBuilder.group ({
      'criar-curriculum': [false],
      'ver-curriculum': [false],
      'editar-curriculum': [false],
      'excluir-curriculum': [false],
    }, { validators: validadorUnicaSelecao });
  };

  tipoCurriculum() {
    let criarCurriculum = this.formularioCurriculum.get('criar-curriculum')?.value;
    let verCurriculum = this.formularioCurriculum.get('ver-curriculum')?.value;
    let editarCurriculum = this.formularioCurriculum.get('editar-curriculum')?.value;
    let excluirCurriculum = this.formularioCurriculum.get('excluir-curriculum')?.value;
  
    if (this.formularioCurriculum.errors?.['multipleSelection']) {
      window.alert('Não foi possível prosseguir, pois houve mais de uma opção selecionada');
      location.reload();
      return;
    }
  
    if (criarCurriculum) {
      this.router.navigate(['/criar-curriculum']);
    } else if (verCurriculum) {
      this.router.navigate(['/curriculum/1']);
    } else if (editarCurriculum) {
      this.router.navigate(['/editar-curriculum/1']);
    } else if (excluirCurriculum) {
      this.router.navigate(['/excluir-curriculum/1']);
    }
  }

  cancelar() {
    this.router.navigate(['feed'])
  }
}
