import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Attendances } from './attendances';

describe('Attendances', () => {
  let component: Attendances;
  let fixture: ComponentFixture<Attendances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Attendances]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Attendances);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
