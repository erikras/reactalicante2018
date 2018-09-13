import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'

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
WhenFieldChanges.propTypes = {
  field: PropTypes.string.isRequired,
  becomes: PropTypes.any,
  set: PropTypes.string.isRequired,
  to: PropTypes.any
}

export default WhenFieldChanges
