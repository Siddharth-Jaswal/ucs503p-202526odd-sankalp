import cron from "node-cron";
import qrcode from "qrcode-terminal";
import pkg from "whatsapp-web.js";
import { Schedule } from "../models/schedule.model.js";

const { Client,LocalAuth }=pkg;

const jobs={};

let client;

const formatLocalTime=(date)=>{
    try{
        const s=date.toLocaleTimeString('en-IN',{ hour: 'numeric',minute: '2-digit',second: '2-digit',hour12: true });
        return s.replace('AM','am').replace('PM','pm');
    }catch(err){
        return date.toLocaleTimeString().toLowerCase();
    }
}

const getNextRunDescription=(cronExpr)=>{
    try{
        const parts=cronExpr.trim().split(/\s+/);
        const now=new Date();
        let target=new Date(now.getTime());

        if(parts.length === 6){
            const [sec,min,hour,d,m,w]=parts;
            if(d === '*' && m === '*' && w === '*'){
                target.setSeconds(Number(sec));
                target.setMinutes(Number(min));
                target.setHours(Number(hour));
                target.setMilliseconds(0);
                if(target <= now){
                    target=new Date(target.getTime() + 24*60*60*1000);
                }
                return formatLocalTime(target);
            }
        }
        if(parts.length === 5){
            const [min,hour,d,m,w]=parts;
            if(d === '*' && m === '*' && w === '*'){
                target.setSeconds(0);
                target.setMinutes(Number(min));
                target.setHours(Number(hour));
                target.setMilliseconds(0);
                if(target <= now){
                    target=new Date(target.getTime() + 24*60*60*1000);
                }
                return formatLocalTime(target);
            }
        }
    }catch(err){
        //ignore
    }
    return undefined;
}

const scheduleMessage=(doc)=>{
    const id=String(doc._id);
    if (jobs[id]){
        jobs[id].stop();
    }

    const nextRun=getNextRunDescription(doc.cronTime);
    if(nextRun){
        console.log(`Scheduled message for ~${nextRun} (server local time) ${id} for ${doc.phone} (${doc.cronTime})`);
    }else{
        console.log(`Scheduled message ${id} for ${doc.phone} (${doc.cronTime})`);
    }

    const job=cron.schedule(doc.cronTime,async()=>{
        try{
            await client.sendMessage(`${doc.phone}@c.us`,doc.message);
            console.log(`Message sent to ${doc.phone} at ${formatLocalTime(new Date())}`);
        }catch(err){
            console.error("Send failed:",err);
        }
    });

    jobs[id]=job;
}

const loadAllSchedules=async()=>{
    const schedules=await Schedule.find({ active: true });
    schedules.forEach(scheduleMessage);
}

const cancelScheduleById=async(id)=>{
    const job=jobs[id];
    if(job){
        job.stop();
        delete jobs[id];
    }
}

const whatsappSetup=()=>{
    if(client){
        return client;
    }

    client=new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
            headless: true,
            args: ["--no-sandbox","--disable-setuid-sandbox"],
        },
    });

    client.on("qr",(qr) => {
        qrcode.generate(qr,{ small: true });
        console.log("Scan QR code to connect WhatsApp.");
    });

    client.on("ready",async () => {
        console.log("WhatsApp is ready!");
        await loadAllSchedules();
    });

    client.initialize();

    return client;
}

export {
    whatsappSetup,
    scheduleMessage,
    loadAllSchedules,
    cancelScheduleById
};


