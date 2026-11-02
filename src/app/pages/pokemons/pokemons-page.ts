import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonsList } from '../../pokemons/components/pokemons-list/pokemons-list';
import { PokemonListEskeleton } from './ui/pokemon-list-eskeleton/pokemon-list-eskeleton';
import { Pokemons } from '../../pokemons/services/pokemons';
import { simplePageInterface } from '../../pokemons/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonsList, PokemonListEskeleton],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage implements OnInit {
  private pokemonsService = inject(Pokemons);
  private activateRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  public pokemons = signal<simplePageInterface[]>([]);
  isLoading = signal(true);
  /*  // hacemos referencia a aplicationRef
  private appRef = inject(ApplicationRef);
  //creamos una variable privada y nos suscribimos a isstable y despues nos debemos de eliminar el componte
  private $appState = this.appRef.isStable.subscribe((isStable) => {
    console.log({ isStable });
  }); */
  ngOnInit(): void {
    this.loadPage();

    /*     setTimeout(() => {
      this.isLoading.set(false);
    }, 1500); */
    //this.activateRoute.queryParamMap.subscribe();
  }
  /*   ngOnDestroy(): void {
    this.$appState.unsubscribe();
    console.log('destroy');
  } */

  public currenPage = toSignal<number>(
    this.activateRoute.queryParamMap.pipe(
      map((params) => params.get('page') || '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
  );

  public loadPage(page = 0) {
    const loadToPage = this.currenPage()! + page;
    this.pokemonsService
      .simplePage(loadToPage)
      .pipe(
        tap(() => {
          this.router.navigate([], { queryParams: { page: loadToPage } });
        }),
        tap(() => {
          this.title.setTitle(`Página  SSR page: ${loadToPage}`);
        }),
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
