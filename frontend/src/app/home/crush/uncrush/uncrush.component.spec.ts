import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UncrushComponent } from './uncrush.component';

describe('UncrushComponent', () => {
  let component: UncrushComponent;
  let fixture: ComponentFixture<UncrushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UncrushComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UncrushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
