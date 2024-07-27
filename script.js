// Function definition FIRST
function findSeatNumbers(bookingCode, rows) {
  for (const row of rows) {
    const columns = row.split(',');
    if (columns[0].trim().toLowerCase() === bookingCode.trim().toLowerCase()) {
      return columns[1].split(',').map(seat => seat.trim()).filter(seat => seat !== "");
    }
  }
  return [];
}


document.getElementById('seatFinderForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = '';

  const bookingCode = document.getElementById('bookingCode').value.trim().toLowerCase();
  const dataUrl = 'seat_finder.csv'; // Or your Google Sheet URL if you're using that

  try {
    const response = await fetch(dataUrl, { mode: 'cors' });
    const data = await response.text();
    const rows = data.split('\n').slice(1);
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
