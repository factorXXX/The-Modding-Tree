let modInfo = {
	name: "The Number Tree",
	id: "NumberTree",
	author: "3^3=7#2252",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.3",
	name: "2 Nanothings",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>v0.0.3</h3><br>
		- Added 6 Number upgrades.<br>
		- Balanced subtraction path<br>
		- Endgame: 17 number upgrades<br>
    <h3>v0.0.2</h3><br>
		- Added 2 Number upgrades.<br>
		- Added Addition and subtraction. (only addition path balanced)<br>
		- Endgame: Unlock both addition and subtraction. (only addition path)<br>
	<h3>v0.0.1</h3><br>
		- Added 9 Number upgrades.<br>
		- A easter egg hide in somewhere??<br>
    `

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasUpgrade('n',33))gain=gain.times(4)
	if(hasUpgrade('n',43))gain=gain.times(4)
	if(hasUpgrade('n',32))gain=gain.times(4)
	if(hasUpgrade('n',31))gain=gain.times(upgradeEffect('n',31))
	if(hasUpgrade('n',53))gain=gain.times(upgradeEffect('n',53))
	if(hasUpgrade('n',51))gain=gain.times(upgradeEffect('n',51))
	if(hasMilestone('a',1))gain=gain.times(player.a.points.times(2).add(1))
	let a2ExMil=D(0)
	if(hasMilestone('a',6))a2ExMil=a2ExMil.add(player.a.points.add(1).log(1.618).add(1))
	if(hasUpgrade('n',22))a2ExMil=a2ExMil.add(3)
	if(hasMilestone('a',2))gain=gain.times(D(2).pow(a2ExMil.add(player.a.milestones.length)))
	if(hasMilestone('a',5))gain=gain.times(player.points.add(10).log(10))
	if(hasMilestone('s',1))gain=gain.times(2)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}