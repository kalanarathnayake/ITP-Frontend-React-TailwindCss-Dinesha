import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from 'react-datepicker';

export default class EditPass extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeNic = this.onChangeNic.bind(this);
        this.onChangeValidMonths = this.onChangeValidMonths.bind(this);
        this.onChangeTrainClass = this.onChangeTrainClass.bind(this);
        this.onChangeFromStation = this.onChangeFromStation.bind(this);
        this.onChangeToStation = this.onChangeToStation.bind(this);
        this.onChangeCreatedDate = this.onChangeCreatedDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            nic: '',
            validMonths: '',
            trainClass: '',
            fromStation: '',
            toStation: '',
            createdDate: new Date(),
        }
    }

    //mounting retrived data to text areas
    componentDidMount() {
        axios.get('http://localhost:5000/pass/' + this.props.passId)
            .then(response => {
                console.log(this.props.passId);
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    nic: response.data.nic,
                    validMonths: response.data.validMonths,
                    trainClass: response.data.trainClass,
                    fromStation: response.data.fromStation,
                    toStation: response.data.toStation,
                    createdDate: this.state.createdDate,
                })
            })
            .catch(function (error) {
                console.log("Error in mounting" + error);
            })
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }
    onChangeNic(e) {
        this.setState({
            nic: e.target.value
        });
    }
    onChangeValidMonths(e) {
        this.setState({
            validMonths: e.target.value
        });
    }
    onChangeTrainClass(e) {
        this.setState({
            trainClass: e.target.value
        });
    }
    onChangeFromStation(e) {
        this.setState({
            fromStation: e.target.value
        });
    }
    onChangeToStation(e) {
        this.setState({
            toStation: e.target.value
        });
    }
    onChangeCreatedDate(date) {
        this.setState({
            createdDate: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const pass = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            nic: this.state.nic,
            validMonths: this.state.validMonths,
            trainClass: this.state.trainClass,
            fromStation: this.state.fromStation,
            toStation: this.state.toStation,
            createdDate: this.state.createdDate,
        }

        //Validations
        if (this.state.firstName.length < 4) {
            this.setState({ firstNameError: "FirstName is too short" })
        }
        if (this.state.lastName.length < 4) {
            this.setState({ lastNameError: "LastName is too short" })
        }
        if (this.state.nic.length < 9) {
            this.setState({ nicError: "NIC is too short" })
        }
        if (this.state.validMonths.length < 4) {
            this.setState({ validMonthsError: "Valid Months is too short" })
        }
        if (this.state.trainClass.length < 4) {
            this.setState({ trainClassError: "Train Class name is too short" })
        }
        if (this.state.fromStation.length < 4) {
            this.setState({ fromStationError: "fromStation is too short" })
        }
        if (this.state.toStation.length < 4) {
            this.setState({ toStationError: "Station name is too short" })
        }
        if (this.state.createdDate.length < 4) {
            this.setState({ createdDateError: "Station name is too short" })
        }

        console.log(pass);
        console.log(this.props.passId);
        axios.put('http://localhost:5000/pass/' + this.props.passId, pass)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    // this.refreshTable();
                    this.props.close();
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Season Pass details has been updated!',
                        background: '#fff',
                        confirmButtonColor: '#133EFA',
                        iconColor: '#60e004'
                    })

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'There was an error updating your Season Pass!',
                        background: '#fff',
                        confirmButtonColor: '#133EFA',
                        iconColor: '#e00404'
                    })
                }
            })
    }

    render() {
        return (
            <div className="flex flex-col px-5">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <form className='px-12 py-12' onSubmit={this.onSubmit}>
                                        <div class="">
                                            <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                                Update Your Season Pass Now
                                            </p>
                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>First Name : </label>
                                                    <input type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control "
                                                        value={this.state.firstName}
                                                        onChange={this.onChangeFirstName}
                                                    /><p />
                                                </div><p className="validateMsg">{this.state.firstNameError}</p>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Last Name : </label>
                                                    <input type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control"
                                                        value={this.state.lastName}
                                                        onChange={this.onChangeLastName}
                                                    /><p />
                                                </div><p className="validateMsg">{this.state.lastNameError}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >National ID Number : </label>
                                                    <div>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.nic}
                                                            onChange={this.onChangeNic}
                                                        /><p />
                                                    </div>
                                                </div><p className="validateMsg">{this.state.nicError}</p>
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Created Date : </label>
                                                    <DatePicker
                                                        className='m-2'
                                                        selected={this.state.createdDate}
                                                        onChange={this.onChangeCreatedDate}
                                                    />
                                                </div><p className="validateMsg">{this.state.createdDateError}</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Train Class : </label>
                                                    <div>
                                                        <input type="text"
                                                            required
                                                            disabled
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.trainClass}
                                                            onChange={this.onChangeTrainClass}
                                                        /><p />
                                                    </div>
                                                </div><p className="validateMsg">{this.state.trainClassError}</p>
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Valid Months : </label>
                                                    <select
                                                        type="text"
                                                        required
                                                        disabled
                                                        placeholder=''
                                                        className="form-control"
                                                        value={this.state.validMonths}
                                                        onChange={this.onChangeValidMonths}
                                                    >
                                                        <option>Select number of months</option>
                                                        <option>1 Month</option>
                                                        <option>3 Month</option>
                                                        <option>6 Month</option>
                                                        <option>1 Year</option>
                                                    </select>
                                                </div><p className="validateMsg">{this.state.validMonthsError}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >From Station : </label>
                                                    <div>
                                                        <input type="text"
                                                            required
                                                            disabled
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.fromStation}
                                                            onChange={this.onChangeFromStation}
                                                        /><p />
                                                    </div>
                                                </div><p className="validateMsg">{this.state.fromStationError}</p>
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >To Station : </label>
                                                    <div>
                                                        <input type="text"
                                                            required
                                                            disabled
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.toStation}
                                                            onChange={this.onChangeToStation}
                                                        /><p />
                                                    </div>
                                                </div><p className="validateMsg">{this.state.toStationError}</p>
                                            </div>
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Update Season Pass" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}