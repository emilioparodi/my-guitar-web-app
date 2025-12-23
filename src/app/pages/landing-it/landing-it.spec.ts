import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingIt } from './landing-it';

describe('LandingIt', () => {
  let component: LandingIt;
  let fixture: ComponentFixture<LandingIt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingIt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingIt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
