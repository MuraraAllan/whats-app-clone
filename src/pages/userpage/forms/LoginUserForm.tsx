import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import * as yup from "yup";

import { Form } from 'shared/forms';
import { InputFormField } from 'shared/forms/components';
import { ShadowedButton } from 'shared/components/ShadowedButton';
import { firebaseLogin } from '../../../shared/firebase/FireBaseHelper';
import { useUser } from '../../../shared/hooks';



const schema = yup.object().shape({
  username: yup.string().required('Username é um campo obrigatório').min(7),
  password: yup.string().required('Password é um campo obrigatório')
})

const FormGroup = styled(Grid)`padding: 5px;`

export function LoginUserForm() {
  const { setUser } = useUser()
  return (
    <Form id="register_user_account" onSubmit={async function HandleLogin(this: any, formData: any, setError: any,) {
      const login = await firebaseLogin(formData)
      if (login.user == null) {
        return this.setError("username", {
          type: "manual",
          message: "Combinação invalida de usuário e senha"
        })
      }
      setUser(login)
    }} fullWidth={false} validationMode="onSubmit" revalidationMode="onSubmit" schema={schema}>
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
          Fazer Login
        </ShadowedButton>
      </FormGroup>
    </Form>
  )
}