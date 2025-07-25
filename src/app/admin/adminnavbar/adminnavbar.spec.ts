import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminnavbar } from './adminnavbar';

describe('Adminnavbar', () => {
  let component: Adminnavbar;
  let fixture: ComponentFixture<Adminnavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Adminnavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminnavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
