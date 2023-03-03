const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK'
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK'
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK'
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL'
const LOG_EVENT_GAME_OVER = 'GAME_OVER'

const enteredValue = prompt("mohamed life for you and the monster","100")
let chosenMoLife = parseInt(enteredValue);
let battleLog = [];
if(isNaN(chosenMoLife) || chosenMoLife <= 0){
    chosenMoLife = 100;
}
let currentMonsterHealth = chosenMoLife;
let currentPlayerHealth = chosenMoLife;
let hasBonusLife = true;
AdjustHealthBar(chosenMoLife);

function writeToLog(event,value,monsterHealth,playerHealth){
    let logEntry={
            event:event,
            value:value,
            finalMonsterHealth:monsterHealth,
            finalPlayerHealth:playerHealth
    }
    if(event === LOG_EVENT_PLAYER_ATTACK){
        logEntry.target="MONSTER"
        
    }else if(event === LOG_EVENT_PLAYER_STRONG_ATTACK){
        logEntry = {
            event:event,
            value:value,
            finalMonsterHealth:monsterHealth,
            finalPlayerHealth:playerHealth
        }
        
    }else if(event === LOG_EVENT_MONSTER_ATTACK){
        logEntry = {
            event:event,
            value:value,
            target:"PLAYER",
            finalMonsterHealth:monsterHealth,
            finalPlayerHealth:playerHealth
        }
        
    }else if(event === LOG_EVENT_PLAYER_HEAL){
        logEntry = {
            event:event,
            value:value,
            target:"PLAYER",
            finalMonsterHealth:monsterHealth,
            finalPlayerHealth:playerHealth
        }
       
    }else if(event === LOG_EVENT_GAME_OVER){
        logEntry = {
            event:event,
            value:value,
            finalMonsterHealth:monsterHealth,
            finalPlayerHealth:playerHealth
        }
    }
    battleLog.push(logEntry);
}
function reset(){
    currentMonsterHealth = chosenMoLife;
    currentPlayerHealth = chosenMoLife;
    resetGame(chosenMoLife);
}

function endRound(){
    const initialPlayerHealth = currentMonsterHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK,playerDamage,currentMonsterHealth,currentPlayerHealth);

    if(currentPlayerHealth<=0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentMonsterHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('you would be dead but life bonus saved you!')
    }

    if(currentMonsterHealth <= 0 && currentPlayerHealth>0){
        alert("you won!")
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'You won!',
            currentMonsterHealth,
            currentPlayerHealth
        )
    }else if(currentPlayerHealth <= 0&& currentMonsterHealth > 0){
        alert("you lost")
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'Monster won!',
            currentMonsterHealth,
            currentPlayerHealth
        )
    }else if(currentMonsterHealth <=0 && currentPlayerHealth <=0){
        alert('you have a draw');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'Draw!',
            currentMonsterHealth,
            currentPlayerHealth
        )
    }
    if(currentMonsterHealth <= 0 && currentPlayerHealth <= 0){
        reset();
    }
}
function attackMonster(mode){
    let moDamage;
    let logEvent;
    if(mode === MODE_ATTACK){
        moDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    }else if(mode === MODE_STRONG_ATTACK){
        moDamage = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }
    const damage = dealMonsterDamage(moDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    )
    endRound()
}

function attackHandler(){
    attackMonster('ATTACK')
}
function strongAttackHandler(){
    attackMonster('STRONG_ATTACK')
}
function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMoLife - HEAL_VALUE){
        alert("you can't heal more than your max initial health");
        healValue = chosenMoLife - currentMonsterHealth;
    }else{
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    )
    endRound()
}
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler)
HealBtn.addEventListener('click',healPlayerHandler)
LogBtn.addEventListener('click',)