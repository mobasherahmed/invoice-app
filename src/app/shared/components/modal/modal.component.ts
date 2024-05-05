import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports:[CommonModule]
})
export class ModalComponent {
  constructor(private modalService: ModalService) {}

  closeModal(): void {
    this.modalService.close();
  }

  get openModal() {
    return this.modalService.openModal;
  }

  get animationCloseModal() {
    return this.modalService.animationCloseModal;
  }
}
