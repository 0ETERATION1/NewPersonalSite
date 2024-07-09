export default class ModalContentProvider {
    constructor() {
      this.modalContents = {
        aboutMe: {
          title: 'About me',
          description: 
          `
          <h3>I'm Alex Terskin</h3>
          <p>Currently I am a computer science student at the University of Maryland!</p>
          <p>
          Thank you for taking the time to check out my portfolio. 
          I really hope you enjoy exploring it as much as I enjoyed building it. 
          If you have any questions or comments, feel free to connect with me on 
          <a href="https://www.linkedin.com/in/alexanderterskin/" target="_blank">linkedin</a>
          or contact me directly by shooting me an email @ 
          <a href="mailto:terskinlalex@gmail.com" targer="_blank">terskinalex@gmail.com</a>
                        
          </p>

          <h1>Looking for my resume?</h1>
          <p>Download it here! <a href="/resume/AlexTerskin.pdf" target="_blank">here</a>.</p>
          `
        },
        projects: {
          title: 'Projects',
          description: 'me',
        },
        contactMe: {
          title: 'Contact Me',
          description: 'me',
        },
      }
    }
  
    getModalInfo(portalName) {
      return this.modalContents[portalName];
    }
  }
  