document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('seatFinderForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      const resultDiv = document.getElementById('result');
      const firstNameDisplay = document.getElementById('firstName');
      const lastNameDisplay = document.getElementById('lastName');
      const categoryDisplay = document.getElementById('category');
      const seatNumbersDisplay = document.getElementById('seatNumbers');

      resultDiv.textContent = ''; // Clear previous results
      firstNameDisplay.textContent = '';
      lastNameDisplay.textContent = '';
      categoryDisplay.textContent = '';
      seatNumbersDisplay.textContent = '';

      const bookingCode = document.getElementById('bookingCode').value.trim().toLowerCase();
      const dataUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSNP9E1oBpSq843OgO65sQEXGqOQQvz0cD9_sq6hPpvGxX62n9k8dyWByJ70OyP_AG4sZdx12RcLzCh/pub?output=csv'; // Replace with your actual CSV file name

      try {
          const response = await fetch(dataUrl, { mode: 'cors' });
          const data = await response.text();
          const rows = data.split('\n').slice(1); // Skip header row
          const dataFound = findSeatDetails(bookingCode, rows);

          if (dataFound) {
              firstNameDisplay.textContent = `First Name: ${dataFound.firstName}`;
              lastNameDisplay.textContent = `Last Name: ${dataFound.lastName}`;
              categoryDisplay.textContent = `Category: ${dataFound.category}`;
              seatNumbersDisplay.textContent = `Your Seat(s): ${dataFound.seatNumbers.join(', ')}`;
          } else {
              resultDiv.textContent = 'Booking code not found. Please check your code and try again.';
          }
      } catch (error) {
          resultDiv.textContent = 'Error retrieving seat information.';
          console.error(error);
      }
  });

  function findSeatDetails(bookingCode, rows) {
    // ...(Your existing findSeatDetails function)
  }
});
