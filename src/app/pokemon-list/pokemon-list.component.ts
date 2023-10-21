import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[];
  search: any;
  constructor(private router: Router, private pokemonService: PokemonService) {
    this.search = { name: '' };
  }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe((list: any[]) => {
      this.pokemonList = list.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  goToDetails(id: number): void {
    this.router.navigate(['/details', id]);
  }
}
