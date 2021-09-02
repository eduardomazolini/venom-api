import venom from 'venom-bot';
import { SocketStream } from 'venom-bot/dist/api/model/enum/socket-state';
import config from '../config/default.json';
import axios from 'axios';

const WEBHOOK = config.webhook;
function catchQR_controller(qrCode: string,
    asciiQR: string,
    attempt: number,
    urlCode?: string) : void {
    if(!!WEBHOOK) axios.post(WEBHOOK.qrcode,{ qrCode, attempt, urlCode });
    console.log('++++++++++catchQR++++++++++')
    console.log('Number of attempts to read the qrcode: ', attempt);
    console.log('Terminal qrcode: ');
    console.log(asciiQR);
    //console.log('base64 image string qrcode: ', qrCode);
    console.log('urlCode (data-ref): ', urlCode);
}

function statusFind_controller(statusGet: string, session: string):void{
    if(!!WEBHOOK) axios.post(WEBHOOK.states,{ statusGet, session });
    console.log('++++++++++statusFind++++++++++')
    console.log('Status Session: ', statusGet); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
    //Create session wss return "serverClose" case server for close
    console.log('Session name: ', session);
}

function ack(ack: venom.Ack): void {
    console.log('==========ack==========');
    if(!!WEBHOOK) axios.post(WEBHOOK.ack,ack);
    console.log(ack);
}

function addedToGroup(chat: venom.Chat): void {
    console.log('==========addedToGroup==========');
    if(!!WEBHOOK) axios.post(WEBHOOK.messages,chat);
    console.log(chat);
}

function anyMessage(message: venom.Message): void {
    console.log('==========anyMessage==========');
    // if(!!WEBHOOK) axios.post(WEBHOOK,message);
    console.log(message);
}

function incomingCall(call: any): void {
    console.log('==========incomingCall==========');
    if(!!WEBHOOK) axios.post(WEBHOOK.messages,call);
    console.log(call);
}

function interfaceChange(state: {
                                    displayInfo: venom.InterfaceState;
                                    mode: venom.InterfaceMode;
                                }): void {

    console.log('==========interfaceChange==========');
    if(!!WEBHOOK) axios.post(WEBHOOK.states,state);
    console.log('displayInfo');
    console.log(state.displayInfo);
    console.log('mode');
    console.log(state.mode);
}

function message(message: venom.Message|venom.PartialMessage): void {
    console.log('==========message==========');
    if(!!WEBHOOK) axios.post(WEBHOOK.messages,message);
    console.log(message);
}

function stateChange(state: venom.SocketState): void {
    console.log('==========stateChange==========');
    if(!!WEBHOOK) axios.post(WEBHOOK.states,state);
    console.log(state);
}

function streamChange(state: SocketStream): void {
    console.log('==========streamChange==========');
    if(!!WEBHOOK) axios.post(WEBHOOK.states,state);
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