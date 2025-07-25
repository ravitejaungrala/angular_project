import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Teacherdashboard } from './teacherdashboard';

describe('Teacherdashboard', () => {
  let component: Teacherdashboard;
  let fixture: ComponentFixture<Teacherdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Teacherdashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Teacherdashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
