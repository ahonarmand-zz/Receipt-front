import React, {Component} from 'react';  

class MemberExpenseShare extends Component { 
    constructor(props) {
        super(props)
        this.members = [
                {email: "a@b.com", name: "Ali", expense_shares:[{expense_name: "a", expense_share: 10}, {expense_name: "b", expense_share: 20}] },
                {email: "c@d.com", name: "Cristian", expense_shares:[{expense_name: "a", expense_share: 80}, {expense_name: "b", expense_share: 30}] }
            ]
        this.expense_names = this.extract_expense_names(this.members)
        this.expense_shares = this.get_expense_shares(this.members)
        console.log(this.email_expense_to_share)
    }

    get_expense_shares(members){
        const m = {}
        for (const member of members){
            m[member.email] = {}
            for (const e of member.expense_shares){
                m[member.email][e.expense_name] = e.expense_share
            }
        }
        return m
    }

    extract_expense_names(members) {
        var expenses = new Set();

        for (const member of members){
            const member_expense_names = member.expense_shares.map(e => e.expense_name)
            member_expense_names.forEach(expense => expenses.add(expense))
        }
        return Array.from(expenses)
    }

    create_email_expense_map(members) {
        const m = {}
        for (const member of members){
            for (const e of member.expense_shares){
                m[this.create_email_expense_tuple(member.email, e.expense_name)] = e.expense_share
                console.log(`size: ${m.size}`)
            }
        }
        return m
    }

    get_member_share(email, expense_name){
        if (expense_name in this.expense_shares[email]){
            return this.expense_shares[email][expense_name]
        } else {
            return ""
        }
    }

    render() {
        return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        {Object.keys(this.expense_shares).map(
                            e => <th> {e.expense_name} </th>
                        )}
                        {/* <th>expense category</th> */}
                    </tr>
                </tbody>
                    
                {
                    this.members.map(member => 
                        <tbody>
                            <tr>
                                <td>{ member.name || "" }</td>
                                <td>{ member.email || "" }</td>
                                {
                                    Object.keys(this.expense_shares[member.email ]).map(e => <td>
                                        {/* <Input inputType={'text'}
                                            title= {field} 
                                            name= {field}
                                            value={this.state.form_data[field]} 
                                            placeholder = {`Enter your name ${field}`}
                                            handleChange = {this.handleInput}
                                        /> */}
                                        {this.get_member_share(member.email, e)}</td>)
                                }
                            </tr>
                        </tbody>
                        
                    )
                }
                </table>
        </div>
        )
    }
}

export default MemberExpenseShare