<script></script>

<div class="container">
	<h1><span class="m-color">I</span>nformation</h1>

	<!-- INTRODUCTION -->
	<p>This is a simulation of the <a href="https://wikipedia.org/wiki/Evolution">evolution by natural selection</a>. It involves a world with rules (explained here), and actors (Emojis and Food) evolving together.</p>
	<p>Be ware! Running this simulation can become CPU heavy in some cases, make sure you do not need to spare your battery before running it.</p>

	<!-- SHORTCUTS -->
	<h2><span class="m-color">1.</span> Shortcuts</h2>
	<p>To ease controls, shortcuts have been added to the simulation:</p>
	<ul>
		<li><code>d</code> : Open/close display pannel</li>
		<li><code>space</code> : Pause / resume the simulation</li>
		<li><code>1</code> : Toggle Emoji's energy display</li>
		<li><code>2</code> : Toggle Emoji's velocity display</li>
		<li><code>3</code> : Toggle Emoji's sight</li>
		<li><code>4</code> : Toggle Emoji's target</li>
	</ul>
	<p>In addition, user can click on the map to select a Emoji or a Food and get live details.</p>

	<!-- WORLD -->
	<h2><span class="m-color">3.</span> World</h2>

	<!-- WORLD measurement units -->
	<h4><span class="m-color">M</span>easurement units:</h4>
	<ul>
		<li>The World is made of a rectangle of 1900 by 800 length unit. For simplicity, it corresponds to pixel on your screen.</li>
		<li>Time is represented by the age of the world (visible in the top left corner). Each unit of time is a frame.</li>
	</ul>

	<!-- WORLD processing -->
	<h4><span class="m-color">P</span>rocessing</h4>
	<p>On each unit of time is calculated the state of the next one. Since the unit of time is small enough, everything looks like smooth movements.</p>
	<p>On death, entities (food or Emojis) are removed from the world.</p>

	<!-- WORLD initialization -->
	<h4><span class="m-color">I</span>nitialization</h4>
	<p>The first core principle of natural selection simulation is the population <strong class="m-color">Initialization</strong>. Here population is randomly created at start (position and attributes) and let to live.</p>

	<!-- Food -->
	<h2><span class="m-color">4.</span> Food</h2>
	<p>Food appear randomly in the world according to the creation rate setting. At each unit of time (i.e. frame) there is this rate of chance that a food pops somewhere.</p>
	<p>Food always have a mass of 2 units of mass.</p>

	<!-- Emoji -->
	<h2><span class="m-color">5.</span> Emoji</h2>

	<h4>Actions</h4>
	<p>Emoji have a limited set of possible actions: they can wander, move towards or away from a target, stop, search for something, eat, sleep, and hit another moji.</p>

	<h4>Behaviors</h4>
	<p>Behavior tell how moji does act, depending on their state and what they see around.</p>

	<h4>DNA</h4>
	<p>Each moji has its own DNA, describing how and when they have the previous mentioned behaviors. These parameters are actually those who are going to be selected through natural selection: if a Emoji is well adapted to the world (i.e. has a "good" DNA), he will most propably survive. On the contrary, if he has a "bad" DNA, he will die. This is the second principle of evolution: <strong class="m-color">Selection</strong>.</p>

	<h4>Reproduction</h4>
	<p>Once the selection is made, and the Emojis validates conditions (i.e. have a sufficient mass to reproduce), Emojis can reproduce themself (just like cells would do in our body), and duplicate their DNA. It is the third evolution principle: <strong class="m-color">Reproduction</strong>.</p>

	<h4>Mutation</h4>
	<p>On reproduction, each DNA gene is allowed to mutate. There is a lot of possibility of applying mutation, but each gene will be updated by a small random amount (depending on the settings). It is the fourths and last principle of natural seleciton: <strong class="m-color">Mutation</strong>.</p>
</div>

<style>
	a {
		/* text-decoration: none; */
		color: var(--color-light);
	}

	.container {
		max-width: 500px;
	}
</style>
