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
  const dataUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSNP9E1oBpSq843OgO65sQEXGqOQQvz0cD9_sq6hPpvGxX62n9k8dyWByJ70OyP_AG4sZdx12RcLzCh/pub?output=csv'; // Or your Google Sheet URL if you're using that

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
