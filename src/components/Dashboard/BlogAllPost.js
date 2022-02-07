
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom';
import AllPost from './Allpost';




function App() {

  const [article, setArticle] = useState({});
  const [page, setPage] = useState(1);
  const [article_id,setArticle_Id] = useState()
  const [title, setTitle] = useState('')
  const [id, setId] = useState();
const[type,setType] = useState();
  const columns = [

    {
     name: <h5>ARTICLE ID</h5>,
    
      selector: row=>  <Link to={ `/cure/${row.article_id}` } className="lg"  >
     <h6 className='col'>{row.article_id}</h6> 
  </Link>,
   sortable: true,
    },
  
  
    {
      name: <h5>ARTICLE TITLE</h5>,
      
      selector: row=> <Link to={ `/cure/${row.article_id}` }>
      <h6 className='col'> {row.title}</h6>
  </Link>,
  sortable: true,
    },
    {
        name: <h5>STATUS</h5>,
       
        selector: row=> 
           parseInt(row.pubstatus_id) === 1?
                <h6 className="chip overview mr-2 col">Work In Progress</h6>
                
            : parseInt(row.pubstatus_id) === 2?
                <h6 className="chip symptoms mr-2 col">Reviewed
                 </h6>
            : parseInt(row.pubstatus_id) === 3? 
                <h6 className="chip cure mr-2 col">Published </h6>
            : null,
            sortable: true,
        
    },
   
    {
        name: <h5>PUBLISHED DATE</h5>,
      
        selector: row=> <h6 className='col'>{row.published_date}</h6>,
        sortable: true,
    },
    {
      name: <h5>CURES TYPE</h5>,
     
      selector: row=> 
         row.type.includes('1') || type === '1'?
              <h6 className="chip overview">Overview</h6>
              
          : row.type.includes('2') || type === '2'?
              <h6 className="chip symptoms">Cure
               </h6>
          : row.type.includes('3') || type === '3'?
              <h6 className="chip cure">Symptoms </h6>
          : null,
          sortable: true,
      
  },
    {
        name: <h5>AUTHOR NAME</h5>,
        
        selector: row=> <h6 className='col'>{row.authors_name}</h6>,
        sortable: true,
    },
    {
      name: <h5>DISEASE NAME</h5>,
      
      selector: row=> <h6 className='chip  mr-2col'>{row.dc_name}</h6>,
      sortable: true,
  },
  
    // {
    //     name: <h5>Edit Cure</h5>,
       
    //     selector: row=> <Link className="chip symptoms mr-2 col" to={ `/article/${row.article_id}`}>Edit</Link>,
    //     sortable: true,
    // },
    {
        name: <h5>Action Buttons</h5>,
      
        selector: row=> <AllPost id={row.article_id}/>,
        sortable: true,
    },
  
  ];
  const countPerPage = 8;
// //   offset = 1;
//   if (page>1) offset = ( page -1 )* countPerPage;

  const getUserList = (sort) => {
    // e.preventDefault()
    
    if(title && article_id){
      axios.get(`${backendHost}/article/allkv?offset=${(page-1)*countPerPage}&limit=${countPerPage}&search=title:${title}~article_id:${article_id}&order=article_id:asc`).then(res => {
        setArticle(res.data);
        
      }).catch(err => {
        setArticle({});
      });
    } else if(title){
      axios.get(`${backendHost}/article/allkv?offset=${(page-1)*countPerPage}&limit=${countPerPage}&search=title:${title}&order=article_id:asc`).then(res => {
        setArticle(res.data);
        
      }).catch(err => {
        setArticle({});
      });
    } else if(article_id){
      axios.get(`${backendHost}/article/allkv?offset=${(page-1)*countPerPage}&limit=${countPerPage}&search=article_id:${article_id}&order=article_id:asc`).then(res => {
        setArticle(res.data);
        
      }).catch(err => {
        setArticle({});
      });
    } else if(sort){
      axios.get(`${backendHost}/article/allkv?offset=${(page-1)*countPerPage}&limit=${countPerPage}&&order=article_id:${sort}`).then(res => {
        setArticle(res.data);
        
      }).catch(err => {
        setArticle({});
      });
    } else{
      axios.get(`${backendHost}/article/allkv?offset=${(page-1)*countPerPage}&limit=${countPerPage}`).then(res => {
        setArticle(res.data);
        
      }).catch(err => {
        setArticle({});
      });
    }
    
  }
 

  useEffect(() => {
    getUserList();
  }, [page]);

  return (
    <div class="row" >
     
        <div class="col-5"> 
        <input type="text" value={title}   onChange={(e) => setTitle(e.target.value)} placeholder="Search With Article Title" className="form-control" required/>
        </div>
        <div class="col-5"> 
        <input type="text" value={article_id}   onChange={(e) => setArticle_Id(e.target.value)} placeholder="Search With Article Id" className="form-control" required/>
        </div>
       
        <button className='btn btn-primary btn-sm' id='table' onClick={(e) => getUserList(e)}>Search  <i class="fa fa-search"></i></button>
        <div class="container">
        <div class="btn-group btn-group-justified">
        <button className='btn btn-primary '  onClick={(e) => getUserList(`asc`)}>Sort Latest Article Id <i class="fa fa-sort"></i> </button>
       
        <button className='btn btn-primary '  onClick={(e) => getUserList(`desc`)}>Sort Earliest Article Id <i class="fa fa-sort"></i></button></div>
        </div>
       
        

        
        <div className='col'><br/>
          <div className='col'>
      <DataTable
      
        columns={columns}
        data={article}
        // sortable
        highlightOnHover
        pagination
        paginationServer
        
        // paginationTotalRows= {100}
        paginationTotalRows={article.length >= 1 ? article[0].count: 0}
        paginationPerPage={countPerPage}
        paginationComponentOptions={{
          noRowsPerPage: true
          
        }}
        onChangePage={page => setPage(page)}
       
      />
      
    </div>
    </div>
    </div>
  );
}

export default App;