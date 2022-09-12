import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tarefa } from '../model/tarefa';

@Component({
  selector: 'app-tarefa-card',
  templateUrl: './tarefa-card.component.html',
  styleUrls: ['./tarefa-card.component.scss']
})
export class TarefaCardComponent implements OnInit {

  @Input() tarefas: Tarefa[] = [];
  @Input() highlightExpiredDate: boolean = true

  @Output() edit = new EventEmitter<Tarefa>();
  @Output() delete = new EventEmitter<Tarefa>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteTarefa(tarefa: Tarefa){
    if(tarefa){
      this.delete.emit(tarefa)
    }
  }

  editTarefa(tarefa: Tarefa){
    if(tarefa){
      this.edit.emit(tarefa)
    }
  }

  dateExpired(data: Date){
    return new Date(data) < new Date;
  }
}
