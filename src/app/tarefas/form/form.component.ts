import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarefa } from '../model/tarefa';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  tarefasForm!: FormGroup;

  status: string[] = [
     'Para fazer', 'Fazendo', 'Concluída',
  ];

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<FormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Tarefa) { }

  ngOnInit(): void {
    this.buildForm();

    this.dialogRef.afterOpened().subscribe(() =>
      this.tarefasForm.setValue(this.data)
    )
  }

  close(){
    this.dialogRef.close(this.tarefasForm.value)
  }

  buildForm(){
    this.tarefasForm = this.formBuilder.group({
      titulo: [''],
      status: [''],
      dataInicio: [''],
      dataConclusao: ['']
    })
  }

}
