import venom from 'venom-bot'
import { Request, Response } from 'express'

//Instância

function qrCode(){

}

function qrCodeImage(){

}

function restart(){

}

function disconnect(){

}

function status(){

}

function restoreSession(){

}

//Mensagens
function sendText(venom:venom.Whatsapp){
    return (req:Request, res:Response) => {
        console.log(req.body)
        console.log(req)
        venom.sendText(req.body.to, req.body.text).then(() => {
            res.status(200).send({"message":"enviado"})
        })
    }

}

function sendContact(){

}

function sendImage(){

}

function sendAudio(){

}

function sendVideo(){

}

function sendDocument(){

}

function sendLink(){

}

function readMessage(){

}

function sendTextStatus(){

}

function sendImageStatus(){

}

//Chats
function chats(){

}

function chatsPhone(){

}

function chatMessages(){

}

//Contatos
function contacts(){

}

function contactsPhone(){

}

function profilePicture(){

}

function phoneExists(){

} 

//Grupo
function createGroup(){

}
    
function updateGroupName(){

}

function addAdmin(){

}

function removeAdmin(){

}

function addParticipant(){

}

function removeParticipant(){

}

function leaveGroup(){

}

function groupMetadataPhone(){

}
 
//Fila
function queue(){

}

function queueDelete(){

}
     
//Webhooks
function updateWebhookDelivery(){

}

function updateWebhookDisconnected(){

}

function updateWebhookReceived(){

}

function updateWebhookMessageStatus(){

}


export {
    //Instância
    qrCode,
    qrCodeImage,
    restart,
    disconnect,
    status,
    restoreSession,
    //Mensagens
    sendText,
    sendContact,
    sendImage,
    sendAudio,
    sendVideo,
    sendDocument,
    sendLink,
    readMessage,

    //Status
    sendTextStatus,
    sendImageStatus,

    //Chats
    chats,
    chatsPhone,
    chatMessages,

    //Contatos
    contacts,
    contactsPhone,
    profilePicture,
    phoneExists,

    //Grupo
    createGroup,
    updateGroupName,
    addAdmin,
    removeAdmin,
    addParticipant,
    removeParticipant,
    leaveGroup,
    groupMetadataPhone,

    //Fila
    queue,
    queueDelete,

    //Webhooks
    updateWebhookDelivery,
    updateWebhookDisconnected,
    updateWebhookReceived,
    updateWebhookMessageStatus,
}