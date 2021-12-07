import { useStoreActions, useStoreState } from 'easy-peasy';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Step2() {
	const infosStep1 = useStoreState((state) => state.step1Answers.infos);
	const infosStep2 = useStoreState((state) => state.step2Answers.infos);
	const infosStep3 = useStoreState((state) => state.step3Answers.infos);
	const allSelects = useStoreState((state) => state.allowedSelects);

	const [translateAnswer, setTranslateAnswer] = useState('');
	const [translateRadio, setTranslateRadio] = useState('');
	const [translateResp2, setTranslateResp2] = useState('');
	useEffect(() => {
		allSelects.map((singleSelect) => {
			if (singleSelect.value == infosStep3.answer) {
				// const result = getCountryFromName(singleSelect.name);
				fetch(`https://api.nationalize.io/?name=${singleSelect.name.split(' ')[0]}`)
					.then((resp) => resp.json())
					.then(function (json) {
						let countryPossibility = ``;
						if (json['country'].length > 0) {
							countryPossibility = ` provavelmente é de ${json['country'][0]['country_id']}`;
						}
						setTranslateAnswer(`${singleSelect.name}${countryPossibility}`);
					});
			}
		});
		if (infosStep2.radio == 'yes') {
			setTranslateRadio('Sim');
		}
		if (infosStep2.radio == 'no') {
			setTranslateRadio('Não');
		}
		if (infosStep2.resp2 == 'yes') {
			setTranslateResp2('Sim');
		}
		if (infosStep2.resp2 == 'no') {
			setTranslateResp2('Não');
		}
	}, [allSelects, infosStep2.radio, infosStep2.resp2, infosStep3.answer]);

	const resetAll = useStoreActions((action) => action.resetAll);
	function handleResetAnswers() {
		resetAll();
	}
	return (
		<div className={styles.container}>
			<div className="d-flex justify-content-between gap-32 w-75">
				<div className="single_box step1">
					<p className="text-center">
						<strong>Página 1</strong>
					</p>
					<p>
						Olá <strong>{infosStep1.name}, </strong>
					</p>
					<p>{infosStep1.resp}</p>
				</div>
				<div className="single_box step2">
					<p className="text-center">
						<strong>Página 2</strong>
					</p>
					<p>{translateRadio}</p>
					{infosStep2.radio == 'yes' ? (
						<p>{infosStep2.resp1}</p>
					) : (
						<p>{translateResp2}</p>
					)}
				</div>
				<div className="single_box step3">
					<p className="text-center">
						<strong>Página 3</strong>
					</p>
					<p>{translateAnswer}</p>
				</div>
			</div>
			<div className="text-center mt-4">
				<Link href="/">
					<a>
						<button className="btn_perguntas" onClick={handleResetAnswers}>
							Refazer Perguntas
						</button>
					</a>
				</Link>
			</div>
		</div>
	);
}
