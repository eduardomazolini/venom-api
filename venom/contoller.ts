import venom from 'venom-bot';
import { SocketStream } from 'venom-bot/dist/api/model/enum/socket-state';

function ack(ack: venom.Ack): void {

}

function addedToGroup(chat: venom.Chat): void {

}

function anyMessage(message: venom.Message): void {

}

function incomingCall(call: any): void {

}

function interfaceChange(state: {
                                    displayInfo: venom.InterfaceState;
                                    mode: venom.InterfaceMode;
                                }): void {

}

function message(message: venom.Message): void {
    
}

function stateChange(state: venom.SocketState): void {

}

function streamChange(state: SocketStream): void {
    
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