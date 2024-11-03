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

  // Variavel para visibilidade da tabela
  tabela:boolean = true;

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

  // Metodo para selecionar um cliente
  selecionarCliente(posicao:number):void {
    // Selecionar cliente no vetor
    this.cliente = this.clientes[posicao];

    // Visibilidade dos botões
    this.btnCadastro = false;

    // Visibilidade da tabela
    this.tabela = false;
  }

  // Metodo para editar clientes
  editar():void{
    this.servico.editar(this.cliente)
    .subscribe(retorno => {
      // obter posição do vetor do cliente
      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo == retorno.codigo;
      });

      // Alterar os dados do cliente
      this.clientes[posicao] = retorno;

      // Visibilidade dos botões
      this.btnCadastro = true;

      // Visibilidade da tabela
      this.tabela = true;

      // Limpar formulario
      this.cliente = new Cliente();

      // Mensagem
      alert("Cliente alterado com sucesso!");
    });
  }
  // Metodo para editar clientes
  remover():void{
    this.servico.remover(this.cliente.codigo)
    .subscribe(retorno => {
      // obter posição do vetor do cliente
      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo == this.cliente.codigo;
      });

      // Remover cliente
      this.clientes.splice(posicao, 1);

      // Visibilidade dos botões
      this.btnCadastro = true;

      // Visibilidade da tabela
      this.tabela = true;

      // Limpar formulario
      this.cliente = new Cliente();

      // Mensagem
      alert("Cliente removido com sucesso!");
    });
    }
    // Metodo para cancelar
    cancelar():void{
      // Visibilidade dos botões
      this.btnCadastro = true;

      // Visibilidade da tabela
      this.tabela = true;

      // Limpar formulario
      this.cliente = new Cliente();
    }

  // Metodo de inicialização
  ngOnInit(){
    this.selecionar();
  }
}
