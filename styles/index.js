import styled, { css } from 'styled-components'

const btn = (light, dark) => css`
  white-space: nowrap;
  display: inline-block;
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 16px;
  color: white;
  &:visited {
    color: white;
  }
  background-image: linear-gradient(${light}, ${dark});
  border: 1px solid ${dark};
  &:hover {
    background-image: linear-gradient(${light}, ${dark});
    &[disabled] {
      background-image: linear-gradient(${light}, ${dark});
    }
  }
  &:visited {
    color: black;
  }
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const btnDefault = css`
  ${btn('#ffffff', '#d5d5d5')} color: #555;
`

const btnPrimary = btn('#4f93ce', '#285f8f')
const btnDanger = btn('#e27c79', '#c9302c')

export default styled.div`
  font-family: sans-serif;

  h1 {
    text-align: center;
    color: #222;
    margin-bottom: 0;
  }

  h2 {
    text-align: center;
    color: #222;
  }

  h3 {
    text-align: center;
    color: #666;
    margin: 0;
  }

  form {
    text-align: left;
    max-width: 500px;
    margin: 10px auto;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    position: relative;

    & > div {
      display: flex;
      flex-flow: row nowrap;
      line-height: 2em;
      position: relative;
      padding: 8px 5px;
      border: 1px solid transparent;
      &.active {
        background-color: paleturquoise;
        border-color: turquoise;
      }
      & > label {
        color: #333;
        width: 110px;
        min-width: 60px;
        font-size: 1em;
        line-height: 32px;
      }
      & > input,
      & > select,
      & > textarea {
        font-family: monospace, monospace;
        flex: 1;
        padding: 6px 9px;
        font-size: 1em;
        margin-left: 15px;
        border: 1px solid #ccc;
        border-radius: 3px;
        &[disabled] {
          background: #eee;
        }
      }
      & > input[type='checkbox'] {
        margin-top: 7px;
      }
      & > div {
        margin-left: 16px;
        & > label {
          margin-left: 0;
          display: block;
          & > input {
            margin-right: 3px;
          }
        }
      }
      & > span {
        line-height: 32px;
        margin-left: 10px;
        color: #800;
        font-weight: bold;
      }
    }
    .error {
      display: flex;
      font-weight: bold;
      color: #800;
      flex-flow: row nowrap;
      justify-content: center;
    }
    pre {
      position: relative;
      border: 1px solid #ccc;
      background: rgba(0, 0, 0, 0.1);
      box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
      padding: 20px;
    }
  }

  button {
    margin: 10px auto;
    &[type='submit'] {
      ${btnPrimary};
      display: block;
      width: 80px;
    }
  }
`
