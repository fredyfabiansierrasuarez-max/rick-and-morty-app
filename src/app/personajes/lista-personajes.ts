import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Personaje, ServicioPersonajes, ApiResponse } from '../servicio-personajes.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-lista-personajes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-personajes.html',
  styleUrl: './lista-personajes.css',
})
export class ListaPersonajes implements OnInit {
  personajes = signal<Personaje[]>([]);
  loading = signal(false);
  error = signal('');

  searchText = '';
  seleccionado: Personaje | null = null;

  constructor(private servicio: ServicioPersonajes) {}


  ngOnInit(): void {
    this.fetchCharacters();
  }

  fetchCharacters(name?: string) {
    this.loading.set(true);
    this.error.set('');
    this.servicio
      .getCharacters(name)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (resp: ApiResponse) => {
          this.personajes.set(resp.results);
        },
        error: (err: any) => {
          this.error.set('Error al cargar los personajes');
          console.error(err);
        },
      });
  }

  // todos los personajes se muestran (la API ya aplica filtro)
  get personajesFiltrados(): Personaje[] {
    return this.personajes();
  }

  seleccionar(p: Personaje) {
    this.seleccionado = p;
  }
  onSearch() {
    this.fetchCharacters(this.searchText.trim());
  }
  cerrar() {
    this.seleccionado = null;
  }
}
