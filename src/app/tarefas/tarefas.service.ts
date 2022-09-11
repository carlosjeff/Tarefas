import { Tarefa } from './model/tarefa';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  private tarefas = new BehaviorSubject<Tarefa[]>([])

  constructor(){
    this.tarefas.next(Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)!)))

  }

  adiciona(data: Tarefa){
    const currentValue = this.tarefas.value
    data.id = Math.floor(Date.now() * Math.random()).toString(36)
    data.index = currentValue.filter(tarefa => tarefa.status == data.status).length
    const updatedValue = [...currentValue, data]
    this.tarefas.next(updatedValue);
    localStorage.setItem(data.id, JSON.stringify(data));
  }

  update(id: string, data: Tarefa){
    const currentValue = this.tarefas.value
    const updatedValue = currentValue.map(tarefa => tarefa.id == id ? data : tarefa)
    this.tarefas.next(updatedValue)
    localStorage.setItem(id,JSON.stringify(data));
  }

  updateMany(datas: Tarefa[]){
    datas.forEach(data => this.update(data.id,data));
  }

  deletar(id: string){
    const currentValue = this.tarefas.value
    const updatedValue = currentValue.filter(tarefa => tarefa.id != id)
    this.tarefas.next(updatedValue)
    localStorage.removeItem(id);
  }

  get getTarefas(){
    return this.tarefas.asObservable()
  }

}
