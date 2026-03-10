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

  it('should load characters from service', () => {
    const mock = {
      results: [
        { id: 1, name: 'Rick', status: 'Vivo', species: 'Humano', image: '' },
        { id: 2, name: 'Morty', status: 'Vivo', species: 'Humano', image: '' },
      ],
    } as any;
    vi.spyOn(service, 'getCharacters').mockReturnValue(of(mock));

    const fixture = TestBed.createComponent(ListaPersonajes);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('h5').length).toBe(2);
  });
});