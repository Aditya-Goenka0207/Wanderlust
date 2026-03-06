(() => {
  "use strict";

  // Fetch all forms with Bootstrap validation
  const forms = document.querySelectorAll(".needs-validation");

  // Loop through forms
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        // If form is invalid
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        // Add Bootstrap validation class
        form.classList.add("was-validated");
      },
      false,
    );
  });
})();
