interface AppMessages {
    eventId: number;
  }
  
export interface Event {
    eventid: number;
    event_type_code: number;
    msg: string;
    areaid: number;
    distid: number;
    tagid: string;
    action: string;
    appMessages: AppMessages;
  }