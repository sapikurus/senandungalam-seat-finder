// ... (Google Sheet URL and fetch function remain the same)

const form = document.getElementById('seatFinderForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  resultDiv.textContent = ''; // Clear previous results

  const bookingCode = document.getElementById('bookingCode').value;
  const dataUrl = 'seat_finder.csv'; 
  
  try {
    const response = await fetch(dataUrl, { mode: 'cors' }) // <-- Replace this line
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          return response.text();
        })

    const data = await response.text();
    const rows = data.split('\n');

    // Log the raw data and booking code to the console
    console.log("Raw data from CSV/Sheet:", rows);
    console.log("Booking code entered:", bookingCode);

    const seatNumbers = findSeatNumbers(bookingCode, rows);

    if (seatNumbers.length > 0) {
      resultDiv.textContent = `Your Seat(s): ${seatNumbers.join(', ')}`;
    } else {
      resultDiv.textContent = 'Booking code not found. Please check your code and try again.';
    }
  } catch (error) {
    resultDiv.textContent = 'Error retrieving seat information.';
    console.error(error);
  }
});
//....(findSeatNumber function remains the same)
