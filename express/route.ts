import venom from 'venom-bot'
import {Router} from 'express'
import * as core from 'express-serve-static-core'
import { check, body, CustomValidator, CustomSanitizer } from 'express-validator';
import {phoneLib, base64MimeType, validationResultReturn} from './helper';

import {
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

       } from './controller'

const phoneSanitizer: CustomSanitizer = async (to, meta) => {
    if (!!to) return to;
    if (!!meta.req.body.phone)
        return await phoneLib(<string> meta.req.body.phone);
    return "";
}

function considerAlias(alias: string){
    const customSanitizer: CustomSanitizer = async (input, meta) => {
        if (!!input) return input;
        return meta.req.body['alias'] || "";
    }
    return customSanitizer
}

function routeBuilder(venom:venom.Whatsapp): core.Router {
    const venomRoutes = Router()

    //https://api.z-api.io/instances/MINHA_INSTANCE/token/MEU_TOKEN

    //Instância
    venomRoutes.get('​/qr-code',qrCode(venom));
    venomRoutes.get('/qr-code/image',qrCodeImage(venom));
    venomRoutes.get('/restart',restart(venom));
    venomRoutes.get('/disconnect',disconnect(venom));
    venomRoutes.get('​/status',status(venom));
    venomRoutes.get('/restore-session',restoreSession(venom));

    //Mensagens
    venomRoutes.post('/send-text', [
        body('to').customSanitizer(phoneSanitizer).not().isEmpty(),
        body('content').customSanitizer(considerAlias('message')).not().isEmpty(),
        validationResultReturn(),
        sendText(venom)
    ]);
    venomRoutes.post('/send-contact',sendContact(venom));
    venomRoutes.post('/send-image',[
        body('to').customSanitizer(phoneSanitizer).not().isEmpty(),
        body('caption').customSanitizer(considerAlias('content')).customSanitizer(considerAlias('message')),
        body('base64').customSanitizer(considerAlias('url')).customSanitizer(considerAlias('image')).customSanitizer(considerAlias('file')),
        validationResultReturn(),
        sendImage(venom)
    ]);
    venomRoutes.post('/send-audio',sendAudio(venom));
    venomRoutes.post('/send-video',sendVideo(venom));
    venomRoutes.post('/send-document/:extension',sendDocument(venom));
    venomRoutes.post('/send-link',[
        body('chatId').customSanitizer(considerAlias('to')).customSanitizer(phoneSanitizer).not().isEmpty(),
        body('url').customSanitizer(considerAlias('linkUrl')).not().isEmpty(),
        body('title').customSanitizer(considerAlias('content')).customSanitizer(considerAlias('message')).not().isEmpty(),
        validationResultReturn(),
        sendLink(venom)
    ]);
    venomRoutes.post('/read-message',readMessage(venom));
    venomRoutes.delete('/messages',messagesDelete(venom));


    //Status
    venomRoutes.post('/send-text-status',sendTextStatus(venom));
    venomRoutes.post('/send-image-status',sendImageStatus(venom));


    //Chats
    venomRoutes.get('​/chats',chats(venom));
    venomRoutes.get('​/chats/:phone',chatsPhone(venom));
    venomRoutes.get('​/chat-messages/:phone',chatMessages(venom));

    //Contatos
    venomRoutes.get('​/contacts',contacts(venom));
    venomRoutes.get('​/contacts/:phone',contactsPhone(venom));
    venomRoutes.get('​/profile-picture',profilePicture(venom));
    venomRoutes.get('​/phone-exists/:phone',phoneExists(venom));

    //Grupo
    venomRoutes.post('​/create-group',createGroup(venom));
    venomRoutes.post('​/update-group-name',updateGroupName(venom));
    venomRoutes.post('​/add-admin',addAdmin(venom));
    venomRoutes.post('​/remove-admin',removeAdmin(venom));
    venomRoutes.post('​/add-participant',addParticipant(venom));
    venomRoutes.post('​/remove-participant',removeParticipant(venom));
    venomRoutes.post('​/leave-group',leaveGroup(venom));
    venomRoutes.get('​​/group-metadata​/{phone}',groupMetadataPhone(venom));

    //Fila
    venomRoutes.get('​​/queue',queue(venom));
    venomRoutes.delete('​​/queue',queueDelete(venom));

    //Webhooks
    venomRoutes.put('​​​/update-webhook-delivery',updateWebhookDelivery(venom));
    venomRoutes.put('​​​/update-webhook-disconnected',updateWebhookDisconnected(venom));
    venomRoutes.put('​​​/update-webhook-received',updateWebhookReceived(venom));
    venomRoutes.put('​​​/update-webhook-message-status',updateWebhookMessageStatus(venom));

    return venomRoutes
}

export {
    routeBuilder
}