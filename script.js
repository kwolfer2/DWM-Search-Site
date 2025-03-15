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


// Use the correct GitHub raw link
fetch('https://raw.githubusercontent.com/kwolfer2/monster-json/83e6c36a9773fae217f5aefb1842a74724e0f7dd/monsterData.json')
  .then(response => response.json())
  .then(data => {
    monsterData = data;
    monsterSearchValue.addEventListener('input', handleSuggestions)
  })
  .catch(error => console.error('Error fetching Monster data:', error));


// Attempted suggestions help with ChatGPT
const suggestionsContainer = document.getElementById('suggestions');
const searchValue = document.getElementById('monster-search'); // Replace with your search input element ID
let suggestionHighlightIndex = -1;

// Handle displaying suggestions
function handleSuggestions() {
  suggestionsContainer.innerHTML = '';
  suggestionHighlightIndex = -1;

  const matches = monsterData.filter(monster =>
    monster.name.toLowerCase().includes(searchValue.value.toLowerCase())
  );

  matches.forEach(monster => {
    const suggestion = document.createElement('div');
    suggestion.classList.add('suggestion-item');
    suggestion.textContent = monster.name;

    // On click, populate the search input and clear suggestions
    suggestion.onclick = () => {
      searchValue.value = monster.name;
      suggestionsContainer.innerHTML = ''; 
      searchMonster(); // Trigger search function
    };

    suggestionsContainer.appendChild(suggestion);
  });

  if (matches.length === 0) {
    const noMatch = document.createElement('div');
    noMatch.classList.add('no-match');
    noMatch.textContent = 'No matches found';
    suggestionsContainer.appendChild(noMatch);
  }
}

// Handle navigation of suggestions
document.addEventListener('keydown', event => {
  const suggestions = suggestionsContainer.querySelectorAll('.suggestion-item');

  if (event.key === 'ArrowDown') {
    navigateSuggestions(1, suggestions);
    console.log(`Arrowdown pressed, suggestionHighlightIndex ${suggestionHighlightIndex}`)
  } else if (event.key === 'ArrowUp') {
    navigateSuggestions(-1, suggestions);
    console.log(`Arrowup pressed, suggestionHighlightIndex ${suggestionHighlightIndex}`)
  } else if (event.key === 'Enter') {
    if (suggestionHighlightIndex >= 0 && suggestionHighlightIndex < suggestions.length) {
      const highlightedMonsterName = suggestions[suggestionHighlightIndex].textContent;
      searchValue.value = highlightedMonsterName;
      suggestionsContainer.innerHTML = '';
      searchMonster(highlightedMonsterName);
    } else {
      console.error('Invalid suggestionHighlightIndex:', suggestionHighlightIndex);
    } 
    }
  }
);

function navigateSuggestions(direction, suggestions) {
  // Remove highlight from the current suggestion
  if (suggestionHighlightIndex >= 0 && suggestions[suggestionHighlightIndex]) {
    suggestions[suggestionHighlightIndex].classList.remove('highlight');
  }

  // Update suggestionHighlightIndex
  suggestionHighlightIndex += direction;

  // Loop back or forward if out of bounds
  if (suggestionHighlightIndex >= suggestions.length) suggestionHighlightIndex = 0;
  if (suggestionHighlightIndex < 0) suggestionHighlightIndex = suggestions.length - 1;

  // Highlight the new suggestion if it exists
  if (suggestions[suggestionHighlightIndex]) {
    suggestions[suggestionHighlightIndex].classList.add('highlight');
    suggestions[suggestionHighlightIndex].scrollIntoView({ block: 'nearest' });
  }
}

function selectSuggestion(suggestions) {
  if (suggestionHighlightIndex >= 0 && suggestions[suggestionHighlightIndex]) {
    suggestions[suggestionHighlightIndex].click(); // Simulate clicking the highlighted suggestion
  }
}
// Attempted suggestions help with ChatGPT *end

function searchMonster(name) {
  const searchName = name || monsterSearchValue.value.trim().toLowerCase();
  suggestionsContainer.innerHTML = ''; // Clear suggestions
  suggestionHighlightIndex = -1;

  


  // Search for the monster by name
  const findMonster = monsterData.find(p => p.name.toLowerCase() === searchName);

  if(findMonster) {
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

    // Display monster skills
    monsterSkillList.textContent = `Skills: ${findMonster.skills.join(', ')}`;
    const portraitUrl = `https://github.com/kwolfer2/DWMsprites/blob/main/${findMonster.family.toLowerCase()}/${findMonster.name.toLowerCase()}.png?raw=true`;
    monsterPortrait.innerHTML = `<img src="${portraitUrl}" alt="${findMonster.name} Portrait" />`;
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
monsterSearchValue.addEventListener('keydown', event => {
  if (event.key === 'Enter') {  // Check if the Enter key was pressed
    event.preventDefault();
    searchMonster();
  }
});
projectButton.addEventListener('click', event => {
  event.preventDefault();
  projectStats();
});

console.log('CalcStats test');
console.log(monsterStatCalcData);