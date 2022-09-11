import { TarefasService } from './tarefas.service';
import { Tarefa } from './model/tarefa';
import { FormComponent } from './form/form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.scss']
})
export class TarefasComponent implements OnInit {

  parafazer: Tarefa[] = [];
  fazendo: Tarefa[] = [];
  concluida: Tarefa[] = [];

  constructor(public dialog: MatDialog, private tarefaService: TarefasService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("g0eomo5x"))

    this.tarefaService.getTarefas.subscribe(data =>{
      console.log(data)
      this.parafazer = data.filter(tarefa => tarefa.status == 'Para fazer').sort((a, b) => a.index - b.index)
      this.fazendo = data.filter(tarefa => tarefa.status == 'Fazendo').sort((a, b) => a.index - b.index)
      this.concluida = data.filter(tarefa => tarefa.status == 'Concluída').sort((a, b) => a.index - b.index)
    })
  }

  add(status: string){

    const tarefa: Partial<Tarefa> = {
      dataInicio: new Date,
      status: status,
    }
    this.openDialog(tarefa).subscribe((result: Tarefa) =>{
      if(result){
        this.tarefaService.adiciona(result)
      }
    })
  }

  edit(tarefa: Tarefa){
    this.openDialog(tarefa).subscribe((result: Tarefa) => {
      if(result){
        this.tarefaService.update(result.id, result)
        console.log('edit',result)
      }
    })
  }

  delete(tarefa: Tarefa){
    this.tarefaService.deletar(tarefa.id);

    let tarefas: Tarefa[] = []

    if(tarefa.status == 'Para fazer'){

     tarefas = this.parafazer.map((data, i) => <Tarefa>{...data, index: i});

    }else if(tarefa.status == 'Fazendo'){
      tarefas = this.fazendo.map((data, i) => <Tarefa>{...data, index: i});
    }else{
      tarefas = this.concluida.map((data, i) => <Tarefa>{...data, index: i});
    }
    this.tarefaService.updateMany(tarefas)
  }

  drop(event: CdkDragDrop<Tarefa[]>) {
    console.log('drop',event)
    const id = event.container.id
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      this.tarefaService.updateMany(
        id == 'paraFazer' ? this.parafazer.map((tarefa, i) => <Tarefa>{...tarefa, index: i }) :
        id == 'fazendo' ? this.fazendo.map((tarefa, i) => <Tarefa>{...tarefa, index: i }) :
        this.concluida.map((tarefa, i) => <Tarefa>{...tarefa, index: i })
        )

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
        );

        let tarefa!: Tarefa;

        if(id == 'paraFazer'){
          tarefa = this.parafazer.filter(t => t.status != 'Para fazer')[0];
          tarefa.status = 'Para fazer';
        }else  if(id == 'fazendo'){
          tarefa = this.fazendo.filter(t => t.status != 'Fazendo')[0];
          tarefa.status = 'Fazendo';
        }else{
          tarefa = this.concluida.filter(t => t.status != 'Concluída')[0];
          tarefa.status = 'Concluída';
        }

        tarefa.index = event.currentIndex
        this.tarefaService.update(tarefa.id, tarefa)
    }
  }

  openDialog(tarefa: Partial<Tarefa>){
    const dialogRef = this.dialog.open(FormComponent, {
      width: '40%',data: tarefa
    })

    return dialogRef.afterClosed();
   }

  dataAtrasada(data: Date){
    return data < new Date;
  }

}
