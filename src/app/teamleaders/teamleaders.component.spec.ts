import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamleadersComponent } from './teamleaders.component';

describe('TeamleadersComponent', () => {
  let component: TeamleadersComponent;
  let fixture: ComponentFixture<TeamleadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamleadersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamleadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
