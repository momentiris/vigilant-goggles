import { regexes } from './regex.js';

export default class Speech {
	constructor(chat) {
		window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

		this.chat = chat;
		this.recognition = new SpeechRecognition();
		this.recognition.interimResults = true;
	}

	swenglify(transcript) {
		transcript = transcript.split(' ')
		let converted = transcript;
		transcript.forEach((word, i) => {
			regexes.forEach(({rx, sub}) => {
				if (!word.match(rx)) return;
				let newWord = word.replace(rx, sub)
				converted[i] = newWord;
			})
		})
	  return converted.join(' ');
	}

	listen(arg) {
		if (arg) {
			this.recognition.addEventListener('result', e => {
				const transcript = Array.from(e.results)
					.map(result => result[0])
					.map(result => result.transcript)
					.join('');

					if(e.results[0].isFinal) {
						const swenglified = this.swenglify(transcript);
						this.chat.emitSpeech(swenglified);
					}
			});

			this.recognition.start();
			this.recognition.addEventListener('end', this.recognition.start);
		} else {
			this.recognition.removeEventListener('end', this.recognition.start);
			this.recognition.abort();
		}
	}
}
