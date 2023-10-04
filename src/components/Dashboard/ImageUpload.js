import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { backendHost } from '../../api-config';

export const ImageUpload = () => {
    const [imageType, setImageType] = useState('')
    const [floater, setFloater] = useState('')
    const [id, setId] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState(true)

    const [selectedFile, setSelectedFile] = useState();

	const [isFilePicked, setIsFilePicked] = useState(false);


	const changeHandler = (event) => {

		setSelectedFile(event.target.files[0]);

		setIsFilePicked(true);

	};

    const Alert = (msg) => {
        setShowAlert(true)
        setAlertMsg(msg)
        setTimeout(() => {
           setShowAlert(false)
        }, 5000);
    }

	const handleSubmission = (e) => {
        e.preventDefault()
		const formData = new FormData();
		formData.append('File', selectedFile);
		fetch(`${backendHost}/dashboard/imageupload/${imageType}/${id}`,
			{
                method: 'POST',
				body: formData,
			}
		)
        .then((response) => response.json())
		.then((result) => {
            Alert('Image uploaded successfully.')
    		// console.log('Success:', result);
		})
		.catch((error) => {
    		return
		});



        //   post request for newsletter floater



        const formsData = new FormData();
		formsData.append('image', selectedFile);

        fetch(`${backendHost}/data/newsletter/upload`,
			{
                method: 'POST',
				body: formsData,
			}
		)
        .then((response) => response.json())
		.then((result) => {
            Alert('Image uploaded successfully.')
    		// console.log('Success:', result);
		})
		.catch((error) => {
    		return
		});


	}

    return(
        <>  
            {
                showAlert &&
                    <div className="alert alert-success pop-up border-bottom">
                        <div className="h5 mb-0 text-center">{alertMsg}</div>
                        <div className="timer"></div>
                    </div>
            }
            <div className="upload-image">
                <div className="container mt-5">
                    <button className='btn btn-success w-25 h5 mr-3' onClick={(e)=> setImageType('doctor')}>Upload Doctor's Image</button>
                    <button className='btn btn-danger w-25 h5 mr-3' onClick={(e)=> setImageType('article')}>Upload Article Image</button>
                    <button className='btn btn-secondary w-30 h5 ' onClick={(e)=> setFloater('floater')}>Upload Newsletter Floater Image</button>
                    {
                        imageType?
                        <>
                        {/* <div className="card my-3">
                            <div className="card-title h5 text-center py-2 border-bottom text-capitalize">Upload {imageType} Image</div>
                                <form onSubmit={uploadImage}>
                                    <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                                    <Form.Label className="text-capitalize">{imageType} ID</Form.Label>
                                    <Form.Control value={id} onChange={(e) => setId(e.target.value)} type="text"
                                    placeholder="ID here..." required/>
                                    </Form.Group>
                                    <div className="col-md-6 float-left" style={{zIndex: 2}}>
                                        <input type="file" onChange={onImageChange} className="filetype" />
                                        <img height="350px" src={image} alt="preview image" />
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                                    </div>
                                </form>

                            </div> */}
                        <div>
                        <div className="card my-3">
                            <div className="card-title h5 text-center py-2 border-bottom text-capitalize">Upload {imageType} Image</div>
                                <form onSubmit={(e) => handleSubmission(e)}>
                                    <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                                    <Form.Label className="text-capitalize">{imageType} ID</Form.Label>
                                    <Form.Control value={id} onChange={(e) => setId(e.target.value)} type="text"
                                    placeholder="ID here..." required/>
                                    </Form.Group>
                                    <div className="col-md-6 float-left" style={{zIndex: 2}}>
                                    <input type="file" name="file" onChange={changeHandler} required/>

                                    {isFilePicked ? (

                                        <div>

                                            <p>Filename: {selectedFile.name}</p>

                                            <p>Filetype: {selectedFile.type}</p>

                                            <p>Size in bytes: {selectedFile.size}</p>

                                            <p>

                                                lastModifiedDate:{' '}

                                                {selectedFile.lastModifiedDate.toLocaleDateString()}

                                            </p>

                                        </div>

                                    ) : (

                                        <p>Select a file to show details</p>

                                    )}
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                                    </div>
                                </form>

                            </div>
{/* 			

			<div>

				<button className='btn btn-primary' onClick={handleSubmission}>Submit</button>

			</div> */}

		</div>
                            
                            </>
                        : null
                    }


                    {
                        floater &&<>
                         <div>
                        <div className="card my-3">
                            <div className="card-title h5 text-center py-2 border-bottom text-capitalize">Upload {floater} Image</div>
                                <form onSubmit={(e) => handleSubmission(e)}>
                                    
                                    <div className="col-md-6 float-left" style={{zIndex: 2}}>
                                    <input type="file" name="file" onChange={changeHandler} required/>

                                    {isFilePicked ? (

                                        <div>

                                            <p>Filename: {selectedFile.name}</p>

                                            <p>Filetype: {selectedFile.type}</p>

                                            <p>Size in bytes: {selectedFile.size}</p>

                                            <p>

                                                lastModifiedDate:{' '}

                                                {selectedFile.lastModifiedDate.toLocaleDateString()}

                                            </p>

                                        </div>

                                    ) : (

                                        <p>Select a file to show details</p>

                                    )}
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                                    </div>
                                </form>

                            </div>
{/* 			

			<div>

				<button className='btn btn-primary' onClick={handleSubmission}>Submit</button>

			</div> */}

		</div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
