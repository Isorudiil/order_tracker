const fileInput = document.getElementById('csvFileInput');
const titleNumbers = {
  "Shipment Date": 0,
  "Customer": 1,
  "Order Number": 2,
  "Total Weight": 7,
};

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsText(file);

  reader.onloadend = (event) => {
    const text = event.target.result;
    const rows = text.split('\n').map(row => row.split(','));
    // function to create titles
    const titleRow = rows[0];
    for (const titleNumber in titleRow) {
      console.log(titleNumber);
      if (titleNumber in titleNumbers.value) {
        console.log(titleNumbers[titleNumber]);
      }
    }
    console.log(rows[0]);
  };
});