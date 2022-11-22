
import nodemailer from 'nodemailer';

const transporter=nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"hg739555@gmail.com ",
        pass:"ukcuffnoxpcntdgu",
    },

});

const sendMail=async(email,subject,html)=>{

    const mailoptions={
        from:"hg739555@gmail.com",
        to:email,
        subject:subject,
        html:html,
    
    };
    
    transporter.sendMail(mailoptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

    await transporter.sendMail(mailoptions);

}

 export{sendMail};