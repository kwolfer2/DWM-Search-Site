// Generate Sidebar

fetch('sidebar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('sidebar').innerHTML = html;
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    } else {
      const interval = setInterval(() => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
          clearInterval(interval);
        }
      }, 50);
    }
  });


let skillsJson = []

fetch('https://raw.githubusercontent.com/kwolfer2/monster-json/refs/heads/main/skills.json')
.then(response => response.json())
.then(data => {
    skillsJson = data; // Extract the skills array
    console.log(skillsJson);
  
  const tableBody = document.querySelector('#skills-table tbody');

  // Iterate through the skills and create rows
  skillsJson.forEach(skill => {
    const row = document.createElement('tr');

    // Create Skill Name cell
    const nameCell = document.createElement('td');
    nameCell.textContent = skill.name;
    row.appendChild(nameCell);

    // Create Skill Description cell
    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = skill.description;
    row.appendChild(descriptionCell);

    // Add the row to the table
    tableBody.appendChild(row);
  });
})
.catch(error => console.error('Error fetching skills data:', error));