import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurriculumService } from 'src/app/services/curriculum.service';
import * as moment from 'moment';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';
import { tap, switchMap } from 'rxjs/operators';
import { empty } from 'rxjs';

@Component({
  selector: 'app-criar-curriculum',
  templateUrl: './criar-curriculum.component.html',
  styleUrls: ['./criar-curriculum.component.css']
})
export class CriarCurriculumComponent {
  dataInicio: Date | null = null;
  dataFim: Date | null = null;

  public formularioCurriculum!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private curriculumService: CurriculumService,
    private http: HttpClient,
    private router: Router,
    private cepService: ConsultaCepService) {

  }

  ngOnInit() {
    
    const usuarioData = localStorage.getItem('usuario');
    let usuario = usuarioData ? JSON.parse(usuarioData) : null;

    this.formularioCurriculum = this.formBuilder.group({
      usuario: this.formBuilder.group({
        id: [usuario ? usuario.id : ''],
        nome: [usuario ? usuario.nome : ''],
        username: [usuario ? usuario.username : ''],
      }),
      endereco: this.formBuilder.group({
        cep: ['', [Validators.required, Validators.maxLength(9), Validators.pattern(/^\d{5}-\d{3}$/)]],
        logradouro: ['', [Validators.required, Validators.maxLength(196)]],
        complemento: ['', [Validators.maxLength(128)]],
        numero: ['', [Validators.required, Validators.maxLength(12)]],
        referencia: ['', [Validators.required, Validators.maxLength(128)]],
        bairro: ['', [Validators.required, Validators.maxLength(50)]],
        cidade: ['', [Validators.required, Validators.maxLength(50)]],
        uf: ['', [Validators.required, Validators.maxLength(2)]]
      }),
      telefone: ['', [Validators.required, Validators.pattern(/^\d{11}$/), Validators.maxLength(13)]],
      telefone2: ['', [Validators.pattern(/^\d{11}$/)], Validators.maxLength(13)],
      area_interesse: ['', [Validators.required, Validators.maxLength(50)], Validators.maxLength(64)],
      habilidades: ['', [Validators.required, Validators.maxLength(50)], Validators.maxLength(256)],
      formacao: ['', [Validators.required], Validators.maxLength(128)],
      instituicao_ensino: ['', [Validators.maxLength(256)]],
      experiencia_anterior: ['', [Validators.required]],
      cargo: ['', [Validators.maxLength(64)]],
      empresa: ['', [Validators.maxLength(128)]],
      data_inicio: [''],
      data_fim: [''],
      resumo: ['', [Validators.required, Validators.maxLength(512)]],
    });

    this.formularioCurriculum.get('endereco.cep')?.statusChanges
      .pipe(
        tap((value: any) => console.log('status CEP:', value)),
        switchMap((status: any) => status ? this.cepService.consultaCep(this.formularioCurriculum.get('endereco.cep')?.value) : empty())
      )
      .subscribe(dados => {
        console.log('resposta da requisição HTTP:', dados);
        this.insereDadosForm(dados);
      });
  }

  consultaCep(cep: string) {
    if (cep != null && cep !== '') {
      this.cepService.consultaCep(cep)
        .subscribe(dados => this.insereDadosForm(dados));
    }
  }

  insereDadosForm(dados: any) {
    this.formularioCurriculum.patchValue({
      endereco: {
        logradouro: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        uf: dados.uf
      }
    });
    console.log(dados);
  }

  cadastroCurriculum() {
    let dataInicio = moment(this.formularioCurriculum.value.data_inicio, "DD-MM-YYYY");
    let dataFim = moment(this.formularioCurriculum.value.data_fim, "DD-MM-YYYY");
    let dataFormatadaInicio = new Date(dataInicio.year(), dataInicio.month(), dataInicio.date());
    let dataFormatadaFim = new Date(dataFim.year(), dataFim.month(), dataFim.date());

    let formularioValue = {
      ...this.formularioCurriculum.value,
      data_inicio: dataFormatadaInicio,
      data_fim: dataFormatadaFim
    };

    this.curriculumService.criarCurriculum(formularioValue).subscribe((res: any) => {
      alert("Curriculum criado com sucesso!");
      this.formularioCurriculum.reset();
      this.router.navigate(['feed']);
    }, (err: Error) => {
      alert("Não foi possível realizar o cadastro do seu curriculum: " + err.message);
    });
  }

  cancelar() {
    this.router.navigate(['feed'])
  }
}
