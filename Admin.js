"use strict";

/*
=========================================
KOMBOSHA SECONDARY SCHOOL
ADMIN DASHBOARD
PART 2
=========================================
*/


/* =========================
   ELEMENTS
========================= */

const navItems =
    document.querySelectorAll(".admin-nav-item");

const sections =
    document.querySelectorAll(".admin-section");

const pageTitle =
    document.getElementById("pageTitle");

const mobileMenu =
    document.getElementById("mobileMenu");

const sidebar =
    document.getElementById("sidebar");

const logoutBtn =
    document.getElementById("logoutBtn");

const quickCards =
    document.querySelectorAll(".quick-card");


/* =========================
   SECTION NAMES
========================= */

const sectionNames = {

    dashboard: "Dashboard",

    students: "Students",

    notes: "Notes",

    tutorials: "Tutorials",

    news: "News",

    assignments: "Assignments",

    payments: "Payments",

    attendance: "Attendance",

    settings: "Settings"

};


/* =========================
   CHANGE SECTION
========================= */

function showSection(sectionId) {

    sections.forEach(function (section) {

        section.classList.remove("active");

    });


    navItems.forEach(function (item) {

        item.classList.remove("active");

    });


    const selectedSection =
        document.getElementById(sectionId);

    const selectedNav =
        document.querySelector(
            '[data-section="' +
            sectionId +
            '"]'
        );


    if (selectedSection) {

        selectedSection.classList.add("active");

    }


    if (selectedNav) {

        selectedNav.classList.add("active");

    }


    if (pageTitle) {

        pageTitle.textContent =
            sectionNames[sectionId] ||
            "Dashboard";

    }


    sidebar.classList.remove("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   SIDEBAR NAVIGATION
========================= */

navItems.forEach(function (item) {

    item.addEventListener(
        "click",
        function () {

            const sectionId =
                item.dataset.section;

            showSection(sectionId);

        }
    );

});


/* =========================
   QUICK ACTIONS
========================= */

quickCards.forEach(function (card) {

    card.addEventListener(
        "click",
        function () {

            const sectionId =
                card.dataset.go;

            showSection(sectionId);

        }
    );

});


/* =========================
   MOBILE MENU
========================= */

mobileMenu.addEventListener(
    "click",
    function () {

        sidebar.classList.toggle("show");

    }
);


/* =========================
   LOGOUT
========================= */

logoutBtn.addEventListener(
    "click",
    function () {

        const confirmLogout =
            confirm(
                "Are you sure you want to logout?"
            );

        if (!confirmLogout) {
            return;
        }

        window.location.href =
            "index.html";

    }
);


/* =========================
   NOTE MODAL
========================= */

const noteModal =
    document.getElementById("noteModal");

const openNoteForm =
    document.getElementById("openNoteForm");

const closeNoteForm =
    document.getElementById("closeNoteForm");

const noteForm =
    document.getElementById("noteForm");


function openNoteModal() {

    noteModal.classList.add("show");

    document.body.style.overflow =
        "hidden";
}


function closeNoteModal() {

    noteModal.classList.remove("show");

    document.body.style.overflow =
        "";
}


openNoteForm.addEventListener(
    "click",
    openNoteModal
);


closeNoteForm.addEventListener(
    "click",
    closeNoteModal
);


noteModal.addEventListener(
    "click",
    function (event) {

        if (event.target === noteModal) {

            closeNoteModal();

        }

    }
);


/* =========================
   ADD NOTE
========================= */

noteForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const title =
            document
                .getElementById("noteTitle")
                .value
                .trim();

        const grade =
            document
                .getElementById("noteGrade")
                .value;

        const subject =
            document
                .getElementById("noteSubject")
                .value
                .trim();

        const description =
            document
                .getElementById("noteDescription")
                .value
                .trim();

        const fileInput =
            document.getElementById("noteFile");

        const file =
            fileInput.files[0];


        if (
            !title ||
            !grade ||
            !subject ||
            !file
        ) {

            alert(
                "Please complete all required fields."
            );

            return;

        }


        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];


        if (
            !allowedTypes.includes(file.type) &&
            !file.name.match(
                /\.(pdf|doc|docx)$/i
            )
        ) {

            alert(
                "Please select a PDF, DOC or DOCX file."
            );

            return;

        }


        /*
        -------------------------------------
        DEMO NOTE OBJECT
        -------------------------------------
        In a later part this will be stored
        in the real database/server.
        */

        const note = {

            id: Date.now(),

            title: title,

            grade: grade,

            subject: subject,

            description: description,

            fileName: file.name,

            createdAt:
                new Date().toLocaleString()

        };


        console.log(
            "New note:",
            note
        );


        alert(
            "Note added successfully!\n\n" +
            "Title: " + title +
            "\nGrade: " + grade +
            "\nSubject: " + subject +
            "\nFile: " + file.name
        );


        noteForm.reset();

        closeNoteModal();

    }
);


/* =========================
   PLACEHOLDER BUTTONS
========================= */

const addTutorialBtn =
    document.getElementById(
        "addTutorialBtn"
    );

const addNewsBtn =
    document.getElementById(
        "addNewsBtn"
    );


if (addTutorialBtn) {

    addTutorialBtn.addEventListener(
        "click",
        function () {

            alert(
                "Tutorial management will be added in the next part."
            );

        }
    );

}


if (addNewsBtn) {

    addNewsBtn.addEventListener(
        "click",
        function () {

            alert(
                "News management will be added in the next part."
            );

        }
    );

}


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeNoteModal();

        }

    }
);
