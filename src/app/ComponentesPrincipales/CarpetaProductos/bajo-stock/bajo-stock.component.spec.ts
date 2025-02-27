import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajoStockComponent } from './bajo-stock.component';

describe('BajoStockComponent', () => {
  let component: BajoStockComponent;
  let fixture: ComponentFixture<BajoStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BajoStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajoStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
