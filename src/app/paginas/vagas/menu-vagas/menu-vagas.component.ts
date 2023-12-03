import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { validadorUnicaSelecao } from 'src/app/enviroments/unica-selecao';

@Component({
  selector: 'app-menu-vagas',
  templateUrl: './menu-vagas.component.html',
  styleUrls: ['./menu-vagas.component.css']
})
export class MenuVagasComponent {
  public formularioVagas!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router) {

  }

  ngOnInit() {
    this.formularioVagas = this.formBuilder.group ({
      'criar-vaga': [false],
      'ver-vaga': [false],
      'editar-vaga': [false],
      'excluir-vaga': [false],
    }, { validators: validadorUnicaSelecao });
  };

  tipoVaga() {
    let criarVaga = this.formularioVagas.get('criar-vaga')?.value;
    let verVaga = this.formularioVagas.get('ver-vaga')?.value;
    let editarVaga = this.formularioVagas.get('editar-vaga')?.value;
    let excluirVaga = this.formularioVagas.get('excluir-vaga')?.value;
  
    if (this.formularioVagas.errors?.['multipleSelection']) {
      window.alert('Não foi possível prosseguir, pois houve mais de uma opção selecionada');
      location.reload();
      return;
    }
  
    if (criarVaga) {
      this.router.navigate(['/criar-vaga']);
    } else if (verVaga) {
      this.router.navigate(['/vaga/1']);
    } else if (editarVaga) {
      this.router.navigate(['/editar-vaga/1']);
    } else if (excluirVaga) {
      this.router.navigate(['/excluir-vaga/1']);
    }
  }

  cancelar() {
    this.router.navigate(['feed'])
  }
}
