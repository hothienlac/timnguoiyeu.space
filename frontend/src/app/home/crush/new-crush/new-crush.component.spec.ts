import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCrushComponent } from './new-crush.component';

describe('NewCrushComponent', () => {
  let component: NewCrushComponent;
  let fixture: ComponentFixture<NewCrushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCrushComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCrushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
