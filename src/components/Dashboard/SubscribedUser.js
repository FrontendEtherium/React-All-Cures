
import React from 'react';
import axios from 'axios';
import { backendHost } from '../../api-config';
import axiosInstance from '../../axiosInstance';

class SubscribedUser extends React.Component {
  
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			DataisLoaded: false,
            
		};
	}

	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
		axiosInstance.get(`/article/all/table/newsletter`)
        // .then(res => res.json())
       .then(res => {

				this.setState({
					items: res.data,
					DataisLoaded: true
				});
			})
	}

	render() {
		const { DataisLoaded, items } = this.state;
       
		if (!DataisLoaded) return( <div><h1> wait.... </h1> </div> );
		else return (
		<div class="Regist123">
		<h1> Subscribed users </h1> 
        <table class="table">
            <thead>
        <tr>
                                    <th scope="col " style={{width:"230px"}}>Id</th>
                                    <th style={{width:"230px"}}>Subscription Disease_id</th>
                                    <th style={{width:"230px"}}>Start Date</th>
                                    <th style={{width:"230px"}}>Sub Type</th>
                                   
                                    <th style={{width:"230px"}}>Phone No.</th>
                                    <th style={{width:"230px"}}>Subscription Cure_id</th>
                                    <th style={{width:"230px"}}>Active</th>
                                </tr>
                                </thead></table>{
				items.map((item) => (
				<table class="table table-striped" >
                            
                            <tbody>
                                
                                <tr >
                                    <td style={{width:"230px"}}>{item[0]}</td>
                                    <td style={{width:"230px"}}>{item[1]}</td>
                                    <td style={{width:"230px"}}>{item[2]}</td>
                                    <td style={{width:"230px"}}>{item[3]}</td>
                                    <td style={{width:"230px"}}>{item[4]}</td>
                                    <td style={{width:"230px"}}>{item[5]}</td>
                                    <td style={{width:"230px"}}>{item[6]}</td>
                                </tr>
                                
                            </tbody>
                        </table>





				))
			}
		</div>

	);
	}
}

export default SubscribedUser;
