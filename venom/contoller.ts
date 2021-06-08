import venom from 'venom-bot';
import { SocketStream } from 'venom-bot/dist/api/model/enum/socket-state';
import config from '../config/default.json';
import axio from 'axios';

const WEBHOOK = config.webhook;
function catchQR_controller(qrCode: string,
    asciiQR: string,
    attempt: number,
    urlCode?: string) : void {
    axio.post(WEBHOOK+'/catch-qr',{ qrCode, attempt, urlCode });
    console.log('++++++++++catchQR++++++++++')
    console.log('Number of attempts to read the qrcode: ', attempt);
    console.log('Terminal qrcode: ');
    console.log(asciiQR);
    //console.log('base64 image string qrcode: ', qrCode);
    console.log('urlCode (data-ref): ', urlCode);
}

function statusFind_controller(statusGet: string, session: string):void{
    axio.post(WEBHOOK+'/status-find',{ statusGet, session });
    console.log('++++++++++statusFind++++++++++')
    console.log('Status Session: ', statusGet); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
    //Create session wss return "serverClose" case server for close
    console.log('Session name: ', session);
}

function ack(ack: venom.Ack): void {
    console.log('==========ack==========');
    axio.post(WEBHOOK+'/ack',{ ack });
    console.log(ack);
}

function addedToGroup(chat: venom.Chat): void {
    console.log('==========addedToGroup==========');
    axio.post(WEBHOOK+'/acadded-to-group',{ chat });
    console.log(chat);
}

function anyMessage(message: venom.Message): void {
    console.log('==========anyMessage==========');
    axio.post(WEBHOOK+'/any-message',{ message });
    console.log(message);
}

function incomingCall(call: any): void {
    console.log('==========incomingCall==========');
    axio.post(WEBHOOK+'/incoming-call',{ call });
    console.log(call);
}

function interfaceChange(state: {
                                    displayInfo: venom.InterfaceState;
                                    mode: venom.InterfaceMode;
                                }): void {

    console.log('==========interfaceChange==========');
    axio.post(WEBHOOK+'/interface-change',{ state });
    console.log('displayInfo');
    console.log(state.displayInfo);
    console.log('mode');
    console.log(state.mode);
}

function message(message: venom.Message): void {
    console.log('==========message==========');
    axio.post(WEBHOOK+'/message',{ message });
    console.log(message);
}

function stateChange(state: venom.SocketState): void {
    console.log('==========stateChange==========');
    axio.post(WEBHOOK+'/state-change',{ state });
    console.log(state);
}

function streamChange(state: SocketStream): void {
    console.log('==========streamChange==========');
    axio.post(WEBHOOK+'/stream-change',{ state });
    console.log(state);
}

export {
    catchQR_controller,
    statusFind_controller,
    ack,
    addedToGroup,
    anyMessage,
    incomingCall,
    interfaceChange,
    message,
    stateChange,
    streamChange

}