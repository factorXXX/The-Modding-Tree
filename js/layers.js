addLayer("spider", {
    symbol: "P",
    position: 0,
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
        jumping:false,
        score:0,
        highest:0,
    }},
    color: "#4BDC13",
    requires: new Decimal(10),
    resource: "prestige points",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        return new Decimal(1)
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 0,
    grid: {
        rows: 14,
        cols: 20,
        getStartData(id) {
            return 0
        },
        getCanClick(data, id) {
            return false
        },
        onClick(data, id) { 
        },
        getStyle(data, id){
           if(player.spider.blockList.includes(id)) return {
                "background-color":"#cc6464",
                "min-height":"40px",
                "min-width":"40px",
                "margin-left":"-2px",
                'border':"0px"
            }
            if(player.spider.player==id) return {
                "background-color":"#cc64cc",
                "min-height":"40px",
                "min-width":"40px",
                "margin-left":"-2px",
                'border':"0px"
            }
           return {
                "background-color":"#dddddd",
                "min-height":"40px",
                "min-width":"40px",
                "margin-left":"-2px",
                'border':"0px"
            }
        }
    },
    clickables:{
11:{
    display:"Teleport",
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
    tabFormat:["grid",'blank','clickables','blank',['display-text',function(){return "Score: "+Math.floor(player.spider.score)+" Highest: "+Math.floor(player.spider.highest)}]],
    update(diff){
        player.spider.score+=50*diff
        player.spider.xpos+=50*diff
        player.spider.extraXpos+=50*diff
         if(player.spider.extraXpos>=10){
            player.spider.extraX2pos++
            player.spider.extraXpos-=10
            player.spider.extraXpos=Math.min(1,player.spider.extraXpos)
            for(let i=0;i<player.spider.blockList.length;i++){
                Vue.set(player.spider.blockList,i,player.spider.blockList[i]-1)
                if(((player.spider.blockList[i]%100)==0)) {player.spider.blockList.splice(i, 1); i--}
            }
         } //Update blocks
        
        if(player.spider.extraX2pos>=3){
            player.spider.extraX2pos=0
            if(Math.random()>=0.9){player.spider.blockList.push(121,122,123,124,125,126,127,1424,1425,1426,1427,1428,1429,1430);player.spider.extraX2pos=-10}
          else  if(Math.random()>=0.7){player.spider.blockList.push(121,122,123,124,222,223,1421,1422,1423,1424,1322,1323);player.spider.extraX2pos=-10}
           else if(Math.random()>=0.35){player.spider.blockList.push(120,220,320,420,520,620,720,820,920,1020)}
           else player.spider.blockList.push(1420,1320,1220,1120,1020,920,820,720,620)       
         } //Add new blocks
         
         
         

         if(player.spider.blockList.includes(player.spider.player)){
            player.spider.highest=Math.max(player.spider.highest,player.spider.score)
            player.spider.xpos=0
            player.spider.extraXpos=3
            player.spider.blockList=[]
            player.spider.player=1404
            player.spider.gravity=false
            player.spider.realY=0
            player.spider.score=0
         } //Death
         
         if(player.spider.realY>0&&!player.spider.jumping&&!player.spider.gravity){
            player.spider.drop_acc+=70*diff
            player.spider.realY-=(player.spider.drop_acc*diff)
         } //Jumping
         
         if(player.spider.realY<65&&!player.spider.jumping&&player.spider.gravity){
            player.spider.drop_acc-=70*diff
            player.spider.realY-=(player.spider.drop_acc*diff)
         } 

         player.spider.realY=Math.min(65,player.spider.realY)
         player.spider.realY=Math.max(0,player.spider.realY)

         player.spider.player=1404-(Math.floor(player.spider.realY/5)*100)
         
    }


})
function jumpSpider(acc){
    if(acc<=0)return player.spider.jumping=false;
    player.spider.jumping=true
    player.spider.drop_acc=15
    let acc2=acc
    player.spider.realY=player.spider.realY+(acc*0.24)
    acc2-=0.48
    setTimeout(function(){jumpSpider(acc2)},40)
}
function jumpSpiderR(acc){
    if(acc<=0)return player.spider.jumping=false;
    player.spider.jumping=true
    player.spider.drop_acc=-15
    let acc2=acc
    player.spider.realY=player.spider.realY-(acc*0.24)
    acc2-=0.48
    setTimeout(function(){jumpSpiderR(acc2)},40)
}
