import { async, TestBed } from '@angular/core/testing';
import { BuilderWebpackModule } from './builder-webpack.module';

describe('BuilderWebpackModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BuilderWebpackModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BuilderWebpackModule).toBeDefined();
  });
});
