import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetSenhaComponent } from './reset-senha.component';

describe('ResetSenhaComponent', () => {
  let component: ResetSenhaComponent;
  let fixture: ComponentFixture<ResetSenhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetSenhaComponent]
    });
    fixture = TestBed.createComponent(ResetSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
