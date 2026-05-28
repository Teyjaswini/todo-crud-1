import { Component, OnInit } from "@angular/core"
import { Itodo } from "../../models/todo"
import { SnackBarService } from "../../service/snackBar.service"



@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.scss']
})
export class TodoDashboardComponent implements OnInit {
    todosArr: Array<Itodo> = [
    {
      todoItem: 'JavaScript',
      todoId: '123',
      isCompleted: true
    },
    {
      todoItem: 'TypeScript',
      todoId: '124',
      isCompleted: false
    },
    {
      todoItem: 'Angular',
      todoId: '125',
      isCompleted: true
    },
    {
      todoItem: 'NodeJS',
      todoId: '126',
      isCompleted: false
    }
  ]
  editTodoObj !: Itodo
  constructor(
    private _snackBar : SnackBarService
  ) {
   }

  ngOnInit(): void {
  }

  getNewTodo(todo: Itodo) {
    this.todosArr.push(todo)
    this._snackBar.openSnackBar(`The Todo Item ${todo.todoItem} Added Successfully !!!`)
  }

  getRemoveId(removeId : string){
    let getIndex = this.todosArr.findIndex(t => t.todoId === removeId)
    let removedItems = this.todosArr.splice(getIndex, 1)
    this._snackBar.openSnackBar(`The Todo Item ${removedItems[0].todoItem} is Removed Successfully !!!`)

  }

  getEditTodo(editTodo : Itodo){
    console.log(editTodo)
    this.editTodoObj = editTodo;
  }

  getUpdatedTodo(updatedTodo : Itodo){
    let GET_INDEX = this.todosArr.findIndex(t => t.todoId === updatedTodo.todoId)
    this.todosArr[GET_INDEX] = updatedTodo
    this._snackBar.openSnackBar(`The todoItem ${updatedTodo.todoItem} updated successfully !!!`)
  }


}