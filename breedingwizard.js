const breedingMonsterInput = document.getElementById('monster-search');
const searchButton = document.getElementById('search-button');
const pedigreeList = document.getElementById('pedigree-list');
const searchedMonsterImage = document.getElementById('searched-monster-img');
const breedingMonsterName = document.getElementById('searched-monster-name');
const breedingMonsterFamily = document.getElementById('searched-monster-family');
const offspringList = document.getElementById('offspring-list');
const partnersList = document.getElementById('partners-list');

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
  offspringList.innerHTML = '';
  partnersList.innerHTML = '';

  // Populate Pedigree List
  if (targetMonster.breeding.pairGroups) {
    targetMonster.breeding.pairGroups.forEach(group => {
      const groupContainer = document.createElement('div');
      groupContainer.classList.add('mb-6');
      const groupTitle = document.createElement('li');
      groupTitle.classList.add('text-center', 'mb-2', 'col-span-2', 'font-bold');
      groupTitle.textContent = `Group ${group.groupID}`;
      pedigreeList.appendChild(groupTitle);
      const parentGrid = document.createElement('div');
      parentGrid.classList.add('grid', 'grid-cols-2', 'gap-2', 'text-center');
      const maxRows = Math.max(group.pedigreeOptions.length, group.secondaryOptions.length);
      const pedigreeCol = document.createElement('div');
      pedigreeCol.classList.add('flex', 'flex-col', 'gap-1', 'justify-center', 'h-full');
      const secondaryCol = document.createElement('div');
      secondaryCol.classList.add('flex', 'flex-col', 'gap-1', 'justify-center', 'h-full')
      for (let i = 0; i < maxRows; i++) {

        const pedigreeItem = document.createElement('div');
        pedigreeItem.textContent = group.pedigreeOptions[i] || '';
        pedigreeCol.appendChild(pedigreeItem);
        parentGrid.appendChild(pedigreeCol);
        const secondaryItem = document.createElement('div');
        secondaryItem.classList.add('flex', 'items-center', 'justify-center');
        secondaryItem.textContent = group.secondaryOptions[i] || '';
        secondaryCol.appendChild(secondaryItem);
        parentGrid.appendChild(secondaryCol);


      }
      groupContainer.appendChild(parentGrid);
      pedigreeList.appendChild(groupContainer);
    });
  }
  // Populate Potential Offspring (offspring reccomendation)

  const targetTier = targetMonster.tier;
  const targetName = targetMonster.name;
  const targetFamilyTag = `[${targetMonster.family.toUpperCase()}]`;
  const results = [];

  // Each monster in monsterData
  monsterData.forEach(OSmonster => {
    // Exclude lower / equal tier monsters
    if (OSmonster.tier <= targetTier || !OSmonster.breeding) return;

    OSmonster.breeding.pairGroups.forEach(group => {
      const {
        pedigreeOptions = [], secondaryOptions = []
      } = group;
      // find targetMonster as Pedigree
      if (pedigreeOptions.includes(targetName)) {
        results.push({
          name: `${OSmonster.name} (P)`,
          groupID: group.groupID,
          role: "pedigree",
          partners: secondaryOptions
        });
        // find targetMonster as Secondary
      } else if (secondaryOptions.includes(targetName)) {
        results.push({
          name: OSmonster.name,
          groupID: group.groupID,
          role: "secondary",
          partners: pedigreeOptions
        });
        // find targetMonster as generic monster family
      } else if (pedigreeOptions.includes(targetFamilyTag) || secondaryOptions.includes(targetFamilyTag)) {
        results.push({
          name: pedigreeOptions.includes(targetFamilyTag) ? `${OSmonster.name} (P)` : OSmonster.name,
          groupID: group.groupID,
          role: pedigreeOptions.includes(targetFamilyTag) ? "pedigree-family" : "secondary-family",
          partners: pedigreeOptions.includes(targetFamilyTag) ? secondaryOptions : pedigreeOptions
        });
      }
    });
  });
  console.log(results)
  results.forEach(monsterName => {
    const offpsringBtn = document.createElement('button');
    offpsringBtn.textContent = `${monsterName.name}`
    offpsringBtn.classList.add('bg-blue-600', 'hover:bg-blue-700', 'font-[Nunito]', 'text-white', 'py-2', 'px-2', 'mr-5', 'rounded', 'mt-5');
    offspringList.appendChild(offpsringBtn)
    console.log(`added ${monsterName.name} to offspringDiv`);
    offpsringBtn.addEventListener('click', () => {
      //Remove pressed in styling from all buttons
      const allButtons = offspringList.querySelectorAll('button');
      document.getElementById('mate-div').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      allButtons.forEach(btn => {
        btn.classList.remove('bg-blue-300', 'hover:bg-gray-300');
        btn.classList.add('bg-blue-600', 'hover:bg-blue-700');
      });
      partnersList.innerHTML = '';
      offpsringBtn.classList.add('bg-blue-300', 'hover:bg-gray-300');
      monsterName.partners.forEach(partner => {
        const partnerTally = document.createElement('li');
        partnerTally.textContent = partner;
        partnersList.appendChild(partnerTally);

      })
    })
  });
}


// Clear fields when no monster is found
function clearFields() {
  breedingMonsterName.textContent = 'Not found';
  searchedMonsterImage.src = '';
  searchedMonsterImage.alt = 'No image available';
  pedigreeList.innerHTML = '<li>None</li>';
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