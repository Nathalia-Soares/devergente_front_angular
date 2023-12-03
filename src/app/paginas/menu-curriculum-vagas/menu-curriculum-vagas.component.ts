import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { validadorUnicaSelecao } from 'src/app/enviroments/unica-selecao';

@Component({
  selector: 'app-menu-curriculum-vagas',
  templateUrl: './menu-curriculum-vagas.component.html',
  styleUrls: ['./menu-curriculum-vagas.component.css']
})
export class MenuCurriculumVagasComponent {
  public formularioMenu!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router) {

  }

  ngOnInit() {
    this.formularioMenu = this.formBuilder.group ({
      curriculum: [false],
      vagas: [false]
    }, { validators: validadorUnicaSelecao });
  };

  tipoCurriculumVagas() {
    let curriculum = this.formularioMenu.get('curriculum')?.value;
    let vagas = this.formularioMenu.get('vagas')?.value;
  
    if (this.formularioMenu.errors?.['multipleSelection']) {
      window.alert('Não foi possível prosseguir, pois houve mais de uma opção selecionada');
      location.reload();
      return;
    }
  
    if (curriculum) {
      this.router.navigate(['menu-curriculum']);
    } else if (vagas) {
      this.router.navigate(['menu-vagas']);
    } 
  }

  cancelar() {
    this.router.navigate(['feed'])
  }
}
