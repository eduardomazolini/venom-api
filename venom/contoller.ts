import venom from 'venom-bot';
import { SocketStream } from 'venom-bot/dist/api/model/enum/socket-state';

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
    ack,
    addedToGroup,
    anyMessage,
    incomingCall,
    interfaceChange,
    message,
    stateChange,
    streamChange

}