import { useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	pageSettings: ArticleStateType;
	setPageSettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	pageSettings,
	setPageSettings,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(pageSettings);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	const handleApply = () => {
		setPageSettings({ ...formSettings });
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormSettings({ ...defaultArticleState });
		setPageSettings({ ...defaultArticleState });
	};

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => setIsOpen((isOpen) => !isOpen)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formSettings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected) =>
							setFormSettings((formState) => ({
								...formState,
								fontFamilyOption: selected,
							}))
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={formSettings.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selected) =>
							setFormSettings((formState) => ({
								...formState,
								fontSizeOption: selected,
							}))
						}
					/>
					<Select
						title='Цвет шрифта'
						selected={formSettings.fontColor}
						options={fontColors}
						onChange={(selected) =>
							setFormSettings((formState) => ({
								...formState,
								fontColor: selected,
							}))
						}
					/>
					<Select
						title='Цвет фона'
						selected={formSettings.backgroundColor}
						options={backgroundColors}
						onChange={(selected) =>
							setFormSettings((formState) => ({
								...formState,
								backgroundColor: selected,
							}))
						}
					/>
					<Select
						title='Ширина контента'
						selected={formSettings.contentWidth}
						options={contentWidthArr}
						onChange={(selected) =>
							setFormSettings((formState) => ({
								...formState,
								contentWidth: selected,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
