document.addEventListener("DOMContentLoaded", function () {
    // Simulated data, replace this with actual logic or API responses later
    let userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1-234-567-890",
        uploadedDocs: []
    };

    const viewModeSection = document.getElementById("profile-view");
    const editModeSection = document.getElementById("profile-edit");

    const viewName = document.getElementById("view-name");
    const viewEmail = document.getElementById("view-email");
    const viewPhone = document.getElementById("view-phone");
    const documentDisplay = document.querySelector(".upload-section p:nth-child(2)");

    const editNameInput = document.getElementById("edit-name");
    const editEmailInput = document.getElementById("edit-email");
    const editPhoneInput = document.getElementById("edit-phone");
    const fileInput = document.getElementById("upload-docs");

    function toggleEdit() {
        // Populate the edit form with existing user data
        editNameInput.value = userData.name;
        editEmailInput.value = userData.email;
        editPhoneInput.value = userData.phone;

        // Show the edit section and hide the view section
        editModeSection.style.display = "block";
        viewModeSection.style.display = "none";
    }

    function saveProfile() {
        const updatedName = editNameInput.value;
        const updatedEmail = editEmailInput.value;
        const updatedPhone = editPhoneInput.value;

        // Handle file uploads
        const files = fileInput.files;
        const uploadedFileNames = [];
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                uploadedFileNames.push(files[i].name);
            }
        }

        // Update the user data object
        userData.name = updatedName;
        userData.email = updatedEmail;
        userData.phone = updatedPhone;
        userData.uploadedDocs = uploadedFileNames;

        // Reflect the changes back to the view section
        viewName.innerText = userData.name;
        viewEmail.innerText = userData.email;
        viewPhone.innerText = userData.phone;
        if (userData.uploadedDocs.length > 0) {
            documentDisplay.innerHTML = `Uploaded Files: <b>${userData.uploadedDocs.join(", ")}</b>`;
        } else {
            documentDisplay.innerText = "No documents uploaded";
        }

        // Switch back to view mode
        editModeSection.style.display = "none";
        viewModeSection.style.display = "block";
    }

    // Attach events
    const editButton = document.querySelector(".upload-section button");
    editButton.addEventListener("click", toggleEdit);

    const saveButton = document.querySelector("button[onclick='saveProfile()']");
    saveButton.addEventListener("click", saveProfile);
});
function performSearch() {
    const serviceName = document.getElementById('serviceName').value;
    const location = document.getElementById('location').value;
    const specialty = document.getElementById('specialty').value;

    alert(`Searching for: ${serviceName || "All Services"} in ${location || "All Locations"} with ${specialty || "All Specialties"}`);
    // Simulate dynamic search results or implement actual functionality
}

function viewDetails(serviceName) {
    alert(`Viewing details for: ${serviceName}`);
    // Here you can redirect to a details page or open a modal with the service's information
}

// Mock data for medical centers and specialists in Armenia
const medicalCenters = [
    {
        name: "Erebouni Medical Center",
        location: "Yerevan",
        specialty: "Cardiology",
        details: "Erebouni Medical Center offers comprehensive cardiology services with state-of-the-art technology."
    },
    {
        name: "Gyumri Medical Center",
        location: "Gyumri",
        specialty: "Dermatology",
        details: "Specializing in dermatology, Gyumri Medical Center is known for its excellent skin care treatments."
    },
    {
        name: "Vanadzor Medical Clinic",
        location: "Vanadzor",
        specialty: "Orthopedics",
        details: "Vanadzor Medical Clinic provides orthopedic services, including fracture treatments and rehabilitation."
    },
];

// Function to perform search
function performSearch() {
    const serviceName = document.getElementById('serviceName').value.toLowerCase();
    const location = document.getElementById('location').value;
    const specialty = document.getElementById('specialty').value;
    const resultsContainer = document.querySelector('.search-results');
    resultsContainer.innerHTML = '';

    const filteredResults = medicalCenters.filter(center => {
        return (
            (!serviceName || center.name.toLowerCase().includes(serviceName)) &&
            (!location || center.location === location) &&
            (!specialty || center.specialty === specialty)
        );
    });

    if (filteredResults.length > 0) {
        filteredResults.forEach(center => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result-item');
            resultDiv.innerHTML = `
                <h3>${center.name}</h3>
                <p>Location: ${center.location}</p>
                <p>Specialty: ${center.specialty}</p>
                <button onclick="viewDetails('${center.name}')">View Details</button>
            `;
            resultsContainer.appendChild(resultDiv);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found. Try adjusting your search criteria.</p>';
    }
}

// Function to display details in modal
function viewDetails(centerName) {
    const center = medicalCenters.find(center => center.name === centerName);
    const detailsContent = document.getElementById('detailsContent');
    detailsContent.innerHTML = `
        <h3>${center.name}</h3>
        <p><strong>Location:</strong> ${center.location}</p>
        <p><strong>Specialty:</strong> ${center.specialty}</p>
        <p>${center.details}</p>
    `;
    document.getElementById('detailsModal').classList.remove('hidden');
    document.getElementById('detailsModal').style.display = 'flex';
}
// When the user clicks on a doctor, store the name in localStorage
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
        localStorage.setItem('selectedDoctor', this.textContent);
    });
});

// Function to close modal
function closeModal() {
    document.getElementById('detailsModal').classList.add('hidden');
    document.getElementById('detailsModal').style.display = 'none';
}

//Booking_appintments
document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");
    const paymentSection = document.getElementById("payment-section");
    const selectedDateDisplay = document.getElementById("selected-date-display");
    const paymentForm = document.getElementById("payment-form");
  
    // FullCalendar initialization
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      selectable: true,
      contentHeight:"auto",
      dateClick: function (info) {
        // Display the selected date and show the payment section
        const selectedDate = info.dateStr;
        selectedDateDisplay.textContent = `Selected Date: ${selectedDate}`;
        paymentSection.classList.remove("hidden");
      },
    });
  
    calendar.render();
  
    // Handle payment form submission
    paymentForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const paymentAmount = document.getElementById("payment-amount").value;
      const cardNumber = document.getElementById("card-number").value;
      const expiryDate = document.getElementById("expiry-date").value;
      const cvv = document.getElementById("cvv").value;
      const selectedDate = selectedDateDisplay.textContent.split(": ")[1];
  
      if (paymentAmount && cardNumber && expiryDate && cvv && selectedDate) {
        alert(
          `Booking Confirmed!\nDate: ${selectedDate}\nAmount: $${paymentAmount}`
        );
  
        // Save booking to localStorage
        const bookings = JSON.parse(localStorage.getItem("bookedDates")) || [];
        bookings.push({ date: selectedDate, time: "Not specified" });
        localStorage.setItem("bookedDates", JSON.stringify(bookings));
  
        // Reset the form and hide the payment section
        paymentForm.reset();
        paymentSection.classList.add("hidden");
      } else {
        alert("Please fill out all required fields.");
      }
    });
  });
  
  //my_bookings

  document.addEventListener("DOMContentLoaded", () => {
    const bookingsContainer = document.getElementById("bookings-container");
    const editModal = document.getElementById("edit-modal");
    const closeModal = document.getElementById("close-modal");
    const editForm = document.getElementById("edit-form");
  
    let bookings = JSON.parse(localStorage.getItem("bookedDates")) || [];
    let selectedBookingIndex = null;
  
    function displayBookings() {
      if (bookings.length === 0) {
        bookingsContainer.innerHTML = "<p>No bookings available.</p>";
        return;
      }
      bookingsContainer.innerHTML = bookings
        .map(
          (booking, index) => `
            <div class="booking">
            <br>
              <p><strong>Date:</strong> ${booking.date}</p>
              <br>
              <p><strong>Time:</strong> ${booking.time}</p>
              <button onclick="editBooking(${index})">Edit</button>
              <button onclick="cancelBooking(${index})">Cancel</button>
            </div>
          `
        )
        .join("");
    }
  
    window.cancelBooking = (index) => {
      if (confirm("Are you sure you want to cancel this booking?")) {
        bookings.splice(index, 1);
        localStorage.setItem("bookedDates", JSON.stringify(bookings));
        displayBookings();
        alert("Booking cancelled.");
      }
    };
  
    window.editBooking = (index) => {
      selectedBookingIndex = index;
      const booking = bookings[index];
      document.getElementById("edit-date").value = booking.date;
      document.getElementById("edit-time").value = booking.time;
      editModal.classList.remove("hidden");
    };
  
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newDate = document.getElementById("edit-date").value;
      const newTime = document.getElementById("edit-time").value;
  
      if (selectedBookingIndex !== null) {
        bookings[selectedBookingIndex] = { date: newDate, time: newTime };
        localStorage.setItem("bookedDates", JSON.stringify(bookings));
        displayBookings();
        alert("Booking updated successfully!");
        selectedBookingIndex = null;
        editModal.classList.add("hidden");
      }
    });
  
    closeModal.addEventListener("click", () => {
      editModal.classList.add("hidden");
      selectedBookingIndex = null;
    });
  
    displayBookings();
  });
  
 //Reviews

  document.addEventListener("DOMContentLoaded", () => {
  const reviewsList = document.getElementById("reviews-list");
  const reviewForm = document.getElementById("review-form");
  const doctorSelect = document.getElementById("doctor-select");
  const reviewText = document.getElementById("review-text");
  const starRatingDiv = document.getElementById("star-rating");

  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // Load doctor list dynamically
  const doctors = [
    { name: "Dr. Armen Sargsyan", clinic: "Yerevan Medical Center" },
    { name: "Dr. Ani Hakobyan", clinic: "Armenia Republican Hospital" },
    { name: "Dr. Gayane Grigoryan", clinic: "Saint Gregory Illuminator Hospital" }
  ];

  doctors.forEach((doctor) => {
    const option = document.createElement("option");
    option.value = doctor.name;
    option.textContent = `${doctor.name} - ${doctor.clinic}`;
    doctorSelect.appendChild(option);
  });

  // Star Rating Logic
  const maxStars = 5;
  let selectedRating = 0;

  for (let i = 1; i <= maxStars; i++) {
    const star = document.createElement("span");
    star.classList.add("star");
    star.textContent = "★";
    star.dataset.value = i;

    star.addEventListener("click", () => {
      selectedRating = i;
      updateStarRating();
    });

    starRatingDiv.appendChild(star);
  }

  function updateStarRating() {
    const stars = starRatingDiv.querySelectorAll(".star");
    stars.forEach((star) => {
      star.classList.toggle("selected", parseInt(star.dataset.value) <= selectedRating);
    });
  }

  // Display Reviews
  function displayReviews() {
    reviewsList.innerHTML = "";

    if (reviews.length === 0) {
      reviewsList.textContent = "No reviews yet. Be the first to review!";
      return;
    }

    reviews.forEach((review) => {
      const reviewItem = document.createElement("div");
      reviewItem.classList.add("review-item");
      reviewItem.innerHTML = `
        <h3>${review.doctor}</h3>
        <div>${"★".repeat(review.rating)}${"☆".repeat(maxStars - review.rating)}</div>
        <p>${review.text}</p>
      `;
      reviewsList.appendChild(reviewItem);
    });
  }



  // Handle Form Submission
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const doctor = doctorSelect.value;
    const review = reviewText.value;

    if (!doctor || !selectedRating || !review) {
      alert("Please fill out all fields.");
      return;
    }

    reviews.push({ doctor, rating: selectedRating, text: review });
    localStorage.setItem("reviews", JSON.stringify(reviews));

    alert("Your review has been submitted.");
    reviewForm.reset();
    selectedRating = 0;
    updateStarRating();
    displayReviews();
  });

  // Initialize Page
  displayReviews();
});

// scripts.js

let unreadMessages = 0;

// Function to simulate receiving a new message
function receiveMessage() {
    unreadMessages++;
    updateChatNotification();
}

// Function to update the chat notification badge
function updateChatNotification() {
    const badge = document.getElementById("chat-notification");
    if (unreadMessages > 0) {
        badge.textContent = unreadMessages;
        badge.setAttribute("data-count", unreadMessages);
    } else {
        badge.setAttribute("data-count", "0");
    }
}

// Initialize badge on page load
document.addEventListener("DOMContentLoaded", () => {
    updateChatNotification();
});

// Define the function
function updateChatNotification() {
    console.log("Chat notification badge updated!");
    // Implement the logic for updating chat notifications here.
}

    // Example: Simulate a new message every 5 seconds
setInterval(receiveMessage, 5000);

let totalAmount = 0;
let hotelSelectedPrice = 0;
let taxiSelectedFare = 0;

// Simulated hotel and taxi database
const armenianHotels = [
  { name: "Armenian Grand Hotel", location: "Yerevan", pricePerNight: 100, website: "https://armenianhotel.com" },
  { name: "City View Hotel", location: "Yerevan", pricePerNight: 120, website: "https://cityviewhotel.com" },
  { name: "Luxury Lakeview Inn", location: "Dilijan", pricePerNight: 200, website: "https://luxurylakeviewinn.com" }
];

const armenianTaxis = [
  { driver: "Driver John", location: "Airport", fare: 20 },
  { driver: "Driver Sarah", location: "Airport", fare: 25 },
  { driver: "Driver Mike", location: "Yerevan Center", fare: 30 }
];

// Booked items
let bookedItems = [];

// Function to calculate the number of nights between two dates
function calculateNights(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start >= end) {
    alert("End date must be after the start date.");
    return 0;
  }

  const timeDiff = end - start;
  const nights = timeDiff / (1000 * 60 * 60 * 24);
  return nights;
}

// Function to dynamically show hotels
function searchHotels(destination) {
  destination = destination.trim();
  if (!destination) {
    alert("Please enter a destination.");
    return;
  }

  const results = armenianHotels.filter(hotel =>
    hotel.location.toLowerCase().includes(destination.toLowerCase())
  );

  if (results.length > 0) {
    let hotelListHTML = "";
    results.forEach((hotel, index) => {
      hotelListHTML += `
        <div>
          ${hotel.name} - $${hotel.pricePerNight} per night.
          <a href="${hotel.website}" target="_blank">Website</a><br>
          Start Date: <input type="date" id="startDate_${index}">
          End Date: <input type="date" id="endDate_${index}">
          <button onclick="bookHotel(${hotel.pricePerNight}, ${index})">Book Hotel</button>
        </div>
      `;
    });
    document.getElementById('hotelResults').innerHTML = hotelListHTML;
  } else {
    alert("No hotels found.");
    document.getElementById('hotelResults').innerHTML = "";
  }
}

// Book hotel logic
function bookHotel(pricePerNight, hotelIndex) {
  const startDate = document.getElementById(`startDate_${hotelIndex}`).value;
  const endDate = document.getElementById(`endDate_${hotelIndex}`).value;

  if (!startDate || !endDate) {
    alert("Please enter valid dates.");
    return;
  }

  const nights = calculateNights(startDate, endDate);
  if (nights <= 0) {
    alert("Invalid date range.");
    return;
  }

  const cost = nights * pricePerNight;
  totalAmount += cost;
  hotelSelectedPrice = cost;
  bookedItems.push({ type: "hotel", price: cost });
  updateTotalUI();
  updateBookingsUI();
  alert(`Hotel successfully booked for ${nights} nights. Cost = $${cost}`);
}

// Search taxis logic
function searchTaxis(location) {
  location = location.trim();
  if (!location) {
    alert("Please enter a location.");
    return;
  }

  const results = armenianTaxis.filter(taxi =>
    taxi.location.toLowerCase().includes(location.toLowerCase())
  );

  if (results.length > 0) {
    let taxiListHTML = "";
    results.forEach((taxi, index) => {
      taxiListHTML += `
        <div>
          ${taxi.driver} - Fare $${taxi.fare}.
          <button onclick="bookTaxi(${taxi.fare})">Book Taxi</button>
        </div>
      `;
    });
    document.getElementById('taxiResults').innerHTML = taxiListHTML;
  } else {
    alert("No taxis found.");
    document.getElementById('taxiResults').innerHTML = "";
  }
}

// Book taxi logic
function bookTaxi(fare) {
  totalAmount += fare;
  taxiSelectedFare = fare;
  bookedItems.push({ type: "taxi", price: fare });
  updateTotalUI();
  updateBookingsUI();
  alert(`Taxi successfully booked. Cost = $${fare}`);
}

// Payment logic
function makePayment() {
  const cardNumber = document.getElementById('cardNumber').value.trim();
  const cardHolder = document.getElementById('cardHolder').value.trim();
  const expiry = document.getElementById('expiry').value.trim();
  const cvv = document.getElementById('cvv').value.trim();

  if (!cardNumber || !cardHolder || !expiry || !cvv) {
    alert("Please fill in all payment details.");
    return;
  }

  alert(`Payment Successful! Total paid = $${totalAmount}`);
  resetBookings();
}

// Update the UI with bookings
function updateBookingsUI() {
  let bookingsHTML = "";
  bookedItems.forEach((booking, index) => {
    bookingsHTML += `
      <div>
        ${booking.type === "hotel" ? "Hotel Booking" : "Taxi Booking"} - $${booking.price}
        <button onclick="cancelBooking(${index})">Cancel Booking</button>
      </div>
    `;
  });
  document.getElementById('myBookings').innerHTML = bookingsHTML;
}

// Cancel bookings logic
function cancelBooking(index) {
  totalAmount -= bookedItems[index].price;
  bookedItems.splice(index, 1);
  updateTotalUI();
  updateBookingsUI();
  alert("Booking canceled.");
}

// Update total amount display
function updateTotalUI() {
  document.getElementById('totalAmount').innerText = totalAmount;
}

// Reset logic after payment
function resetBookings() {
  totalAmount = 0;
  bookedItems = [];
  updateTotalUI();
  updateBookingsUI();
}
