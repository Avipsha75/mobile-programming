
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import { getDatabase, ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDKwTuYPiJBiHLudoG9RtxXk2SyRQmDCSY",
    authDomain: "avi-s-project-a311d.firebaseapp.com",
    projectId: "avi-s-project-a311d",
    storageBucket: "avi-s-project-a311d.firebasestorage.app",
    messagingSenderId: "757238665330",
    appId: "1:757238665330:web:0bbcb67e2041b49b4272eb"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
console.log(db)

//Function to write user data to Firebase Realtime Database
function writeUserData(userId, firstname, lastname, address, age, gender, email, phone, height, occupation) {
    // Get the database instance
    const db = getDatabase();
  
//Create a reference/points to 'users/{userId}' and set the data (name and email)
 set(ref(db, 'users/' + userId), {
      firstname: firstname,      
      lastname: lastname,
      address: address,
      age: age,
      gender: gender,
      email: email,
      phone: phone,
      height: height,
      occupation: occupation
    });
  }
writeUserData(1, "Avipsha", "Shrestha", "123 Main St", 20, "Female", "avipsha@example.com", "123-456-7890", 5.6, "Engineer")
writeUserData(2, "Avi", "Shresz", "456 Oak Ave", 21, "Male", "avi@example.com", "098-765-4321", 5.10, "Designer")
writeUserData(3, "Aachu", "Shrez", "789 Pine Rd", 22, "Other", "aachu@example.com", "111-222-3333", 5.6, "Engineer")
writeUserData(4, "Avip", "Shrestha", "101 Elm St", 23, "Male", "avip@example.com", "555-1234", 5.10, "Designer")
writeUserData(5, "Aviiii", "Shrez", "202 Maple Ave", 24, "Female", "abi@example.com", "555-5678", 5.6, "Engineer")
writeUserData(6, "Aviiipp", "Shrestha", "303 Oak Rd", 25, "Other", "abi2@example.com", "555-9012", 5.10, "Designer")
writeUserData(7, "Avipsashaaa", "Shrez", "404 Birch Ln", 26, "Female", "abi3@example.com", "555-3456", 5.6, "Engineer")
writeUserData(8, "Avvviiipppp", "Shrestha", "505 Cedar Dr", 27, "Other", "abi4@example.com", "555-7890", 5.10, "Designer")
writeUserData(9, "Avippshaa", "Shrez", "606 Spruce St", 28, "Female", "abi5@example.com", "555-2345", 5.6, "Engineer")
writeUserData(10, "Abi", "Shrestha", "707 Fir Ave", 29, "Other", "abi6@example.com", "555-6789", 5.10, "Designer")

// ref(db, 'users') points to the users path.
// get(userRef) gets the data at that path.
// snapshot.forEach(...) loops over each child node (each user).
// childsnapshot.val() gives the actual data (name and email), which is printed.
function readUser(){
    const userRef = ref(db,'users')

    get(userRef).then((snapshot)=>{
        snapshot.forEach((childsnapshot)=>{
            console.log(childsnapshot.val());
        })
    })
}
readUser();


function updateUserData(userId, updatedData) {
  const userRef = ref(db, 'users/' + userId);  
  update(userRef, updatedData)
    .then(() => {
      console.log("User updated successfully");
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}

updateUserData(1, {firstname: "Aviiiiiiiii", lastname: "Shrestha", address: "Kathmandu", email: "aviiiiiiiii@example.com", height: 5.6, occupation: "Engineer"});
updateUserData(2, {firstname: "Avipsha", lastname: "Shrestha", address: "Dallu", email: "avipshashrestha@example.com", phone: "123-456-7890", height: 5.6, occupation: "Frontend Developer"});
updateUserData(3, {address: "Dallu, Chhauni", email: "aachu@example.com"});
updateUserData(7, {address: "Chhauni"});


function deleteUserData(userId) {
  const userRef = ref(db, 'users/' + userId);
  remove(userRef)
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

deleteUserData(1);

console.log("Added! Good")