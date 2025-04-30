

const breedingMonsterInput = document.getElementById('monster-search');
const searchButton = document.getElementById('search-button');
const pedigreeList = document.getElementById('pedigree-list');
const searchedMonsterImage = document.getElementById('searched-monster-img');
const breedingMonsterName = document.getElementById('searched-monster-name');
const breedingMonsterFamily = document.getElementById('searched-monster-family');
const secondaryList = document.getElementById('secondary-list');
const offspringList = document.getElementById('offspring-list');
const partnersList = document.getElementById('partners-list');

// Generate Sidebar

fetch('sidebar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('sidebar').innerHTML = html;});

let monsterData = [];

// Fetch monster data
fetch('https://raw.githubusercontent.com/kwolfer2/monster-json/refs/heads/main/monsterData.json')
  .then(response => response.json())
  .then(data => {
    monsterData = data;
    console.log('Monster data loaded:', monsterData);
    
    
  })
  .catch(error => console.error('Error fetching Monster data:', error));

// Main function to search and populate breeding info
function searchMonster(name) {
  const targetName = name.trim().toLowerCase();
  const targetMonster = monsterData.find(monster => monster.name.toLowerCase() === targetName);
  console.log(targetMonster);
  console.log(targetMonster.family);

  if (!targetMonster) {
    console.error(`Monster "${name}" not found.`);
    clearFields();
    return;
  }

  // Populate monster details
  breedingMonsterName.textContent = `Monster: ${targetMonster.name}`;
  breedingMonsterFamily.textContent = `Family: ${targetMonster.family}`;
  const imageUrl = `/Images/Monster_pics_by_family/${targetMonster.family.toLowerCase()}/${targetMonster.name.toLowerCase()}.png`;
  searchedMonsterImage.src = imageUrl;
  searchedMonsterImage.alt = `${targetMonster.name} image`;
}

// Helper function to populate lists
function populateBreedingLists(targetMonsterName, monsterData) {
  const targetMonster = monsterData.find(monster => monster.name.toLowerCase() === targetMonsterName);
  if (!targetMonster) {
    console.error(`Monster ${targetMonsterName} not found.`);
    return;
  }

  // Clear all lists
  pedigreeList.innerHTML = '';
  secondaryList.innerHTML = '';
  offspringList.innerHTML = '';
  partnersList.innerHTML = '';

  // Populate Pedigree List
  if (targetMonster.breeding.pairGroups){
      targetMonster.breeding.pairGroups.forEach(group => {
        const pedigreeTitle = document.createElement('li');
        pedigreeTitle.classList.add('text-center');
        pedigreeTitle.textContent = `Group ${group.groupID}`;
        pedigreeList.appendChild(pedigreeTitle);
      group.pedigreeOptions.forEach(item =>{
        const listItem = document.createElement('li');
        listItem.classList.add('text-center');
        listItem.textContent = item;
        pedigreeList.appendChild(listItem);
      })
      const plusItem = document.createElement('li');
      plusItem.classList.add('text-center');
      plusItem.innerHTML = '<strong>+</strong>';
      pedigreeList.appendChild(plusItem);
        group.secondaryOptions.forEach(item => {
          const listItem = document.createElement('li');
          listItem.classList.add('text-center');
        listItem.textContent = item;
        pedigreeList.appendChild(listItem);
        })
        
      })
  };
}

// Clear fields when no monster is found
function clearFields() {
  breedingMonsterName.textContent = 'Not found';
  searchedMonsterImage.src = '';
  searchedMonsterImage.alt = 'No image available';
  pedigreeList.innerHTML = '<li>None</li>';
  secondaryList.innerHTML = '<li>None</li>';
  offspringList.innerHTML = '<li>None</li>';
  partnersList.innerHTML = '<li>None</li>';
}

// Event listeners
searchButton.addEventListener('click', () => {
  console.log(`Searching for ${breedingMonsterInput.value}`);
  searchMonster(breedingMonsterInput.value)
  const targetMonsterName = breedingMonsterInput.value.toLowerCase();
  populateBreedingLists(targetMonsterName, monsterData);
});
breedingMonsterInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    searchMonster(breedingMonsterInput.value);
    console.log(`Searching for ${breedingMonsterInput.value}`);
    const targetMonsterName = breedingMonsterInput.value.toLowerCase();
    populateBreedingLists(targetMonsterName, monsterData);

  }
});


// Below is the first suggestion given by ChatGPT to include overrides, families, etc..

