<script>
	export let text;
	let stAxios = false;
	let resObj = [];

	import axios_pm, {axios_syn} from '../scripts/axios/restClient';

	async function handleClick_pm() {
		stAxios = false;
		resObj = [];
		let response = await axios_pm(text);
		if(response.data.return.status == 'success'){
			console.log(response.data.output.result)
			let pm_array = response.data.output.result
			for(let x=0;x<pm_array.length;x++){
				console.log(pm_array[x].replace('|',' ').trim('|'))
				resObj.push(pm_array[x].replace('|',' ').trim('|'));
			}
			stAxios = true
		}	
	}

	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	let audiobuffer = [];
	let subcounter = 0;
	let channels = 0;
	let sampleRate = 22050;
	let sizeSample = 0;
	var source;
	async function handleClick_syn() {
		stAxios = false;
		resObj = [];
		
		let response = await axios_syn(text);
		if(response.data.return.status == 'success'){
			console.log(response.data.output)
			audiobuffer = new Uint16Array(response.data.output.audio.result);
			channels = response.data.output.audio.numChannels;
			let validBits = response.data.output.audio.validBits;
			sizeSample= response.data.output.audio.sizeSample;
			sampleRate= response.data.output.audio.sampleRate;
			stAxios = true
			play("soundTest");
		}	
	}
	function play(soundName) {
            var myAudioBuffer = audioCtx.createBuffer(channels, sizeSample, sampleRate);
            for (var channel = 0; channel < channels; channel++) {
                var nowBuffering = myAudioBuffer.getChannelData(channel);
                for (var i = 0; i < sizeSample; i++) {
                    // audio needs to be in [-1.0; 1.0]
                    var word = audiobuffer[i];
                    nowBuffering[i] = ((word + 32768) % 65536 - 32768) / 32768.0;
					// nowBuffering[i] = audiobuffer[i];
                }
            }
            subcounter += 1;
            source = audioCtx.createBufferSource();
            source.buffer = myAudioBuffer;
            source.connect(audioCtx.destination);
            // source.onended = play;
            source.start();
        }
</script>

<main>
	<input bind:value={text} placeholder="enter your text">
	<button on:click={handleClick_syn}>Send</button>
	<p>You'r massage {text || 'stranger'}!</p>
	{#if stAxios}
		{#each  resObj as plist,index}  
			<li key={index}>
				{plist}
			</li>
		{/each}
	{/if}
	
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>