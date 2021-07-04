import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  public id: number;
  public cadastro: FormGroup;
  public generos: Array<string>;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private filmeService: FilmesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  public get form() {
    return this.cadastro.controls;
  }

  public ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    if (this.id) {
      this.filmeService.visualizar(this.id)
        .subscribe((filme: Filme) => {
          this.criarFormulario(filme);
        });
    } else {
      this.criarFormulario(this.criarFilmeVazio());
    }

    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Aventura', 'Drama'];
  }

  public submit(): void{
    this.cadastro.markAllAsTouched();
    if(this.cadastro.invalid){
      return;   
    }

    const filme = this.cadastro.getRawValue() as Filme;
    if (this.id) {
      filme.id = this.id;
      this.editar(filme)
    } else {
      this.salvar(filme);
    }
  }

  public reiniciarForm(): void{
    this.cadastro.reset();
  }

  private criarFormulario(filme: Filme): void {
    this.cadastro = this.formBuilder.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [filme.urlFoto, Validators.minLength(10)],
      dtLancamento: [filme.dtLancamento, Validators.required],
      descricao: [filme.descricao],
      nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [filme.urlIMDb, Validators.minLength(10)],
      genero: [filme.genero, [Validators.required]]
    });
  }

  private criarFilmeVazio(): Filme {
    return {
      id: null,
      titulo: null,
      urlFoto: null,
      dtLancamento: null,
      descricao: null,
      nota: null,
      urlIMDb: null,
      genero: null
    } as Filme
  }

  private salvar(filme: Filme): void{
    this.filmeService.salvar(filme).subscribe(() => {
      const config = {
        data: {
          btnSucesso: "Ir para a listagem",
          btnCancelar: "Cadastrar um novo filme",
          possuirBtnFechar: true
        } as Alerta
      }
      const dialogRef = this.dialog.open(AlertaComponent, config);

      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if(opcao){
          this.router.navigateByUrl('filmes');
        } else {
          this.reiniciarForm();
        }
      })
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não foi possível salvar seu registro! Tente novamente.',
          corBtnSucesso: 'warn',
          btnSucesso: "Fechar"
        } as Alerta
      }
      this.dialog.open(AlertaComponent, config);
    })
  }

  private editar(filme: Filme): void{
    this.filmeService.editar(filme).subscribe(() => {
      const config = {
        data: {
          descricao: "Seu registro foi atualizado com sucesso!",
          btnSucesso: "Ir para a listagem"
        } as Alerta
      }
      const dialogRef = this.dialog.open(AlertaComponent, config);

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigateByUrl('filmes');
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não foi possível editar seu registro! Tente novamente.',
          corBtnSucesso: 'warn',
          btnSucesso: "Fechar"
        } as Alerta
      }
      this.dialog.open(AlertaComponent, config);
    })
  }

}
