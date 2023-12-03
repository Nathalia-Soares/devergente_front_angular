import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVagasComponent } from './menu-vagas.component';

describe('MenuVagasComponent', () => {
  let component: MenuVagasComponent;
  let fixture: ComponentFixture<MenuVagasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuVagasComponent]
    });
    fixture = TestBed.createComponent(MenuVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
