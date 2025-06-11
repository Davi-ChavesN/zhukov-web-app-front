import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableAccountModalComponent } from './disable-account-modal.component';

describe('DisableAccountModalComponent', () => {
  let component: DisableAccountModalComponent;
  let fixture: ComponentFixture<DisableAccountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisableAccountModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisableAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
