import React, {Component} from 'react';  
import Input from '../components/Input'; 
import Button from '../components/Button';

class MemberExpenseShare extends Component { 
    constructor(props) {
        super(props)
        // this.members_expenses = [
        //         {email: "a@b.com", name: "Ali", expense_shares:[{expense_name: "a", expense_share: 10}, {expense_name: "b", expense_share: 20}] },
        //         {email: "c@d.com", name: "Cristian", expense_shares:[{expense_name: "a", expense_share: 80}, {expense_name: "b", expense_share: 30}] }
        //     ]
        this.state = {
            expense_shares: {}
        }
        this.handleProps(this.props.members_expenses)
    }

    componentDidUpdate(prevProps) {
        if (this.props != prevProps){
            console.log(this.props)
            this.handleProps(this.props.members_expenses) 
        }
      }

    handleProps(members_expenses){
        this.setState({
            expense_shares: this.get_expense_shares(members_expenses)
        })
    }

    get_expense_shares(members){
        const m = {}
        const expense_name_to_expense_id = {}
        for (const member of members){
            m[member.email] = {}
            m[member.email].name = member.name
            m[member.email].shares = {}
            for (const e of member.expense_shares){
                expense_name_to_expense_id[e.expense_name] = e.expense_id
                m[member.email].shares[e.expense_name] = e.expense_share
            }
        }
        this.expense_name_to_expense_id = expense_name_to_expense_id
        return m
    }

    handle_input(email, expense_name){
        return (event) => {
            let new_share_value = event.target.value;

            const prev_shares = this.state.expense_shares
            prev_shares[email].shares[expense_name] = new_share_value
            this.setState({expense_shares: prev_shares})
        }
    }

    get_expense_names(){
        const email1 = Object.keys(this.state.expense_shares)[0]
        if (!email1){
            return []
        }
        return Object.keys(this.state.expense_shares[email1].shares)
    }

    post_new_ratios(expense_name){
        return (event) => {
            const expense_id = this.expense_name_to_expense_id[expense_name]
            
        }
    }

    table_header(){
        return (
            <tr>
                <th>name</th>
                <th>email</th>
                {this.get_expense_names().map(
                    e => <th> {e} </th>
                )}
            </tr>
        )
    }

    table_content(){
        const expense_shares = this.state.expense_shares
        return Object.keys(expense_shares).map( email => {
            const name = expense_shares[email].name
            const shares = expense_shares[email].shares
            return (
                <tr>
                    <td>{ name || "" }</td>
                    <td>{ email || "" }</td>

                    {Object.keys(shares).map(expense_name =>
                            <td>
                                <Input inputType={'text'}
                                    name={[email, expense_name].join('-')} 
                                    value={this.state.expense_shares[email].shares[expense_name]}
                                    handleChange = {this.handle_input(email, expense_name)}
                                />
                            </td>
                    )}

                </tr>
            )
        }
        )                                
    }

    get_ratios_for_expense(expense_name){
        const emails = Object.keys(this.state.expense_shares)
        const ratios = []
        for (const e of emails){
            ratios.push({
                email: e,
                share: this.state.expense_shares[e].shares[expense_name]
            })
        }
        return ratios
    }

    update_ratios(expense_name){
        const expense_id = this.expense_name_to_expense_id[expense_name]
        const ratios = this.get_ratios_for_expense(expense_name)
        const data = {
            group_id: this.props.group_id,
            ratios: ratios
        }
        fetch(`http://localhost:5000/api/group_expense/${expense_id}/shares`, {
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

    table_buttons(){
        return (
            <tr>
                <td></td>
                <td></td>
                {this.get_expense_names().map(expense_name => 
                    <td>
                        <Button 
                            action = {() => this.update_ratios(expense_name)}
                            title={"change expense ratio"}
                        />
                    </td>
                )}
            </tr>
        )
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        {this.table_header()}
                        {this.table_content()}
                        {this.table_buttons()}
                    </tbody>

                </table>
            </div>
        )
    }
}

export default MemberExpenseShare