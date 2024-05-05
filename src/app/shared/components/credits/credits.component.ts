import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CreditsComponent {
  @Output()
  closeCreditsScreen: EventEmitter<boolean> = new EventEmitter<boolean>();

  animateClose: boolean = false;

  links = [
    // {
    //   path:
    //     '',
    //   name: 'Visit solution page',
    // },
    {
      path: 'https://github.com/mobasherahmed/invoice-app',
      name: 'Visit git repo',
    }
  ];

  handleClose(): void {
    this.animateClose = true;
    /**
     * A timeout is added to execute the animation
     * at the closing of the screen
     */
    setTimeout(() => {
      this.animateClose = false;
      this.closeCreditsScreen.emit(false);
    }, 200);
  }
}
