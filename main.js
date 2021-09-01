const ghosts = [
    {
        "type": "Banshee", 
        "evidence": [1, 3, 4], 
        "strength": "• Only targets one person at a time", 
        "weakness": "• Fears the Crucifix and are less aggressive near one"
    },
    {
        "type": "Demon", 
        "evidence": [1, 2, 5],
        "strength": "• Attack more often than any other ghost",
        "weakness": "• Asking as Demon successful Ouija board questions won't lower your sanity"
    },
    {
        "type": "Goryo", 
        "evidence": [6, 1, 4], 
        "strength": "• A Goryo will usually only show itself on camera if there are no people nearby", 
        "weakness": "• They are rarely seen far from their place of death"
    },
    {
        "type": "Hantu", 
        "evidence": [1, 3, 5], 
        "strength": "• Lower temperatures can cause the Hantu to move at faster speeds.", 
        "weakness": "• A Hantu will move slower in warm areas."
    },
    {
        "type": "Jinn", 
        "evidence": [6, 1, 5], 
        "strength": "• Travels at a faster speed if victim is far away", 
        "weakness": "• Turning off power source will prevent the Jinn from using its ability"
    },
    {
        "type": "Myling", 
        "evidence": [6, 1, 2], 
        "strength": "• Known to be quieter when hunting", 
        "weakness": "• More frequently make paranormal sounds"
    },
    {
        "type": "Mare", 
        "evidence": [7, 3, 2], 
        "strength": "• Increased chance to attack in the dark", 
        "weakness": "• Turning the lights on lowers its chance to attack"
    },
    {
        "type": "Oni", 
        "evidence": [6, 5, 4], 
        "strength": "• Can move objects and are more active with people nearby", 
        "weakness": "• Is easy to find and identify due to being very active"
    },
    {
        "type": "Poltergeist", 
        "evidence": [7, 1, 2], 
        "strength": "• Throws a huge amount of objects at once", 
        "weakness": "• Ineffective in an empty room"
    },
    {
        "type": "Phantom", 
        "evidence": [7, 1, 4], 
        "strength": "• Sanity drops considerably when looking at a Phantom", 
        "weakness": "• Taking a photo of a Phantom will make it temporarily disappear"
    },
    {
        "type": "Revenant", 
        "evidence": [3, 2, 5], 
        "strength": "• Travels significantly faster when hunting a victim", 
        "weakness": "• Hiding from a Revenant causes it to move very slowly"
    },
    {
        "type": "Shade", 
        "evidence": [6, 2, 5], 
        "strength": "• Shy, making it difficult to locate", 
        "weakness": "• Will not enter hunting mode with multiple people nearby"
    },
    {
        "type": "Spirit", 
        "evidence": [6, 7, 2], 
        "strength": "• None", 
        "weakness": "• Smudge Sticks will stop it from attacking for a long period of time."
    },
    {
        "type": "Wraith", 
        "evidence": [6, 7, 4], 
        "strength": "• Can't be tracked by footsteps", 
        "weakness": "• Toxic reaction to salt"
    },
    {
        "type": "Yurei", 
        "evidence": [3, 5, 4], 
        "strength": "• Have a stronger effect on your sanity", 
        "weakness": "• Using Smudge Sticks on a Yurei's room will prevent it from wandering for a long time"
    },
    {
        "type": "Yokai", 
        "evidence": [7, 3, 4], 
        "strength": "• Talking near a Yokai will anger it and increase its chance of attacking.", 
        "weakness": "• When hunting, a Yokai can only hear voices close to it."
    }
]
function convertToEvidence(x)
{
    switch(x)
    {
        case 1:
            return "Fingerprints"
        case 2:
            return "Ghost Writing"
        case 3:
            return "Ghost Orbs"
        case 4:
            return "DOTS Projector"
        case 5:
            return "Freezing temperatures"
        case 6:
            return "EMF Level 5"
        case 7:
            return "Spirit Box"
        default:
            return "Error"
    }
}
function getEvidence(evlist)
{
 let evidencestr = evlist.map(function (x) { 
    return convertToEvidence(x);
  });
  return evidencestr
}
function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}
function getLeftEvidence(chosenval,ghostval)
{
    let leftevidence = ghostval.filter( function( el ) {
        return !chosenval.includes( el );
      } );
      return leftevidence;
}
function getGhost(values)
{
    let intvalues = values.map(function (x) { 
        return parseInt(x, 10); 
      });
    let keys = []
    let chosenevidence = getEvidence(intvalues)
    keys.push(`Chosen evidence: ${chosenevidence.toString()}\n`)
    let leftevidence = []
    let ghostevidenceint = []
    let found = 0
    for(let k in ghosts)
    {
        let vSet = new Set(ghosts[k]["evidence"])
        let ifcontains = intvalues.every(value => vSet.has(value))
        if(ifcontains == true)
        {
            let ghostevidence = getEvidence(ghosts[k]["evidence"])
            ghostevidenceint = ghostevidenceint.concat(ghosts[k]["evidence"].map(function (x) { 
                return parseInt(x, 10); 
              }));
            keys.push(`\nType: ${ghosts[k]["type"]}\n Strength: ${ghosts[k]["strength"]}\n Weakness: ${ghosts[k]["weakness"]}\n Evidence: ${ghostevidence.toString()}\n`)
            found++
        }
        delete vSet
    }
    if(found <= 0)
    {
        keys.push("No ghosts with that evidence.")
        return keys;
    }
    ghostevidenceint = uniq(ghostevidenceint)
    leftevidence = getLeftEvidence(intvalues,ghostevidenceint)
    leftevidence = getEvidence(leftevidence)
    if(leftevidence.length === 0)
    {
        leftevidence[0] = " You got all of the evidence."
    }
    keys.push(`\nEvidence left to check: ${leftevidence}`)
    return keys;
}
// RUN THIS ONCE WHEN YOU START YOUR BOT, IT CAN BUG IT WHEN YOU RUN IT EVERYTIME YOUR BOT LAUNCHES
/*const { REST } = require('@discordjs/rest'); 
const { Routes } = require('discord-api-types/v9');

const commands = [{
  name: 'evidence',
  description: 'Start the evidence selector'
}]; 

const rest = new REST({ version: '9' }).setToken('YOUR TOKEN HERE');

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

   await rest.put(
	Routes.applicationCommands("YOUR BOT APP ID HERE"),
	{ body: commands },
	);

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();*/

const { Client, Intents, MessageActionRow, MessageSelectMenu } = require('discord.js');
const client = new Client({
    disableEveryone: true,
    intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_INVITES,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.DIRECT_MESSAGES],
    partials: ['MESSAGE','CHANNEL']
});
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if(interaction.isSelectMenu())
    {
        if(interaction.customId === 'select')
        {
            await interaction.reply({content: "Wait..."});
           let ghost = getGhost(interaction.values)
           try{
           await interaction.editReply({ content: `${interaction.user.toString()}\n${ghost.join(" ")}`, components: [] });
           }
           catch(err)
           {
            await interaction.editReply({ content: `${interaction.user.toString()}\nNo ghost.`});
           }
        }
    }
  if (interaction.isCommand())
{
  if (interaction.commandName === 'evidence') {
    const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.setMinValues(1)
					.setMaxValues(3)
					.addOptions([
						{
							label: 'Fingerprints',
							value: '1',
						},
						{
							label: 'Ghost Writing',
							value: '2',
						},
						{
							label: 'Ghost Orbs',
							value: '3',
						},
                        {
							label: 'DOTS Projector',
							value: '4',
						},
                        {
							label: 'Freezing temperatures',
							value: '5',
						},
                        {
							label: 'EMF Level 5',
							value: '6',
						},
                        {
							label: 'Spirit Box',
							value: '7',
						},
					]),
			);
            await interaction.reply({ content: 'Select evidence:', components: [row] });
  }
}
});

client.login('YOUR TOKEN HERE');
