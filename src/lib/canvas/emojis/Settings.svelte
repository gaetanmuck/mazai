<script>
	import { createEventDispatcher } from 'svelte';

	import { World } from './World.js';
	import { Food } from './Food.js';
	import { Emoji } from './Emoji.js';
	import { EmojiDNA } from './EmojiDNA.js';

	const dispatch = createEventDispatcher();

	const editSettings = () => {
		World.DRAG_COEF = settings.worldDragCoef;
		Food.CREATION_RATE = settings.foodCreationRate;
		Food.MASS = settings.foodMass;
		Emoji.SIGHT_COEF = settings.mojiSightCoef;
		Emoji.ENERGY_COEF = settings.mojiEnergyCoef;
		Emoji.RANGE = settings.mojiRange;
		Emoji.PASSIV_ENERGY_CONSUMPTION = -settings.mojiPassivEnergyConsumption;
		EmojiDNA.MUTATION_RANGE = settings.mojiDnaMutationRange;
		Emoji.SLEEP_ENERGY_REGEN = settings.behaviorSleepySleepEnergyRegen;

		dispatch('settingUpdate');
	};

	let settings = {
		worldDragCoef: World.DRAG_COEF,
		foodCreationRate: Food.CREATION_RATE,
		foodMass: Food.MASS,
		mojiSightCoef: Emoji.SIGHT_COEF,
		mojiEnergyCoef: Emoji.ENERGY_COEF,
		mojiRange: Emoji.RANGE,
		mojiPassivEnergyConsumption: -Emoji.PASSIV_ENERGY_CONSUMPTION,
		mojiDnaMutationRange: EmojiDNA.MUTATION_RANGE,
		behaviorSleepySleepEnergyRegen: Emoji.SLEEP_ENERGY_REGEN
	};
</script>

<div class="grid-col grid">
	<div class="grid-row grid"><h1><span>S</span>ettings</h1></div>

	<div class="grid-row grid">
		<div class="grid-col grid">
			<input name="Drag coefficient" bind:value={settings.worldDragCoef} min={0} placeholder="Drag force = Drag coef . Size . Velocity²" />
			<input name="Food creation rate" bind:value={settings.foodCreationRate} min={0} placeholder="Chance of getting a new random food, each frame." />
			<input name="Food mass" bind:value={settings.foodMass} min={0} placeholder="Mass of each created food." />
			<input name="Emoji sight coefficient" bind:value={settings.mojiSightCoef} placeholder="The distance of sight given by 1 size." />
			<input name="Emoji energy coefficient" bind:value={settings.mojiEnergyCoef} min={0} placeholder="How much energy gives 1 mass." />
			<input name="Emoji range" bind:value={settings.mojiRange} min={0} placeholder="How far can a Emoji do things." />
			<input name="Emoji passive energy consumption" bind:value={settings.mojiPassivEnergyConsumption} min={0} placeholder="Energy consumed each frame, whatever the Emoji does." />
			<input name="Emoji mutation range" bind:value={settings.mojiDnaMutationRange} min={0} placeholder="How big mutations are, in percent." />
			<input name="Sleep energy regeneration" bind:value={settings.behaviorSleepySleepEnergyRegen} placeholder="How much energy receives a moji each frame when sleeping." />
		</div>
	</div>

	<div class="grid-row mt-3 grid"><button onclick={editSettings}>Apply</button></div>
</div>

<style>
	span {
		color: var(--color-mazai-m);
	}
</style>
