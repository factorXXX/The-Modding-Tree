addLayer("n", {
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "numbers", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if(hasUpgrade('n',23))mult=mult.times(4)
        if(hasUpgrade('n',34))mult=mult.times(4)
        if(hasUpgrade('n',35))mult=mult.times(upgradeEffect('n',35))
        if(hasUpgrade('n',13))mult=mult.times(upgradeEffect('n',13))
        if(hasUpgrade('n',15))mult=mult.times(upgradeEffect('n',15))
        if(hasMilestone('a',3))mult=mult.times(player.a.points.pow(0.5).add(1))
        if(hasMilestone('s',1))mult=mult.times(player.s.points.add(1))
        let s2ExMil=D(0)
	    if(hasMilestone('s',4))s2ExMil=s2ExMil.add(player.s.points.add(1).log(1.618).add(1))
        if(hasUpgrade('n',44))s2ExMil=s2ExMil.add(10)
        if(hasMilestone('s',2))mult=mult.times(D(1.5).pow(s2ExMil.add(player.s.milestones.length)))
        if(hasMilestone('s',3))mult=mult.times(player.n.points.add(10).log(10))
        if(hasAchievement('ach',13))mult=mult.times(1.5)
        if(hasAchievement('ach',14))mult=mult.times(1.5)
        if(hasAchievement('ach',15))mult=mult.times(2)
        if(hasMilestone('m',1))mult=mult.times(player.m.points.pow(0.5).add(1))
        if(hasChallenge('m',12))mult=mult.times(tmp.m.mpEff)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        if(inChallenge('m',12))return D(0)
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "N: Reset for numbers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades:{
        11:{
            title:"-∞+∞i",
        cost(){return new Decimal(!hasUpgrade('n',51)?1/0:1e7)},
        description:"Unlock Addition.",
        style(){
            if(hasUpgrade('n',51))return;
            return{"background-color":"#0f0f0f"}
        },
    },
        12:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
        13:{
            title:"∞i",
            cost(){return new Decimal(!hasUpgrade('n',35)?1/0:100)},
            description:"Number boost Number gain.",
            effect(){return player.n.points.add(10).log(10).pow(1.5)},
            effectDisplay(){return format(upgradeEffect('n',13))+"x"},
            style(){
                if(hasUpgrade('n',35))return;
                return{"background-color":"#0f0f0f"}
            },
        },
        14:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
        15:{
            title:"∞+∞i",
            cost(){return new Decimal(!hasUpgrade('n',13)?1/0:2500)},
            description:"Number gain is boosted by upgrades amount.",
            effect(){return D(2).pow(Decimal.pow(player.n.upgrades.length,hasUpgrade('n',24)?0.8:0.5))},
            effectDisplay(){return format(upgradeEffect('n',15))+"x"},
            style(){
                if(hasUpgrade('n',13))return;
                return{"background-color":"#0f0f0f"}
            },
        },
        21:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
        22:{
            title:"-1+i",
            cost(){return new Decimal(!(player.a.unlocked&&player.s.unlocked)?1/0:1e24)},
            description:"Get 3 free addition milestone.",
            style(){
                if(player.a.unlocked&&player.s.unlocked)return;
                return{"background-color":"#0f0f0f"}
            },
        },
        23:{
            title:"i",
            cost(){return new Decimal(!hasMilestone('a',4)?1/0:1e10)},
            description:"Number gain x4.",
            style(){
                if(hasMilestone('a',4))return;
                return{"background-color":"#0f0f0f"}
            },
        },
        24:{
            title:"1+i",
            cost(){return new Decimal(!(player.a.unlocked&&player.s.unlocked)?1/0:1e18)},
            description:"boost upgrade 15 effect.",
            style(){
                if(player.a.unlocked&&player.s.unlocked)return;
                return{"background-color":"#0f0f0f"}
            },
        },
        25:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
        31:{
            title:"-∞",
            cost(){return new Decimal(!hasUpgrade('n',33)?1/0:5)},
            description:"Number boost Point gain.",
            effect(){return player.n.points.add(10).log(10).pow(3)},
            effectDisplay(){return format(upgradeEffect('n',31))+"x"},
            style(){
                if(hasUpgrade('n',33))return;
                return{"background-color":"#0f0f0f"}
            },
        },
        32:{
            title:"-1",
            cost(){return new Decimal(!hasMilestone('s',2)?1/0:1e9)},
            description:"Point gain x4.",
            style(){
                if(hasMilestone('s',2))return;
                return{"background-color":"#0f0f0f"}
            },
        },
        33:{
            title:"0",
            cost:new Decimal(1),
            description:"Point gain x4.",
            
        },
        34:{
            title:"1",
            cost(){return new Decimal(!hasMilestone('s',2)?1/0:1e10)},
            description:"Mumber gain x4.",
            style(){
                if(hasMilestone('s',2))return;
                return{"background-color":"#0f0f0f"}
            },
        },
        35:{
            title:"∞",
            cost(){return new Decimal(!hasUpgrade('n',33)?1/0:5)},
            description:"Point boost Number gain.",
            effect(){return player.points.add(10).log(10)},
            effectDisplay(){return format(upgradeEffect('n',35))+"x"},
            style(){
                if(hasUpgrade('n',33))return;
                return{"background-color":"#0f0f0f"}
            },
        },
        41:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
        42:{
            title:"-1+(-i)",
            cost(){return new Decimal(!(player.a.unlocked&&player.s.unlocked)?1/0:1e21)},
            description:"boost upgrade 51 effect.",
            style(){
                if(player.a.unlocked&&player.s.unlocked)return;
                return{"background-color":"#0f0f0f"}
            },
        },
        43:{
            title:"-i",
            cost(){return new Decimal(!hasMilestone('a',4)?1/0:1e11)},
            description:"Point gain x4.",
            style(){
                if(hasMilestone('a',4))return;
                return{"background-color":"#0f0f0f"}
            },
        },
        44:{
            title:"1+(-i)",
            cost(){return new Decimal(!(player.a.unlocked&&player.s.unlocked)?1/0:1e27)},
            description:"Get 10 subtraction milestones.",
            style(){
                if(player.a.unlocked&&player.s.unlocked)return;
                return{"background-color":"#0f0f0f"}
            },
        },
        45:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
        51:{
            title:"-∞+(-∞i)",
            cost(){return new Decimal(!hasUpgrade('n',53)?1/0:2500)},
            description:"Point gain is boosted by upgrades amount.",
            effect(){return D(2).pow(Decimal.pow(player.n.upgrades.length,hasUpgrade('n',42)?1.2:1))},
            effectDisplay(){return format(upgradeEffect('n',51))+"x"},
            style(){
                if(hasUpgrade('n',53))return;
                return{"background-color":"#0f0f0f"}
            },
        },
        52:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
        53:{
            title:"-∞i",
            cost(){return new Decimal(!hasUpgrade('n',31)?1/0:100)},
            description:"Point boost Point gain.",
            effect(){return player.points.add(10).log(10).pow(1.5)},
            effectDisplay(){return format(upgradeEffect('n',53))+"x"},
            style(){
                if(hasUpgrade('n',31))return;
                return{"background-color":"#0f0f0f"}
            },
        },
        54:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
        55:{
            title:"∞+(-∞i)",
        cost(){return new Decimal(!hasUpgrade('n',15)?1/0:1e7)},
        description:"Unlock Subtraction.",
        style(){
            if(hasUpgrade('n',15))return;
            return{"background-color":"#0f0f0f"}
        },
        },
    },
    doReset(resettingLayer){
        let keep = []
        if(layers[resettingLayer].row<= this.row) return;
        if (hasMilestone('a', 4)) keep.push("upgrades")
        layerDataReset(this.layer, keep)
    },
    branches:['a','s'],
    autoUpgrade(){return hasMilestone('m',2)}
})
addLayer("a", {
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#3782d3",
    requires(){if(player.s.points.gte(1)&&!player.a.points.gte(1)) return new Decimal("1e12")
    else return new Decimal("1e8")}, 
    resource: "additions", // Name of prestige currency
    baseResource: "numbers", // Name of resource prestige is based on
    baseAmount() {return player.n.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already hav
    base(){
        return 4
    },
    exponent(){
        if(player.a.points.gte(12)) return new Decimal(0.75).add(player.a.points.sub(11).times(0.05));
        return 0.75
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for additions", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.a.unlocked||player.s.unlocked||hasUpgrade('n',11)},
    milestones: {
        1: {
            requirementDescription: "1 additions",
            effectDescription: "Addition*2+1 boost point gain",
            done() { return player.a.points.gte(1) },
        },
        2: {
            requirementDescription: "2 additions",
            effectDescription: "Per milestone double point gain.",
            done() { return player.a.points.gte(2) },
        },
        3: {
            requirementDescription: "3 additions",
            effectDescription: "Addition^0.5+1 boost number gain.",
            done() { return player.a.points.gte(3) },
        },
        4: {
            requirementDescription: "5 additions",
            effectDescription: "keep number upgrade, and unlock more.",
            done() { return player.a.points.gte(5) },
        },
        5: {
            requirementDescription: "8 additions",
            effectDescription: "log(point+10) boost point gain.",
            done() { return player.a.points.gte(8) },
        },
        6: {
            requirementDescription: "18 additions",
            effectDescription: "log1.618(addition+1)+1 add to second milestone milestone count.",
            done() { return player.a.points.gte(18) },
        },
        7: {
            requirementDescription: "21 additions",
            effectDescription: "Fifth milestone effect ^2.5.",
            done() { return player.a.points.gte(21) },
        },
    },
    autoPrestige(){return hasMilestone('m',3)}
}),
addLayer("s", {
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    requires(){if(player.a.points.gte(1)&&!player.s.points.gte(1)) return new Decimal("1e15")
    else return new Decimal("1e9")}, 
    color: "#d36f5a",
    resource: "Subtractions", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already hav
    base:4,
    exponent: 1.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for subtractions", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    milestones: {
        1: {
            requirementDescription: "1 subtraction",
            effectDescription: "Subtraction+1 boost number gain. And double point gain",
            done() { return player.s.points.gte(1) },
        },
        2: {
            requirementDescription: "2 subtraction",
            effectDescription: "Number gain *1.5 per milestone. And unlock number upgrade.",
            done() { return player.s.points.gte(2) },
        },
        3: {
            requirementDescription: "4 subtraction",
            effectDescription: "log(number+10) boost number gain.",
            done() { return player.s.points.gte(4) },
        },
        4: {
            requirementDescription: "8 subtraction",
            effectDescription: "Mod maker is generous so he give you 1 free subtraction milestone!.",
            done() { return player.s.points.gte(8) },
        },
        5: {
            requirementDescription: "16 subtraction",
            effectDescription: "log1.618(subtraction+1)+1 add to second milestone milestone count.",
            done() { return player.s.points.gte(16) },
        },
    },

    layerShown(){return player.a.unlocked||player.s.unlocked||hasUpgrade('n',55)},
})
addLayer("m", {
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        mp:new Decimal(0)
    }},
    requires(){if(player.d.points.gte(1)&&!player.m.points.gte(1)) return new Decimal("1e60")
    else return new Decimal("1e31")}, 
    color: "#c2a958",
    resource: "Multiplication", // Name of prestige currency
    baseResource: "numbers", // Name of resource prestige is based on
    baseAmount() {return player.n.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already hav
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for Multiplication", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches:['a'],
    layerShown(){return player.a.unlocked},
    update(diff){
        player.m.mp=player.m.mp.add(tmp.m.mpGain.times(diff))
    },
    milestones: {
        1: {
            requirementDescription: "2 Multiplication",
            effectDescription: "Multiplication^0.5+1 boost number gain.",
            done() { return player.m.points.gte(2) },
        },
        2: {
            requirementDescription: "4 Multiplication",
            effectDescription: "Auto buy number upgrade.",
            done() { return player.m.points.gte(4) },
        },
        3: {
            requirementDescription: "8 Multiplication",
            effectDescription: "Auto buy addition.",
            done() { return player.m.points.gte(8) },
        },
        4: {
            requirementDescription: "16 Multiplication",
            effectDescription: "Unlock 2 challenge, which goals will change based on other challenge completition.",
            done() { return player.m.points.gte(16) },
        },
        5: {
            requirementDescription: "100 Multiplication",
            effectDescription: "Unlock.",
            done() { return player.m.points.gte(16) },
        },
    },
    tabFormat:[
        "main-display",
        "prestige-button",
        "resource-display",
        "blank",
        ["display-text",()=>{return "You have "+format(player.m.mp)+" Multiplication Point. Which boost point gain by "+format(tmp.m.mpEff)}],
        ["display-text",()=>{return "You are gaining "+format(tmp.m.mpGain)+" Multiplication Point per second."}],
        "blank",
        "milestones",
        "blank",
        "challenges",
    ],
    mpGain(){
        return player.m.points.pow(0.8)
    },
    mpEff(){
        let eff= player.m.mp.add(1).pow(0.5)
        if(hasChallenge('m',11))eff=eff.pow(2)
        return eff
    },
    challenges:{
        11:{
        name: "Pointless",
        challengeDescription: "Point gain is always 1",
        goalDescription(){return hasChallenge('m',12)?"600,000 numbers":"720 numbers"},
        canComplete: function() {return player.n.points.gte(hasChallenge('m',12)?6e5:720)},
        rewardDescription:"Square Multiplication point effect."
        },
        12:{
        name: "Numberless",
        challengeDescription: "Number gain is always 0",
        goalDescription(){return hasChallenge('m',11)?"250,000 Points":"2,000 Points"},
        canComplete: function() {return player.points.gte(hasChallenge('m',12)?2.5e5:2000)},
        rewardDescription:"Number gain is boosted by multiplication point."
        },
    }
})
addLayer("d", {
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    requires(){if(player.m.points.gte(1)&&!player.d.points.gte(1)) return new Decimal("21")
    else return new Decimal("18")}, 
    color: "#dfa2f6",
    resource: "Division", // Name of prestige currency
    baseResource: "subtraction", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already hav
    exponent: 7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for Division", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches:['s'],
    layerShown(){return player.a.unlocked},
})
addLayer("ach", {
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }}, 
    requires:new Decimal(0),
    color: "#38d2af",
    resource: "Achievements", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already hav
    base:4,
    exponent: 1.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    achievements: {
        11: {
            name: "The start",
            tooltip:"Get an number.",
            done(){return player.n.points.gte(1)}
        },
        12: {
            name: "Infinite",
            tooltip:"Get a infinity upgrade.",
            done(){return hasUpgrade('n',35)}
        },
        13: {
            name: "+",
            tooltip:"Get an addition. Reward: number gain x1.5",
            done(){return player.a.points.gte(1)}
        },
        14: {
            name: "-",
            tooltip:"Get a subtraction. Reward: number gain x1.5",
            done(){return player.s.points.gte(1)}
        },
        15: {
            name: "+-",
            tooltip:"Get both addition and subtraction. Reward: number gain x2",
            done(){return player.a.points.gte(1)&&player.s.points.gte(1)}
        },
    },

    layerShown(){return true},
})
function D(x){return new Decimal(x)}     