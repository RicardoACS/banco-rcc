import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLoginRegisterComponent } from './header-login-register.component';

describe('HeaderLoginRegisterComponent', () => {
  let component: HeaderLoginRegisterComponent;
  let fixture: ComponentFixture<HeaderLoginRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderLoginRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
