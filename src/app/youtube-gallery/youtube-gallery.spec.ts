import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeGallery } from './youtube-gallery';

describe('YoutubeGallery', () => {
  let component: YoutubeGallery;
  let fixture: ComponentFixture<YoutubeGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeGallery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YoutubeGallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
