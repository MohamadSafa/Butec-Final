import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButecLifeComponent } from './butec-life.component';

describe('ButecLifeComponent', () => {
  let component: ButecLifeComponent;
  let fixture: ComponentFixture<ButecLifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButecLifeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButecLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
