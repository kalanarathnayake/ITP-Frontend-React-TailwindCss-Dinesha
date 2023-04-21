import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import EditPass from './adminPass-edit.component';

const Pass = props => (
    <tr className='text-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <td className='w-10 px-6 py-4 overflow-x-auto text-xl font-bold'>{props.pass.firstName}</td>
        <td className='px-6 py-4'>{props.pass.lastName}</td>
        <td className='px-6 py-4'>{props.pass.nic}</td>
        <td className='px-6 py-4'>{props.pass.validMonths}</td>
        <td className='px-6 py-4'>{props.pass.trainClass}</td>
        <td className='px-6 py-4'>{props.pass.fromStation}</td>
        <td className='px-6 py-4'>{props.pass.toStation}</td>
        <td className='px-6 py-4'>{props.pass.createdDate.substring(0, 10)}</td>
        <td className='px-6 py-4'>
            <div class="flex justify-center">
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { props.gotoUpdatePass(props.pass._id) }}>
                        <div class="">
                            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                            </svg>
                        </div>
                        <div class="">
                            Update
                        </div>
                    </button>
                </div>
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200' onClick={() => { props.deletePass(props.pass._id) }}>
                        <div class="">
                            <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <div class="">
                            Delete
                        </div>
                    </button>
                </div>
            </div>
        </td>
    </tr>
)

export class PassList extends Component {
    constructor(props) {
        super(props);
        this.deletePass = this.deletePass.bind(this);
        this.gotoUpdatePass = this.gotoUpdatePass.bind(this);
        this.state = {
            id: "",
            pass: [],
            searchPass: "",
            show: false
        };
    }

    componentDidMount() {
        this.refreshTable();
    }

    refreshTable() {
        axios.get('http://localhost:5000/pass/')
            .then(response => {
                this.setState({ pass: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    gotoUpdatePass = (id) => {
        this.setState({
            id: id,
            show: true
        })
        console.log("Pass id is :" + id);
    }

    //Modal box
    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshTable();
    }

    deletePass(id) {
        axios.delete('http://localhost:5000/pass/' + id)
        //     .then(res => {
        //         console.log(res);
        //         alert("Pass Deleted");
        //     });
        // this.setState({
        //     pass: this.state.pass.filter(el => el._id !== id)
        .then(response => {
            console.log(response.status)
            // this.refreshTable();

            if (response.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: "Season Pass has been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#0a5bf2',
                    iconColor: '#60e004'
                })

                this.refreshTable();
            }

            else {
                Swal.fire({
                    icon: 'Unsuccess',
                    title: 'Unsuccessfull',
                    text: "Employee has not been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#eb220c',
                    iconColor: '#60e004'
                })
            }
        })
    }

    passList() {
        return this.state.pass.map(currentPass => {
            return <Pass
                pass={currentPass}
                deletePass={this.deletePass}
                gotoUpdatePass={this.gotoUpdatePass}
                key={currentPass._id}
            />;
        })
    }

    searchPassList() {
        return this.state.pass.map((currentPass) => {
            if (
                this.state.searchPass === currentPass.nic
            ) {
                return (

                    <tr className='text-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <td className='w-10 px-6 py-4 overflow-x-auto text-xl font-bold'>{currentPass.firstName}</td>
                        <td className='px-6 py-4'>{currentPass.lastName}</td>
                        <td className='px-6 py-4'>{currentPass.nic}</td>
                        <td className='px-6 py-4'>{currentPass.validMonths}</td>
                        <td className='px-6 py-4'>{currentPass.trainClass}</td>
                        <td className='px-6 py-4'>{currentPass.fromStation}</td>
                        <td className='px-6 py-4'>{currentPass.toStation}</td>
                        <td className='px-6 py-4'>{currentPass.createdDate.substring(0, 10)}</td>
                        <td className='px-6 py-4'>
                            <div class="flex justify-center">
                                <div class="">
                                    {
                                        <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { this.gotoUpdatePass(currentPass._id) }}>
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                </svg>
                                            </div>
                                            <div class="">
                                                Update
                                            </div>
                                        </button>
                                    }
                                </div>
                                {"  "}
                                <div class="">
                                    {
                                        <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200'
                                            onClick={() => {
                                                //Delete the selected record
                                               this.deletePass(currentPass._id)
                                            }}
                                        >
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                            <div class="">
                                                Remove
                                            </div>
                                        </button>
                                    }
                                </div>
                            </div>
                        </td>
                    </tr>
                );
            }
        });
    }

    exportPass = () => {
        console.log("Exporting Pass PDF")
        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        const title = "Pass List Details";
        const headers = [["First Name", "Last Name", "NIC", "Valid Months", "Train Class", "Station From", "Station To", "Created Date"]];
        const pass = this.state.pass.map(
            Pass => [
                Pass.firstName,
                Pass.lastName,
                Pass.nic,
                Pass.validMonths,
                Pass.trainClass,
                Pass.fromStation,
                Pass.toStation,
                Pass.createdDate.substring(0, 10),
            ]
        );
        let content = {
            startY: 50,
            head: headers,
            body: pass
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("SeasonPass-Details.pdf")
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start">
                                <table>
                                    <tr>
                                        <th className='drop-shadow-md'>
                                            <div class="flex">
                                                <div class="">
                                                    <h3>Season Pass Details</h3>
                                                </div>
                                                <div class="">
                                                    <span
                                                        class="ml-1 inline-block whitespace-nowrap rounded-2xl bg-success-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-success-700 bg-green-400">
                                                        Admin
                                                    </span>
                                                </div>
                                            </div>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => this.exportPass()}>
                                                    <div class="">
                                                        <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                        </svg>
                                                    </div>
                                                    <div class="">
                                                        Download Report
                                                    </div>
                                                </button>
                                            </div>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    placeholder="Search by NIC"
                                                    aria-label="Search"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            searchPass: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className='w-full h-full overflow-y-auto text-sm text-left text-gray-500 dark:text-gray-400' >
                                    <thead className='p-5 text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>

                                            <th className="p-2 border-black tbhead ">First Name</th>
                                            <th className="p-2 tbhead">Last Name</th>
                                            <th className="p-2 tbhead">NIC</th>
                                            <th className="p-2 tbhead">Valid Months</th>
                                            <th className="p-2 tbhead">Train Class</th>
                                            <th className="p-2 tbhead">From Station</th>
                                            <th className="p-2 tbhead">To Station</th>
                                            <th className="p-2 tbhead">Created Date</th>
                                            <th className="p-2 text-center tbhead">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.searchPass === "" ? this.passList() : this.searchPassList()}
                                    </tbody>
                                </table>
                            </div>
                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"xl"}>
                                    <Modal.Body className={"custom-modal-body-login p-0 mb-5"}>
                                        <EditPass classId={this.state.id} key={this.state.id} passId={this.state.id} close={this.closeModalBox} />
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
