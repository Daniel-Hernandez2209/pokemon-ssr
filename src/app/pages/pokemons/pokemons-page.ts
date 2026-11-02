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

@Component({
  selector: 'pokemons-page',
  imports: [PokemonsList, PokemonListEskeleton],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage implements OnInit {
  private pokemonsService = inject(Pokemons);
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
  }
  /*   ngOnDestroy(): void {
    this.$appState.unsubscribe();
    console.log('destroy');
  } */
  public loadPage(page = 0) {
    this.pokemonsService.simplePage(page).subscribe((pokemons) => {
      this.pokemons.set(pokemons);
    });
  }
}
