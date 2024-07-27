document.getElementById('seatFinderForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = ''; 

    const bookingCode = document.getElementById('bookingCode').value.trim().toLowerCase();
    const dataUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSNP9E1oBpSq843OgO65sQEXGqOQQvz0cD9_sq6hPpvGxX62n9k8dyWByJ70OyP_AG4sZdx12RcLzCh/pub?output=csv'; // Replace with your actual CSV file name

    try {
        const response = await fetch(dataUrl, { mode: 'cors' });
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Skip header row
        const seatNumbers = findSeatNumbers(bookingCode, rows);

        if (seatNumbers) {
            resultDiv.textContent = `Your Seat(s): ${seatNumbers}`;
        } else {
            resultDiv.textContent = 'Booking code not found. Please check your code and try again.';
        }
    } catch (error) {
        resultDiv.textContent = 'Error retrieving seat information.';
        console.error(error);
    }
});

function findSeatNumbers(bookingCode, rows) {
  for (const row of rows) {
    const columns = row.split(',');
    // Remove quotes and extra spaces before comparing
    if (columns[0].replace(/['"]+/g, '').trim().toLowerCase() === bookingCode) {
      // Split seats by spaces and trim each seat
      return columns[1].replace(/['"]+/g, '').split(' ').map(seat => seat.trim());
    }
  }
  return null; // Return null if booking code is not found
}
