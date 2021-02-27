import React, { useRef, useCallback } from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	View,
	ScrollView,
	TextInput,
	Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
	Container,
	Title,
	BackToSignInButton,
	BackToSignInButtonText,
} from './styles';

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const navigation = useNavigation();
	const formRef = useRef<FormHandles>(null);
	const emailInputRef = useRef<TextInput>(null);
	const passInputRef = useRef<TextInput>(null);

	const handleSignUp = useCallback(async (data: SignUpFormData) => {
		try {
			formRef.current?.setErrors({});

			const schema = Yup.object().shape({
				name: Yup.string().required('Nome obrigatório'),
				email: Yup.string()
					.required('Email obrigatório')
					.email('Digite um e-mail válido'),
				password: Yup.string().required().min(6, 'No minimo 6 digitos'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			Alert.alert('Cadastro concluído', 'Seu cadastro foi efetuado com sucesso!');
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err);
				console.log(errors);

				formRef.current?.setErrors(errors);

				return;
			}

			Alert.alert(
				'Erro no cadastro',
				'Ocorreu um erro ao cadastrar, tente novamente.',
			);
		}
	}, []);

	return (
		<>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				enabled
			>
				<ScrollView
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{ flex: 1 }}
				>
					<Container>
						<Image source={logoImg} />

						<View>
							<Title>Crie sua conta</Title>
						</View>

						<Form ref={formRef} onSubmit={handleSignUp}>
							<Input
								name="name"
								icon="user"
								placeholder="Nome"
								autoCapitalize="words"
								returnKeyType="next"
								onSubmitEditing={() => {
									emailInputRef.current?.focus();
								}}
							/>
							<Input
								ref={emailInputRef}
								name="email"
								icon="mail"
								placeholder="E-mail"
								autoCorrect={false}
								autoCapitalize="none"
								keyboardType="email-address"
								returnKeyType="next"
								onSubmitEditing={() => {
									passInputRef.current?.focus();
								}}
							/>
							<Input
								ref={passInputRef}
								name="password"
								icon="lock"
								placeholder="Senha"
								secureTextEntry
								textContentType="newPassword"
								returnKeyType="send"
								onSubmitEditing={() => {
									formRef.current?.submitForm();
								}}
							/>

							<View>
								<Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
							</View>
						</Form>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>

			<BackToSignInButton onPress={() => navigation.goBack()}>
				<Icon name="arrow-left" size={20} color="#fff" />
				<BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
			</BackToSignInButton>
		</>
	);
};

export default SignIn;
