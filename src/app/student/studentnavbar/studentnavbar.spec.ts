import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Studentnavbar } from './studentnavbar';

describe('Studentnavbar', () => {
  let component: Studentnavbar;
  let fixture: ComponentFixture<Studentnavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Studentnavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Studentnavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
