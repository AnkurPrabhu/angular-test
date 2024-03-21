import { Injectable } from '@angular/core';
import { Hero } from './heroes';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
MessageService
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }


getHeroes(): Observable<Hero[]> {
  const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
  return heroes;
}

getHero(id: number): Observable<Hero> {
  // For now, assume that a hero with the specified `id` always exists.
  // Error handling will be added in the next step of the tutorial.
  const hero = HEROES.find(h => h.id === id)!;
  this.messageService.add(`HeroService: fetched hero id=${id}`);
  return of(hero);
}

createHero(name:string): Observable<Hero>{

  const id= Math.max(...HEROES.map(o => o.id))+ 1 
  const new_hero:Hero={
    id:id,
    name:name
  }
  HEROES.push(new_hero)
  return of(new_hero)

}


}
