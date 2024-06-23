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
import './RemoveLines.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const RemoveLineBreaks = props => {
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

	const removeLineBreaks = () => {
		const lines = inputText.split('\n');
		const nonEmptyLines = lines.filter(line => line.trim() !== '');
		setOutputText(nonEmptyLines.join(' '));
	};

	const clearText = () => {
		setInputText('');
		setOutputText('');
		setError('');
	};


	return (
		<Panel id={props.id}>
			<PanelHeader before={<PanelHeaderBack onClick={() => go("home")} />}>
				Удаление разрывов
			</PanelHeader>
			<FormLayout className="remove-line-breaks-form">
				<Textarea
					placeholder="Введите текст"
					value={inputText}
					onChange={handleInputChange}
					className="remove-line-breaks-textarea"
				/>
				{error && <FormStatus mode="error">{error}</FormStatus>}
				<ButtonGroup mode="horizontal" gap="m" stretched align="center">
					<Button size="l" onClick={removeLineBreaks} className="remove-line-breaks-button" disabled={!inputText.trim()}>
						Удалить
					</Button>
					<Button size="l" mode="tertiary" onClick={clearText} className="remove-line-breaks-button" disabled={!inputText.trim()}>
						<Icon24Delete />
					</Button>
				</ButtonGroup>
				{outputText && (
					<Div className="remove-line-breaks-result">
						<Textarea
							placeholder="Результат"
							value={outputText}
							readOnly
							className="remove-line-breaks-textarea"
						/>
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

export default RemoveLineBreaks;
