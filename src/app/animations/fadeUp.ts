import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const FadeUp = [
  trigger('fadeUp', [
    state(
      'void',
      style({
        opacity: 0,
        transform: 'translateY(12px)',
      }),
    ),

    transition(':enter', [animate(400)]),
  ]),
];
