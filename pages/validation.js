import React from 'react'
import { Form, FormSpy } from 'react-final-form'
import createDecorator from 'final-form-focus'
import { Field } from 'react-final-form-html5-validation'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const showResults = async values => {
  await sleep(500) // simulate server latency
  window.alert(JSON.stringify(values, undefined, 2))
}

const focusOnFirstError = createDecorator()

const App = () => (
  <div>
    <h1>🏁 React Final Form</h1>
    <Form
      onSubmit={showResults}
      decorators={[focusOnFirstError]}
      subscription={{
        submitting: true
      }}
    >
      {({ handleSubmit, values, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="firstName"
            type="text"
            required
            valueMissing="No value!"
            minLength={4}
            subscription={{
              active: true,
              touched: true,
              error: true,
              value: true
            }}
          >
            {({ input, meta, placeholder, ...rest }) => (
              <div className={meta.active ? 'active' : ''}>
                <label>First Name</label>
                <input {...input} placeholder="First Name" {...rest} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field
            name="lastName"
            required
            subscription={{
              active: true,
              touched: true,
              error: true,
              value: true
            }}
          >
            {({ input, meta, placeholder, ...rest }) => (
              <div className={meta.active ? 'active' : ''}>
                <label>Last Name</label>
                <input {...input} placeholder="Last Name" {...rest} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field
            name="email"
            required
            type="email"
            subscription={{
              active: true,
              touched: true,
              error: true,
              value: true
            }}
          >
            {({ input, meta, placeholder, ...rest }) => (
              <div className={meta.active ? 'active' : ''}>
                <label>Email</label>
                <input {...input} placeholder="Email" {...rest} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <FormSpy subscription={{ values: true }}>
            {({ values }) => <pre>{JSON.stringify(values, undefined, 2)}</pre>}
          </FormSpy>
        </form>
      )}
    </Form>
    <h3>final-form.org @finalformjs</h3>
  </div>
)

export default App
