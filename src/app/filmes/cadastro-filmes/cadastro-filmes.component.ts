import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  public cadastro: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
  }

  public salvar(): void{
    this.cadastro.markAllAsTouched();
    if(this.cadastro.invalid){
      return;   
    }

    alert('Sucesso!!!\n\n' + JSON.stringify(this.cadastro.value, null, 4))
  }

  public reiniciarForm(): void{
    this.cadastro.reset();
  }

}