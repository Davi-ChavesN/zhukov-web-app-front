import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfBoundsPageComponent } from './out-of-bounds-page.component';

describe('OutOfBoundsPageComponent', () => {
  let component: OutOfBoundsPageComponent;
  let fixture: ComponentFixture<OutOfBoundsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutOfBoundsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutOfBoundsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
