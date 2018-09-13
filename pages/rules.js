import React from 'react'
import Styles from '../styles'
import { Form, Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const WhenFieldChanges = ({ field, becomes, set, to }) => (
  <Field name={set} subscription={{}}>
    {(
      // No subscription. We only use Field to get to the change function
      { input: { onChange } }
    ) => (
      <OnChange name={field}>
        {value => {
          if (value === becomes) {
            onChange(to)
          }
        }}
      </OnChange>
    )}
  </Field>
)

const App = () => (
  <Styles>
    <h1>🏁 React Final Form</h1>
    <h2>Declarative Form Rules</h2>
    <Form
      onSubmit={onSubmit}
      initialValues={{ gift: true }}
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
        errors
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <WhenFieldChanges
              field="gift"
              becomes={false}
              set="giftWrap"
              to={false}
            />
            <WhenFieldChanges
              field="gift"
              becomes={false}
              set="giftCardMessage"
              to={undefined}
            />
            <div>
              <label>Is this a gift?</label>
              <Field name="gift" component="input" type="checkbox" />
            </div>
            <div>
              <label>Gift wrap?</label>
              <Field
                name="giftWrap"
                component="input"
                type="checkbox"
                disabled={!values.gift}
              />
            </div>
            <div>
              <label>Message</label>
              <Field
                name="giftCardMessage"
                component="textarea"
                disabled={!values.gift}
                placeholder="What do you want the card to say?"
              />
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <h2>Data</h2>
            <pre>{JSON.stringify(values, undefined, 2)}</pre>
          </form>
        )
      }}
    />
  </Styles>
)

export default App
