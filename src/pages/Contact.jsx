import './Contact.css'

const Contact = () => {
    return (
        <div className="page_body">
            <h1>Contact Me</h1>
            <div id="contact_form_container">
                <div id="contact_name_email_container">
                    <div id="contact_name" className="form_label_input">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name"/>
                    </div>
                    <div id="contact_email" className="form_label_input">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email"/>
                    </div>
                </div>
                <div id="contact_subject" className="form_label_input">
                    <label for="subject">Subject:</label>
                    <input type="text" id="subject" name="subject"/>
                </div>
                <div id="contact_message" className="form_label_input">
                    <label for="message">Message:</label>
                    <input type="text" id="message" name="message"/>
                </div>
                <button>Send Message</button>
            </div>
        </div>
    );
  };
  
  export default Contact;
  