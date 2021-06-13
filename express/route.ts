import venom from 'venom-bot'
import { Router } from 'express'
import { body } from 'express-validator';
import { considerAlias, phoneSanitizer, validationResultReturn } from './helper';
import fileUpload from 'express-fileupload';

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


function routeBuilder(venom:venom.Whatsapp): Router {
    const venomRoutes = Router()

    //https://api.z-api.io/instances/MINHA_INSTANCE/token/MEU_TOKEN

    //Instância
    venomRoutes.get('/qr-code',qrCode(venom));
    venomRoutes.get('/qr-code/image',qrCodeImage(venom));
    venomRoutes.get('/restart',restart(venom));
    venomRoutes.get('/disconnect',disconnect(venom));
    venomRoutes.get('​/status',status(venom));
    venomRoutes.get('/restore-session',restoreSession(venom));

    //Mensagens
    venomRoutes.post('/send-text', [
        body('to').customSanitizer(phoneSanitizer('phone')).notEmpty(),
        body('content').customSanitizer(considerAlias('message')).notEmpty(),
        validationResultReturn(),
        sendText(venom)
    ]);
    venomRoutes.post('/send-contact',[
        body('to').customSanitizer(phoneSanitizer('phone')).notEmpty(),
        body('contactsId').customSanitizer(considerAlias('contactId')).customSanitizer(phoneSanitizer('contactPhone')).notEmpty(),
        validationResultReturn(),
        sendContact(venom)
    ]);
    venomRoutes.post('/send-image',[
        fileUpload({
            limits: { fileSize: 16 * 1024 * 1024 },
          }),
        body('to').customSanitizer(phoneSanitizer('phone')).notEmpty(),
        body('caption').customSanitizer(considerAlias('content')).customSanitizer(considerAlias('message')),
        body('base64').customSanitizer(considerAlias('url')).customSanitizer(considerAlias('image')).customSanitizer(considerAlias('file')),
        validationResultReturn(),
        sendImage(venom)
    ]);
    venomRoutes.post('/send-audio',[
        fileUpload({
            limits: { fileSize: 16 * 1024 * 1024 },
          }),
        body('to').customSanitizer(phoneSanitizer('phone')).notEmpty(),
        body('caption').customSanitizer(considerAlias('content')).customSanitizer(considerAlias('message')),
        body('base64').customSanitizer(considerAlias('url')).customSanitizer(considerAlias('audio')).customSanitizer(considerAlias('file')),
        validationResultReturn(),
        sendAudio(venom)
    ]);
    venomRoutes.post('/send-video',[
        fileUpload({
            limits: { fileSize: 16 * 1024 * 1024 },
          }),
        body('to').customSanitizer(phoneSanitizer('phone')).notEmpty(),
        body('caption').customSanitizer(considerAlias('content')).customSanitizer(considerAlias('message')),
        body('base64').customSanitizer(considerAlias('url')).customSanitizer(considerAlias('video')).customSanitizer(considerAlias('file')),
        validationResultReturn(),
        sendVideo(venom)
    ]);
    venomRoutes.post('/send-document/:extension',[
        fileUpload({
            limits: { fileSize: 100 * 1024 * 1024 },
          }),
        sendDocument(venom)
    ]);
    venomRoutes.post('/send-link',[
        body('chatId').customSanitizer(considerAlias('to')).customSanitizer(phoneSanitizer('phone')).notEmpty(),
        body('url').customSanitizer(considerAlias('linkUrl')).notEmpty(),
        body('title').customSanitizer(considerAlias('content')).customSanitizer(considerAlias('message')),
        validationResultReturn(),
        sendLink(venom)
    ]);
    venomRoutes.post('/read-message',[
        body('chatId').customSanitizer(considerAlias('to')).customSanitizer(phoneSanitizer('phone')).notEmpty(),
        validationResultReturn(),
        readMessage(venom)
    ]);
    //#TODO: Issue Open 'https://github.com/orkestral/venom/issues/977'
    venomRoutes.delete('/messages',[
        body('chatId').customSanitizer(considerAlias('to')).customSanitizer(phoneSanitizer('phone')).notEmpty(),
        body('messageId').notEmpty(),
        validationResultReturn(),
        messagesDelete(venom)
    ]);


    //Status

    venomRoutes.post('/send-text-status',[
        body('status').customSanitizer(considerAlias('message')).customSanitizer(considerAlias('content')).notEmpty(),
        validationResultReturn(),
        sendTextStatus(venom)
    ]);
    //TODO: Feito mas não funciona retorna sem erro sem alteração
    venomRoutes.post('/send-image-status',[
        fileUpload({
            limits: { fileSize: 16 * 1024 * 1024 },
          }),
          body('to').customSanitizer(considerAlias('chatId')).customSanitizer(phoneSanitizer('phone')),
          body('base64').customSanitizer(considerAlias('url')).customSanitizer(considerAlias('image')).customSanitizer(considerAlias('file')),
        validationResultReturn(),
        sendImageStatus(venom)
    ]);


    //Chats
    venomRoutes.get('/chats',chats(venom));
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