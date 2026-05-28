import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Itodo } from "../models/todo";
import { TodoService } from "../service/todo.service";


@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})

export class TodoFormComponent implements OnChanges {
  @ViewChild('todoForm') todoForm!: NgForm
  @Input() getEditObj!: Itodo
  @Output() emitNewTodo = new EventEmitter<Itodo>()
  @Output() emitUpdatedTodo = new EventEmitter<Itodo>()
  isInEditMode: boolean = false;

  constructor(
    private _todoService: TodoService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getEditObj'].currentValue) {
      this.isInEditMode = true
      this.todoForm.form.patchValue(this.getEditObj)
    }
  }

  onTodoAdd() {
    if (this.todoForm.valid) {
      let todo: Itodo = {
        ...this.todoForm.value,
        todoId: this._todoService.uuid()
      }
      this.emitNewTodo.emit(todo)
      this.todoForm.reset()
    }
  }


  onTodoUpdate() {
    if (this.todoForm.valid) {
      let UPDATED_OBJ: Itodo = {
        ...this.todoForm.value,
        todoId: this.getEditObj.todoId
      }
      this.emitUpdatedTodo.emit(UPDATED_OBJ)
      this.todoForm.reset()
      this.isInEditMode = false
    }
  }
}