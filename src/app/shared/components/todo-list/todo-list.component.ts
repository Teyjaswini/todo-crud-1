import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Itodo } from '../../models/todo';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() getTodos !: Array<Itodo>
  @Output() emitRemoveId: EventEmitter<string> = new EventEmitter<string>()
  @Output() emitEditTodo: EventEmitter<Itodo> = new EventEmitter<Itodo>()
  constructor(
    private _matdialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onTodoRemove(todoId: string) {
    let config = new MatDialogConfig()
    config.width = '400px'
    config.disableClose = true;
    config.data = `Are you sure, you want to remove the Todo with id ${todoId}`

    let matDialogRef = this._matdialog.open(GetConfirmComponent, config)

    matDialogRef.afterClosed()
      .subscribe(getConfirmation => {
        if (getConfirmation === true) {
          this.emitRemoveId.emit(todoId)
        }
      })
  }

  onEdit(edittodo: Itodo) {
    console.log(edittodo)
    this.emitEditTodo.emit(edittodo)
  }

  trackByTodo(index: number, item: Itodo) {
    return item.todoId
  }

}