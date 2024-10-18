
window.onload = function () {
    console.log("DOM ready!");

    const form = document.querySelector("#myForm"); // Assurez-vous que le bon ID de formulaire est utilisé
    const resultContainer = document.getElementById("resultContainer"); // Récupérer le conteneur de résultats

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche le comportement par défaut de soumission

        let formValid = true;

        const fields = ["nom", "prenom", "adressePostale"]; // Changez ici si besoin

        fields.forEach(function (field) {
            const input = document.getElementById(field);
            if (input.value.trim().length < 5) {
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
                formValid = false;
            } else {
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
            }
        });

        const emailInput = document.getElementById("email");
        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            emailInput.classList.add("is-invalid");
            emailInput.classList.remove("is-valid");
            formValid = false;
        } else {
            emailInput.classList.remove("is-invalid");
            emailInput.classList.add("is-valid");
        }

        const dateNaissanceInput = document.getElementById("dateNaissance");
        const dateNaissance = dateNaissanceInput.value;
        const birthdayDate = new Date(dateNaissance);
        const birthdayTimestamp = birthdayDate.getTime();
        const nowTimestamp = Date.now();

        if (birthdayTimestamp >= nowTimestamp || isNaN(birthdayTimestamp)) {
            dateNaissanceInput.classList.add("is-invalid");
            dateNaissanceInput.classList.remove("is-valid");
            formValid = false;
        } else {
            dateNaissanceInput.classList.remove("is-invalid");
            dateNaissanceInput.classList.add("is-valid");
        }


        if (formValid) {
            showMapModal();

            displayFormResults();
        } else {
            showErrorModal();
        }
    });

    function displayFormResults() {
        const nom = document.getElementById("nom").value;
        const prenom = document.getElementById("prenom").value;
        const dateNaissance = document.getElementById("dateNaissance").value;
        const adressePostale = document.getElementById("adressePostale").value;
        const email = document.getElementById("email").value;

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateNaissance).toLocaleDateString('fr-FR', options);

        const resultContainer = document.getElementById("resultContainer");
        resultContainer.innerHTML = `
            <strong>Résultats du formulaire :</strong><br>
            Bonjour ${prenom} ${nom}, vous êtes né(e) le ${formattedDate}.<br>
            Adresse postale : ${adressePostale}<br>
            Email : ${email}
        `;
    }


    function showErrorModal() {
        var myModal = new bootstrap.Modal(document.getElementById('myModal'));
        myModal.show();
    }

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

    // Fonction de validation d'email
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
};

