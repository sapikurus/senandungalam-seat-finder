// ... (HTML structure from previous response)

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const bookingCode = document.getElementById('bookingCode').value;
  const dataUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSNP9E1oBpSq843OgO65sQEXGqOQQvz0cD9_sq6hPpvGxX62n9k8dyWByJ70OyP_AG4sZdx12RcLzCh/pubhtml?gid=0&single=true'; // Replace with your actual URL
  
  try {
    const response = await fetch(dataUrl);
    const data = await response.text();
    const rows = data.split('\n'); // Split into rows
    const seatNumber = findSeatNumber(bookingCode, rows);

    if (seatNumber) {
      result.textContent = `Your Seat: ${seatNumber}`;
    } else {
      result.textContent = 'Booking code not found.';
    }
  } catch (error) {
    result.textContent = 'Error retrieving seat information.';
    console.error(error);
  }
});

function findSeatNumber(bookingCode, rows) {
  for (const row of rows) {
    const columns = row.split(',');
    if (columns[0] === bookingCode) {
      return columns[1];
    }
  }
  return null; // Booking code not found
}
