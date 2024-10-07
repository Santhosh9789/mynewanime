// Firebase configuration (replace with your Firebase project credentials)
const firebaseConfig = {
    apiKey: "AIzaSyDlAuFjHeiYfoixuCkuscDNktlDH0iJ4Jg",
            authDomain: "websampleone-f087b.firebaseapp.com",
            projectId: "websampleone-f087b",
            storageBucket: "websampleone-f087b.appspot.com",
            messagingSenderId: "784460008070",
            appId: "1:784460008070:web:1be80f934098a5ad551f07"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// Handle file uploads
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');

uploadButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    const storageRef = storage.ref('files/' + file.name);

    storageRef.put(file).then((snapshot) => {
        console.log('Uploaded file successfully!');
        displayUploadedFiles();
    });
});

function displayUploadedFiles() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    storage.ref('files').listAll().then((result) => {
        result.items.forEach((fileRef) => {
            fileRef.getDownloadURL().then((url) => {
                const link = document.createElement('a');
                link.href = url;
                link.textContent = fileRef.name;
                fileList.appendChild(link);
                fileList.appendChild(document.createElement('br'));
            });
        });
    });
}
