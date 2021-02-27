import React, { useRef, useCallback } from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	View,
	ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
	Container,
	Title,
	BackToSignInButton,
	BackToSignInButtonText,
} from './styles';

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const navigation = useNavigation();

	const handleSignUp = useCallback((data: object) => {
		console.log(data);
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
							<Input name="user" icon="user" placeholder="Nome" />
							<Input name="email" icon="mail" placeholder="E-mail" />
							<Input name="password" icon="lock" placeholder="Senha" />

							<View>
								<Button onPress={() => formRef.current?.submitForm()}>
									Entrar
								</Button>
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
