import venom from 'venom-bot'
import { catchQR_controller,
         statusFind_controller,
         ack,
         addedToGroup,
         anyMessage,
         incomingCall,
         interfaceChange,
         message, 
         stateChange,
         streamChange} from './contoller'

function catchQR(qrCode: string,
                 asciiQR: string,
                 attempt: number,
                 urlCode?: string) : void {
    catchQR_controller(qrCode, asciiQR, attempt, urlCode);
}

function statusFind(statusGet: string, session: string):void{
    statusFind_controller(statusGet,session);
}

function start(client:venom.Whatsapp):void{
    client.onAck(ack);
    client.onAddedToGroup(addedToGroup);
    client.onAnyMessage(anyMessage);
    client.onIncomingCall(incomingCall);
    client.onInterfaceChange(interfaceChange);
    //client.onLiveLocation();
    client.onMessage(message);
    //client.onParticipantsChanged()
    client.onStateChange(stateChange);
    client.onStreamChange(streamChange);
}
export {
    catchQR,
    statusFind,
    start
}
