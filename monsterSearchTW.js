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
const monsterSkillList = document.getElementById('monster-skill-list');
const searchButton = document.getElementById('monster-search-button');
const testDiv = document.getElementById('test-div');
const monsterSearchValue = document.getElementById('monster-search');
const projectButton = document.getElementById('monster-project-stats-button');
const monsterPortrait = document.getElementById('monster-portrait-index');

let monsterData = []; 

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


// Use the correct GitHub raw link
fetch('https://raw.githubusercontent.com/kwolfer2/monster-json/83e6c36a9773fae217f5aefb1842a74724e0f7dd/monsterData.json')
  .then(response => response.json())
  .then(data => {
    monsterData = data;
    monsterSearchValue.addEventListener('input', handleSuggestions)
  })
  .catch(error => console.error('Error fetching Monster data:', error));


  const suggestionsContainer = document.getElementById('suggestions');
  const searchValue = document.getElementById('monster-search');
  let suggestionHighlightIndex = -1;
  let currentSuggestions = [];
  
  function handleSuggestions() {
    suggestionsContainer.innerHTML = '';
    suggestionHighlightIndex = -1;
  
    const input = searchValue.value.toLowerCase();
    currentSuggestions = monsterData.filter(monster =>
      monster.name.toLowerCase().includes(input)
    );
  
    if (currentSuggestions.length === 0) {
      const noMatch = document.createElement('div');
      noMatch.classList.add('no-match');
      noMatch.textContent = 'No matches found';
      suggestionsContainer.appendChild(noMatch);
      return;
    }
  
    currentSuggestions.forEach((monster, index) => {
      const suggestion = document.createElement('div');
      suggestion.classList.add(
        'suggestion-item',        // keep this if you still want to reference it via JS
        'px-4', 
        'py-2',
        'cursor-pointer',
        'hover:bg-blue-100',
        'bg-white',
        'border',
        'border-gray-300',
        'rounded',
        'transition'
      );
      suggestion.textContent = monster.name;
  
      suggestion.addEventListener('click', () => {
        selectSuggestion(index);
      });
  
      suggestionsContainer.appendChild(suggestion);
    });
  }
  
  function navigateSuggestions(direction) {
    const items = suggestionsContainer.querySelectorAll('.suggestion-item');
    
    if (!items.length) return;
    
    if (suggestionHighlightIndex >= 0) {
      items[suggestionHighlightIndex].classList.remove('bg-blue-200');
    }
    
    suggestionHighlightIndex += direction;
    
    if (suggestionHighlightIndex >= items.length) suggestionHighlightIndex = 0;
    if (suggestionHighlightIndex < 0) suggestionHighlightIndex = items.length - 1;
    
    items[suggestionHighlightIndex].classList.add('bg-blue-200');
    items[suggestionHighlightIndex].scrollIntoView({ block: 'nearest' });
  }
  
  function selectSuggestion(index) {
    const monster = currentSuggestions[index];
    if (!monster) return;
  
    searchValue.value = monster.name;
    suggestionsContainer.innerHTML = '';
    suggestionHighlightIndex = -1;
    searchMonster(monster.name);
  }
  
  searchValue.addEventListener('keydown', event => {
    const items = suggestionsContainer.querySelectorAll('.suggestion-item');
  
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (currentSuggestions.length > 0) navigateSuggestions(1);
        break;
  
      case 'ArrowUp':
        event.preventDefault();
        if (currentSuggestions.length > 0) navigateSuggestions(-1);
        break;
  
      case 'Enter':
        event.preventDefault();
        if (suggestionHighlightIndex >= 0 && currentSuggestions.length > 0) {
          selectSuggestion(suggestionHighlightIndex);
          searchMonster();

        } else {
          searchMonster(); // fallback to search by typed value
        }
        break;
    }
  });
  
  
  searchValue.addEventListener('input', () => {
    handleSuggestions();
  });
  

function searchMonster(name) {
  const searchName = name || monsterSearchValue.value.trim().toLowerCase();
  suggestionsContainer.innerHTML = ''; // Clear suggestions
  suggestionHighlightIndex = -1;

  


  // Search for the monster by name
  const findMonster = monsterData.find(p => p.name.toLowerCase() === searchName);

  if(findMonster) {
    // Populate the DOM elements with the monster data
    monsterName.textContent = `Name: ${findMonster.name}`;
    monsterFamily.textContent = `Family: ${findMonster.family}`;
    monsterMax.textContent = findMonster.ML;
    monsterEXP.textContent = findMonster.EP;
    monsterHPGrowth.textContent = findMonster.HP;
    monsterMPGrowth.textContent = findMonster.MP;
    monsterATGrowth.textContent = findMonster.AT;
    monsterDFGrowth.textContent = findMonster.DF;
    monsterAGGrowth.textContent = findMonster.AG;
    monsterINGrowth.textContent = findMonster.IN;

    // Display monster skills
    monsterSkillList.innerHTML = '<strong>Skills: </strong>';
    findMonster.skills.forEach(skill => {
      const skillDiv = document.createElement('div');
      skillDiv.textContent = skill;
      monsterSkillList.appendChild(skillDiv);
    });
    const portraitUrl = `https://github.com/kwolfer2/DWMsprites/blob/main/${findMonster.family.toLowerCase()}/${findMonster.name.toLowerCase()}.png?raw=true`;
    monsterPortrait.innerHTML = `<img src="${portraitUrl}" alt="${findMonster.name} Portrait" class="w-24 lg:w-32 xl:w-40"/>`;
    console.log(portraitUrl);
  } else {
    console.log('Monster not found:', searchName);
    monsterPortrait.innerHTML = ""; // Clear portrait if no monster is found
  }
}




const getProjectedStats = () => {
  
}

let monsterStatCalcData = [];

fetch('https://raw.githubusercontent.com/kwolfer2/Javascript-Projects/refs/heads/main/monstertoJSON/statCalc.json')
    .then(response => response.json())
    .then(data => {
      
      monsterStatCalcData = data;
      console.log(monsterStatCalcData);
      
    })
    .catch(error => console.error('Error calculating Monster stats:', error));

  function projectStats() {
    //LVL
    const currentLVL = parseInt(document.getElementById('monster-current-level-input').value);
    const projectedLVL = parseInt(document.getElementById('monster-projected-level-input').value);
    //HP
    const currentHP = parseInt(document.getElementById('monster-current-HP-input').value);
    const projectedHP = document.getElementById('monster-projected-hp');
    projectedHP.textContent = parseInt(monsterStatCalcData[monsterHPGrowth.textContent][projectedLVL] + currentHP - monsterStatCalcData[monsterHPGrowth.textContent][currentLVL]);
    //MP
    const currentMP = parseInt(document.getElementById('monster-current-MP-input').value);
    const projectedMP = document.getElementById('monster-projected-MP');
    projectedMP.textContent = parseInt(monsterStatCalcData[monsterMPGrowth.textContent][projectedLVL] + currentMP - monsterStatCalcData[monsterMPGrowth.textContent][currentLVL]);
    //AT
    const currentAT = parseInt(document.getElementById('monster-current-AT-input').value);
    const projectedAT = document.getElementById('monster-projected-AT');
    projectedAT.textContent = parseInt(monsterStatCalcData[monsterATGrowth.textContent][projectedLVL] + currentAT - monsterStatCalcData[monsterATGrowth.textContent][currentLVL]);
    //DF
    const currentDF = parseInt(document.getElementById('monster-current-DF-input').value);
    const projectedDF = document.getElementById('monster-projected-DF');
    projectedDF.textContent = parseInt(monsterStatCalcData[monsterDFGrowth.textContent][projectedLVL] + currentDF - monsterStatCalcData[monsterDFGrowth.textContent][currentLVL]);
    //AG
    const currentAG = parseInt(document.getElementById('monster-current-AG-input').value);
    const projectedAG = document.getElementById('monster-projected-AG');
    projectedAG.textContent = parseInt(monsterStatCalcData[monsterAGGrowth.textContent][projectedLVL] + currentAG - monsterStatCalcData[monsterAGGrowth.textContent][currentLVL]);
    //IN
    const currentIN = parseInt(document.getElementById('monster-current-IN-input').value);
    const projectedIN = document.getElementById('monster-projected-IN');
    projectedIN.textContent = parseInt(monsterStatCalcData[monsterINGrowth.textContent][projectedLVL] + currentIN - monsterStatCalcData[monsterINGrowth.textContent][currentLVL]);
  }

searchButton.addEventListener('click', event => { 
  event.preventDefault();
  searchMonster();
});
// monsterSearchValue.addEventListener('keydown', event => {
//   if (event.key === 'Enter') {  // Check if the Enter key was pressed
//     event.preventDefault();
//     searchMonster();
//   }
// });
projectButton.addEventListener('click', event => {
  event.preventDefault();
  console.log('CalcStats test');
  console.log(monsterStatCalcData);

  projectStats();
});
