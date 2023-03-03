const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;

let chosenMoLife = 100;
let currentMonsterHealth = chosenMoLife;
let currentPlayerHealth = chosenMoLife;
AdjustHealthBar(chosenMoLife);

function attackMonster(mode){
    let moDamage;
    if(mode === 'ATTACK'){
        moDamage = ATTACK_VALUE;
    }else{
        moDamage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(moDamage);
    currentMonsterHealth -= damage;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    if(currentMonsterHealth <= 0 && currentPlayerHealth>0){
        alert("you won!")
    }else if(currentPlayerHealth <= 0&& currentMonsterHealth > 0){
        alert("you lost")
    }else if(currentMonsterHealth <=0 && currentPlayerHealth <=0){
        alert('you have a draw');
    }
}

function attackHandler(){
    attackMonster('ATTACK')
}
function strongAttackHandler(){
    attackMonster('STRONG_ATTACK')

}
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler)