import venom from 'venom-bot'
import { ack,
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
    console.log('Number of attempts to read the qrcode: ', attempt);
    console.log('Terminal qrcode: ', asciiQR);
    console.log('base64 image string qrcode: ', qrCode);
    console.log('urlCode (data-ref): ', urlCode);
}

function statusFind(statusGet: string, session: string):void{
    console.log('Status Session: ', statusGet); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
    //Create session wss return "serverClose" case server for close
    console.log('Session name: ', session);
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
