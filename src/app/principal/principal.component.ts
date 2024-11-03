import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  // Objeto do tipo Cliente
  cliente = new Cliente();
  // Variavel para visibilidade dos botões
  btnCadastro:boolean = true;

  // Json de clientes
  clientes:Cliente[] = [];

  // Construtor
  constructor(private servico:ClienteService) {}

  // Metodo de selecionar os clientes
  selecionar():void {
    this.servico.selecionar().subscribe(retorno => this.clientes = retorno);
  }

  // Metodo de cadastro
  cadastrar():void {
    this.servico.cadastrar(this.cliente)
    .subscribe(retorno => {
      // Cadastrar o cliente no vetor
      this.clientes.push(retorno);

      // Limpar formulario
      this.cliente = new Cliente();

      // Mensagem
      alert("Cliente cadastrado com sucesso!");
    });
  }

  // Metodo de inicialização
  ngOnInit(){
    this.selecionar();
  }
}
