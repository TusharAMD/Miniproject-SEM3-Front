import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Classifier.css'
import {Spinner, Button, Alert, Image} from 'react-bootstrap'
import axios from 'axios'

class Encrypt extends Component {
    state = { 
        files: [],
        isLoading: false,
        recentImage: null,
     }

     onDrop =(files) =>{
        this.setState({
            files:[],
            isLoading: true,
            recentImage:null
            })
        this.loadImage(files)
     }

     loadImage=(files)=>{
         setTimeout(() => {
             this.setState({
                 files,
                 isLoading: false
             }, () => {
                console.log(this.state.files[0].name)
                console.log(this.state.files[1].name)
             })
         }, 1000);
     }

     activateSpinner = () => {
         this.setState({
             files:[],
             isLoading:true,
            })
     }

     deactivateSpinner=()=> {
        this.setState({isLoading:false})
     }

     sendImage =()=> {
         this.activateSpinner()
         let formData = new FormData()
         formData.append('toencrypt', this.state.files[0], this.state.files[0].name)
         formData.append('using', this.state.files[1], this.state.files[1].name)
         axios.post('http://localhost:8000/api/encrypt/', formData, {
             headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data'
             }
         })
         .then(resp=>{
             this.getImageClass(resp)
             console.log(resp.data.id)
         })
         .catch(err=>{
             console.log("Code broke at send image")
             console.log(err)
         })
     }

     getImageClass =(obj)=> {
         axios.get(`http://localhost:8000/api/encrypt/${obj.data.id}/`, {
             headers: {
                'accept': 'application/json',
             }
         })
         .then(resp=>{
             this.setState({recentImage:resp})
             console.log(resp)
         })
         .catch(err=>{
            console.log("Code broke at get image")
            console.log(err)
        })
        this.deactivateSpinner()

     }
     
    render() { 
        const files = this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ));
        return ( 
            <Dropzone onDrop={this.onDrop} accept='image/png, image/jpeg'>
            {({isDragActive, getRootProps, getInputProps}) => (
              <section className="container">
                <div {...getRootProps({className: 'dropzone back'})}>
                  <input {...getInputProps()} />
                  <i className="far fa-image mb-2 text-muted" style={{fontSize:100}}></i>
                  <p className='text-muted'>{isDragActive ? "Here we GO!! " : "Drag images here to Encrypt"}</p>
                </div>
                <aside>
                  {files}
                </aside>

                {this.state.files.length >1 &&
                <Button variant='info' size='lg' className='mt-3' onClick={this.sendImage}>Select Image</Button>
                }

                {this.state.isLoading &&
                <Spinner animation="border" role="status"></Spinner>
                }

                {this.state.recentImage &&
                <React.Fragment>
                    <Alert variant='primary'>
                        {this.state.recentImage.data.result}
                    </Alert>
                    <Image className='justify-content-center' src={this.state.recentImage.data.result} height='200' rounded/>
                </React.Fragment>
                }
              </section>
            )}
          </Dropzone>
         );
    }
}
 
export default Encrypt;