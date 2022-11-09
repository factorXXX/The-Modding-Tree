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
        if(hasUpgrade('n',35))mult=mult.times(upgradeEffect('n',35))
        if(hasUpgrade('n',13))mult=mult.times(upgradeEffect('n',13))
        if(hasUpgrade('n',15))mult=mult.times(upgradeEffect('n',15))
        if(hasMilestone('a',3))mult=mult.times(player.a.points.pow(0.5).add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
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
            effect(){return D(2).pow(Decimal.pow(player.n.upgrades.length,0.5))},
            effectDisplay(){return format(upgradeEffect('n',15))+"x"},
            style(){
                if(hasUpgrade('n',13))return;
                return{"background-color":"#0f0f0f"}
            },
        },
        21:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
        22:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
        23:{
            title:"i",
            cost(){return new Decimal(!hasMilestone('a',4)?1/0:1e10)},
            description:"Number gain x4.",
            style(){
                if(hasMilestone('a',4))return;
                return{"background-color":"#0f0f0f"}
            },
        },
        24:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
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
        32:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
        33:{
            title:"0",
            cost:new Decimal(1),
            description:"Point gain x4.",
            
        },
        34:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
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
        42:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
        43:{
            title:"-i",
            cost(){return new Decimal(!hasMilestone('a',4)?1/0:1e11)},
            description:"Point gain x4.",
            style(){
                if(hasMilestone('a',4))return;
                return{"background-color":"#0f0f0f"}
            },
        },
        44:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
        45:{style(){return{"background-color":"#0f0f0f"}},cost:new Decimal(1/0),},
        51:{
            title:"-∞+(-∞i)",
            cost(){return new Decimal(!hasUpgrade('n',53)?1/0:2500)},
            description:"Point gain is boosted by upgrades amount.",
            effect(){return D(2).pow(Decimal.pow(player.n.upgrades.length,1))},
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
    }
})
addLayer("a", {
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#3782d3",
    requires(){if(player.s.points.gte(1)&&!player.a.points.gte(1)) return new Decimal("1e14")
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
    },
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
    layerShown(){return player.a.unlocked||player.s.unlocked||hasUpgrade('n',55)},
})
function D(x){return new Decimal(x)}     