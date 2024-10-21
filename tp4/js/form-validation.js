window.onload = function () {
    displayContactList();
    const form = document.querySelector("#myForm"); // Assurez-vous que le bon ID de formulaire est utilisé
    const contactsTable = document.querySelector("#contactsTable tbody");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche le comportement par défaut de soumission

        let formValid = true;


        // Suppression des messages d'erreur précédents
        clearErrorMessages();

        // Validation des champs Nom et Prénom
        const fields = ["nom", "prenom", "adressePostale"];

        fields.forEach(function (field) {
            const input = document.getElementById(field);
            if (input.value.trim().length < 5) {
                showErrorMessage(input, "Doit avoir au moins 5 caractères.");
                formValid = false;
            }
        });

        // Validation de l'email
        const emailInput = document.getElementById("email");
        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            showErrorMessage(emailInput, "Format d'email invalide.");
            formValid = false;
        }

        // Validation de la date de naissance
        const dateNaissanceInput = document.getElementById("dateNaissance");
        const dateNaissance = new Date(dateNaissanceInput.value);
        const now = new Date();

        if (dateNaissance >= now) {
            showErrorMessage(dateNaissanceInput, "La date ne peut pas être dans le futur.");
            formValid = false;
        }


        const nom = document.getElementById("nom").value;
        const prenom = document.getElementById("prenom").value;
        const adresse = document.getElementById("adressePostale").value;


        // Affichage du modal d'erreur ou ajout du contact
        if (!formValid) {
            showErrorModal();
        } else {
            contactStore.add(nom, prenom, dateNaissance, adresse, email);
            displayContactList()
            form.reset(); // Réinitialise le formulaire
        }
    });

    // Fonction de validation d'email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider l'email
        return re.test(email);
    }

    // Fonction pour afficher un message d'erreur
    function showErrorMessage(input, message) {
        const errorContainer = document.createElement("div");
        errorContainer.className = "invalid-feedback";
        errorContainer.textContent = message;

        input.classList.add("is-invalid");
        input.parentNode.appendChild(errorContainer);
    }

    // Fonction pour supprimer les messages d'erreur
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll(".invalid-feedback");
        errorMessages.forEach(function (msg) {
            msg.remove();
        });

        const inputs = document.querySelectorAll("input");
        inputs.forEach(function (input) {
            input.classList.remove("is-invalid");
        });
    }
    function showImage() {
        getLocation()
        document.getElementById('gpsImage').style.display = 'block';
    }

    // Fonction pour afficher le modal d'erreur
    function showErrorModal() {
        const myModal = new bootstrap.Modal(document.getElementById('myModal'));
        myModal.show();
    }

    // Fonction pour ajouter un contact au tableau

    function displayContactList() {
        const contactListString = localStorage.getItem('contactList'); // ici on va récupérer la liste en forme de chaine de caractère (string)
        const contactList = contactListString ? JSON.parse(contactListString) : [];
        document.querySelector("table tbody").innerHTML = "";

        for (const contact of contactList) {
            document.querySelector("table tbody").innerHTML +=
                `<tr>
        <td>${contact.name}</td>
        <td> ${contact.firstname} </td>
        <td> ${contact.date} </td>
        <td> ${contact.adress} </td>
        <td> ${contact.mail} </td>
        <tr>`;
        }
    }

    const btnReset = document.querySelector(".reset");

    btnReset.addEventListener("click", function () {
        contactStore.reset();
        displayContactList()
    });

    // function resetContactList() {
    //     contactStore.reset();
    //     displayContactList()

    // }
    const btnLocaliser = document.querySelector(".mapbtn");

    btnLocaliser.addEventListener("click", function () {
        getLocation();
    });

    const fieldsToTrack = ["nom", "prenom", "adressePostale", "email", "dateNaissance"];
    fieldsToTrack.forEach(function (field) {
        const inputField = document.getElementById(field);
        inputField.addEventListener("keyup", function () {
            calcNbChar(inputField);
        });
    });

};

function showMapModal() {
    const mapModalBody = document.querySelector(".modal-body");
    const mapImage = `
    <a href="http://maps.google.com/maps?q=Paris" target="_blank">
      <img src="https://maps.googleapis.com/maps/api/staticmap?markers=Paris&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg" alt="Carte de Paris" class="img-fluid" />
    </a>
  `;
    mapModalBody.innerHTML = mapImage;

    // Afficher la modale de la carte
    var mapModal = new bootstrap.Modal(document.getElementById('mapModal'));
    mapModal.show();
}
function calcNbChar(id) {
    document.querySelector(`#charCount${id}`).textContent = document.querySelector(
        `#${id}`
    ).value.length + ' car.';
    console.log('Nombre de caractères:');

}
