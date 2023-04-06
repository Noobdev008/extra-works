import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusealbleComponent } from './reusealble.component';

describe('ReusealbleComponent', () => {
  let component: ReusealbleComponent;
  let fixture: ComponentFixture<ReusealbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusealbleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusealbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
