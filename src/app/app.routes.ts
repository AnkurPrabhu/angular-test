import { RouterModule,Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';

export const routes: Routes = [{ path: 'heroes', component: HeroesComponent },


{ path: 'dashboard', component: DashboardComponent },


{ path: '', redirectTo: '/create', pathMatch: 'full' },

{ path: 'detail/:id', component: HeroDetailComponent  },
{ path: 'create', component: ChatBoxComponent  },



];
