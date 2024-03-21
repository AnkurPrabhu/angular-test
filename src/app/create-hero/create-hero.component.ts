import { Component } from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-create-hero',
  standalone: true,
  imports: [ReactiveFormsModule,],
  template: `
    Hero name: <input type="text" [formControl]="heroNameControl" />
    <p> </p>
    <Button type="submit" (click)="create_hero()"> Create hero </Button>
    `,
  styleUrl: './create-hero.component.css'
})
export class CreateHeroComponent {
  constructor(private hero_service:HeroService){

  }
heroNameControl = new FormControl('');


create_hero() {

  if (this.heroNameControl.value !==null && this.heroNameControl.value?.trim()!== ""){
     const generated_hero= this.hero_service.createHero(this.heroNameControl.value).subscribe(hero=> {
      console.log(hero)
    });
     console.log(generated_hero)
  }
}
}
