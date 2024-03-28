import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  skipUntil,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { MessagesComponent } from './messages/messages.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { fromEvent, filter } from 'rxjs';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeroesComponent,
    HttpClientModule,
    MessagesComponent,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  api = environment.apiKey2;
  title = 'Tour of Heroes';
  inputText: string = '';
  input = document.querySelector('#input');
  private inputChangeSubject: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) {}
  onChange(event: any) {
    this.inputChangeSubject.next(this.inputText);
  }
  ngOnInit() {
    this.inputChangeSubject
      .pipe(
        filter((input) => input.trim() !== ''), 
        debounceTime(300), 
        distinctUntilChanged(), 
        switchMap((input) => this.makeApiCall(input)) 
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  makeApiCall(input: string): Observable<any> {
    return this.http.get<any>(`${this.api}` + input);
  }
}
