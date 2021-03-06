import venom from 'venom-bot';
import { Request, Response } from 'express';
import { base64MimeType, resendMessages } from './helper';
import path from 'path';
import axios from 'axios';
import { matchedData} from 'express-validator';
//Instância

function qrCode(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try{
            console.log("qrCode")
            const venomReturn = await venom.getQrCode();
            res.status(200).send(venomReturn);
        } catch(error) {
            res.status(500).send({"error":error});
        }
    }
}

function qrCodeImage(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try{
            console.log("qrCode")
            const venomReturn = await venom.getQrCode();
            res.status(200).send(`<img src='${venomReturn.base64Image}'>`);
        } catch(error) {
            res.status(500).send({"error":error});
        }
    }
}

function restart(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function disconnect(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function status(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function restoreSession(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function allunreadmessages(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try{
            console.log("AllUnreadMessages")
            const resend = req.query.resend
            const venomReturn = await venom.getAllUnreadMessages()
            console.log(venomReturn)
            if(!!resend){
                resendMessages(venomReturn)
                res.status(201).send();
            } else {
                res.status(200).send(venomReturn);
            }

        } catch (error) {
            res.status(500).send({"error":error.message});
        }
    }
}

//Mensagens
function sendText(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try{
            const to = req.body.to;
            const content = req.body.content;
            const quotedMsg = req.body.quotedMsg;
            
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
    }
}

function sendTextOptions(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try{
            const to = req.body.to;
            const content = req.body.content;
            const quotedMsg = req.body.quotedMsg;
            
            let venomReturn
            if (!!quotedMsg){                
                venomReturn = await venom.reply(to, content, quotedMsg);
            } else {
                venomReturn = await venom.sendMessageOptions(to, content, {  textColor: 4294967295,
                    backgroundColor: 4286237605,
                    font: 2});
            }
            res.status(200).send(venomReturn);
        } catch(error){
            res.status(500).send({"error":error.message});
        }
    }
}

/*
  textColor: 4294967295,
  backgroundColor: 4286237605,
  font: 2,
*/

function sendContact(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try{
            const to = req.body.to;
            const contactsId = <string> req.body.contactsId;
            const name = req.body.name;

            const valid = await venom.checkNumberStatus(contactsId);
            if (valid.status != 200) {
                res.status(500).send({"error":valid})
                return
            }
        
            const venomResponse = await venom.sendContactVcard(to,contactsId,name);
            res.status(200).send(venomResponse)
        } catch(error) {
            res.status(500).send({"error":error.message})
        }

    }
}

function sendImage(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try{
            let to = req.body.to;
            let caption = req.body.caption;
            let base64:string = req.body.base64;
            let mimetype:string|undefined = req.body.mimetype;
            let filename:string = req.body.filename;
            const file = req.files;

            if(base64.startsWith('http')){
                let download = await axios.get(base64, {
                    responseType: 'arraybuffer'
                  })
                  mimetype = download.headers['content-type']
                let body = Buffer.from(download.data, 'binary').toString('base64')
                base64 = "data:"+mimetype+";base64,"+body
            }

            if (!!file && !!file.image && !Array.isArray(file.image)){
                base64 = "data:"+file.image.mimetype+";base64,"+file.image.data.toString('base64');
                mimetype = file.image.mimetype;
                filename = file.image.name;
            }
        
            if (!mimetype && !!filename && !!path.extname(filename))
                mimetype = 'image/'+path.extname(filename).slice(1);

            let base64HasMime = base64MimeType(base64);
            mimetype = !!base64HasMime ? base64HasMime : mimetype;

            if (!base64HasMime && !!mimetype){
                base64 = "data:"+mimetype+";base64,"+base64;
            }
                
            if (!filename && !!mimetype)
                filename = 'arquivo.'+mimetype.split('/')[1];


            if (!mimetype){
                res.status(400).send({
                    "errors": [
                      {
                        "location": "body",
                        "msg": "Invalid value",
                        "param": "mimetype"
                      }
                    ]
                  }
                  );
                return;
            }

            console.log("mimetype :",mimetype);
            console.log("filename :",filename);
            console.log("sendImage :",base64.slice(0,30)+'...');
            const venomReturn = await venom.sendImageFromBase64(to, base64, filename, caption);
            res.status(200).send(venomReturn);
        } catch(error) {
            res.status(500).send({"error":error});
        }
    }
}

function sendAudio(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try{
            let to = req.body.to;
            let caption = req.body.caption;
            let base64:string = req.body.base64;
            let mimetype:string|undefined = req.body.mimetype;
            let filename:string|undefined = req.body.filename;
            const file = req.files;

            if(base64.startsWith('http')){
                let download = await axios.get(base64, {
                    responseType: 'arraybuffer'
                    })
                    mimetype = download.headers['content-type']
                let body = Buffer.from(download.data, 'binary').toString('base64')
                base64 = "data:"+mimetype+";base64,"+body
            }

            if (!!file && !!file.audio && !Array.isArray(file.audio)){
                base64 = "data:"+file.audio.mimetype+";base64,"+file.audio.data.toString('base64');
                mimetype = file.audio.mimetype;
            }
        
            if (!mimetype && !!filename && !!path.extname(filename))
                mimetype = 'image/'+path.extname(filename).slice(1);

            let base64HasMime = base64MimeType(base64);
            mimetype = !!base64HasMime ? base64HasMime : mimetype;

            if (!base64HasMime && !!mimetype){
                base64 = "data:"+mimetype+";base64,"+base64;
            }

            if (!mimetype){
                res.status(400).send({
                    "errors": [
                        {
                        "location": "body",
                        "msg": "Invalid value",
                        "param": "mimetype"
                        }
                    ]
                    }
                    );
                return;
            }

            console.log("mimetype :",mimetype);
            console.log("audio :",base64.slice(0,30)+'...');
            const venomReturn = await venom.sendVoiceBase64(to, base64);
            res.status(200).send(venomReturn);
        } catch(error) {
            res.status(500).send({"error":error});
        }
    }
}

function sendVideo(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try{
            let to = req.body.to;
            let caption = req.body.caption;
            let base64:string = req.body.base64;
            let mimetype:string|undefined = req.body.mimetype;
            let filename:string|undefined = req.body.filename;
            const file = req.files;

            if(base64.startsWith('http')){
                let download = await axios.get(base64, {
                    responseType: 'arraybuffer'
                  })
                  mimetype = download.headers['content-type']
                let body = Buffer.from(download.data, 'binary').toString('base64')
                base64 = "data:"+mimetype+";base64,"+body
            }

            if (!!file && !!file.video && !Array.isArray(file.video)){
                base64 = "data:"+file.video.mimetype+";base64,"+file.video.data.toString('base64');
                mimetype = file.video.mimetype;
            }
        
            if (!mimetype && !!filename && !!path.extname(filename))
                mimetype = 'image/'+path.extname(filename).slice(1);

            let base64HasMime = base64MimeType(base64);
            mimetype = !!base64HasMime ? base64HasMime : mimetype;

            if (!base64HasMime && !!mimetype){
                base64 = "data:"+mimetype+";base64,"+base64;
            }

            if (!mimetype){
                res.status(400).send({
                    "errors": [
                      {
                        "location": "body",
                        "msg": "Invalid value",
                        "param": "mimetype"
                      }
                    ]
                  }
                  );
                return;
            }

            console.log("mimetype :",mimetype);
            console.log("video :",base64.slice(0,30)+'...');
            const venomReturn = await venom.sendFileFromBase64(to, base64, 'video', caption);
            res.status(200).send(venomReturn);
        } catch(error) {
            res.status(500).send({"error":error});
        }
    }
}

function sendDocument(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try{
            let to = req.body.to;
            let caption = req.body.caption;
            let base64:string = req.body.base64;
            let mimetype:string|undefined = req.body.mimetype;
            let filename:string|undefined = req.body.filename;
            const file = req.files;

            if(base64.startsWith('http')){
                let download = await axios.get(base64, {
                    responseType: 'arraybuffer'
                  })
                  mimetype = download.headers['content-type']
                let body = Buffer.from(download.data, 'binary').toString('base64')
                base64 = "data:"+mimetype+";base64,"+body
            }

            if (!!file && !!file.file && !Array.isArray(file.file)){
                base64 = "data:"+file.file.mimetype+";base64,"+file.file.data.toString('base64');
                mimetype = file.file.mimetype;
            }
        
            if (!mimetype && !!filename && !!path.extname(filename))
                mimetype = 'image/'+path.extname(filename).slice(1);

            let base64HasMime = base64MimeType(base64);
            mimetype = !!base64HasMime ? base64HasMime : mimetype;

            if (!base64HasMime && !!mimetype){
                base64 = "data:"+mimetype+";base64,"+base64;
            }

            if (!mimetype){
                res.status(400).send({
                    "errors": [
                      {
                        "location": "body",
                        "msg": "Invalid value",
                        "param": "mimetype"
                      }
                    ]
                  }
                  );
                return;
            }

            console.log("mimetype :",mimetype);
            console.log("file :",base64.slice(0,30)+'...');
            const venomReturn = await venom.sendFileFromBase64(to, base64, 'file', caption);
            res.status(200).send(venomReturn);
        } catch(error) {
            res.status(500).send({"error":error});
        }
    }
}

function sendLink(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try {
            let chatId = req.body.chatId;
            let url=req.body.url;
            let title = req.body.title;

            const venomReturn = await venom.sendLinkPreview(chatId, url, title);
            res.status(200).send(venomReturn);
        } catch(error){
            res.status(500).send({"error":error.message});
        }
    }
}

function readMessage(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
    try{
        const chatId = req.body.chatId;
        const venomReturn = await venom.sendSeen(chatId);
        res.status(200).send(venomReturn);
    } catch(error) {
        res.status(500).send({"error":error});
    }
        
    }
}

//#TODO: Issue Open 'https://github.com/orkestral/venom/issues/977'
function messagesDelete(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try {
            const chatId = req.body.chatId;
            const messageId = req.body.messageId; 
            console.log("messagesDelete")
            console.log("chatId",chatId)
            console.log("messageId",messageId)
            const venomReturn = await venom.deleteMessage(chatId,messageId);
            res.status(200).send(venomReturn);
        } catch (error) {
            res.status(500).send({"error":error}); 
        }

    }
}

function sendTextStatus(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try{
            const status = req.body.status
            const venomReturn = await venom.setProfileStatus(status);
            res.status(200).send(venomReturn);
        } catch (error) {
            res.status(500).send({"error":error}); 
        }

    }
}
//TODO: Feito mas não funciona retorna sem erro sem alteração
function sendImageStatus(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try{
            let to = req.body.to || undefined;
            let caption = req.body.caption;
            let base64:string = req.body.base64;
            let mimetype:string|undefined = req.body.mimetype;
            let filename:string|undefined = req.body.filename;
            const file = req.files;

            if(base64.startsWith('http')){
                let download = await axios.get(base64, {
                    responseType: 'arraybuffer'
                  })
                  mimetype = download.headers['content-type']
                let body = Buffer.from(download.data, 'binary').toString('base64')
                base64 = "data:"+mimetype+";base64,"+body
            }

            if (!!file && !!file.image && !Array.isArray(file.image)){
                base64 = "data:"+file.image.mimetype+";base64,"+file.image.data.toString('base64');
                mimetype = file.image.mimetype;
                filename = file.image.name;
            }
        
            if (!mimetype && !!filename && !!path.extname(filename))
                mimetype = 'image/'+path.extname(filename).slice(1);

            let base64HasMime = base64MimeType(base64);
            mimetype = !!base64HasMime ? base64HasMime : mimetype;

            if (!base64HasMime && !!mimetype){
                base64 = "data:"+mimetype+";base64,"+base64;
            }
                
            if (!mimetype){
                res.status(400).send({
                    "errors": [
                      {
                        "location": "body",
                        "msg": "Invalid value",
                        "param": "mimetype"
                      }
                    ]
                  }
                  );
                return;
            }

            console.log("mimetype :",mimetype);
            console.log("filename :",filename);
            console.log("sendImage :",base64.slice(0,30)+'...');
            console.log("to :",to);
            console.log("setProfilePic");
            const venomReturn = await venom.setProfilePic(base64, to);
            console.log("venomReturn: ", venomReturn);
            res.status(200).send(venomReturn);
        } catch(error) {
            res.status(500).send({"error":error});
        }
    }
}

//Chats
function chats(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try{
            const venomReturn = await venom.getAllChats();
            res.status(200).send(venomReturn);
        } catch(error) {
            res.status(500).send({"error":error});
        }
    }
}

function chatsPhone(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {
        try{
            console.log("chatsPhone")
            const { 'phone': contactId } = matchedData(req)
            const venomReturn = await venom.getChatById(contactId);
            res.status(200).send(venomReturn);
        } catch(error) {
            res.status(500).send({"error":error});
        }
        
    }
}

function chatMessages(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

//Contatos
function contacts(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function contactsPhone(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function profilePicture(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function phoneExists(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
} 

//Grupo
function createGroup(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}
    
function updateGroupName(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function addAdmin(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function removeAdmin(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function addParticipant(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function removeParticipant(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function leaveGroup(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function groupMetadataPhone(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}
 
//Fila
function queue(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function queueDelete(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}
     
//Webhooks
function updateWebhookDelivery(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function updateWebhookDisconnected(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function updateWebhookReceived(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}

function updateWebhookMessageStatus(venom:venom.Whatsapp){
    return async (req:Request, res:Response) => {}
}


export {
    //Instância
    qrCode,
    qrCodeImage,
    restart,
    disconnect,
    status,
    restoreSession,
    allunreadmessages,
    //Mensagens
    sendText,
    sendTextOptions,
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