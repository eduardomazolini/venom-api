import { Whatsapp } from 'venom-bot'
declare global {
    namespace Express {
        interface Request {
            venom?: Whatsapp ;
        }
    }  
}