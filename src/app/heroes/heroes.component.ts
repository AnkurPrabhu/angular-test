import { Component } from '@angular/core';
import { Hero } from '../heroes';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { NgFor,NgIf } from '@angular/common';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [UpperCasePipe,FormsModule,NgFor,NgIf,HeroDetailComponent,RouterLink],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  constructor(private heroService: HeroService,private messageService: MessageService) {

  }

heroes: Hero[] = [];

getHeroes(): void {
  this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
}

ngOnInit(): void {
  this.getHeroes();
}
} 
