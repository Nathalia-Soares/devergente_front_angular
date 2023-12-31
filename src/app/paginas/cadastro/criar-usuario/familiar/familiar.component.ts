import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-familiar',
  templateUrl: './familiar.component.html',
  styleUrls: ['./familiar.component.css']
})
export class FamiliarComponent {
  dataNascimento: Date | null = null;

  public formularioCadastro!: FormGroup;

  maiorIdade = (data: Date | null): boolean => {
    this.dataNascimento = data;
    if (data) {
      const dataAtual = new Date();
      const dataMinima = new Date(
        dataAtual.getFullYear() - 18,
        dataAtual.getMonth(),
        dataAtual.getDate()
      );
      return data <= dataMinima;
    }
    return false;
  };
  
  constructor(private formBuilder: FormBuilder, private service: UsuarioService, private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.formularioCadastro = this.formBuilder.group ({
      nome: ['',[Validators.required], Validators.maxLength(196)],
      username: ['',[Validators.required, 
        Validators.pattern(/^[^\s]*$/)],
        Validators.maxLength(32)],
      email: ['',[Validators.required, Validators.email], Validators.maxLength(100)],
      senha: ['',[Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)],
        Validators.maxLength(16)],
      data_nascimento: ['',[Validators.required]],
      tipo_perfil: 2,
      tipo_familiar: ['',[Validators.required]],
    })
  };

  cadastroUsuario() {
    let dataNascimento = moment(this.formularioCadastro.value.data_nascimento, "DD-MM-YYYY");
    let dataFormatada = new Date(dataNascimento.year(), dataNascimento.month(), dataNascimento.date());
    let usuario = { ...this.formularioCadastro.value, data_nascimento: dataFormatada };
  
    // Converta o valor de tipo_familiar para número
    usuario.tipo_familiar = Number(usuario.tipo_familiar);
  
    // Envie 'usuario' para o serviço, não 'this.formularioCadastro.value'
    this.service.criarUsuario(usuario).subscribe((res: any) => {
      alert("Cadastro realizado com sucesso!");
      this.formularioCadastro.reset();
      this.router.navigate(['login']);
    }, (err: Error) => {
      alert("Não foi possível realizar o seu cadastro")
    });
  }

  cancelar() {
    this.router.navigate(['bem-vindo'])
  }
}
