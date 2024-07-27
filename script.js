document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('seatFinderForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const resultDiv = document.getElementById('result');
    const firstNameDisplay = document.getElementById('firstName');
    const lastNameDisplay = document.getElementById('lastName');
    const categoryDisplay = document.getElementById('category');
    const seatNumbersDisplay = document.getElementById('seatNumbers');

    resultDiv.textContent = ''; 
    firstNameDisplay.textContent = '';
    lastNameDisplay.textContent = '';
    categoryDisplay.textContent = '';
    seatNumbersDisplay.textContent = '';

    const bookingCode = document.getElementById('bookingCode').value.trim().toLowerCase();
    const dataUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSNP9E1oBpSq843OgO65sQEXGqOQQvz0cD9_sq6hPpvGxX62n9k8dyWByJ70OyP_AG4sZdx12RcLzCh/pub?output=csv'; // Replace with your actual CSV file name

    try {
        const response = await fetch(dataUrl, { mode: 'cors' });
        const data = await response.text();
        console.log('Fetched data:', data);

        const rows = data.split('\n').slice(1); // Skip header row
        console.log('Rows:', rows);

        const dataFound = findSeatDetails(bookingCode, rows);
        console.log('Data found:', dataFound); // Log the found data

        if (dataFound) {
            // ... (rest of the code to display the data)
        } else {
            resultDiv.textContent = 'Booking code not found. Please check your code and try again.';
        }
    } catch (error) {
        resultDiv.textContent = 'Error retrieving seat information.';
        console.error(error);
    }
  });

  // ... (findSeatDetails function remains the same)
});
