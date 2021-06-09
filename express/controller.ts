import venom from 'venom-bot';
import { Request, Response } from 'express';
import {phoneLib, base64MimeType, validationResultReturn} from './helper';
import path from 'path';
import axios from 'axios';


import { check, body, CustomValidator, CustomSanitizer } from 'express-validator';

const toSanitizer: CustomSanitizer = async (to, meta) => {
    if (!!to) return to;
    if (!!meta.req.body.phone)
        return await phoneLib(<string> meta.req.body.phone);
    return "";
}

const toContent: CustomSanitizer = async (content, meta) => {
    console.log(content)
    if (!!content) return content;
    return meta.req.body.message;
}
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
function sendText(){
    return [
        body('to').customSanitizer(toSanitizer).not().isEmpty(),
        body('content').customSanitizer(toContent).not().isEmpty(),
        validationResultReturn(),
        async (req:Request, res:Response) => {
            try{

                const to = req.body.to;
                console.log("TO: ",to);
                const content = req.body.content;
                console.log('entrou aqui')
                const quotedMsg = req.body.quotedMsg;
                
                const venom = req.venom;
                if (!venom) throw new Error("Venom was not loaded")

/*
                if (!content) throw Error("not 'message' field")


                let to = "";
                if (!!req.body.to) {
                    to = req.body.to;
                }
                if (!!req.body.phone) {
                    to = await phoneLib(<string> req.body.phone);
                }
                if (!to) throw Error("not 'to' field");
*/
                let venomReturn
                if (!!quotedMsg){                
                    venomReturn = await venom.reply(to, content, quotedMsg);
                } else {
                    venomReturn = await venom.sendText(to, content);
                }
                res.status(200).send(venomReturn);
            } catch(error){
                res.status(500).send({"error":error.message});
            }
        }]
    }

function sendContact(){

}

function sendImage(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try{
            const file = req.files;
            let filename = req.body.filename || "";
            let image = <string> req.body.image || "";

            if(image.startsWith('http')){
                let download = await axios.get(image, {
                    responseType: 'arraybuffer'
                  })
                let contentType = download.headers['content-type']
                let body = Buffer.from(download.data, 'binary').toString('base64')
                image = "data:"+contentType+";base64,"+body
            }

            if (!!file && !!file.image && !Array.isArray(file.image)){
                image = "data:"+file.image.mimetype+";base64,"+file.image.data.toString('base64');
                filename = file.image.name;
            }
        
            let to = req.body.to || await phoneLib(<string> req.body.phone);
            let caption = req.body.caption || req.body.message;

            let mimetype = base64MimeType(image);
            let base64HasMime = !!mimetype;
            if (!mimetype)
                mimetype = req.body.mimetype;
            if (!mimetype && !!path.extname(filename))
                mimetype = 'image/'+path.extname(filename).slice(1);
            if (!mimetype){
                res.status(500).send({"message":"image not have mimeType"});
                return;
            }

            if (!filename)
                filename = 'arquivo.'+mimetype.split('/')[1];

            if (!base64HasMime){
                image = "data:"+mimetype+";base64,"+image;
            }
            if (!to) {
                res.status(500).send({"message":"not 'to' field"});
                return;
            }
            if (!image) {
                res.status(500).send({"message":"not 'image' field"});
                return;
            }

            console.log("mimetype :",mimetype);
            console.log("filename :",filename);
            console.log("sendImage :",image.slice(0,30)+'...');
            await venom.sendImageFromBase64(to, image, filename, caption);
            res.status(200).send({"message":"enviado"});
        } catch(error) {
            res.status(500).send({"message":error});
        }
    }
}

function sendAudio(){

}

function sendVideo(){

}

function sendDocument(venom:venom.Whatsapp){

}

function sendLink(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        let content = "";
        if (!!req.body.message) {
            content = req.body.message;
        } else {
            res.status(500).send({"message":"not 'to' field"});
            return
        }

        let to = "";
        if (!!req.body.to) {
            to = req.body.to;
        }
        if (!!req.body.phone) {
            to = await phoneLib(<string> req.body.phone);
        }
        if (!to) {
            res.status(500).send({"message":"not 'to' field"});
            return
        }

        let linkUrl=req.body.linkUrl;
        if (!linkUrl){
            res.status(500).send({"message":"body not include 'linkUrl' field"});
            return
        }

        try {
            await venom.sendLinkPreview(to, linkUrl, content);
            res.status(200).send({"message":"enviado"});
        } catch(error){
            res.status(500).send({"message":error.message});
        }
    }
}

function readMessage(){

}

function messagesDelete(){

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
    messagesDelete,

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