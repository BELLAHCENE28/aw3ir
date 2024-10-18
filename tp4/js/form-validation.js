window.onload = function () {
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

        // Affichage du modal d'erreur ou ajout du contact
        if (!formValid) {
            showErrorModal();
        } else {
            // Si le formulaire est valide, ajout du contact au tableau
            ajouterContact();
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

    // Fonction pour afficher le modal d'erreur
    function showErrorModal() {
        const myModal = new bootstrap.Modal(document.getElementById('myModal'));
        myModal.show();
    }

    // Fonction pour ajouter un contact au tableau
    function ajouterContact() {
        const nom = document.getElementById("nom").value;
        const prenom = document.getElementById("prenom").value;
        const dateNaissance = document.getElementById("dateNaissance").value;
        const adresse = document.getElementById("adressePostale").value;
        const email = document.getElementById("email").value;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${nom}</td>
            <td>${prenom}</td>
            <td>${dateNaissance}</td>
            <td>${adresse}</td>
            <td>${email}</td>
        `;

        contactsTable.appendChild(row);
    }
};
