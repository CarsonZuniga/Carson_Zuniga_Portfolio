import './Contact.css'

const Contact = () => {
    return (
        <div className="page_body">
            <h1>Contact Me</h1>
            <div id="contact_big_container">
                <div id="contact_info_container">
                    <div className="contact_info_sub">
                        <i class="fa fa-phone"></i>
                        <p>Call Me</p>
                        <p>+1 847-497-8064</p>
                    </div>
                    <div className="contact_info_sub">
                        <i class="fa fa-envelope"></i>
                        <p>Email Me</p>
                        <p>contact@carsonzuniga.com</p>
                    </div>
                    <div className="contact_info_sub">
                        <i class="fa fa-map-marker"></i>
                        <p>Find Me</p>
                        <p>Chicago, IL</p>
                    </div>
                </div>
                <div id="contact_form_container">
                    <div id="contact_name_email_container">
                        <div id="contact_name" className="form_label_input">
                            <label for="name">Name:</label>
                            <input type="text" id="name" name="name" autocomplete="name"/>
                        </div>
                        <div id="contact_email" className="form_label_input">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" autocomplete="email"/>
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
            
        </div>
    );
  };
  
  export default Contact;
  