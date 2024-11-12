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
const searchValue = document.getElementById('monster-search');
const projectButton = document.getElementById('monster-project-stats-button');


let monsterData = []; 


// Use the correct GitHub raw link
fetch('https://raw.githubusercontent.com/kwolfer2/monster-json/83e6c36a9773fae217f5aefb1842a74724e0f7dd/monsterData.json')
  .then(response => response.json())
  .then(data => {
    monsterData = data;
  })
  .catch(error => console.error('Error fetching Monster data:', error));

function searchMonster() {
  const searchValue = document.getElementById('monster-search').value.trim().toLowerCase();

  // Attempted suggestions help with ChatGPT
  const suggestionsContainer = document.getElementById('suggestions');

  suggestionsContainer.innerHTML = '';

  const matches = monsterData.filter(monster =>
    monster.name.toLowerCase().includes(searchValue)
  );

  matches.forEach(monster => {
    const suggestion = document.createElement('div');
    suggestion.classList.add('suggestion-item');
    suggestion.textContent = monster.name;
    suggestion.addEventListener('click', () => {
      document.getElementById('search-input').value = monster.name;
      suggestionsContainer.innerHTML = ''; // Clear suggestions on selection
      // Add additional functionality here if you want to automatically search on selection
    });
    suggestionsContainer.appendChild(suggestion);
  });

  if (matches.length === 0) {
    const noMatch = document.createElement('div');
    noMatch.classList.add('no-match');
    noMatch.textContent = 'No matches found';
    suggestionsContainer.appendChild(noMatch);
  }
  // Attempted suggestions help with ChatGPT *end


  // Search for the monster by name
  const findMonster = monsterData.find(p => p.name.toLowerCase() === searchValue);

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
    testDiv.textContent = "";
  } else {
    testDiv.textContent = "Monster not found!";
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
  testDiv.textContent = `'button has been pressed'`;
  event.preventDefault();
  searchMonster();
});
searchValue.addEventListener('keydown', event => {
  if (event.key === 'Enter') {  // Check if the Enter key was pressed
    testDiv.textContent = `'Enter key has been pressed'`;
    event.preventDefault();
    searchMonster();
  }
});
projectButton.addEventListener('click', event => {
  testDiv.textContent = `'project stats button has been pressed'`;
  event.preventDefault();
  projectStats();
});

console.log('CalcStats test');
console.log(monsterStatCalcData);