import React, {Component } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import * as actions from '../actions';
import { Link } from 'react-router-dom';




const renderOptions=({ fields }) =>{
		

		return (


		  <ul className="list-group">
		  	<li className="list-group-item">
		         <button className="btn btn-primary" type="button" onClick={() => fields.push('option', {})}>Add Option</button>
		         <button className="btn btn-danger" type="button" onClick={() => fields.pop('option', {})}>Remove Option</button>
		     </li>

		    {fields.map((field, index) => {
		    	return(
		    		<div key={index}>
		    			<li className="list-group-item"><Field name={field} component={renderField}  placeholder="option" className="form-control" /></li>
					</div>
				);
		    })}
		 
		  </ul>

		)
	}

	const renderField = (field) =>{
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched&&error ? 'has-danger':''}`;
		return(
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control"
					type="text"
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error: ''}
				</div>
			</div>
		);
	}




class PollsEdit extends Component {


  componentDidMount(){
		this.props.fetchPolls();
		const { id } = this.props.match.params;
		this.props.fetchPoll(id);

	}

  onSubmit(values){
  		const { id } = this.props.match.params;
		this.props.editPoll(values, id, () => {
			this.props.history.push(`/polls/${id}`);
		});
	}



  render(){
  		if(!(this.props.polls)){
  			return(
  				<div>
  					Loading...
  				</div>

  			);

  		} else {
  		const { array: { push },handleSubmit, load, pristine, reset, submitting } = this.props
	  return (
	    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
	     
	     
	   
	          <Field name="title" component={renderField} type="text" placeholder=" title" className="form-control"/>
	     
	      
	     
	        <FieldArray name="options" component={renderOptions} />
	      
	      
	      
	        <button className = "btn btn-primary" type="submit" disabled={pristine || submitting}>Submit</button>
	        <button className = "btn btn-warning" type="button" disabled={pristine || submitting} onClick={reset}>Undo Changes</button>
	      
	    </form>
	  );

  		}
  
  }


}


function validate(values){
	const errors = {}
  if(!values.title){
    errors.title = 'Please enter a title'
  }

  if(!values.options || !values.options.length){
    errors.options = 'At least one option must be entered'
  } else {
        const optionsArrayErrors = []
        values.options.forEach((option, optionIndex) => {
          const optionErrors = {}
          if(values.options.indexOf(option, optionIndex+1)>-1){
            errors.options = " "
          }
        });  
    }    
    
    return errors;
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
PollsEdit = reduxForm({
  form: 'initializeFromState',
  validate
})(PollsEdit)

PollsEdit = connect(
  
  (state, ownProps) =>{

  		var title = state.polls[ownProps.match.params.id].title;
  		var newoptions = state.polls[ownProps.match.params.id].options.map( options => {return options.text});
   return ({
    initialValues: {title: title, options: newoptions},
    polls:state.polls 
  }) }
  ,
  actions               
)(PollsEdit)

export default PollsEdit;