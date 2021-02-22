import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import * as yup from "yup";
import zxcvbn from 'zxcvbn'

import { Form } from 'shared/forms';
import { InputFormField } from 'shared/forms/components';
import { ShadowedButton } from 'shared/components/ShadowedButton';
import { firebaseRegister } from '../../../shared/firebase/FireBaseHelper';


async function handleRegisterUser(this: any, formData: any, setError: any,) {
  const registeredUser = await firebaseRegister(formData)
  if (registeredUser.user == null) {
    this.setError("username", {
      type: "manual",
      message: "Erro, e-mail em uso"
    })
  }
}

const schema = yup.object().shape({
  username: yup.string().required('Username é um campo obrigatório').min(7),
  password: yup.string().required('Password é um campo obrigatório').test('passwordStrongEnought', 'O password é fraco, tente adicionar símbolos ou letras Maiúsculas e minúsculas', function testPasswordStrength(val?: any) {
    if (val == null) {
      return false
    }
    const strongEnought = zxcvbn(val).score > 2
    return strongEnought
  })
})

const FormGroup = styled(Grid)`padding: 5px;`

export function RegisterUserForm() {

  return (
    <Form id="register_user_account" onSubmit={handleRegisterUser}
      fullWidth={false} validationMode="onSubmit" revalidationMode="onSubmit" schema={schema}>
      <FormGroup>
        <label>Nome de usuário</label>
        <InputFormField border={2} placeholder="novo nome de usuário" name="username" showErrorMessage={true} />
      </FormGroup>
      <FormGroup>
        <label>Password</label>
        <InputFormField type="password" border={2} placeholder="Password" name="password" showErrorMessage={true} />
      </FormGroup>
      <FormGroup container justify="center" >
        <ShadowedButton type="submit">
          Finalizar Registro
        </ShadowedButton>
      </FormGroup>
    </Form>
  )
}