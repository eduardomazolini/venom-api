import config from '../config/default.json';

export default function(phone:string):string {
    if (!phone.includes("@")){
        phone +="@c.us"
    }

    if (phone.startsWith("55")) {
        return phone
    }
    
    if (phone.length <= 14) {
        phone = "55"+config.phoneStrategy.phoneOptions.DDD+phone;
    }

    if (phone.startsWith("1") && phone.length <= 16) {
        phone = "55"+phone;
    }
    console.log('##########phone##########')
    console.log(phone)
    return phone;
}