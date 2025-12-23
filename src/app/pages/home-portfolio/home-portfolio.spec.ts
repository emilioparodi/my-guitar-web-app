import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePortfolio } from './home-portfolio';

describe('HomePortfolio', () => {
  let component: HomePortfolio;
  let fixture: ComponentFixture<HomePortfolio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePortfolio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePortfolio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
