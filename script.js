form.addEventListener('submit', async (event) => {
  event.preventDefault();
  resultDiv.textContent = ''; 

  const bookingCode = document.getElementById('bookingCode').value;
  const dataUrl = 'seat_finder.csv'; 
  
  try {
    const response = await fetch(dataUrl);
    const data = await response.text();
    const rows = data.split('\n');
    const seatNumbers = findSeatNumbers(bookingCode, rows); // Get multiple seat numbers

    if (seatNumbers.length > 0) {
      resultDiv.textContent = `Your Seat(s): ${seatNumbers.join(', ')}`; // Format multiple seats
    } else {
      resultDiv.textContent = 'Booking code not found.';
    }
  } catch (error) {
    resultDiv.textContent = 'Error retrieving seat information.';
    console.error(error);
  }
});

function findSeatNumbers(bookingCode, rows) {
  for (const row of rows) {
    const columns = row.split(',');
    // Trim spaces and convert to lowercase for case-insensitive comparison
    if (columns[0].trim().toLowerCase() === bookingCode.trim().toLowerCase()) { 
      // Split seats into array, trim spaces, and filter out empty entries
      return columns[1].split(',').map(seat => seat.trim()).filter(seat => seat !== "");  
    }
  }
  return []; // Return empty array if booking code not found
}
