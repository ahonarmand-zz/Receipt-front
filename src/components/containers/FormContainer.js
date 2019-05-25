import React, {Component} from 'react';  

import Input from '../components/Input';  
import Button from '../components/Button'

class FormContainer extends Component {  
  constructor(props) {
    super(props);

    var user = {}

    for (var i=0; i<this.props.fields.length; i++){
      user[this.props.fields[i]] = ''
    }

    this.state = {
      user: user,
    }

    console.log("here")
    console.log(`props: ${JSON.stringify(props)}`)

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */
  

  handleInput(e) {
       let value = e.target.value;
       let name = e.target.name;
   this.setState( prevState => ({ user : 
        {...prevState.user, [name]: value
        }
      }), () => console.log(this.state.user))
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.user;
    console.log(userData)

    fetch(this.props.postUrl, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
        })
    })
  }   

  handleClearForm(e) {
  
      e.preventDefault();
      this.setState({ 
        user: {
          ...this.props.fields
        },
      })
  }

  render() {
    return (
        <div>
          <h3>{this.props.name}</h3>
          <form className={this.props.name} onSubmit={this.handleFormSubmit}>
            {this.props.fields.map(field =>
              <Input inputType={'text'}
              title= {field} 
              name= {field}
              value={this.state.user[field]} 
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