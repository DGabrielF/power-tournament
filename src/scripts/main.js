const state = {
  players: [
    {
      name: "Avalon",
      exp: Math.floor(Math.random()*10500),
      article: "o"
    },
    {
      name: "Galadriel",
      exp: Math.floor(Math.random()*10500),
      article: "a"
    },
    {
      name: "Gwydion",
      exp: Math.floor(Math.random()*10500),
      article: "o"
    },
    {
      name: "Itília",
      exp: Math.floor(Math.random()*10500),
      article: "a"
    }
  ],
  classification: [
    {
      name: "Ferro",
      minExp: 0,
    },
    {
      name: "Bronze",
      minExp: 1001,
    },
    {
      name: "Prata",
      minExp: 2001,
    },
    {
      name: "Ouro",
      minExp: 5001,
    },
    {
      name: "Platina",
      minExp: 7001,
    },
    {
      name: "Ascendente",
      minExp: 8001,
    },
    {
      name: "Imortal",
      minExp: 9001,
    },
    {
      name: "Radiante",
      minExp: 10001,
    },
  ]
}

async function init() {
  const championsList = document.querySelector(".champions_list");

  for (const champion of state.players) {
    const span = document.createElement("span");
    span.textContent = champion.name;
    championsList.appendChild(span)
  }
  addSpanBattleLog("Que comecem os jogos!!!")
  const defeatedChampions =  [];
  let currentChampion = getChampion();
  addSpanBattleLog(`Sorteado como primeiro defensor, ${currentChampion.article} desafiante... ${currentChampion.name}`);
  while (true) {
    const challenger = getChampion();
    
    const isChallengerDefeated = defeatedChampions.some(champion => champion.name === challenger.name);
    if (isChallengerDefeated) {
      continue
    }
    
    if (challenger === currentChampion) {
      continue
    }

    if (challenger.name !== currentChampion.name) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      addSpanBattleLog(`com vocês ${challenger.article} desafiante... ${challenger.name}`);
      toggleBattleAnimation()
      await new Promise(resolve => setTimeout(resolve, 3900));
      toggleBattleAnimation()
      currentChampion = powerComparison(challenger, currentChampion, defeatedChampions);
      if (defeatedChampions.length === state.players.length -1) {
        addSpanBattleLog(`Tenho a honra de apresentar a vocês `); 
        
        await new Promise(resolve => setTimeout(resolve, 800));
        const heroClassification = classifyHero(currentChampion.exp)
        addSpanBattleLog(`${currentChampion.article.toUpperCase()} Herói${currentChampion.article==="a"?"na":""} de nome ${currentChampion.name} está no nível de ${heroClassification}`);
        console.log(`${currentChampion.article.toUpperCase()} Herói${currentChampion.article==="a"?"na":""} de nome ${currentChampion.name} está no nível de ${heroClassification}`)
        
        addSpanBattleLog(`${currentChampion.article.toUpperCase()} mais nov${currentChampion.article} CAMPEÃ${currentChampion.article==="o"?"O":""}: ${currentChampion.name.toUpperCase()}`);  
        break
      }
    }
  }
}

init()

function powerComparison(challenger, champion, defeatedArray) {
  if (challenger.exp > champion.exp) {
    defeatedArray.push(champion);
    addSpanBattleLog(`${challenger.article.toUpperCase()} desafiante ${challenger.name} surpreendeu ${champion.article} atual defensor${champion.article==="a"?"a":""} ${champion.name}`);

    champion = challenger;
    addSpanBattleLog(`e se tonou ${champion.article} principal candidat${champion.article} ao título`);
  } else if (champion.exp > challenger.exp) {
    defeatedArray.push(challenger);
    addSpanBattleLog(`${champion.article.toUpperCase()} defensor${champion.article==="a"?"a":""} ${champion.name} esmagou s${challenger.article==="a"?"ua":"eu"} desafiante`);
    addSpanBattleLog(`e agora está gritando no meio da arena por mais diversão`);
  }
  return champion;
}

function classifyHero(exp) {
  const filtered = state.classification.filter(item => item.minExp < exp).sort();
  const classification = filtered.length > 0 ? filtered[filtered.length-1] : state.classification.reduce((biggerExp, currentExp) => {
    return currentExp.minExp > biggerExp.minExp? currentExp: biggerExp;
  }, state.classification[0])
  return classification.name
}

function getChampion() {
  const randomIndex = Math.floor(Math.random() * state.players.length)
  return state.players[randomIndex]
}

function toggleBattleAnimation() {
  const battleAnimation = document.querySelector(".battle_animation");
  if (battleAnimation.classList.contains("hide")) {
    battleAnimation.classList.remove("hide")
  } else {
    battleAnimation.classList.add("hide")
  }
}

function addSpanBattleLog(message) {
  const championsBattleLog = document.querySelector(".champions_battle");

  const span = document.createElement("span");
  span.textContent = message;

  championsBattleLog.appendChild(span)
}