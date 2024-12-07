import styled, { css } from "styled-components";

export type ButtonVariant =  'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const buttonVariants = {
  'primary': 'purple',
  'secondary': 'cyan',
  'danger': 'orange',
  'success': 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  background-color: ${props => props.theme.secondary};

  /* ${props => {
    return css`background-color: ${buttonVariants[props.variant]}`
  }} */
`