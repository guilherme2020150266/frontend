import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';

export default function Home() {
	const setName = useStoreActions((action) => action.step1Answers.setName);
	const setResp = useStoreActions((action) => action.step1Answers.setResp);
	const nameStore = useStoreState((state) => state.step1Answers.infos.name);
	const respStore = useStoreState((state) => state.step1Answers.infos.resp);

	const [name, setNameState] = useState(nameStore);
	const [resp, setRespState] = useState(respStore);

	useEffect(() => {
		const inputName = document.querySelector(`.${styles.container} input[name=name]`);
		if (inputName) {
			inputName.value = nameStore;
		}
		const textarea = document.querySelector(`.${styles.container} textarea`);
		if (textarea) {
			textarea.value = respStore;
		}
	}, []);

	function handleSetName(e) {
		setNameState(e.target.value);
	}

	function handleSetResp(e) {
		setRespState(e.target.value);
	}

	function handleNextStep() {
		setName(name);
		setResp(resp);
	}

	return (
		<div className={styles.container}>
			<div>
				<p>Informe seu nome:</p>
				<input type="text" name="name" onKeyUp={handleSetName} />
				<p className="mt-5">Todo político é ladrão? Ou a ocasião faz o ladrão?</p>
				<textarea onKeyUp={handleSetResp} rows={6} cols={50}></textarea>
			</div>
			<div className="w-75 d-flex justify-content-end mt-5">
				<Link href="/step2">
					<a>
						{name == '' || resp == '' ? (
							<button className="btn_perguntas" disabled>
								Próximo
							</button>
						) : (
							<button className="btn_perguntas" onClick={handleNextStep}>
								Próximo
							</button>
						)}
					</a>
				</Link>
			</div>
		</div>
	);
}
