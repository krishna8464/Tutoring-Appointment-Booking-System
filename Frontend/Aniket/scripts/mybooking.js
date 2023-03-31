const props = {
    trainerName: 'John Doe',
    trainerEmail: 'john.doe@example.com',
    trainerId: '1234',
    activity_type: 'Gym',
    fee: 100,
    slot: 'nine',
    reg_date: '2023-04-01',
    zoomLink: 'https://example.com/meet',
    status: 'pending',
  };
  
  const zoomLinkValue = {
    value: props.zoomLink,
    setValue: function (val) {
      this.value = val;
    }
  };
  
  function openZoomLink() {
    window.open(props.zoomLink, "_blank");
  }
  
  const backgroundColor =
    props.activity_type == "Gym"
      ? "black"
      : props.activity_type == "Yoga"
      ? "#2196F3"
      : props.activity_type == "Diet"
      ? "#27865F"
      : props.activity_type == "Fat Loss"
      ? "#C92D2D"
      : props.activity_type == "Weight Gain"
      ? "#0272A2"
      : "black";
  
  const allSlots = {
    six: "06:00 AM",
    seven: "07:00 AM",
    eight: "08:00 AM",
    nine: "09:00 AM",
    ten: "10:00 AM",
    eleven: "11:00 AM",
    twelve: "12:00 PM",
    one: "01:00 PM",
    two: "02:00 PM",
    three: "3:00 PM",
    four: "04:00 PM",
    five: "05:00 PM",
    six_eve: "06:00 PM",
    seven_eve: "07:00 PM",
    eight_eve: "08:00 PM",
  };
  
  const div = document.createElement('div');
  div.style.margin = '20px auto';
  div.style.width = '70%';
  div.style.boxShadow = 'rgba(0, 0, 0, 0.24) 0px 3px 8px';
  div.style.display = 'flex';
  div.style.alignItems = 'center';
  div.style.gap = '20px';
  div.style.padding = '20px';
  div.style.borderRadius = '5px';
  
  const activityDiv = document.createElement('div');
  activityDiv.style.backgroundColor = backgroundColor;
  activityDiv.style.color = 'white';
  activityDiv.style.fontWeight = '700';
  activityDiv.style.fontSize = '2rem';
  activityDiv.style.height = '13rem';
  activityDiv.style.width = '13rem';
  activityDiv.style.display = 'flex';
  activityDiv.style.justifyContent = 'center';
  activityDiv.style.alignItems = 'center';
  
  const p = document.createElement('p');
  p.textContent = props.activity_type;
  activityDiv.appendChild(p);
  div.appendChild(activityDiv);
  
  const tableDiv = document.createElement('div');
  tableDiv.style.width = '50%';
  
  const table = document.createElement('table');
  
  const row1 = document.createElement('tr');
  const trainerNameHeader = document.createElement('th');
  trainerNameHeader.textContent = 'Trainer:';
  const trainerNameValue = document.createElement('td');
  trainerNameValue.textContent = props.trainerName;
  row1.appendChild(trainerNameHeader);
  row1.appendChild(trainerNameValue);
  
  const row2 = document.createElement('tr');
  const typeHeader = document.createElement('th');
  typeHeader.textContent = 'Type:';
  const typeValue = document.createElement('td');
  typeValue.textContent = props.activity_type;
  row2.appendChild(typeHeader);
  row2.appendChild(typeValue);
  
  const row3 = document.createElement('tr');
  const trainerEmailHeader = document.createElement('th');
  trainerEmailHeader.textContent = 'Trainer Email:';
  