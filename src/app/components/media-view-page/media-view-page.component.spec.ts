import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaViewPageComponent } from './media-view-page.component';

describe('MediaViewPageComponent', () => {
  let component: MediaViewPageComponent;
  let fixture: ComponentFixture<MediaViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
