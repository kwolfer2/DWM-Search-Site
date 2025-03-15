

const breedingMonsterInput = document.getElementById('monster-search');
const searchButton = document.getElementById('search-button');
const pedigreeList = document.getElementById('pedigree-list');
const searchedMonsterImage = document.getElementById('searched-monster-img');
const breedingMonsterName = document.getElementById('searched-monster-name');
const secondaryList = document.getElementById('secondary-list');
const offspringList = document.getElementById('offspring-list');
const partnersList = document.getElementById('partners-list');

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

  if (!targetMonster) {
    console.error(`Monster "${name}" not found.`);
    clearFields();
    return;
  }

  // Populate monster details
  breedingMonsterName.textContent = targetMonster.name;
  const imageUrl = `https://github.com/kwolfer2/DWMsprites/blob/main/${targetMonster.family.toLowerCase()}/${targetMonster.name.toLowerCase()}.png?raw=true`;
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
  const pedigrees = [];
  if (targetMonster.breeding.pedigreeFamily) {
    pedigrees.push(`${targetMonster.breeding.pedigreeFamily} Family`);
  }
  if (targetMonster.breeding.pedigreeOverrides) {
    pedigrees.push(...targetMonster.breeding.pedigreeOverrides);
  }
  if (targetMonster.breeding.specificParents) {
    targetMonster.breeding.specificParents.forEach(parent => {
      if (parent.pedigreeOptions) {
        pedigrees.push(...parent.pedigreeOptions);
      }
      if (parent.pedigree) {
        pedigrees.push(parent.pedigree);
      }
    });
  }
  populateList(pedigreeList, pedigrees, 'pedigree');

  // Populate Secondary List
  const secondaries = [];
  if (targetMonster.breeding.secondaryFamily) {
    secondaries.push(`${targetMonster.breeding.secondaryFamily} Family`);
  }
  if (targetMonster.breeding.secondaryOverrides) {
    secondaries.push(...targetMonster.breeding.secondaryOverrides);
  }
  if (targetMonster.breeding.specificParents) {
    targetMonster.breeding.specificParents.forEach(parent => {
      if (parent.secondaryOptions) {
        secondaries.push(...parent.secondaryOptions);
      }
      if (parent.secondary) {
        secondaries.push(parent.secondary);
      }
    });
  }
  populateList(secondaryList, secondaries, 'secondary');
}

function populateList(element, data, type) {
  element.innerHTML = ''; // Clear previous content

  if (data.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.textContent = 'None';
    element.appendChild(emptyItem);
    return;
  }

  data.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    element.appendChild(listItem);
  });
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

