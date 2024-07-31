import './Contact.css'
import axios from 'axios';
import { useState, useRef } from 'react';
import emailjs from 'emailjs-com';

const SERVICE_ID = "service_0znd5it"
const TEMPLATE_ID = "template_k95fyyp"
const USER_ID = "Fz3wPF20_wZNHk3LD"

const Contact = () => {
    const form = useRef();

    const sendMessage = (e) => {
        e.preventDefault();
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, USER_ID)
        .then((result) => {
            console.log(result);
            alert("Email sent!")
        }, (error) => {
            console.log(error.text);
            alert("Error sending email.")
        });
    }

    return (
        <div className="page_body">
            <h1>Contact Me</h1>
            <div id="contact_big_container">
                <div id="contact_info_container">
                    <div className="contact_info_sub">
                        <i className="fa fa-phone"></i>
                        <p>Call Me</p>
                        <p>+1 847-497-8064</p>
                    </div>
                    <div className="contact_info_sub">
                        <i className="fa fa-envelope"></i>
                        <p>Email Me</p>
                        <p>contact@carsonzuniga.com</p>
                    </div>
                    <div className="contact_info_sub">
                        <i className="fa fa-map-marker"></i>
                        <p>Find Me</p>
                        <p>Chicago, IL</p>
                    </div>
                </div>
                <form id="contact_form_container" ref={form} onSubmit={sendMessage}>
                    <div id="contact_name_email_container">
                        <div id="contact_name" className="form_label_input">
                            <label htmlFor="from_name">Name:</label>
                            <input type="text" id="name" name="from_name" autoComplete="name"/>
                        </div>
                        <div id="contact_email" className="form_label_input">
                            <label htmlFor="from_email">Email:</label>
                            <input type="email" id="email" name="from_email" autoComplete="email"/>
                        </div>
                    </div>
                    <div id="contact_subject" className="form_label_input">
                        <label htmlFor="email_subject">Subject:</label>
                        <input type="text" id="subject" name="email_subject"/>
                    </div>
                    <div id="contact_message" className="form_label_input">
                        <label htmlFor="html_message">Message:</label>
                        <textarea type="text" id="message" name="html_message" rows="6"/>
                    </div>
                    <input type="submit" value="Send" />
                </form>
            </div>
            
        </div>
    );
  };
  
  export default Contact;
  