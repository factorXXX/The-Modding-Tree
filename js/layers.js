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
        player:702,
        gravity:false,
        realY:0,
        drop_acc:0,
        jumping:false
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
        rows: 14, // If these are dynamic make sure to have a max value as well!
        cols: 20,
        getStartData(id) {
            return 0
        },
        getUnlocked(id) {
            return true
        },
        getCanClick(data, id) {
            return false
        },
        onClick(data, id) { 
        },
        getDisplay(data, id) {
            return ""
        },
        getStyle(data, id){
           if(player.spider.blockList.includes(id)) return {
                "background-color":"#ffffff",
                "min-height":"10px",
                "min-width":"0px",
                "margin-left":"-1px",
            }
            if(player.spider.player==id) return {
                "background-color":"#cc64cc",
                "min-height":"10px",
                "min-width":"0px",
                "margin-left":"-1px",
            }
           return {
                "background-color":"#cc6464",
                "min-height":"10px",
                "min-width":"0px",
                "margin-left":"-1px",
            }
        }
    },
    clickables:{
11:{
    display:"Move",
    canClick:true,
    onClick(){
        player.spider.gravity=!player.spider.gravity
        if(player.spider.gravity)player.spider.realY=65
        else player.spider.realY=0
        player.spider.jumping=false
    },
},
13:{
    display:"Jump",
    canClick:true,
    onClick(){
        if(player.spider.realY<=0&&!player.spider.gravity)jumpSpider(9)
        if(player.spider.realY>=65&&player.spider.gravity)jumpSpiderR(9)      
    },
}
    },
    layerShown(){return true},
    tabFormat:["grid",'blank','clickables'],
    update(diff){
        player.spider.xpos+=60*diff
        player.spider.extraXpos+=60*diff
         if(player.spider.extraXpos>=10){
            player.spider.extraX2pos++
            player.spider.extraXpos-=10
            player.spider.extraXpos=Math.min(1,player.spider.extraXpos)
            for(let i=0;i<player.spider.blockList.length;i++){
                Vue.set(player.spider.blockList,i,player.spider.blockList[i]-1)
                if(((player.spider.blockList[i]%100)==0)) {player.spider.blockList.splice(i, 1); i--}
            }
         } //Update blocks
        
        if(player.spider.extraX2pos>=5){
            player.spider.extraX2pos=0
            if(Math.random()>=0.5){player.spider.blockList.push(120,220,320,420,520,620,720,820,920,1020)}
           else player.spider.blockList.push(1420,1320,1220,1120,1020,920,820,720,620)       
         } //Add new blocks
         
         
         

         if(player.spider.blockList.includes(player.spider.player)){
            player.spider.xpos=0
            player.spider.extraXpos=0
            player.spider.blockList=[]
            player.spider.player=1404
            player.spider.gravity=false
            player.spider.realY=0
         } //Death

         if(player.spider.realY>0&&!player.spider.jumping&&!player.spider.gravity){
            player.spider.drop_acc+=150*diff
            player.spider.realY-=(player.spider.drop_acc*diff)
            player.spider.realY=Math.max(0,player.spider.realY)
            console.log(player.spider.realY)
         } //Jumping
         
         if(player.spider.realY<65&&!player.spider.jumping&&player.spider.gravity){
            player.spider.drop_acc-=150*diff
            player.spider.realY-=(player.spider.drop_acc*diff)
            player.spider.realY=Math.min(65,player.spider.realY)
            console.log(player.spider.realY)
         } 

         player.spider.player=1404-(Math.floor(player.spider.realY/5)*100)
         player.spider.realY=Math.min(65,player.spider.realY)
         player.spider.realY=Math.max(0,player.spider.realY)
    }


})
function jumpSpider(acc){
    if(acc<=0)return player.spider.jumping=false;
    player.spider.jumping=true
    player.spider.drop_acc=0
    let acc2=acc
    player.spider.realY=player.spider.realY+(acc*0.4)
    console.log(player.spider.realY)
    acc2-=0.8
    setTimeout(function(){jumpSpider(acc2)},50)
}
function jumpSpiderR(acc){
    if(acc<=0)return player.spider.jumping=false;
    player.spider.jumping=true
    player.spider.drop_acc=0
    let acc2=acc
    player.spider.realY=player.spider.realY-(acc*0.4)
    console.log(player.spider.realY)
    acc2-=0.8
    setTimeout(function(){jumpSpiderR(acc2)},50)
}