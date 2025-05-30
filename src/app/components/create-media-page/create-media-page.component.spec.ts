import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMediaPageComponent } from './create-media-page.component';

describe('CreateMediaPageComponent', () => {
  let component: CreateMediaPageComponent;
  let fixture: ComponentFixture<CreateMediaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMediaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMediaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
