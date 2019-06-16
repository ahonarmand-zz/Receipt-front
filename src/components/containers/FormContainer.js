import React, {Component} from 'react';  

import Input from '../components/Input';  
import Button from '../components/Button'

class FormContainer extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      form_data: props.form_data,
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */
  

  handleInput(e) {
       let value = e.target.value;
       let name = e.target.name;
   this.setState( prevState => ({ form_data : 
        {...prevState.form_data, [name]: value
        }
      }), () => console.log(this.state.form_data))
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let data = Object.assign({}, this.state.form_data, this.props.post_req_meta);
    console.log(data)

    fetch(this.props.postUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      }).then(response => {
        response.json().then(data =>{
          this.props.handleResponse(data);
        }).catch(err => console.log(err))
        
    })
  }   

  handleClearForm(e) {
  
      e.preventDefault();
      this.setState({ 
        form_data: this.props.form_data,
      })
  }

  render() {
    return (
        <div>
          <h3>{this.props.name}</h3>
          <form className={this.props.name} onSubmit={this.handleFormSubmit}>
            {Object.keys(this.props.form_data).map(field =>
              <Input inputType={'text'}
              title= {field} 
              name= {field}
              value={this.state.form_data[field]} 
              placeholder = {`Enter your name ${field}`}
              handleChange = {this.handleInput}
              />
            )}

          <Button 
              action = {this.handleFormSubmit}
              type = {'primary'} 
              title = {'Submit'} 
            style={buttonStyle}
          /> { /*Submit */ }
          
          <Button 
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            style={buttonStyle}
          /> {/* Clear the form */}
          
        </form>
        </div>
        
  
    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default FormContainer;