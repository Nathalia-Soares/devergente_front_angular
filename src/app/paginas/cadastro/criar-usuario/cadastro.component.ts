import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {

  public formularioCadastro!: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: UsuarioService, private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.formularioCadastro = this.formBuilder.group ({
      nome: ['',[Validators.required]],
      username: ['',[Validators.required, 
        Validators.pattern(/^[^\s]*$/)]],
      email: ['',[Validators.required, Validators.email]],
      senha: ['',[Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
      data_nascimento: ['',[Validators.required]],
      foto_perfil: ['',[Validators.required]],
      tipo_perfil: ['', [Validators.required]] 
    })
  };

  cadastroUsuario() {
    let newDate: moment.Moment = moment.utc(this.formularioCadastro.value.data_nascimento).local();
    this.formularioCadastro.value.data_nascimento = newDate.format("YYYY-MM-DD");

    this.service.criarUsuario(this.formularioCadastro.value).subscribe((res: any) => {
      alert("Cadastro realizado com sucesso!");
      this.formularioCadastro.reset();
      this.router.navigate(['login']);
    }, (err: Error) => {
      alert("Não foi possível realizar o seu cadastro")
    });
  }
}