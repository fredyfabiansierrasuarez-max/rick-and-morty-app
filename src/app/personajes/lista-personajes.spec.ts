import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListaPersonajes } from './lista-personajes';
import { ServicioPersonajes } from '../servicio-personajes.service';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('ListaPersonajes', () => {
  let service: ServicioPersonajes;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPersonajes, HttpClientTestingModule],
      providers: [ServicioPersonajes],
    }).compileComponents();

    service = TestBed.inject(ServicioPersonajes);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ListaPersonajes);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should show loading initially', () => {
    const fixture = TestBed.createComponent(ListaPersonajes);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Cargando');
  });

  it('should call service with search and status filters', () => {
    const mock = {
      results: [
        { id: 1, name: 'Rick', status: 'Alive', species: 'Human', image: '' },
      ],
    } as any;
    vi.spyOn(service, 'getCharacters').mockReturnValue(of(mock));

    const fixture = TestBed.createComponent(ListaPersonajes);
    const comp = fixture.componentInstance;
    comp.searchText = 'Rick';
    comp.filterStatus = 'alive';
    comp.onSearch();

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('h5').length).toBe(1);
    expect(service.getCharacters).toHaveBeenCalledWith('Rick', 'alive');
  });
});