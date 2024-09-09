import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { FaqService } from 'src/app/faq.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})

export class UpdatePage implements OnInit {
  faq: any = {};
  faqId: string = '';
  message: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private faqService: FaqService, private actionSheetCtrl: ActionSheetController) {}

  ngOnInit() 
  {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) 
    {
      this.faqId = id;
      this.faqService.getFaqs().subscribe({
        next: data => {
          this.faq = data.find((item: any) => item._id === this.faqId);
        },
        error: err => console.error('Error fetching FAQ', err)
      });
    } 
    else 
    {
      this.faq = { question: '', answer: '' };
      this.faqId = '';
    }
  }

  addOrUpdateFaq() 
  {
    if (this.faqId) 
    {
      this.faqService.updateFaq(this.faqId, this.faq).subscribe({
        next: res => {
          this.message = 'FAQ updated successfully';
          this.router.navigate(['/listing']);
        },
        error: err => this.message = 'Error updating FAQ'
      });
    } 
    else 
    {
      this.faqService.addFaq(this.faq).subscribe({
        next: res => {
          this.message = 'FAQ added successfully';
          this.router.navigate(['/listing']);
        },
        error: err => this.message = 'Error adding FAQ'
      });
    }
  }

  deleteFaq() 
  {
    if (this.faqId) 
    {
      this.faqService.deleteFaq(this.faqId).subscribe({
        next: res => {
          this.message = 'FAQ deleted successfully';
          this.router.navigate(['/listing']);
        },
        error: err => this.message = 'Error deleting FAQ'
      });
    }
  }

  async presentDeleteActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteFaq();
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  async presentSaveActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.faqId ? 'Update FAQ' : 'Add FAQ',
      buttons: [
        {
          text: this.faqId ? 'Update' : 'Add',
          icon: 'save',
          handler: () => {
            this.addOrUpdateFaq();
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }
}
