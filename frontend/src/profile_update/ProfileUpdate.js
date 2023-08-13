import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the icon you want to use
import './ProfileUpdate.css'; // Import your CSS file for styling
import Home from '../home/home';
import UserService from '../services/Auth/UserService';
import { useEffect } from 'react';

function ProfileUpdate() {
    const { register, handleSubmit, setValue } = useForm();
    const [imageFile, setImageFile] = useState(null);
    const [userData, setUserData] = useState({})

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    useEffect(() => {
        UserService.getUserDetails().then((res) => {
            const userDataFromApi = res.data.userData;
            setUserData(userDataFromApi);

            // Pre-fill form fields with user data
            for (const key in userDataFromApi) {
                setValue(key, userDataFromApi[key]);
            }
        });
    }, []);

    const onSubmit = async (formValues) => {
        const formData = new FormData();
        if (imageFile) {
            formData.append('image', imageFile);
        }
        for (const key in formValues) {
            if (key !== 'image') {
                formData.append(key, formValues[key]);
            }
        }
        try {
            const response = await UserService.updateProfile(userData.id, formValues);
            if(response.status === 200){
                alert("Profile update successfully")
            }
            // Handle success
        } catch (error) {
            console.error('Update error:', error);
            // Handle error
        }
    };



    return (
        <Home>
            <div className="profile-update-container">
                <div className="profile-update-form">
                    <h2 className="my-4" style={{ fontVariant: "small-caps" }}>
                        <span className="shadow py-1 px-4 rounded-bottom">
                            Update Profile
                        </span>
                    </h2>
                    <div className="profile-image-container">
                        {/* Display the profile image */}
                        <div>

                            {imageFile ? (
                                <img src={URL.createObjectURL(imageFile)} alt="Profile" style={{ height: "100px", width: "100px", borderRadius: "50%" }} />
                            ) : (
                                <FontAwesomeIcon icon={faUser} size="3x" style={{ height: "100px", width: "100px", borderRadius: "50%" }} />
                            )}
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} encType='multipart/formdata'>
                        <input type="file" name="image" accept="image/*" onChange={handleImageChange} className='p-3' />
                        <div className="input-group d-flex flex-column justify-content-center align-items-center p-3">
                            <div className="form-group p-2">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder=''
                                    {...register("name")}
                                />
                            </div>
                            <div className="form-group p-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    {...register("email")}
                                />
                            </div>
                            <div className="form-group p-2">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    {...register("phone")}
                                />
                            </div>
                            <div className="form-group p-2">
                                <label htmlFor="gender">Gender</label>
                                <input
                                    type="text"
                                    name="gender"
                                    {...register("gender")}
                                />
                            </div>
                        </div>
                        <div className="button-container">
                            <button type="submit" className="btn btn-sm btn-outline-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </Home>
    );


}

export default ProfileUpdate;
