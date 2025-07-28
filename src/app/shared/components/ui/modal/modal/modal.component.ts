import { Component, Input, input } from '@angular/core';
import { FlowbiteService } from '../../../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

 
@Input({required:true}) current_Img:string=''



}
