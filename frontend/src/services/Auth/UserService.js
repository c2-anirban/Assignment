import axiosClient from '../AxiosClient/axiosClient';

const UserService = {
    list: () => {
        return axiosClient.get('users/list');
    },
    getUserDetails: () => {
        return axiosClient.get('getUserDetails');
    },
    updateProfile: (id, data) => {
        return axiosClient.put(`users/${id}`, data);
    },
    deleteAccount: (id) => {
        return axiosClient.delete(`users/${id}`);
    },

};

export default UserService;
