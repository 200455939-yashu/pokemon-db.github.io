const api_url = "https://pokeapi.co/api/v2/pokemon"


// let elements = document.querySelectorAll('.pokemon_class');
// elements.forEach(element => {
//    	element.addEventListener('click', (e)=>{
//    		console.log(e.target.id);
//    		const id = e.target.id;
//    		alert(id);
//    		});
//    });

async function pokem_details(pokemon_name){
	const response = await fetch(api_url);
	const data = await response.json();
	const obj = data.results

	document.getElementById("spec_name").innerHTML = "<strong>Name: </strong>"+ pokemon_name.toUpperCase();
	// iterate over each element in the array
	for (var i = 0; i < obj.length; i++){
	// look for the entry with a matching `code` value
		if (obj[i].name == pokemon_name){
			detail_url = obj[i].url;
			const abilites_response = await fetch(detail_url);
			const abilites_data = await abilites_response.json();
			console.log(abilites_data.abilities.length);
			let abilities = "";
			abilites_data.abilities.forEach((element)=>{ 
				abilities += "<button class='btn btn-primary' id="+element.ability.name+">"+element.ability.name+"</button>";
			});
			document.getElementById("abilities_list").innerHTML = "<strong>Abilities: </strong>"+abilities;
			document.getElementById("height").innerHTML = "<strong>Height: </strong>" + abilites_data.height;
			document.getElementById("base_experience").innerHTML = "<strong>Base Experience: </strong>" + abilites_data.base_experience;
			const abt = abilites_data.abilities;
			document.addEventListener('click',function(e){
				for (var j = 0; j < abt.length; j++){
					if (abt[j].ability.name == e.target.id){
						pokemon_ability(e.target.id, abt[j].ability.url);
					}
				}
			});



		// we found it
		// obj[i].name is the matched result
		}
	}
};

async function pokemon_ability(ability_name, url){
	const abt_response = await fetch(url);
	const json = await abt_response.json();
	document.getElementById("ability_name").innerHTML = "<strong>Ability Name: </strong>"+ ability_name.toUpperCase();
	document.getElementById("effects").innerHTML = "<strong>Ability Effect: </strong>" + json.effect_entries[0].effect;
	document.getElementById("short_effect").innerHTML = "<strong>Short Effect: </strong>" + json.effect_entries[0].short_effect;
	document.getElementById("flavor_text").innerHTML = "<strong>Flavor Text: </strong>" + json.flavor_text_entries[0].flavor_text;
}

// async function pokemon_details(pokemon_name) {
// 	alert(pokemon_name);
//     const response = await fetch(api_url);
//     const data = await response.json();
//     console.log(data);
//     const pokemons = data.results.slice(0,5);

// }

// pokemon_details();