const searchInput = document.getElementById("families-search");
const familyWrappers = document.querySelectorAll(".family-wrapper");
const monsterName = document.getElementById('monster-name');
const monsterFamily = document.getElementById('monster-family');
const monsterMax = document.getElementById('monster-max-level-out');
const monsterEXP = document.getElementById('monster-experience-out');
const monsterHPGrowth = document.getElementById('monster-hp-out');
const monsterMPGrowth = document.getElementById('monster-mp-out');
const monsterATGrowth = document.getElementById('monster-at-out');
const monsterDFGrowth = document.getElementById('monster-df-out');
const monsterAGGrowth = document.getElementById('monster-ag-out');
const monsterINGrowth = document.getElementById('monster-in-out');
const familiesMonsterSkillList = document.getElementById('families-monster-skill-list');
const monsterSkillList = document.getElementById('monster-skill-list');
const searchButton = document.getElementById('families-search-button');
const testDiv = document.getElementById('test-div');
const projectButton = document.getElementById('monster-project-stats-button');
let monsterData = []; 

// Generate Sidebar

fetch('sidebar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('sidebar').innerHTML = html;});

function addClickListenersToMonsters() {
  const monsterSelections = document.querySelectorAll('.monster-selection');
  
  monsterSelections.forEach(selection => {
    const monsterName = selection.textContent.trim();

    selection.onclick = () => {
      searchInput.value = monsterName.trim().toLowerCase();
      searchMonster(monsterName);
    }

    selection.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        searchInput.value = monsterName.trim().toLowerCase();
        searchMonster(monsterName);
      }
    });
  });
}

// Use the correct GitHub raw link
fetch('https://raw.githubusercontent.com/kwolfer2/monster-json/refs/heads/main/monsterData.json')
  .then(response => response.json())
  .then(data => {
    monsterData = data;
    
    addClickListenersToMonsters();
  })
  .catch(error => console.error('Error fetching Monster data:', error));




  function searchMonster(name) {
    console.log('Original name:', name); // Debug log
    const searchName = searchInput.value.trim().toLowerCase();
    console.log('Searching for:', searchName); // Debug log
    console.log('Available monsters:', monsterData.map(m => m.name.toLowerCase())); // Debug log
  
   
    
  
  
    // Search for the monster by name
    const findMonster = monsterData.find(p => p.name.toLowerCase() === searchName);

  
    if(findMonster) {
        console.log('Monster found:', findMonster); // Debug log
      // Populate the DOM elements with the monster data
      monsterName.textContent = findMonster.name;
      monsterFamily.textContent = findMonster.family;
      monsterMax.textContent = findMonster.ML;
      monsterEXP.textContent = findMonster.EP;
      monsterHPGrowth.textContent = findMonster.HP;
      monsterMPGrowth.textContent = findMonster.MP;
      monsterATGrowth.textContent = findMonster.AT;
      monsterDFGrowth.textContent = findMonster.DF;
      monsterAGGrowth.textContent = findMonster.AG;
      monsterINGrowth.textContent = findMonster.IN;

      const portraitElement = document.querySelector('#monster-portrait img');
    if (portraitElement) {
      const monsterImage = `/Images/Monster_pics_by_family/${findMonster.family.toLowerCase()}/${findMonster.name.toLowerCase()}.png`;
      console.log('searched for', monsterImage);
      portraitElement.src = monsterImage;
      portraitElement.alt = `${findMonster.name} portrait`;
    }
  
  
      // Display monster skills
      familiesMonsterSkillList.innerHTML = '';
      const skillHeader = document.createElement('div');
    skillHeader.textContent = 'Skills:';
    skillHeader.className = 'skill-header';
    familiesMonsterSkillList.appendChild(skillHeader);

    findMonster.skills.forEach(skill => {
      const skillDiv = document.createElement('div');
      skillDiv.textContent = skill;
      skillDiv.className = 'skill-item';
      familiesMonsterSkillList.appendChild(skillDiv);
    });
    } else {
      console.log('Monster not found!');

      // Clear portrait and skills if no monster is found
      const portraitElement = document.querySelector('#monster-portrait img');
      if (portraitElement) {
        portraitElement.src = '';
        portraitElement.alt = 'No portrait available';
      }
  
      familiesMonsterSkillList.innerHTML = '<div class="skill-header">Skills: Not Available</div>';
   
    }
  }
  // Hide monsters not qualified in searchInput
searchInput.addEventListener('input', () => {
  const searchQuery = searchInput.value.toLowerCase();
  familyWrappers.forEach(familyWrapper => {
    const monsterFamilies = familyWrapper.querySelectorAll(".monster-family");

    monsterFamilies.forEach(family => {
      const monsters = family.querySelectorAll(".monster-selection");
      let familyHasVisibleMonsters = false;

      monsters.forEach(monster => {
        const monsterName = monster.textContent.toLowerCase();
        if (monsterName.includes(searchQuery)) {
          monster.style.display = "block";
          familyHasVisibleMonsters = true;
        } else {
          monster.style.display = "none";
        }
      });

      family.style.display = familyHasVisibleMonsters ? "block" : "none";
    });
  });

  addClickListenersToMonsters(); // Reattach listeners after filtering
});

searchButton.addEventListener('click', event => { 
  event.preventDefault();
  searchMonster();
});
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {  // Check if the Enter key was pressed
    event.preventDefault();
    searchMonster();
    
  }
});