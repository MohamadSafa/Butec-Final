import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButecAcademyComponent } from './butec-academy.component';

describe('ButecAcademyComponent', () => {
  let component: ButecAcademyComponent;
  let fixture: ComponentFixture<ButecAcademyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButecAcademyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButecAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
