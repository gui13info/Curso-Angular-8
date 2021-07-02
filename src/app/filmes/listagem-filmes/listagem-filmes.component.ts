import { Component, OnInit } from '@angular/core';

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

  constructor(private filmesService: FilmesService) { }

  public ngOnInit(): void {
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
