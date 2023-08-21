import React, {useState, useEffect} from 'react';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import {useLocation} from "react-router-dom";
import history from '../../history';
import { userId } from '../../UserId'
import { backendHost } from '../../../api-config';
import { Description } from '@material-ui/icons';


export default function UpdatePromo(props){
    const [code, setCode] = useState('')
    const [startDate, setStart] = useState()
    const [endDate, setEnd] = useState()
    const [maxLimit, setMax] = useState()
    const [active, setActive] = useState()
    const [title, setTitle] = useState()
    const [campaignList,setCampaignList] = useState([])
    const[adsList,setAdsList] = useState([])

    const [description, setDescription] = useState()

    const [count, setCount] = useState()
    const[companyList,setCompanyList] = useState([])

    const [submitAlert, setAlert] = useState(false)
    const [promoData, setPromo] = useState([])

    
    const search = useLocation().search;  
    const id = new URLSearchParams(search).get('updatecampaignads');

    const fetchPromo = (e) => {
        axios.get(`${backendHost}/sponsored/get/ads/${id}`)
        .then(res => {
            setPromo(res.data)
            setCode(res.data[0].CampaignName)
            setStart(res.data[0].StartDate.split('T')[0])
            setEnd(res.data[0].EndDate.split('T')[0])
            setMax(res.data[0].DiseaseConditionName)
            setActive(res.data[0].AdTypeName)
            setTitle(res.data[0].AdTitle)

            setDescription(res.data[0].AdDescription)

            setCount(res.data[0].AdCount)

        })
        .catch(res => {return})
    }


    const getHospital = () => {
        axios.get(`${backendHost}/article/all/table/disease_condition `)
        .then(res => {
            
            setCompanyList(res.data)
        })
        .catch(err => 
            console.log(err)
        )
    }
    
    const getAds = () => {
        axios.get(`${backendHost}/article/all/table/AdsTypes `)
        .then(res => {
            
            setAdsList(res.data)
        })
        .catch(err => 
            console.log(err)
        )
    }
    
    
    
    const getCampaign = () => {
        axios.get(`${backendHost}/article/all/table/Campaign`)
        .then(res => {
            
            setCampaignList(res.data)
        })
        .catch(err => 
            console.log(err)
        )
    }

    useEffect(() => {
        document.title = "All Cures | Dashboard | Update Promo"
        fetchPromo();
        getHospital();
        getAds();
        getCampaign();
        // eslint-disable-next-line
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
        axios.put(`${backendHost}/sponsored/update/ad/${id}`,{
            "CampaignID": code,
            "StartDate": startDate,
            "EndDate": endDate,
            "DiseaseCondition": maxLimit,
            "AdTypeID": active,
            "AdTitle": title,
            "AdDescription": description,
            "AdCount": count
        })
        .then(res => {
            history.back()
        })
        .catch(res => {return})
    }

    return(
            <div className="container">
                <div className="card my-3">
                    <div className="card-title h3 text-center py-2 border-bottom">Update Campaign Details</div>
                    <form onSubmit={submitForm}>
                        <div className="row m-4">
                        <Form.Group className="col-md-6 float-left">
                        <Form.Label>Enter Campaign Name</Form.Label>
                        <Form.Control
                         as="select"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            type="text"
                            placeholder="Campaign here..."
                            required
                        >
                        <option>{code}</option> {/* Display code from fetchPromo */}
                        <option>Select Campaign</option>
                            {campaignList.map((c) => (
                            <option value={c[0]}>{c[2]}</option>
                            ))}
                                                    </Form.Control>

                    </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>AD Start Date</Form.Label>
                            <Form.Control type="Date" defaultValue={startDate} onChange={(e) => setStart(e.target.value)} name=""
                            placeholder="Start Date here..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>AD End Date</Form.Label>
                            <Form.Control defaultValue={endDate} onChange={(e) => setEnd(e.target.value)} type="Date" name=""
                            placeholder="Start Date here..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                        <Form.Label>Enter DiseaseCondition</Form.Label>
                        <Form.Control
                            as="select"
                            value={maxLimit}
                            onChange={(e) => setMax(e.target.value)}
                            required
                        >
                            <option value={maxLimit}>{maxLimit}</option> {/* Display maxLimit from fetchPromo */}
                            <option>Select Disease Condition</option>
                            {companyList.map((c) => (
                            <option value={c[0]}>{c[1]}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Enter Ad Type</Form.Label>
                            <Form.Control   as="select" type="text" name="" value={active} onChange={e => setActive(e.target.value)}

                             required>
                                   <option value={active}>{active}</option> {/* Display maxLimit from fetchPromo */}
                            <option>Select Ad Type</option>
                            {adsList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
                        </Form.Control>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Enter Ad Title</Form.Label>
                            <Form.Control type="text" name="" value={title} onChange={e => setTitle(e.target.value)}
                            required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Enter Ad Description</Form.Label>
                            <Form.Control type="text" name="" value={description} onChange={e => setDescription(e.target.value)}
                             required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Enter Ad Impression</Form.Label>
                            <Form.Control type="text" name="" value={count} onChange={e => setCount(e.target.value)}
                             required/>
                        </Form.Group>
                        </div>
                        {
                            submitAlert?
                                <Alert variant="success" className="h6 mx-3">Updated Successfully!!</Alert>
                                : null
                        }
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>
                </div>
    );
    
}
