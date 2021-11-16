import styles from '../styles/Step2.module.css';
import homeStyles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStoreActions, useStoreState } from 'easy-peasy';

export default function Step2() {
	const setRadio = useStoreActions((action) => action.step2Answers.setRadio);
	const radioAnswer = useStoreState((state) => state.step2Answers.infos.radio);
	const setResp1 = useStoreActions((action) => action.step2Answers.setResp1);
	const resp1Store = useStoreState((state) => state.step2Answers.infos.resp1);
	const setResp2 = useStoreActions((action) => action.step2Answers.setResp2);
	const resp2Store = useStoreState((state) => state.step2Answers.infos.resp2);

	const [answer, setAnswer] = useState('');
	const [resp1, setResp1State] = useState(resp1Store);
	const [resp2, setResp2State] = useState(resp2Store);

	useEffect(() => {
		const allStepRadios = Array.from(
			document.querySelectorAll(`.${homeStyles.container} .first_question .step2_q`)
		);
		allStepRadios.forEach((stepRadio) => {
			if (stepRadio?.value == radioAnswer) {
				setAnswer(radioAnswer);
				stepRadio.checked = true;
			}
		});

		const textarea = document.querySelector(`.${homeStyles.container} textarea`);
		if (textarea) {
			textarea.value = resp1Store;
		}

		const allAnswer2 = Array.from(
			document.querySelectorAll(`.${homeStyles.container} .anwer2question`)
		);
		allAnswer2.forEach((stepRadio) => {
			if (stepRadio?.value == radioAnswer) {
				setResp2State(radioAnswer);
				stepRadio.checked = true;
			}
		});
	}, []);

	function handleSetAnswer(e) {
		setAnswer(e.target.value);
		setRadio(e.target.value);
	}

	function handleSetResp1(e) {
		setResp1State(e.target.value);
		setResp1(e.target.value);
	}

	function handleSetResp2(e) {
		setResp2State(e.target.value);
		setResp2(e.target.value);
	}

	function handleNextStep(e) {
		setRadio(answer);
		setResp1(resp1);
		setResp2(resp2);
	}

	return (
		<div className={homeStyles.container}>
			<div className={styles.stepContent}>
				<p>Informe se você respondeu argumentando positivamente:</p>
				<div className="first_question d-flex justify-content-start gap-8">
					<label>
						Sim
						<input
							type="radio"
							className="step2_q"
							name="step2_q"
							onChange={handleSetAnswer}
							value="yes"
						/>
					</label>
					<label>
						Não
						<input
							type="radio"
							className="step2_q"
							name="step2_q"
							onChange={handleSetAnswer}
							value="no"
						/>
					</label>
				</div>
				<div className={`${answer != 'yes' ? 'd-none' : ''}`}>
					<p className="mt-5">
						Se a oportunidade faz o ladrão, nos conte um caso, por favor!
					</p>
					<textarea onKeyUp={handleSetResp1} rows={6} cols={50}></textarea>
				</div>
				<div className={`${answer != 'no' ? 'd-none' : ''}`}>
					<p className="mt-5">Você acredita em destino?</p>
					<div className="answer2 d-flex justify-content-start gap-8">
						<label>
							Sim
							<input
								type="radio"
								className="anwer2question"
								name="anwer2question"
								onChange={handleSetResp2}
								value="yes"
								checked={resp2 == 'yes'}
							/>
						</label>
						<label>
							Não
							<input
								type="radio"
								className="anwer2question"
								name="anwer2question"
								onChange={handleSetResp2}
								value="no"
								checked={resp2 == 'no'}
							/>
						</label>
					</div>
				</div>
			</div>
			<div className="w-75 d-flex justify-content-between mt-5">
				<Link href="/">
					<a>
						<button className={`btn_perguntas ${styles.back}`}>Anterior</button>
					</a>
				</Link>
				<Link href="/step3">
					<a>
						{answer == '' ||
						(answer == 'no' && resp2 == '') ||
						(answer == 'yes' && resp1 == '') ? (
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
