import venom from 'venom-bot'
import {Router} from 'express'
import * as core from 'express-serve-static-core'
import { check, body, CustomValidator, CustomSanitizer } from 'express-validator';

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

function routeBuilder(venom:venom.Whatsapp): core.Router {
    const venomRoutes = Router()

    //https://api.z-api.io/instances/MINHA_INSTANCE/token/MEU_TOKEN

    //Instância
    venomRoutes.get('​/qr-code',qrCode);
    venomRoutes.get('/qr-code/image',qrCodeImage);
    venomRoutes.get('/restart',restart);
    venomRoutes.get('/disconnect',disconnect);
    venomRoutes.get('​/status',status);
    venomRoutes.get('/restore-session',restoreSession);

    //Mensagens
    venomRoutes.post('/send-text', sendText());
    venomRoutes.post('/send-contact',sendContact);
    venomRoutes.post('/send-image',sendImage(venom));
    venomRoutes.post('/send-audio',sendAudio);
    venomRoutes.post('/send-video',sendVideo);
    venomRoutes.post('/send-document/:extension',sendDocument);
    venomRoutes.post('/send-link',sendLink(venom));
    venomRoutes.post('/read-message',readMessage);
    venomRoutes.delete('/messages',messagesDelete);


    //Status
    venomRoutes.post('/send-text-status',sendTextStatus);
    venomRoutes.post('/send-image-status',sendImageStatus);


    //Chats
    venomRoutes.get('​/chats',chats);
    venomRoutes.get('​/chats/:phone',chatsPhone);
    venomRoutes.get('​/chat-messages/:phone',chatMessages);

    //Contatos
    venomRoutes.get('​/contacts',contacts);
    venomRoutes.get('​/contacts/:phone',contactsPhone);
    venomRoutes.get('​/profile-picture',profilePicture);
    venomRoutes.get('​/phone-exists/:phone',phoneExists);

    //Grupo
    venomRoutes.post('​/create-group',createGroup);
    venomRoutes.post('​/update-group-name',updateGroupName);
    venomRoutes.post('​/add-admin',addAdmin);
    venomRoutes.post('​/remove-admin',removeAdmin);
    venomRoutes.post('​/add-participant',addParticipant);
    venomRoutes.post('​/remove-participant',removeParticipant);
    venomRoutes.post('​/leave-group',leaveGroup);
    venomRoutes.get('​​/group-metadata​/{phone}',groupMetadataPhone);

    //Fila
    venomRoutes.get('​​/queue',queue);
    venomRoutes.delete('​​/queue',queueDelete);

    //Webhooks
    venomRoutes.put('​​​/update-webhook-delivery',updateWebhookDelivery);
    venomRoutes.put('​​​/update-webhook-disconnected',updateWebhookDisconnected);
    venomRoutes.put('​​​/update-webhook-received',updateWebhookReceived);
    venomRoutes.put('​​​/update-webhook-message-status',updateWebhookMessageStatus);

    return venomRoutes
}

export {
    routeBuilder
}