import React, { useCallback, useEffect, useState } from "react";
import "./Form.css";
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [PIB, setPIB] = useState("");
	const { tg } = useTelegram();

	const onSendData = useCallback(() => {
		const data = {
			email,
			phoneNumber,
			password,
			PIB,
		};
		tg.sendData(JSON.stringify(data));
	}, [email, phoneNumber, password, PIB, tg]);

	useEffect(() => {
		if (tg && tg.onEvent) {
			tg.onEvent("mainButtonClicked", onSendData);
			return () => {
				tg.offEvent("mainButtonClicked", onSendData);
			};
		}
	}, [onSendData, tg]);

	useEffect(() => {
		if (tg && tg.MainButton) {
			tg.MainButton.setParams({
				text: "Отправить данные",
			});
		}
	}, [tg]);

	useEffect(() => {
		if (tg && tg.MainButton) {
			if (!email) {
				tg.MainButton.hide();
			} else {
				tg.MainButton.show();
			}
		}
	}, [email, phoneNumber, password, PIB, tg]);

	const onChangeEmail = (e) => {
		setEmail(e.target.value.replace("#", ""));
	};

	const onChangePhoneNumber = (e) => {
		const regex = /[^0-9+]/g;
		setPhoneNumber(e.target.value.replace("#", "").replace(regex, ""));
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value.replace("#", ""));
	};

	const onChangePIB = (e) => {
		setPIB(e.target.value.replace("#", ""));
	};

	return (
		<div className={"form"}>
			<input
				className={"input"}
				type="text"
				placeholder={"Email (є обов'язковим)"}
				value={email}
				onChange={onChangeEmail}
			/>
			<input
				className={"input"}
				type="text"
				placeholder={"Номер телефона (є обов'язковим)"}
				value={phoneNumber}
				onChange={onChangePhoneNumber}
			/>
			<input
				className={"input"}
				type="password"
				placeholder={"Пароль для подальшого входу на сайт (опціонально)"}
				value={password}
				onChange={onChangePassword}
			/>
			<input
				className={"input"}
				type="text"
				placeholder={"ПІБ"}
				value={PIB}
				onChange={onChangePIB}
			/>
			{/* <button 
				className={'submit'}
				onClick={onToggleButton}
				> Відправити інформацію на сервер </button> */}
		</div>
	);
};

export default Form;
