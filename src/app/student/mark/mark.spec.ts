import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mark } from './mark';

describe('Mark', () => {
  let component: Mark;
  let fixture: ComponentFixture<Mark>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Mark]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mark);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
