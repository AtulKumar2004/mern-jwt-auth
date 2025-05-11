import { mailtrapClient,sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async(email,verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category: "Email Verification"
        });
        console.log("Email sent successfully",response);
    } catch(error) {
        console.error(`Error sending verification`,error);
        throw new Error(`Error sending verification email: ${error}`)
    }
}

export const sendWelcomeEmail = async(email,name) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "4d8e3ac5-f339-49fe-b054-3b021ad8fdb7",
            template_variables: {
                name: name,
                company_info_name: "Auth company"
            },
        });
        console.log("Welcome Email sent Successfully",response);
    } catch(error) {
        console.error(`Error sending welcome email`,error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
}

export const sendPasswordResetEmail = async(email,resetURL) => {
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject:"Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category: "Password Reset"
        });
        console.log("Password Reset Email Sent Successfully",response);
    } catch(error) {
        console.log("Error sending password reset email",error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
}

export const sendResetSuccessEmail = async(email) => {
    const recipient= [{email}];

    try {
        const response  = await mailtrapClient.send({
            from: sender,
            to:recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });
        console.log("Password reset email sent successfully",response);
    } catch(error) {
        console.error("Error sending password reset success email",error);
        throw new Error("Error sending password reset success email",error); 
    }
}

