addLayer("spider", {
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        cooldown:0,
        xpos:0,
        extraXpos:0,
        extraX2pos:0,
        blockList:[],
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    grid: {
        rows: 9, // If these are dynamic make sure to have a max value as well!
        cols: 12,
        getStartData(id) {
            return 0
        },
        getUnlocked(id) { // Default
            return true
        },
        getCanClick(data, id) {
            return false
        },
        onClick(data, id) { 
            //player[this.layer].grid[id]++
        },
        getDisplay(data, id) {
            return ""
        },
        getStyle(data, id){
           if(player.spider.blockList.includes(id)) return {
                "background-color":"#ffffff",
                "height":"20px",
                "width":"20px"
            }
           else return {
                "background-color":"#cc6464",
                "height":"20px",
                "width":"20px"
            }
        }
    },
    layerShown(){return true},
    tabFormat:["grid"],
    update(diff){
        player.spider.xpos+=18*diff
        player.spider.extraXpos+=18*diff
         if(player.spider.extraXpos>=10){
            player.spider.extraX2pos++
            player.spider.extraXpos-=10
            for(let i=0;i<player.spider.blockList.length;i++){
                player.spider.blockList[i]=player.spider.blockList[i]-1
                if(((player.spider.blockList[i]%100)==0)||((player.spider.blockList[i]%100)>20)) player.spider.blockList.splice(i, 1)
            }//Update blocks
         }
         if(player.spider.extraX2pos>=3){
            player.spider.extraX2pos=0
            if(Math.random()>0.5){player.spider.blockList.push(112,212,312,412,512,612)}
           else player.spider.blockList.push(912,812,712,612,512,412)
           //Add new blocks
         }
         
    }
})
