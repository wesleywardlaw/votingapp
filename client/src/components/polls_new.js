import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import * as actions from '../actions';
import { Link } from 'react-router-dom';




const renderOptions = ({ fields })=> {

return (


  <ul className="list-group">
    {console.log(fields)}
  	<li className="list-group-item">
         <button className="btn btn-primary" type="button" onClick={() => fields.push('option', {})}>Add Option</button>
         <button className="btn btn-danger" type="button" onClick={() => fields.pop('option', {})}>Remove Option</button>
     </li>
    {fields.map(field => 

    	<li key={field} className="list-group-item"><Field name={field} component="input" placeholder="option" className="form-control"/ ></li>)
	}
  </ul>
)
}

let PollsNew = props => {



  const { array: { push },handleSubmit, load, pristine, reset, submitting } = props
  console.log(push);
  return (
    <form onSubmit={handleSubmit}>
     
      <div className="form-group">
        <label>Title</label>
        <div>
          <Field name="title" component="input" type="text" placeholder=" title" className="form-control"/>
        </div>
      </div>
      
      <div className="form-group">
        <label>Options</label>
        <FieldArray name="options" component={renderOptions} />
      </div>
      
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Undo Changes</button>
      </div>
    </form>
  )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
PollsNew = reduxForm({
  form: 'initializeFromState',
 initialValues: {  // used to populate "account" reducer when "Load" is clicked
  title: 'title',
  options: [ 'choice1', 'choice2', 'choice3', 'choice4' ]
} // pull initial values from account reducer
})(PollsNew)

// You have to connect() to any reducers that you wish to connect to yourself
PollsNew = connect(
  
   null
  ,
  actions               // bind account loading action creator
)(PollsNew)

export default PollsNew