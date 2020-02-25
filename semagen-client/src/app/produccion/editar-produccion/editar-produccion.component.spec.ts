import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProduccionComponent } from './editar-produccion.component';

describe('EditarProduccionComponent', () => {
  let component: EditarProduccionComponent;
  let fixture: ComponentFixture<EditarProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarProduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
