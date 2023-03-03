const monsterHealthBar = document.getElementById("monster-health");
const playerHealthBar = document.getElementById("player-health");
const bounsLifeEl = document.getElementById("bonus-life");

const attackBtn = document.getElementById("attack-btn");
const strongAttackBtn = document.getElementById("strong-attack-btn");
const HealBtn = document.getElementById("heal-btn");
const LogBtn = document.getElementById("log-btn");

function AdjustHealthBar(maxLife){
    monsterHealthBar.max = maxLife;
    monsterHealthBar.value=maxLife;
    playerHealthBar.max = maxLife;
    playerHealthBar.value = maxLife;
}
function dealMonsterDamage(damage){
    const dealDamage = Math.random()*damage;
    monsterHealthBar.value = +monsterHealthBar.value - dealDamage;
    return dealDamage;
}
function dealPlayerDamage(damage) {
    const dealtDamage = Math.random() * damage;
    playerHealthBar.value = +playerHealthBar.value - dealtDamage;
    return dealtDamage;
}

function increasePlayerHealth(healValue) {
    playerHealthBar.value = +playerHealthBar.value + healValue;
  }
  
  function resetGame(value) {
    playerHealthBar.value = value;
    monsterHealthBar.value = value;
  }
  
  function removeBonusLife() {
    bonusLifeEl.parentNode.removeChild(bonusLifeEl);
  }
  
  function setPlayerHealth(health) {
    playerHealthBar.value = health;
  }