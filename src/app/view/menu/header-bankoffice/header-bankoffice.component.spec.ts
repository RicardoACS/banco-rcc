import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBankofficeComponent } from './header-bankoffice.component';

describe('HeaderBankofficeComponent', () => {
  let component: HeaderBankofficeComponent;
  let fixture: ComponentFixture<HeaderBankofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderBankofficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBankofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
