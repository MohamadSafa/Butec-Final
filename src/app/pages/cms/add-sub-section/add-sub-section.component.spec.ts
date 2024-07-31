import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubSectionComponent } from './add-sub-section.component';

describe('AddSubSectionComponent', () => {
  let component: AddSubSectionComponent;
  let fixture: ComponentFixture<AddSubSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
