import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamleaderListComponent } from './teamleader-list.component';

describe('TeamleaderListComponent', () => {
  let component: TeamleaderListComponent;
  let fixture: ComponentFixture<TeamleaderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamleaderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamleaderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
