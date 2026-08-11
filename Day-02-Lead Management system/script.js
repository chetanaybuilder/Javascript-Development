// DOM references used throughout the lead dashboard
const leadContainer = document.getElementById("leadContainer");
const totalleads = document.getElementById("totalLeads");
const addleadbtn = document.getElementById("addLeadBtn");
const modal = document.getElementById("modal");

const nameInput = document.getElementById("leadName");
const companyInput = document.getElementById("leadCompany");
const emailInput = document.getElementById("leadEmail");
const statusInput = document.getElementById("leadStatus");

const leadForm = document.getElementById("leadForm");
const closeModal = document.getElementById("closeModal");

const statusFilter = document.getElementById("statusFilter");

const newLeads = document.getElementById("newLeads");
const contactedLeads = document.getElementById("contactedLeads");
const wonLeads = document.getElementById("wonLeads");


// Example lead records displayed by default
let leads = [
    {
        name: "John Doe",
        company: "habibi",
        email: "john.doe@example.com",
        status: "New"
    },
    {
        name: "Jane Smith",
        company: "Acme Corp",
        email: "jane.smith@example.com",
        status: "Contacted"
    },
    {
        name: "jacob",
        company: "habibi",
        email: "jacob@example.com",
        status: "New"
    },
    {
        name: "alice",
        company: "nova",
        email: "alice@example.com",
        status: "Won"
    }
];


// Update dashboard counters
function updateStats() {

    totalleads.textContent = `Total Leads: ${leads.length}`;

    newLeads.textContent = leads.filter(function(lead) {
        return lead.status === "New";
    }).length;

    contactedLeads.textContent = leads.filter(function(lead) {
        return lead.status === "Contacted";
    }).length;

    wonLeads.textContent = leads.filter(function(lead) {
        return lead.status === "Won";
    }).length;
}


// Render leads
function renderLeads(leadsToRender = leads) {

    leadContainer.innerHTML = "";

    for (const lead of leadsToRender) {

        // Main card
        let leadCard = document.createElement("div");

        // Name
        let nameCard = document.createElement("h3");
        nameCard.textContent = lead.name;

        // Company
        let companyCard = document.createElement("div");
        companyCard.textContent = lead.company;

        // Email
        let emailCard = document.createElement("div");
        emailCard.textContent = lead.email;

        // Status
        let statusCard = document.createElement("div");
        statusCard.textContent = lead.status;

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {

            const leadIndex = leads.indexOf(lead);

            leads.splice(leadIndex, 1);

            renderLeads();

            updateStats();
        });


        // Put everything inside card
        leadCard.append(
            nameCard,
            companyCard,
            emailCard,
            statusCard,
            deleteBtn
        );

        // Put card inside container
        leadContainer.appendChild(leadCard);
    }
}


// Initialize the dashboard display when the page loads
renderLeads();
updateStats();


// Open add-lead modal dialog
addleadbtn.addEventListener("click", function() {
    modal.style.display = "block";
});


// Close add-lead modal dialog
closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});


// Handle lead form submission and update lead list
leadForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newLead = {
        name: nameInput.value,
        company: companyInput.value,
        email: emailInput.value,
        status: statusInput.value
    };

    leads.push(newLead);
    renderLeads();
    updateStats();
    leadForm.reset();
    modal.style.display = "none";
});


// Filter displayed leads by selected status
statusFilter.addEventListener("change", function() {
    const selectedStatus = statusFilter.value;

    if (selectedStatus === "All") {
        renderLeads();
        return;
    }

    const filteredLeads = leads.filter(function(lead) {
        return lead.status === selectedStatus;
    });

    renderLeads(filteredLeads);
});