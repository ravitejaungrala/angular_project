import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Teachernavbar } from './teachernavbar';

describe('Teachernavbar', () => {
  let component: Teachernavbar;
  let fixture: ComponentFixture<Teachernavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Teachernavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Teachernavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
