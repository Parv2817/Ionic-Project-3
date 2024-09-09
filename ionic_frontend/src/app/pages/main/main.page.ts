import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { FaqService } from 'src/app/faq.service';
import { SAMPLE_FAQS } from 'src/app/sample-data';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})

export class MainPage {
  databaseName: string = '';
  collectionName: string = '';
  message: string = '';
  isDbCreated: boolean = false;

  constructor(private faqService: FaqService, private actionSheetCtrl: ActionSheetController) {}

  createDbAndCollection() 
  {
    if (this.databaseName && this.collectionName) 
    {
      this.faqService.createDbAndCollection(this.databaseName, this.collectionName).subscribe({
        next: res => {
          this.message = 'Database and collection created successfully';
          this.isDbCreated = true;
        },
        error: err => this.message = 'Error creating database or collection'
      });
    } 
    else 
    {
      this.message = 'Please enter both database and collection names';
    }
  }

  loadData() 
  {
    let count = 0;
    const totalRequests = SAMPLE_FAQS.length;

    SAMPLE_FAQS.forEach(faq => {
      this.faqService.addFaq(faq).subscribe({
        next: () => {
          count++;
          if (count === totalRequests) 
          {
            this.message = 'Sample data loaded successfully';
          }
        },
        error: () => {
          this.message = 'Error loading sample data';
        }
      });
    });
  }

  async deleteAllData() {
    try 
    {
      await this.faqService.clearFaqs().toPromise();
      this.message = 'All data deleted successfully';
    } 
    catch (error) 
    {
      this.message = 'Error deleting data';
    }
  }

  async presentDeleteAllActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Delete All',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteAllData();
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