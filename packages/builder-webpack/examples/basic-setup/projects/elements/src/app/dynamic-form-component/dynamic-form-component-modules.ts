import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatNativeDateModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';

export const DYNAMIC_FORM_COMPONENT_MODULES = [
  BrowserAnimationsModule,
  ReactiveFormsModule,
  DynamicFormsMaterialUIModule,
  MatNativeDateModule,
  MatCardModule,
];
