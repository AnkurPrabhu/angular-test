import { RouterModule,Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { CreateHeroComponent } from './create-hero/create-hero.component';

export const routes: Routes = [{ path: 'heroes', component: HeroesComponent },


{ path: 'dashboard', component: DashboardComponent },


{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },

{ path: 'detail/:id', component: HeroDetailComponent  },
{ path: 'create-hero', component: CreateHeroComponent  },
{ path: 'create', component: ChatBoxComponent  },



];
