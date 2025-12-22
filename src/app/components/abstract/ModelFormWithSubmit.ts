import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Abstract class for components that are just details to edit for
 * model classes
 *
 * model<Model> the model that will be represented
 * submitEvent<Model> when the form has been submitted
 *
 */
@Component({
  template: ''
})
export abstract class ModelFormWithSubmit<Model>{
  @Input() abstract model? : Model;
  @Output() abstract submitEvent: EventEmitter<Model>;
  abstract onSubmit(): void;
}
