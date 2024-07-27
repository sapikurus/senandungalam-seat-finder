// ... (Google Sheet URL and fetch function remain the same)

const form = document.getElementById('seatFinderForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  resultDiv.textContent = ''; // Clear previous results

  const bookingCode = document.getElementById('bookingCode').value;
  //const dataUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSNP9E1oBpSq843OgO65sQEXGqOQQvz0cD9_sq6hPpvGxX62n9k8dyWByJ70OyP_AG4sZdx12RcLzCh/pub?output=csv'; 
   const dataUrl = 'seat_finder.csv';

  try {
    const response = await fetch(dataUrl);
    const data = await response.text();
    const rows = data.split('\n');
    const seatNumber = findSeatNumber(bookingCode, rows);

    if (seatNumber) {
      resultDiv.textContent = `Your Seat: ${seatNumber}`;
    } else {
      resultDiv.textContent = 'Booking code not found.';
    }
  } catch (error) {
    resultDiv.textContent = 'Error retrieving seat information.';
    console.error(error);
  }
});
//....(findSeatNumber function remains the same)
