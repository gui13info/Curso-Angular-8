import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FilmesService } from 'src/app/core/filmes.service';
import { ConfigPrams } from 'src/app/shared/models/config-prams';
import { Filme } from 'src/app/shared/models/filme';
@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {
  
  public config: ConfigPrams = {
    pagina: 0,
    limite: 4
  }
  public filmes: Filme[] = [];
  public filtrosListagem: FormGroup;
  public generos: Array<string>;

  constructor(
    private filmesService: FilmesService,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.filtrosListagem = this.formBuilder.group({
      texto: [''],
      genero: ['']
    });

    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Aventura', 'Drama'];

    this.listarFilmes();
  }

  public onScroll(): void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.config.pagina++;
    this.filmesService.listar(this.config)
      .subscribe((filmes: Filme[]) => {this.filmes.push(...filmes)});
  }

  open() {
  }

}
