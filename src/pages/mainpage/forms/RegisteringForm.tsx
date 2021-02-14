import React from 'react';
import * as yup from "yup";
import { Grid } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers'
import { Calendar } from '@material-ui/pickers'

import styled from 'styled-components'

import { SelectFormField, InputFormField, DatePickerFormField } from 'shared/forms/components';
import { Form } from 'shared/forms';
import { FullHeightContainer } from 'shared/components';


const schema = yup.object().shape({
  citizenship: yup.string().required("Required"),
  fullname: yup.string().required("Required").min(7),
  birth_date: yup.string().test('validDate', 'should be a valid date', (value: any) => {
    const inputDate = new Date(value)
    const isDate = inputDate != null
    const isBiggerThenToday = inputDate > new Date()
    const tooSmall = inputDate < new Date('01-01-1990')
    return !isBiggerThenToday && isDate && !tooSmall
  }).required("Required"),
  gender: yup.string().required("Required"),
  civil_status: yup.string().required("Required"),
  mother_fullname: yup.string().required("Required").min(7),
  father_fullname: yup.string(),
  birth_country: yup.string().required("Required"),
  birth_state: yup.string().required("Required"),
  birth_city: yup.string().required("Required")
});


const RegisteringFormGrid = styled(Grid)`padding:3px;`
const RegisteringFormGroup = styled(Grid)`padding-left: 3px;`

const RegisteringFormLabel = styled(Grid)`
width: 40%;
justify-content: flex-end;
align-items: center;
align-content: center;`

const defaultValues = {
  citizenship: 'Brasileira',
  fullname: null,
  birth_date: null,
  gender: 'Masculino',
  civil_status: 'Casado',
  mother_fullname: '',
  birth_country: 'Brasil',
  birth_state: 'SP',
  birth_city: null
}


const country_list = {
  "": [],
  "Brasil": ["SP", "SC", "RJ"],
  "Venezuela": ["AG", "GC", "BV"],
  "Argentina": ["BA", "CM", "LP"]
}

export default function RegisteringForm() {
  return (
    <Form id="fazer_meu_cadastro" schema={schema} defaultValues={defaultValues}>
      <FullHeightContainer container item direction="column" justify="center">
        {/* implement i18n */}

        <RegisteringFormGrid container>
          <RegisteringFormLabel item container xs={4} sm={4} md={4} lg={4} xl={4}>
            <label>Nacionalidade: </label>
          </RegisteringFormLabel>
          <RegisteringFormGroup item >
            <SelectFormField name="citizenship">
              <option value="Brasileira">Brasileira</option >
              <option value="Brala">alallala</option >
            </SelectFormField>
          </RegisteringFormGroup>
        </RegisteringFormGrid>

        <RegisteringFormGrid container>
          <RegisteringFormLabel item container xs={4} sm={4} md={4} lg={4} xl={4}>
            <label>Nome Completo: </label>
          </RegisteringFormLabel>
          <RegisteringFormGroup item justify="flex-end" alignItems="center" xs={7} sm={7} md={7} lg={7} xl={6}>
            <InputFormField placeholder="fullname, compo aparece no seu documento." name="fullname" border={2} width={99} />
          </RegisteringFormGroup>
        </RegisteringFormGrid>

        <RegisteringFormGrid container alignItems="center">
          <RegisteringFormLabel item container xs={4} sm={4} md={4} lg={4} xl={4} justify="flex-end">
            <label>Data de nascimento: </label>
          </RegisteringFormLabel>
          <RegisteringFormGroup item xs={8} sm={8} md={2} lg={2} xl={2} alignItems="center" >
            <DatePickerFormField name="birth_date" />
          </RegisteringFormGroup>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={4} container wrap="nowrap"   >
            <RegisteringFormGroup container wrap="nowrap" alignItems="center" justify="flex-end">
              <label>Gênero: </label>
              <SelectFormField name="gender">
                <option value="Masculino">Masculino</option >
                <option value="Feminino">Feminino</option >
                <option value="Outro">Outro</option >
              </SelectFormField>
            </RegisteringFormGroup>
            <RegisteringFormGroup style={{ paddingLeft: '10px' }} container wrap="nowrap" alignItems="center" justify="flex-end">
              <label>Est. Cívil: </label>
              <SelectFormField name="civil_status">
                <option value="Casado">Casado</option >
                <option value="Solteiro">Solteiro</option >
                <option value="Divorciado">Divorciado</option >
              </SelectFormField>
            </RegisteringFormGroup>
          </Grid>
        </RegisteringFormGrid>


        <RegisteringFormGrid container alignItems="center">
          <RegisteringFormLabel item container xs={4} sm={4} md={4} lg={4} xl={4}>
            <label>Nome da mãe:  </label>
          </RegisteringFormLabel>
          <RegisteringFormGroup item justify="flex-end" alignItems="center" xs={7} sm={7} md={7} lg={7} xl={6}>
            <InputFormField placeholder="Nome da mãe, como aparece no seu documento." name="mother_fullname" border={2} width={99} />
          </RegisteringFormGroup>
        </RegisteringFormGrid>


        <RegisteringFormGrid container alignItems="center">
          <RegisteringFormLabel item container xs={4} sm={4} md={4} lg={4} xl={4}>
            <label>Nome do pai:</label>
          </RegisteringFormLabel>
          <RegisteringFormGroup item justify="flex-end" alignItems="center" xs={7} sm={7} md={7} lg={7} xl={6}>
            <InputFormField placeholder="Nome do Pai, como aparece no seu documento." name="father_fullname" border={2} width={99} />
          </RegisteringFormGroup>
        </RegisteringFormGrid>

        <RegisteringFormGrid container alignItems="center">
          <RegisteringFormLabel item container xs={4} sm={4} md={4} lg={4} xl={4} justify="flex-end">
            <label>Local de nascimento:</label>
          </RegisteringFormLabel>
          <RegisteringFormGroup item xs={4} sm={8} md={8} lg={8} xl={8} container wrap="nowrap" alignItems="center">
            <SelectFormField name="birth_country" renderList={country_list} />
            <SelectFormField name="birth_state" renderList={country_list} depends="birth_country" />
            <InputFormField name="birth_city" border={2} width={20} />
          </RegisteringFormGroup>
        </RegisteringFormGrid>
      </FullHeightContainer>
    </Form >
  );
};