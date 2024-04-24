import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreDetailsCardComponent } from './more-details-card.component';

describe('MoreDetailsCardComponent', () => {
  let component: MoreDetailsCardComponent;
  let fixture: ComponentFixture<MoreDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreDetailsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
