import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrushComponent } from './crush.component';

describe('CrushComponent', () => {
  let component: CrushComponent;
  let fixture: ComponentFixture<CrushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrushComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
