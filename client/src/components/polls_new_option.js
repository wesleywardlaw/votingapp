import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field, Form } from 'redux-form';
import * as actions from '../actions';

const renderInput = field => {
    const { input, type } = field;
    return (
        <div>
            <input {...input} type={type} className="form-control" />
        </div>
    );
}

class PollsNewOption extends Component {
    handleFormSubmit(values) {
        const { id } = this.props.match.params;
        this.props.addNewOption(id, values, () => {
        	this.props.history.push(`/polls/${id}`);
        });
    }

    

    render(){
        const { handleSubmit } = this.props;

        return (
            <div>
            <h1>Add a New Option</h1>
                <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    
                    <div className="form-group">
                        <label>New Option:</label>
                        <Field name="newOption" 
                            type="input" component={renderInput} />
                    </div>
                    
                  
                    <button action="submit" className="btn btn-primary">Submit</button>
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        errorMessage: state.auth.error
     };
}

PollsNewOption = reduxForm({
 form: 'signin'
})(PollsNewOption);
export default connect(mapStateToProps, actions)(PollsNewOption);