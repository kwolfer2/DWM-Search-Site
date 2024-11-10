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


let monsterData = []; 
let monsterStatCalcData = [];

// Use the correct GitHub raw link
fetch('https://raw.githubusercontent.com/kwolfer2/monster-json/83e6c36a9773fae217f5aefb1842a74724e0f7dd/monsterData.json')
  .then(response => response.json())
  .then(data => {
    monsterData = data;
  })
  .catch(error => console.error('Error fetching Monster data:', error));

function searchMonster() {
  const searchValue = document.getElementById('monster-search').value.trim().toLowerCase();

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

//let monsterStatCalcData = [];

// fetch('https://raw.githubusercontent.com/kwolfer2/monster-json/refs/heads/main/statCalc.json')
//     .then(response => response.json())
//     .then(data => {
//         monsterStatCalcData=data;

//     })
//   .catch(error => console.error('Error fetching Monster data:', error));

// function calcStats() {
//     const searchValue = document.getElementById('monster-search').value.trim().toLowerCase();

//   // Search for the monster by name
//   const findMonster = monsterData.find(p => p.name.toLowerCase() === searchValue);

//   if(findMonster) {


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
