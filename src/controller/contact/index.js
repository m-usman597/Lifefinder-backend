const Contact = require('../../model/contact');
const ContactUs = require('../../utils/ContactAdmin');

const ContactUser = async(req,res) => {

    const {user_name, user_email, status, message} = req.body;

try{
    await ContactUs(
        user_name,
        user_email,
        status,
        message,
        "User Message"
    );

    const newContact = new Contact({
        user_name,
        user_email,
        status,
        message,
        createdAt: new Date()
    });

    await newContact.save();
    res.status(200).json({message:"Email Sent Successfully"});

}catch(error){

    console.log(error);
    res.status(500).json({message:"Failed to Send Email"});
}

};

module.exports = {ContactUser};