import {Component, OnInit} from '@angular/core';
import {DropService} from '../../services/drop.service';
import {MessagingService} from '../../services/messaging.service';
import {Message} from '@stomp/stompjs';


const WEBSOCKET_URL = 'ws://localhost:8080/auctions';
const EXAMPLE_URL = '/auctions/broadcaster';

@Component({
  selector: 'app-auction-house',
  templateUrl: './auction-house.component.html',
  styleUrls: ['./auction-house.component.css'],
})
export class AuctionHouseComponent implements OnInit {
  private messagingService: MessagingService;
  userData;
  itemsForSale;
  rect;
  infoAboutItem;
  def;
  sil;
  atk;
  int;
  name;
  timeLeft = 10;
  interval;
data;


  constructor(private dropService: DropService) {
    this.messagingService = new MessagingService(WEBSOCKET_URL, EXAMPLE_URL);

    this.messagingService.stream().subscribe((message: Message) => {
      this.listAuctionItems();
    });
  }
  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    console.log('Zalogowany jako' + this.userData.username);
    this.listAuctionItems();
    this.data = this.messagingService.ktoraGodzina();

  }
  startTime() {
    this.getRandomItemsForAuction();
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        console.log('Minelo 10 sec');
        this.timeLeft = 10;
       this.updateAuctionItems();
      }
    }, 1000);
  }

  getRandomItemsForAuction() {
    this.dropService.getRandomItemsForAuction().subscribe(response => {
      this.itemsForSale = response;
    });
  }

  updateAuctionItems() {
    this.dropService.updateAuction().subscribe(response => {
        this.getRandomItemsForAuction();
    });
  }

  listAuctionItems() {
    this.dropService.listAuctionItems().subscribe(response => {
      this.itemsForSale = response;
    });
  }
  mouseEnter(ev, id) {
    this.rect = ev.target.getBoundingClientRect();
    this.infoAboutItem = document.getElementById('inff');
    this.infoAboutItem.style.left = this.rect.left + 100 + 'px';
    this.infoAboutItem.style.top = this.rect.top - 130 + 'px';
    this.infoAboutItem.style.visibility = 'visible';
    console.log(id);
    this.pobierzStatystyki(id);
  }

  mouseOutItem(ev, id) {
    console.log('mouseOut');
    this.infoAboutItem.style.visibility = 'hidden';
    console.log(id);
  }

  pobierzStatystyki(id) {
    for (let i = 0; i < this.itemsForSale.length; i++) {
      if (this.itemsForSale[i].item.id === id) {
        this.name = this.itemsForSale[i].item.itemName;
        this.def = this.itemsForSale[i].item.itemDefense;
        this.sil = this.itemsForSale[i].item.itemStrength;
        this.atk = this.itemsForSale[i].item.itemDamage;
        this.int = this.itemsForSale[i].item.itemWidsdom;
      }
    }
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
  applyBid(auctionItemID, winningUserID: number) {
    for (let i = 0; i < this.itemsForSale.length; i++) {
      if (this.itemsForSale[i].id === auctionItemID) {
        if ((<HTMLInputElement>document.getElementById('input_' + auctionItemID)).value <= this.itemsForSale[i].actualPrice) {
          // TODO: wyrzuc tutaj jakis komunikat
        } else {
          this.dropService.confirmBid((<HTMLInputElement>document.getElementById('input_' + auctionItemID)).value, auctionItemID, winningUserID).subscribe(response => {
            this.listAuctionItems();
          });
        }
        // console.log('Oferta do przedmiotu');
        // console.log(this.itemsForSale[i].itemName);
        // console.log((<HTMLInputElement>document.getElementById('input_' + id)).value);
      }
    }
  }
}
