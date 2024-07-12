import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {

  service_url = 'https://668f849cc0a7969efd98177e.mockapi.io/todo/v1/topic'
  topics:any = []

  topic = new FormControl('')

  onAddTopic() {
    let body = {
      "topic": this.topic.value
    }
    this.http.post(this.service_url, body).subscribe({
      next: (result) => {
        console.log(result)
        this.loadTopics()
      }
    })
  }

  onRemoveTopic(id: number) {
    console.log(id)
    this.http.delete(`${this.service_url}/${id}`).subscribe({
      next: (result) => {
        console.log(result)
        this.loadTopics()
      }
    })
  }

  onSelectTopic(id: number) {
    console.log(id)
    this.router.navigate(['/list', id])
  }

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {
    this.loadTopics()
  }

  loadTopics() {

    this.http.get(this.service_url).subscribe({
      next: (result) => {
        this.topics = result
      }
    })

  }

}

