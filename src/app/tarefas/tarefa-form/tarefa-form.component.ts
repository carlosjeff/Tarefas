import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Tarefa } from '../model/tarefa';

@Component({
  selector: 'app-tarefa-form',
  templateUrl: './tarefa-form.component.html',
  styleUrls: ['./tarefa-form.component.scss']
})
export class TarefaFormComponent implements OnInit {

  tarefasForm!: FormGroup;

  status: string[] = [
    'Para fazer', 'Fazendo', 'Concluída',
  ];

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TarefaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Tarefa>
  ) { }

  ngOnInit(): void {

    this.buildForm();
    this.keydownEvents('Escape').subscribe(() => this.dialogRef.close())
    this.keydownEvents('Enter').subscribe(() => this.close())
    this.dialogRef.afterOpened().subscribe(() =>
      this.tarefasForm.patchValue(this.data)
    )
  }

  keydownEvents(code: string){
    return this.dialogRef.keydownEvents().pipe(
      filter((e: KeyboardEvent) => e.code === code))
  }

  close() {
    if(!this.formHasError())
      this.dialogRef.close(this.tarefasForm.value)
  }

  buildForm() {
    this.tarefasForm = this.formBuilder.group({
      id: [''],
      titulo: ['', Validators.required],
      status: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataConclusao: ['', Validators.required],
      index: [0]
    })
  }

  formHasError() {

    return Object.keys(this.tarefasForm.value).some(key => this.tarefasForm.get(key)?.hasError('required'));
  }

}
