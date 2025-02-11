import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoshomeComponent } from './pedidoshome.component';

describe('PedidoshomeComponent', () => {
  let component: PedidoshomeComponent;
  let fixture: ComponentFixture<PedidoshomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoshomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
