import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreModalComponent } from './genre-modal.component';

describe('GenreModalComponent', () => {
  let component: GenreModalComponent;
  let fixture: ComponentFixture<GenreModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
