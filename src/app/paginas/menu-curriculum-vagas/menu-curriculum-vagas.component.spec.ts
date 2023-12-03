import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCurriculumVagasComponent } from './menu-curriculum-vagas.component';

describe('MenuCurriculumVagasComponent', () => {
  let component: MenuCurriculumVagasComponent;
  let fixture: ComponentFixture<MenuCurriculumVagasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCurriculumVagasComponent]
    });
    fixture = TestBed.createComponent(MenuCurriculumVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
