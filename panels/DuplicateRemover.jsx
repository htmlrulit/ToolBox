import React, { useState, useContext } from 'react';
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	FormLayout,
	Textarea,
	Button,
	Div,
	FormStatus,
	ButtonGroup,
	Snackbar
} from '@vkontakte/vkui';
import {Icon16Done, Icon24Delete} from '@vkontakte/icons';
import { GlobalContext } from "../context";
import './DuplicateRemover.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const DuplicateRemover = props => {
	const { go } = useContext(GlobalContext);
	const [inputText, setInputText] = useState('');
	const [outputText, setOutputText] = useState('');
	const [error, setError] = useState('');
	const [snackbar, setSnackbar] = useState(null);

	const showCopiedSnackbar = () => {
		setSnackbar(
			<Snackbar
				onClose={() => setSnackbar(null)}
				before={<Icon16Done fill="var(--vkui--color_icon_positive)" />}
			>
				Результат скопирован в буфер обмена
			</Snackbar>
		);
	};

	const handleInputChange = (e) => {
		const text = e.target.value;
		if (text.length <= 65535) {
			setInputText(text);
			setError('');
		} else {
			setError('Превышено максимальное количество символов: 65535');
		}
	};

	const removeDuplicates = () => {
		const lines = inputText.split('\n');
		const uniqueLines = Array.from(new Set(lines));
		setOutputText(uniqueLines.join('\n'));
	};

	const clearText = () => {
		setInputText('');
		setOutputText('');
		setError('');
	};

	const copyToClipboard = () => {
		const tempTextArea = document.createElement("textarea");
		tempTextArea.value = outputText;
		document.body.appendChild(tempTextArea);
		tempTextArea.select();
		document.execCommand("copy");
		document.body.removeChild(tempTextArea);
	};

	const countLines = (text) => {
		return text.split('\n').filter(line => line.trim() !== '').length;
	};

	return (
		<Panel id={props.id}>
			<PanelHeader before={<PanelHeaderBack onClick={() => go("home")} />}>
				Удаление дубликатов
			</PanelHeader>
			<FormLayout className="duplicate-remover-form">
				<Textarea
					placeholder="Введите текст"
					value={inputText}
					onChange={handleInputChange}
					className="duplicate-remover-textarea"
				/>
				<Div>Строк: {countLines(inputText)}</Div>
				{error && <FormStatus mode="error">{error}</FormStatus>}
				<ButtonGroup mode="horizontal" gap="m" stretched align="center">
					<Button size="l" onClick={removeDuplicates} className="duplicate-remover-button" disabled={!inputText.trim()}>
						Удалить
					</Button>
					<Button size="l" mode="tertiary" onClick={clearText} className="duplicate-remover-button" disabled={!inputText.trim()}>
						<Icon24Delete />
					</Button>
				</ButtonGroup>
				{outputText && (
					<Div className="duplicate-remover-result">
						<Textarea
							placeholder="Результат"
							value={outputText}
							readOnly
							className="duplicate-remover-textarea"
						/>
						<Div>Строк: {countLines(outputText)}</Div>
						<CopyToClipboard text={outputText} onCopy={showCopiedSnackbar}>
							<Button size="l" stretched className="add-prefix-button">
								Копировать
							</Button>
						</CopyToClipboard>
					</Div>
				)}
				{snackbar}
			</FormLayout>
		</Panel>
	);
};

export default DuplicateRemover;
