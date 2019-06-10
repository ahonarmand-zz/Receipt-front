import React, {Component} from 'react';  
import FormContainer from '../../components/containers/FormContainer';
import { matchPath } from 'react-router';
import MemberExpenseShare from '../../components/containers/MemberExpenseShare'

class Group extends Component { 
    constructor(props) {
        super(props)
        const match = matchPath(this.props.history.location.pathname, {
            path: '/group/:group_id/:group_name',
            exact: true,
            strict: false
          })
        
        this.group_id = match.params.group_id
        this.group_name = match.params.group_name
        console.log(this.group_id)
        console.log(this.group_name)
        this.state = {
            members: [],
            expenses: []
        }
    }

    componentDidMount() {
        this.get_members()
        this.get_expenses()
    }

    get_expenses() {
        fetch(`http://localhost:5000/api/group/${this.group_id}/expenses`,
        {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    ).then(response => {
        if (response.ok) {
        response.json().then(json => {
            console.log("EXPESES:")
            console.log(json);
            this.setState({expenses: json})
        });
        }
    })
    }

    get_members() {
        fetch(`http://localhost:5000/api/group/${this.group_id}/members`,
        {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    ).then(response => {
        if (response.ok) {
        response.json().then(json => {
            console.log(json);
            this.setState({members: json })
        });
        }
    })
    }

    render(){
        return (
            <div>
                <h1> {`Group: ${this.group_name}`} </h1>
                <h3>Members:</h3>
                <MemberExpenseShare/>
                
                <FormContainer 
                    name="create expense category" 
                    form_data={{"expense_name": ''}}
                    post_req_meta={{'group_id': this.group_id}}
                    postUrl="http://localhost:5000/api/group_expense"
                    handleResponse={
                        (data) => {
                            console.log(JSON.stringify(data))
                            // this.update_groups()
                    }}
                />
                
                <h2>Current Group Expense Categories</h2>
                {
                    this.state.expenses ? this.state.expenses.map(
                    e => <h4> 
                            {e.expense_name}
                        </h4>
                        ) : <h4>This group currently has no expenses</h4>
                }
            </div>
        )
    }
}

export default Group;