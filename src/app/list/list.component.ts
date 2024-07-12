import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  service_url = 'https://668f849cc0a7969efd98177e.mockapi.io/todo/v1/topic'
  
  topicId:any
  list:any = []
  todo = new FormControl('')

  onAddTodo() {
    let body = {
      "todo": this.todo.value
    }
    this.http.post(`${this.service_url}/${this.topicId}/todos/`, body).subscribe({
      next: (result) => {
        console.log(result)
        this.loadList()
      }
    })
  }

  onRemoveTodo(id: number) {
    console.log(id)
    this.http.delete(`${this.service_url}/${this.topicId}/todos/${id}`).subscribe({
      next: (result) => {
        console.log(result)
        this.loadList()
      }
    })
  }

  constructor(
    private route:ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('topicId'))
      this.topicId = params.get('topicId')
      this.loadList()
    })
  }

  loadList() {
    console.log(`${this.service_url}/${this.topicId}/todos`)
    this.http.get(`${this.service_url}/${this.topicId}/todos`).subscribe({
      next: (result) => {
        console.log(result)
        this.list = result
      }
    })

  }

}
