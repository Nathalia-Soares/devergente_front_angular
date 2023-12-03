import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Comentario } from 'src/app/interfaces/comentario';
import { Postagem } from 'src/app/interfaces/postagem';
import { ComentariosService } from 'src/app/services/comentarios.service';
import { PostagensService } from 'src/app/services/postagens.service';

@Component({
  selector: 'app-comentarios-input',
  templateUrl: './comentarios-input.component.html',
  styleUrls: ['./comentarios-input.component.css']
})
export class ComentariosInputComponent {
  @Input() comentarioBtn!: string;
  @Input() botaoCancelar: boolean = false;
  @Input() textoInicial: string = '';

  formularioComentario!: FormGroup;

  @Input() postagem: Postagem = {
    id: 0,
    usuario: {
      id: 0,
      nome: '',
      username: '',
      img_perfil: '',
    },
    conteudo: '',
    imagemUrl: '',
    data: new Date()
  }

  @Input() comentario: Comentario = {
    id: 0,
    postagem: {
      id: 0,
    },
    usuario: {
      id: 0,
      username: '',
      img_perfil: '',
    },
    conteudo: '',
    data: new Date()
  }

  constructor(private fb: FormBuilder,
    private comentarioService: ComentariosService,
    private postagemService: PostagensService,
    private router: Router,
    private route: ActivatedRoute) {
      this.formularioComentario = this.fb.group({
        id: 0,
        postagem: {
          id: 0,
        },
        usuario: {
          id: null,
          username: '',
          img_perfil: '',
        },
        conteudo: ['', [Validators.required, Validators.maxLength(512)]],
        data: new Date()
      });
  }
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.postagemService.buscarPorId(parseInt(id!)).subscribe((postagem) => {
      this.postagem = postagem;
  
      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  
      this.formularioComentario.patchValue({
        postagem: {
          id: this.postagem.id,
        },
        usuario: {
          id: usuario.id,
          username: usuario.username,
          img_perfil: usuario.img_perfil,
        },
        conteudo: this.textoInicial
      });
    });
  }

  criarComentario() {
    this.comentarioService.criarComentario(this.formularioComentario.value).subscribe((res: any) => {
      alert("Comentário criado com sucesso!");
      this.formularioComentario.reset();
      location.reload();
    }, (err: Error) => {
      alert("Não foi possível criar o seu comentário: " + err.message);
    });
  }
}
