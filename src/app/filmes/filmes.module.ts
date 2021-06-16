import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CadastroFilmesComponent } from './cadastro-filmes/cadastro-filmes.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListagemFilmesComponent } from './listagem-filmes/listagem-filmes.component';
import { InputTextComponent } from '../shared/components/campos/input-text/input-text.component';
import { InputTextareaComponent } from '../shared/components/campos/input-textarea/input-textarea.component';
import { InputNumberComponent } from '../shared/components/campos/input-number/input-number.component';
import { InputDateComponent } from '../shared/components/campos/input-date/input-date.component';
import { InputSelectComponent } from '../shared/components/campos/input-select/input-select.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    CadastroFilmesComponent, 
    ListagemFilmesComponent, 
    InputTextComponent,
    InputTextareaComponent,
    InputNumberComponent,
    InputDateComponent,
    InputSelectComponent
  ]
})
export class FilmesModule { }
