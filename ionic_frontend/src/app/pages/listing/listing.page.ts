import { Component, OnInit } from '@angular/core';
import { FaqService } from 'src/app/faq.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})

export class ListingPage implements OnInit {
  faqs: any[] = [];

  constructor(private faqService: FaqService) {}

  ngOnInit() 
  {
    this.loadFaqs();
  }

  ionViewWillEnter()    // ** Used this to refresh the list **
  {
    this.loadFaqs(); 
  }

  loadFaqs() 
  {
    this.faqService.getFaqs().subscribe((data: any) => {
      this.faqs = data;
    });
  }
  
}