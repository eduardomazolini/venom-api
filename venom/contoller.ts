import venom from 'venom-bot';
import { SocketStream } from 'venom-bot/dist/api/model/enum/socket-state';
import config from '../config/default.json';

const WEBHOOK = config.webhook;
function catchQR_controller(qrCode: string,
    asciiQR: string,
    attempt: number,
    urlCode?: string) : void {
console.log('++++++++++catchQR++++++++++')
console.log('Number of attempts to read the qrcode: ', attempt);
console.log('Terminal qrcode: ');
console.log(asciiQR);
//console.log('base64 image string qrcode: ', qrCode);
console.log('urlCode (data-ref): ', urlCode);
}

function statusFind_controller(statusGet: string, session: string):void{
console.log('++++++++++statusFind++++++++++')
console.log('Status Session: ', statusGet); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
//Create session wss return "serverClose" case server for close
console.log('Session name: ', session);
}

function ack(ack: venom.Ack): void {
    console.log('==========ack==========');
    console.log(ack);
}

function addedToGroup(chat: venom.Chat): void {
    console.log('==========addedToGroup==========');
    console.log(chat);
}

function anyMessage(message: venom.Message): void {
    console.log('==========anyMessage==========');
    console.log(message);
}

function incomingCall(call: any): void {
    console.log('==========incomingCall==========');
    console.log(call);
}

function interfaceChange(state: {
                                    displayInfo: venom.InterfaceState;
                                    mode: venom.InterfaceMode;
                                }): void {

    console.log('==========interfaceChange==========');
    console.log('displayInfo');
    console.log(state.displayInfo);
    console.log('mode');
    console.log(state.mode);
}

function message(message: venom.Message): void {
    console.log('==========message==========');
    console.log(message);
}

function stateChange(state: venom.SocketState): void {
    console.log('==========stateChange==========');
    console.log(state);
}

function streamChange(state: SocketStream): void {
    console.log('==========streamChange==========');
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