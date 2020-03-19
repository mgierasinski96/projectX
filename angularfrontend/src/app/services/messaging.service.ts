import { StompService, StompConfig, StompState } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Observable, BehaviorSubject } from 'rxjs';
import {DropService} from './drop.service';

export class MessagingService {
  private messages: Observable<Message>;
  private stompService: StompService;
  private godzina: number;


  constructor(socketUrl: string, streamUrl: string) {
    // Create Stomp Configuration
    let stompConfig: StompConfig = {
      url: socketUrl,
      headers: {
        login: "",
        passcode: ""
      },
      heartbeat_in: 0,
      heartbeat_out: 20000,
      reconnect_delay: 5000,
      debug: true
    };

    // Create Stomp Service
    this.stompService = new StompService(stompConfig);

    // Connect to a Stream
    this.messages = this.stompService.subscribe(streamUrl);

  }
  public ktoraGodzina() {
    return this.godzina;
  }
  public stream(): Observable<Message> {
    console.log('wewnwatrz stream');
    return this.messages;
  }
}
