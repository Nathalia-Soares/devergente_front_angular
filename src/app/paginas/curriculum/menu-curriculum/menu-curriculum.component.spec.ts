import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCurriculumComponent } from './menu-curriculum.component';

describe('MenuCurriculumComponent', () => {
  let component: MenuCurriculumComponent;
  let fixture: ComponentFixture<MenuCurriculumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCurriculumComponent]
    });
    fixture = TestBed.createComponent(MenuCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
