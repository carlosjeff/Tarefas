import { Tarefa } from './model/tarefa';
import { FormComponent } from './form/form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.scss']
})
export class TarefasComponent implements OnInit {

  private tarefas: Tarefa[] = []

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){
    const dialogRef = this.dialog.open(FormComponent, {
      width: '40%',data: {
        titulo: '',
        status: '',
        dataInicio: new Date,
        dataConclusao: null
      } as Partial<Tarefa>
    })

    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.tarefas.push(result);
      }
    })
   }

  getTarefas(status: string){
    return this.tarefas.filter(data => data.status == status)
  }

}
