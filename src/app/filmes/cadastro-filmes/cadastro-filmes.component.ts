import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';
@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  public cadastro: FormGroup;
  public generos: Array<string>;

  constructor(
    public validacao: ValidarCamposService,
    private formBuilder: FormBuilder,
    private filmeService: FilmesService
    ) { }

  public get form() {
    return this.cadastro.controls;
  }

  public ngOnInit() {
    this.cadastro = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', Validators.minLength(10)],
      dtLancamento: ['', Validators.required],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', Validators.minLength(10)],
      genero: ['', [Validators.required]]
    });

    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Aventura', 'Drama'];
  }

  public submit(): void{
    this.cadastro.markAllAsTouched();
    if(this.cadastro.invalid){
      return;   
    }

    const filme = this.cadastro.getRawValue() as Filme;
    this.salvar(filme);
  }

  public reiniciarForm(): void{
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void{
    this.filmeService.salvar(filme).subscribe(() => {
      alert('SUCESSO');
    }),
    () => {
      alert('ERRO AO SALVAR')
    }
  }

}
