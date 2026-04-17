const fileInput = document.getElementById('csvFileInput');
// values: 0 job, 1 step, 2 part, 4 raw, 5 qty posted, 8 wc, 10, due
const titleNumbers = [
  {
    value: 0,
    title: 'Job number',
  },
  {
    value: 1,
    title: 'Step number',
  },
  {
    value: 2,
    title: 'Part number',
  },
  {
    value: 4,
    title: 'Raw material',
  },
  {
    value: 5,
    title: 'Quantity posted',
  },
  {
    value: 8,
    title: 'Work center',
  },
  {
    value: 10,
    title: 'Due date',
  }
];

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsText(file);

  reader.onloadend = (event) => {
    const text = event.target.result;
    const rows = text.split('\n').map(row => row.split(','));

    // TODO: Unused, but would like to consider possibly using it. Need to look more into this
    // const items = Array.from(rows);

    const unscheduledContainer = document.getElementById('unscheduled-container');

    for (const row of rows) {
      const container = document.createElement('div');
      container.classList.add('job-container');
      for (const {value, title} of titleNumbers) {
        let cleanValue = row[value];

        if (cleanValue === '""') {
          cleanValue = "Missing data";
        } else if (cleanValue === undefined) {
          break;
        } else {
          cleanValue = cleanValue.replace(/^['"]*|['"]*|<br>$/gm, '');
        }

        if (value === 2) {
          if (cleanValue[0] === "M" ) {
            cleanValue = cleanValue.match(/^([^A-Z]*[A-Z]){4}[^A-Z]*(?=[A-Z])/gm);
          }
        } else if (value === 5) {
          if (cleanValue !== 'Missing data') {
            const formatter = new Intl.NumberFormat('en-US');
            cleanValue = formatter.format(cleanValue);
          }
        } else if (value === 10) {
          const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
          cleanValue = new Date(cleanValue);
          cleanValue = new Intl.DateTimeFormat('en-US', options).format(cleanValue);
        }

        const heading = container.appendChild(document.createElement('h3'));
        const paragraph = container.appendChild(document.createElement('p'));
        heading.innerText = title;
        paragraph.innerText = cleanValue;
      }

      const lastChild = container.lastChild;
      if (lastChild.innerText === '') {
        break;
      } else {
        unscheduledContainer.appendChild(container);
      }
    }
  };
});