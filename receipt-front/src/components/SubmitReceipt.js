import React, {Component} from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';


class SubmitReceipt extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="file-uploader">
                <h2>Upload an image of the receipt</h2>
                <FilePond server="http://localhost:5000/upload" />
            </div>
        )
    }
}

export default SubmitReceipt