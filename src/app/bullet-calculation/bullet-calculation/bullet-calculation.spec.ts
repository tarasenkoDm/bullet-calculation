import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletCalculation } from './bullet-calculation';

describe('BulletCalculation', () => {
  let component: BulletCalculation;
  let fixture: ComponentFixture<BulletCalculation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulletCalculation],
    }).compileComponents();

    fixture = TestBed.createComponent(BulletCalculation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
