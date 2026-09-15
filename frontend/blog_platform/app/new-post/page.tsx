"use client";
import { useState } from 'react';

export default function NewPostForm(){
    const [formData, setFormData] = useState({
        title: '',
        slug : '',
        body: '',
        status: 'DF',
        author: 1,
    });
    const [message, setMessage] = useState('');

    const handleChange = (e:any) =>{
        const {name, value} = e.target;
        setFormData((prev) =>({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e:any) =>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:8000/', {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if(response.ok){
                setMessage('Post created sussessfully');
                setFormData({title: '', slug : '', body: '', status : 'DF', author: 1});
            }
            else{
                    setMessage(`Error: ${JSON.stringify(data)}`);
            }
        }
        catch(error){
            console.error('Request failed: ', error);
            setMessage('Failed to reach backend')
        }
    };

    return(
        <div>
            <h2>Create New Blog Post</h2>
            <form onSubmit= {handleSubmit}>
                <div>
                <label>Title:</label>
                <input type = 'text' name = 'title' value =  {formData.title} onChange = {handleChange} required />
                </div>    

                
                <div>
                <label>Slug:</label>
                <input type = 'text' name = 'slug' value =  {formData.slug} onChange = {handleChange} required />
                </div>    

                <div>
                <label>Body Content:</label>
                <textarea name = 'body' value =  {formData.body} onChange = {handleChange} required />
                {/* rows="5" */}
                </div>    

                <div>
                    <label>Status: </label>
                    <select name = "status" value = {formData.status} onChange = {handleChange}>
                        <option value = 'DF'>Draft</option>
                        <option value = 'PB'>Published</option>
                    </select>
                </div>
                <button type = 'submit'>Publish Post</button>
            </form>
              {message && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{message}</p>}
        </div>
    )
}