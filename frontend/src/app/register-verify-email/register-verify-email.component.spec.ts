import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVerifyEmailComponent } from './register-verify-email.component';

describe('RegisterVerifyEmailComponent', () => {
  let component: RegisterVerifyEmailComponent;
  let fixture: ComponentFixture<RegisterVerifyEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterVerifyEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
