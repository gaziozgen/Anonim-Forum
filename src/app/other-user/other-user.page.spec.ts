import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserPage } from './other-user.page';

describe('OtherUserPage', () => {
  let component: OtherUserPage;
  let fixture: ComponentFixture<OtherUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
