document.addEventListener('DOMContentLoaded', function () {
  const resultDiv = document.getElementById('result');
  const firstNameDisplay = document.getElementById('firstName');
  const lastNameDisplay = document.getElementById('lastName');
  const categoryDisplay = document.getElementById('category');
  const seatNumbersDisplay = document.getElementById('seatNumbers');
  const seatFinderForm = document.getElementById('seatFinderForm');


    seatFinderForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        resultDiv.textContent = '';
        firstNameDisplay.textContent = '';
        lastNameDisplay.textContent = '';
        categoryDisplay.textContent = '';
        seatNumbersDisplay.textContent = '';

        const bookingCode = document.getElementById('bookingCode').value.trim().toLowerCase();

        // Update the dataUrl with your published Google Sheet URL
        const dataUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSNP9E1oBpSq843OgO65sQEXGqOQQvz0cD9_sq6hPpvGxX62n9k8dyWByJ70OyP_AG4sZdx12RcLzCh/pub?output=csv'; // Replace with your actual URL

        try {
            const response = await fetch(dataUrl);
            const data = await response.text();
            // Split rows by CRLF or LF
            const rows = data.split(/\r?\n/).slice(1); // Skip header row

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
        for (const row of rows) {
            const columns = row.split(',');
            // Remove quotes and extra spaces before comparing
            if (columns[0].replace(/['"]+/g, '').trim().toLowerCase() === bookingCode) {
                return {
                    firstName: columns[2].trim(),
                    lastName: columns[3].trim(),
                    category: columns[4].trim(),
                    seatNumbers: columns[1].split(' ').map(seat => seat.trim())
                };
            }
        }
        return null; 
    }

});

