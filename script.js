const monsterName = document.getElementById('monster-name');
const monsterFamily = document.getElementById('monster-family');
const monsterMax = document.getElementById('monster-max-level-out');
const monsterEXP = document.getElementById('monster-experience-out');
const monsterHPGrowth = document.getElementById('monster-hp-out');
const monsterMPGrowth = document.getElementById('monster-mp-out');
const monsterATGrowth = document.getElementById('monster-at-out');
const monsterDFGrowth= document.getElementById('monster-df-out');
const monsterAGGrowth = document.getElementById('monster-ag-out');
const monsterINGrowth = document.getElementById('monster-in-out');
const monsterSkillList = document.getElementById('monster-skill-list');
const searchButton = document.getElementById('monster-search-button');
const testDiv = document.getElementById('test-div');


let monsterData = []; 
fetch('monsterData.json')
  .then(response => response.json())
  .then(data => {
    monsterData = data;
  })
  .catch(error => console.error('Error fetch Monster data:', error));

function searchMonster() {
  const searchValue = document.getElementById('monster-search').value.trim().toLowerCase();
  const monsterInfo = document.getElementById('monster-stats-info');

  const findMonster = monsterData.find(p => p.name.toLowerCase() === searchValue);
  if(findMonster) {
    monsterName.textContent = monsterData.name;
    monsterFamily.textContent = monsterData.family;
    monsterMax.textContent = monsterData.ML;
  }
}
searchButton.addEventListener('click', event => { 
	testDiv.textContent = `'button has been pressed'`;
  event.preventDefault();
	searchMonster();
  
});


	console.log('this is a test message');

