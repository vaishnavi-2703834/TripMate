// =========================
// Trip Planning Form
// =========================

const tripForm = document.getElementById("trip-form");


// =========================
// Generate Itinerary
// =========================

function generateItinerary(tripDetails) {

    const result = document.getElementById("itinerary-result");

    let html = `
        <div class="itinerary-box">

            <h2>Your Trip Itinerary</h2>

            <div class="trip-summary">

                <div>
                    <strong>Destination</strong>
                    <span>${tripDetails.destination}</span>
                </div>

                <div>
                    <strong>Travelers</strong>
                    <span>${tripDetails.travelers}</span>
                </div>

                <div>
                    <strong>Total Days</strong>
                    <span>${tripDetails.days}</span>
                </div>

                <div>
                    <strong>Travel Style</strong>
                    <span>${tripDetails.travelStyle}</span>
                </div>

            </div>

            <div class="daily-plan">
    `;

    const morningActivities = [
        "Visit a famous local attraction",
        "Explore a popular tourist spot",
        "Enjoy a peaceful morning walk",
        "Visit a historical place",
        "Try a local breakfast and explore the area"
    ];

    const afternoonActivities = [
        "Explore the local market",
        "Visit a museum or cultural place",
        "Enjoy local food at a popular restaurant",
        "Go sightseeing around the city",
        "Spend time exploring nearby attractions"
    ];

    const eveningActivities = [
        "Enjoy the sunset at a scenic location",
        "Explore the local streets",
        "Have dinner at a local restaurant",
        "Relax and enjoy the evening",
        "Visit a popular evening attraction"
    ];

    for (let i = 1; i <= tripDetails.days; i++) {

        const morning =
            morningActivities[(i - 1) % morningActivities.length];

        const afternoon =
            afternoonActivities[(i - 1) % afternoonActivities.length];

        const evening =
            eveningActivities[(i - 1) % eveningActivities.length];

        html += `
            <div class="day-card">

                <h4>Day ${i}</h4>

                <p>
                    <strong>🌅 Morning:</strong>
                    ${morning}
                </p>

                <p>
                    <strong>☀️ Afternoon:</strong>
                    ${afternoon}
                </p>

                <p>
                    <strong>🌙 Evening:</strong>
                    ${evening}
                </p>

            </div>
        `;
    }

    html += `
            </div>

            <button type="button" id="regenerate-btn">
                Regenerate Itinerary
            </button>

        </div>
    `;

    result.innerHTML = html;

    document
        .getElementById("regenerate-btn")
        .addEventListener("click", function () {
            generateItinerary(tripDetails);
        });
}


// =========================
// Form Submit
// =========================

tripForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const startingCity =
        document.getElementById("starting-city").value;

    const destination =
        document.getElementById("destination").value;

    const travelers =
        document.getElementById("travelers").value;

    const startDate =
        document.getElementById("start-date").value;

    const endDate =
        document.getElementById("end-date").value;

    const travelType =
        document.getElementById("travel-type").value;

    const budget =
        document.getElementById("budget").value;

    const travelStyle =
        document.getElementById("travel-style").value;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {

        document.getElementById("itinerary-result").innerHTML = `
            <div class="error-message">
                <p>⚠️ End date cannot be before the start date.</p>
                <p>Please select valid travel dates.</p>
            </div>
        `;

        return;
    }

    const timeDifference = end - start;

    const days =
        Math.ceil(
            timeDifference / (1000 * 60 * 60 * 24)
        ) + 1;

    const tripDetails = {

        startingCity: startingCity,
        destination: destination,
        travelers: travelers,
        days: days,
        travelType: travelType,
        budget: budget,
        travelStyle: travelStyle

    };

    generateItinerary(tripDetails);

});


// =========================
// Budget Calculator
// =========================

const calculateBudgetButton =
    document.getElementById("calculate-budget");

calculateBudgetButton.addEventListener("click", function () {

    const travelers =
        Number(
            document.getElementById("budget-travelers").value
        );

    const days =
        Number(
            document.getElementById("budget-days").value
        );

    const budgetType =
        document.getElementById("budget-type").value;

    const result =
        document.getElementById("budget-result");

    if (
        travelers <= 0 ||
        days <= 0 ||
        budgetType === ""
    ) {

        result.innerHTML =
            "⚠️ Please enter all details.";

        return;
    }

    let dailyCost;

    if (budgetType === "budget") {

        dailyCost = 1500;

    } else if (budgetType === "moderate") {

        dailyCost = 3000;

    } else {

        dailyCost = 6000;

    }

    const totalBudget =
        travelers * days * dailyCost;

    result.innerHTML =
        "Estimated Trip Budget: ₹" +
        totalBudget.toLocaleString("en-IN");

});


// =========================
// Back To Top
// =========================

const backToTopButton =
    document.getElementById("back-to-top");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        backToTopButton.style.display = "block";

    } else {

        backToTopButton.style.display = "none";

    }

});

backToTopButton.addEventListener("click", function () {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});


// =========================
// Rating System
// =========================

const ratingStars =
    document.querySelectorAll("#stars span");

const ratingText =
    document.getElementById("rating-text");

const submitRating =
    document.getElementById("submit-rating");

const ratingMessage =
    document.getElementById("rating-message");

let selectedRating = 0;

ratingStars.forEach(function (star) {

    star.addEventListener("click", function () {

        selectedRating =
            Number(star.getAttribute("data-rating"));

        ratingStars.forEach(function (item) {

            item.classList.remove("active");

        });

        for (let i = 0; i < selectedRating; i++) {

            ratingStars[i].classList.add("active");

        }

        ratingText.textContent =
            selectedRating +
            " out of 5 stars selected ⭐";

    });

});

submitRating.addEventListener("click", function () {

    if (selectedRating === 0) {

        ratingMessage.textContent =
            "⚠️ Please select a rating first.";

    } else {

        ratingMessage.textContent =
            "Thank you for rating TripMate! 💚⭐";

    }

});


// =========================
// Travel Checklist
// =========================

const checklistItems =
    document.querySelectorAll(
        ".checklist-item input"
    );

const checklistProgress =
    document.getElementById(
        "checklist-progress"
    );

function updateChecklist() {

    let completed = 0;

    checklistItems.forEach(function (item) {

        if (item.checked) {

            completed++;

        }

    });

    checklistProgress.textContent =
        completed +
        " of " +
        checklistItems.length +
        " items completed";

}

checklistItems.forEach(function (item) {

    item.addEventListener("change", function () {

        updateChecklist();

    });

});


// =========================
// Clear Form
// =========================

const resetTrip =
    document.getElementById("reset-trip");

resetTrip.addEventListener("click", function () {

    document.getElementById("itinerary-result").innerHTML = "";

});
// =========================
// Feedback System
// =========================

const submitFeedback =
    document.getElementById("submit-feedback");

submitFeedback.addEventListener("click", function () {

    const name =
        document.getElementById("feedback-name").value.trim();

    const feedback =
        document.getElementById("feedback-text").value.trim();

    const feedbackMessage =
        document.getElementById("feedback-message");

    if (name === "" || feedback === "") {

        feedbackMessage.textContent =
            "⚠️ Please enter your name and feedback.";

        return;
    }

    feedbackMessage.textContent =
        "Thank you, " + name + "! Your feedback has been submitted. 💚";

    document.getElementById("feedback-name").value = "";
    document.getElementById("feedback-text").value = "";

});