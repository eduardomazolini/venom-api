import venom from 'venom-bot';
import { Request, Response } from 'express';
import config from '../config/default.json';
import path from 'path';
import ogs from 'open-graph-scraper';
import axios from 'axios';

async function phoneLib(phone: string): Promise<string> {
    const lib = await import("../phone-library/"+config.phoneStrategy.phoneLibrary);
    return lib.default(phone);
}

function base64MimeType(encoded: string) {
    let result = null;
    if (typeof encoded !== 'string') {
      return result;
    }
  
    const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
      result = mime[1];
    }
  
    return result;
}

async function getLinkData(url:string):Promise<{ linkUrl: string;
                                                 image?: string;
                                                 title?: string;
                                                 linkDescription?: string;
                                               }> {
    const options = { url: '' };
    return ogs(options)
      .then((data:ogs.SuccessResult | ogs.ErrorResult) => {
        const { error, result } = data;
        if (!error && result.success==true) {
            let image = result.ogImageURL;
            let linkUrl = result.ogUrl || url;
            let title = result.ogTitle;
            let linkDescription = result.ogDescription;
            return  {
                image,
                linkUrl,
                title,
                linkDescription
            }
        } else {
            return {
                "linkUrl":url
            }
        }
      })
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
function sendText(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        let content = "";
        if (!!req.body.message) {
            content = req.body.message;
        } else {
            res.status(500).send({"message":"not 'to' field"});
            return;
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
            return;
        }

        try{
            if (!!req.body.quotedMsg){
                const quotedMsg = req.body.quotedMsg;
                await venom.reply(to, content, quotedMsg);
            } else {
                await venom.sendText(to, content);
            }
            res.status(200).send({"message":"enviado"});
        } catch(error){
            res.status(500).send({"message":error.message});
        }
    }
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