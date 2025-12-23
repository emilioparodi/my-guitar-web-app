import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingEs } from './landing-es';

describe('LandingEs', () => {
  let component: LandingEs;
  let fixture: ComponentFixture<LandingEs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingEs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingEs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
