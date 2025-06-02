import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaUpdatePageComponent } from './media-update-page.component';

describe('MediaUpdatePageComponent', () => {
  let component: MediaUpdatePageComponent;
  let fixture: ComponentFixture<MediaUpdatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaUpdatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
