import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStoreActions, useStoreState } from 'easy-peasy';

export default function Step3() {
	const allowedAnswers = useStoreState((state) => state.allowedSelects);

	const setAnswerStore = useStoreActions((action) => action.step3Answers.setAnswer);
	const answerStore = useStoreState((state) => state.step3Answers.infos.answer);

	const [answer, setAnswer] = useState(answerStore);

	useEffect(() => {
		const select = document.querySelector(`.${styles.container} select`);
		if (select) {
			select.value = answerStore;
		}
	}, []);

	function handleSetAnswer(e) {
		setAnswer(e.target.value);
		setAnswerStore(e.target.value);
	}

	return (
		<div className={styles.container}>
			<div>
				<p>
					Qual dos nomes abaixo representa quem escreveu o livro Memórias Póstumas de Brás
					Cubas?
				</p>
				<div className="text-center">
					<select className="f-size-18" onChange={handleSetAnswer}>
						<option value="">Escolha uma alternativa</option>
						{allowedAnswers.map((answer) => {
							return (
								<option value={answer.value} key={answer.value}>
									{answer.name}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<div className="w-75 d-flex justify-content-between mt-5">
				<Link href="/step2">
					<a>
						<button className={`btn_perguntas ${styles.back}`}>Anterior</button>
					</a>
				</Link>
				<Link href="/review">
					<a>
						{answer == '' ? (
							<button className="btn_perguntas" disabled>
								Finalizar Pesquisa
							</button>
						) : (
							<button className="btn_perguntas">Finalizar Pesquisa</button>
						)}
					</a>
				</Link>
			</div>
		</div>
	);
}
