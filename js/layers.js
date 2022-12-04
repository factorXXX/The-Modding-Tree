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
        mult=mult.times(D(3).pow(D(player.d.eff2).pow(0.8)))   
        if(hasMilestone('d',3))mult=mult.times(D(10).pow(D(player.d.eff1).pow(0.6)).pow(0.5))     
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
        21:{
            title:"-∞+i",
            cost(){return new Decimal(!hasChallenge('d',12)?1/0:1e36)},
            description:"Subtration cost scale slower.",
            style(){
                if(hasChallenge('d',12))return;
                return{"background-color":"#0f0f0f"}
            },
        },
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
        25:{
            title:"∞+i",
            cost(){return new Decimal(!hasChallenge('d',12)?1/0:1e40)},
            description:"Addition cost scale slower.",
            style(){
                if(hasChallenge('d',12))return;
                return{"background-color":"#0f0f0f"}
            },
        },
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
        41:{
            title:"-∞-i",
            cost(){return new Decimal(!hasChallenge('d',12)?1/0:6.66e66)},
            description:"Multiplication points boost dots gain.",
            style(){
                if(hasChallenge('d',12))return;
                return{"background-color":"#0f0f0f"}
            },
            effect(){return player.m.mp.add(10).log(10).pow(1.4)},
            effectDisplay(){return format(upgradeEffect('n',41))+"x"},
        },
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
        45:{
            title:"∞-i",
            cost(){return new Decimal(!hasChallenge('d',12)?1/0:1e92)},
            description:"Addition boost Multiplication gain.",
            style(){
                if(hasChallenge('d',12))return;
                return{"background-color":"#0f0f0f"}
            },
            effect(){return player.a.points.pow(1.1).add(1)},
            effectDisplay(){return format(upgradeEffect('n',45))+"x"},
        },
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
        if (hasMilestone('s', 3)) keep.push("upgrades")
        layerDataReset(this.layer, keep)
    },
    branches:['a','s'],
    autoUpgrade(){return hasMilestone('m',2)},
    passiveGeneration(){return hasMilestone('d',1)?tmp.d.effect.pow(2).times(0.01):0}
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
        let base=0.75
        if(hasUpgrade('n',25))base=0.65
        if(player.a.points.gte(12)) return new Decimal(base).add(player.a.points.sub(11).times(0.05));
        return base
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
    autoPrestige(){return hasMilestone('m',3)},
   resetsNothing(){return hasUpgrade('dim0',12)},
   milestonePopups(){return !hasMilestone('m',3)},
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
    exponent(){
        if(hasUpgrade('n',21)) return 1.15
        return 1.25
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
            effectDescription: "log(number+10) boost number gain. And keep number upgrade on reset.",
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
    canBuyMax(){return hasAchievement('ach',23)},
    autoPrestige(){return hasMilestone('d',5)},
    layerShown(){return player.a.unlocked||player.s.unlocked||hasUpgrade('n',55)},
    resetsNothing(){return hasUpgrade('dim0',12)},
    milestonePopups(){return !hasMilestone('d',5)},
})
addLayer("m", {
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        mp:new Decimal(0)
    }},
    requires(){if(player.d.points.gte(1)&&!player.m.points.gte(1)) return new Decimal("1e42")
    else return new Decimal("1e31")}, 
    color: "#c2a958",
    resource: "Multiplication", // Name of prestige currency
    baseResource: "numbers", // Name of resource prestige is based on
    baseAmount() {return player.n.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already hav
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if(player.dim1.spellTime[1]!=0)mult=mult.times(8)
        if(hasUpgrade('n',45))mult=mult.times(upgradeEffect('n',45))
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
        let gain= player.m.points.pow(0.8)
        if(hasUpgrade('dim0',11))gain=gain.times(upgradeEffect('dim0',11))
        return gain
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
        rewardDescription:"Square Multiplication point effect.",
        unlocked(){return hasMilestone('m',4)},
        },
        12:{
        name: "Numberless",
        challengeDescription: "Number gain is always 0",
        goalDescription(){return hasChallenge('m',11)?"250,000 Points":"2,000 Points"},
        canComplete: function() {return player.points.gte(hasChallenge('m',12)?2.5e5:2000)},
        rewardDescription:"Number gain is boosted by multiplication point.",
        unlocked(){return hasMilestone('m',4)},
        },
    }
})
addLayer("d", {
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        eff1:"",
        eff2:"",
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
    effect(){return player.d.points.max(1).log(hasChallenge('d',11)?1.5:2).add(1).floor()},
    effectDescription(){return "which provide "+tmp.d.effect+" building power."},
    milestones: {
        1: {
            requirementDescription: "3 Division",
            effectDescription: "Generate (Building power^2)% Number on reset per second.",
            done() { return player.d.points.gte(3) },
        },
        2: {
            requirementDescription: "6 Division",
            effectDescription: "Effect 2 also boost point gain.",
            done() { return player.d.points.gte(6) },
        },
        3: {
            requirementDescription: "12 Division",
            effectDescription(){return "Effect 1 also boost number gain at reduced rate.<br>Currently: "+format(D(10).pow(D(player.d.eff1).pow(0.6)).pow(0.5))+"x"},
            done() { return player.d.points.gte(12) },
        },
        4: {
            requirementDescription: "18 Division",
            effectDescription(){return "Unlock Challenge."},
            done() { return player.d.points.gte(18) },
        },
        5: {
            requirementDescription: "100 Division",
            effectDescription(){return "Auto buy subtraction."},
            done() { return player.d.points.gte(100) },
        },
    },
    tabFormat:[
        "main-display",
        "prestige-button",
        "resource-display",
        "blank",
        ["row",[
            ["display-text",()=>{
            return "Effect 1: Boost point gain. Currently: "+format(D(10).pow(D(player.d.eff1).pow(0.8)))+"x "
            }],
            "blank",
            ["slider",["eff1",0,()=>tmp.d.effect.sub(player.d.eff2)]]
         ]],
         ["row",[
            ["display-text",()=>{
            return "Effect 2: Boost number gain. Currently: "+format(D(3).pow(D(player.d.eff2).pow(0.8)))+"x "
            }],
            "blank",
            ["slider",["eff2",0,()=>tmp.d.effect.sub(player.d.eff1)]]
         ]],
        "blank"
        ,
        "milestones",
        "blank",
        "challenges",
    ],
    update(diff){
        if(D(player.d.eff1).add(player.d.eff2).gt(tmp.d.effect)){
            player.d.eff1=0
            player.d.eff2=0
        }
        if(!(D(player.d.eff1).eq(D(player.d.eff1).floor()))){
            player.d.eff1=0
            player.d.eff2=0
        }
        if(!(D(player.d.eff2).eq(D(player.d.eff2).floor()))){
            player.d.eff1=0
            player.d.eff2=0
        }
        if(inChallenge('d',11))player.points=player.points.min(getPointGen())
        if(inChallenge('d',12))player.n.points=player.n.points.min(tmp.n.resetGain)
    },
    challenges:{
        11:{
        name: "PointCap",
        challengeDescription: "Point is cap to one second of it production.",
        goalDescription(){return hasChallenge('d',12)?"1.9e34 points":"2e32 points"},
        canComplete: function() {return player.points.gte(hasChallenge('d',12)?1.9e34:2e32)},
        rewardDescription:"Building power scaling is slower.",
        unlocked(){return hasMilestone('d',4)},
        },
        12:{
        name: "NumberCap",
        challengeDescription: "Number is cap to reset amount.",
        goalDescription(){return hasChallenge('d',11)?"2.5e37 numbers":"1e35 numbers"},
        canComplete: function() {return player.n.points.gte(hasChallenge('d',11)?2.5e37:1e35)},
        rewardDescription:"Unlock more number upgrade.",
        unlocked(){return hasMilestone('d',4)},
        },
    },
    shouldRoundUp:true,
})
addLayer("dim0", {
    symbol: "DO", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    requires(){return new Decimal("1e50")}, 
    
    displayRow:0,
    color: "#82da65",
    resource: "Dot", // Name of prestige currency
    baseResource: "point", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already hav
    exponent: 0, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        mult=mult.times(tmp.dim0.buyables[11].effect)
        mult=mult.times(tmp.dim0.buyables[12].effect)
        mult=mult.times(tmp.dim0.buyables[13].effect)
        if(hasUpgrade('n',41))mult=mult.times(upgradeEffect('n',41))
        if(player.dim1.spellTime[0]!=0)mult=mult.times(8)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    getResetGain(){
      if(!player.dim0.unlocked)return D(0);
      let gain=D(1)
      gain=gain.times(tmp.dim0.gainMult)
      return gain
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.m.points.gte(1)&&player.d.points.gte(1)},
    tabFormat:[
        "main-display",
        "resource-display",
        "blank",
        "buyables",
        "blank",
        "upgrades",
    ],
    passiveGeneration:1,
    buyables: {
        11: {
            title: "Dot make Dot",
            display() {
               return "<br>Double Dot gain<br><br>Currently: "+format(tmp.dim0.buyables[this.id].effect)+"x<br><br>Cost : " + format(tmp.dim0.buyables[this.id].cost) + " Dots"
            },
            unlocked() { return true},
            canAfford() { 
              return player.dim0.points.gte(tmp.dim0.buyables[this.id].cost) 
            },
            cost(){
                let amount=getBuyableAmount(this.layer, this.id)
                let power=D(1.1)
                if(amount.gte(35))power=power.add(amount.sub(35).div(200))
            return  D(10).times(D(3).pow(getBuyableAmount(this.layer, this.id).pow(power)))
            },
            buy() { 
                {
                   player.dim0.points = player.dim0.points.minus(tmp.dim0.buyables[this.id].cost)
                }
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() { 
              return new Decimal(2).pow(getBuyableAmount(this.layer, this.id))                
            }
        },
        12: {
            title: "Divide Dot",
            display() {
               return "<br>Boost Dot gain base on Division<br><br>Currently: "+format(tmp.dim0.buyables[this.id].effect)+"x<br><br>Cost : " + format(tmp.dim0.buyables[this.id].cost) + " Dots"
            },
            unlocked() { return true},
            canAfford() { 
              return player.dim0.points.gte(tmp.dim0.buyables[this.id].cost) 
            },
            cost(){
                let amount=getBuyableAmount(this.layer, this.id)
                let power=D(1.25)
                if(amount.gte(35))power=power.add(amount.sub(35).div(200))
            return  D(1000).times(D(10).pow(getBuyableAmount(this.layer, this.id).pow(power)))
            },
            buy() { 
                {
                   player.dim0.points = player.dim0.points.minus(tmp.dim0.buyables[this.id].cost)
                }
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() { 
              return player.d.points.add(10).log(10).pow(getBuyableAmount(this.layer, this.id))                
            }
        },
        13: {
            title: "Subtract the Size of Dot",
            display() {
               return "<br>Boost Dot gain base on Subtration<br><br>Currently: "+format(tmp.dim0.buyables[this.id].effect)+"x<br><br>Cost : " + format(tmp.dim0.buyables[this.id].cost) + " Dots"
            },
            unlocked() { return true},
            canAfford() { 
              return player.dim0.points.gte(tmp.dim0.buyables[this.id].cost) 
            },
            cost(){
            return  D(1e12).times(D(20).pow(getBuyableAmount(this.layer, this.id).pow(1.3)))
            },
            buy() { 
                {
                   player.dim0.points = player.dim0.points.minus(tmp.dim0.buyables[this.id].cost)
                }
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() { 
              return player.s.points.add(1).pow(0.5).pow(getBuyableAmount(this.layer, this.id))                
            }
        },
    },
    update(diff){
        if(player.points.gte(1e50)&&!player.dim0.unlocked)player.dim0.unlocked=true
    },
    upgrades:{
        11:{
            description:"Make dot boost multiplication point gain.",
            cost:D(4e6),
            effect(){return player.dim0.points.add(10).pow(0.2)},
            effectDisplay(){return format(upgradeEffect('dim0',11))+"x"}
        },
        12:{
            description:"Make both A and D reset nothing.",
            cost:D(1e32),
            unlocked(){return hasUpgrade(this.layer,11)}
        },
        13:{
            description:"Unlock line.",
            cost:D(1e40),
            unlocked(){return hasUpgrade(this.layer,11)}
        },
    },
    doReset(resettingLayer){
        let keep = []
        if(layers[resettingLayer].row> this.row||resettingLayer=="dim1")layerDataReset(this.layer, keep)
    },
})
addLayer("dim1", {
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 5, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        spellTime:[0,0],
    }},
    requires(){return new Decimal("1e40")}, 
    
    displayRow:1,
    color: "#a8ad2a",
    resource: "Line", // Name of prestige currency
    baseResource: "dot", // Name of resource prestige is based on
    baseAmount() {return player.dim0.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already hav
    exponent: 0.05, // Prestige currency exponent
branches:['dim0'],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade('dim0',13)||player.dim1.unlocked},
    tabFormat:[
        "main-display",
        "prestige-button",
        "resource-display",
        "blank",
        "clickables"
    ],
    clickables:
    {
        11:{
        title(){return `Super dot division<br><small><small>Cosume 1 line, boost your dot gain by 8 for 20 seconds.<br>Time: ${format(player.dim1.spellTime[0])}s</small></small>`},
        canClick(){return player.dim1.points.gte(1)},
        onClick(){
            player.dim1.spellTime[0]=20
            player.dim1.points=player.dim1.points.sub(1)
        },
        style(){
           return{
             "min-height":"120px",
             "width":"240px",
           }
        },
      },
      12:{
        title(){return `Multiple dot equals line<br><small><small>Cosume 1 line, boost your multiplcation gain by 8 for 40 seconds.<br>Time: ${format(player.dim1.spellTime[1])}s</small></small>`},
        canClick(){return player.dim1.points.gte(1)},
        onClick(){
            player.dim1.spellTime[1]=40
            player.dim1.points=player.dim1.points.sub(1)
        },
        style(){
           return{
             "min-height":"120px",
             "width":"240px",
           }
        },
      },
    
    },
      update(diff){
          
          player.dim1.spellTime[0]=Math.max(player.dim1.spellTime[0]-diff,0)
          player.dim1.spellTime[1]=Math.max(player.dim1.spellTime[1]-diff,0)
      }
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
        21: {
            name: "x",
            tooltip:"Get a multiplication.",
            done(){return player.m.points.gte(1)}
        },
        22: {
            name: "/",
            tooltip:"Get a division.",
            done(){return player.d.points.gte(1)}
        },
        23: {
            name: "x/",
            tooltip:"Get both addition and subtraction. Reward: buy max subtraction.",
            done(){return player.m.points.gte(1)&&player.d.points.gte(1)}
        },
        24: {
            name: "challenging",
            tooltip:"Complete first 2 M and D challenge",
            done(){return hasChallenge('m',11)&&hasChallenge('m',12)&&hasChallenge('d',11)&&hasChallenge('d',12)}
        },
    },

    layerShown(){return true},
})
function D(x){return new Decimal(x)}     