import { Component, OnInit } from '@angular/core';
import { Card } from './modules/card.model';
import { CardsService } from './service/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cards';
  cards: Card[] = [];
  card: Card = {
    id: '',
    cardNumber: '',
    cardHolderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''
  }

  constructor(private cardService: CardsService) {

  }

  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards() {
    this.cardService.getAllCards()
    .subscribe(
      responce => {
        this.cards = responce;
        console.log(responce);
      }
    );
  }

  onSubmit() {
    if (this.card.id === '') {
      this.cardService.addCard(this.card)
      .subscribe(
        response => {
          console.log(response);
          this.cards.push(response);
        }
      )
    } else {
      this.updateCard(this.card);
    }


    // this.cardService.addCard(this.card)
    // .subscribe(
    //   response => {
    //     this.cards.push(response); // Add new card to cards array in database
    //     console.log(response);
    //   }
    // )
  }

  deleteCard(id: string) {
    this.cardService.deleteCard(id)
    .subscribe(
      response => {
        // console.log(response);
        // this.cards = this.cards.filter(card => card.id !== id);
        this.getAllCards();
      }
    )
  }

  populateForm(card: Card) {
    this.card = card;
  }

  updateCard(card: Card) {
    this.cardService.updateCard(card)
    .subscribe(
      response => {
        // console.log(response);
        // this.cards = this.cards.filter(c => c.id !== card.id);
        this.getAllCards();
      }
    );
  }

}
