import { StoreProvider, createStore, action } from 'easy-peasy';
import '../styles/globals.css';

const store = createStore({
	allowedSelects: [
		{ value: 1, name: 'Martelo de Assis' },
		{ value: 2, name: 'Machado de Tandera' },
		{ value: 3, name: 'Machado Assis' },
		{ value: 4, name: 'Machado de Assis' },
	],
	step1Answers: {
		infos: { name: '', resp: '' },
		setName: action((state, name) => {
			state.infos.name = name;
		}),
		setResp: action((state, resp) => {
			state.infos.resp = resp;
		}),
	},
	step2Answers: {
		infos: { radio: '', resp1: '', resp2: '' },
		setRadio: action((state, radio) => {
			state.infos.radio = radio;
		}),
		setResp1: action((state, resp) => {
			state.infos.resp1 = resp;
		}),
		setResp2: action((state, resp) => {
			state.infos.resp2 = resp;
		}),
	},
	step3Answers: {
		infos: { answer: '' },
		setAnswer: action((state, answer) => {
			state.infos.answer = answer;
		}),
	},
	resetAll: action((state) => {
		state.step1Answers.infos = { name: '', resp: '' };
		state.step2Answers.infos = { radio: '', resp1: '', resp2: '' };
		state.step3Answers.infos = { answer: '' };
	}),
});

function MyApp({ Component, pageProps }) {
	return (
		<StoreProvider store={store}>
			<Component {...pageProps} />
		</StoreProvider>
	);
}

export default MyApp;
