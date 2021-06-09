import ogs from 'open-graph-scraper';
import config from '../config/default.json';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Whatsapp } from 'venom-bot';



export async function phoneLib(phone: string): Promise<string> {
    const lib = await import("../phone-library/"+config.phoneStrategy.phoneLibrary);
    return lib.default(phone);
}

export function base64MimeType(encoded: string) {
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

export function addVenomOnRequest(client:Whatsapp){
  return (req:Request, _res:Response, next:NextFunction) => {
    req.venom = client;
    next()
  }  
}

export function validationResultReturn(){
  return (req:Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next()
  }
}

export async function getLinkData(url:string):Promise<{ linkUrl: string;
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
 