import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserControlPageComponent } from './user-control-page.component';

describe('UserControlPageComponent', () => {
  let component: UserControlPageComponent;
  let fixture: ComponentFixture<UserControlPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserControlPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserControlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
