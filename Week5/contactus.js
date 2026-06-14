// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, set, get, ref, update, push } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvv_pg6J7EP0BlaYWOzz6GF419kkSQQ9M",
    authDomain: "contact-us-85257.firebaseapp.com",
    projectId: "contact-us-85257",
    storageBucket: "contact-us-85257.firebasestorage.app",
    messagingSenderId: "151374746144",
    appId: "1:151374746144:web:92ab7e2bf42d3a4a6fe245"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log(db);

let currentContactId = "";

function submitContact() {
    const contactRef = ref(db, "contactus");
    const newContactRef = push(contactRef);
    currentContactId = newContactRef.key;
    set(newContactRef, {
        fullname: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        address: document.getElementById("address").value,
        message: document.getElementById("message").value
    })
    .then(() => {
        console.log("Contact details submitted successfully.");
        loadContactDetails();
    })
    .catch((error) => {
        console.log(error);
    });
}

function loadContactDetails() {
    if (currentContactId === "") {
        return;
    }
    const contactRef = ref(db, "contactus/" + currentContactId);
    get(contactRef).then((snapshot) => {
        if (snapshot.exists()) {
            const contact = snapshot.val();
            document.getElementById("contact-info").innerHTML =
            "Full Name: " + contact.fullname + "<br><br>" +
            "Email: " + contact.email + "<br><br>" +
            "Phone Number: " + contact.phone + "<br><br>" +
            "Subject: " + contact.subject + "<br><br>" +
            "Address: " + contact.address + "<br><br>" +
            "Message: " + contact.message;
        }
    });
}

function fetchContactForEdit() {
    if (currentContactId === "") {
        return;
    }
    const contactRef = ref(db, "contactus/" + currentContactId);
    get(contactRef).then((snapshot) => {
        if (snapshot.exists()) {
            const contact = snapshot.val();
            document.getElementById("fullname").value = contact.fullname;
            document.getElementById("email").value = contact.email;
            document.getElementById("phone").value = contact.phone;
            document.getElementById("subject").value = contact.subject;
            document.getElementById("address").value = contact.address;
            document.getElementById("message").value = contact.message;
            document.getElementById("updateBtn").disabled = false;
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

function updateContactData() {
    const updatedData = {
        fullname: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        address: document.getElementById("address").value,
        message: document.getElementById("message").value
    };
    const contactRef = ref(db, "contactus/" + currentContactId);
    update(contactRef, updatedData)
    
    .then(() => {
        console.log("Contact updated successfully.");

        loadContactDetails();
        document.getElementById("updateBtn").disabled = true;
        document.getElementById("fullname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("address").value = "";
        document.getElementById("message").value = "";
    })
    .catch((error) => {
        console.log(error);
    });
}

document.getElementById("submitBtn").addEventListener("click", submitContact);
document.getElementById("editBtn").addEventListener("click", fetchContactForEdit);
document.getElementById("updateBtn").addEventListener("click", updateContactData);