import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import EditPass from './customerPass-edit.component';

/*
firstName,
lastName,
nic,
validMonths,
trainClass,
fromStation,
toStation
*/
const Pass = props => (
    <tr className='text-lg bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <div class="justify-between grid grid-cols-4 gap-2 p-5 m-5 shadow-xl shadow-slate-300 hover:shadow-lg hover:shadow-cyan-500-100 hover:duration-300 rounded-lg max-w-sm lg:max-w-full lg:flex">
            <div class="col-span-3">
                <div class="">
                    <div class=" border-gray-400 bg-white flex flex-col">
                        <div class="">
                            <div class="flex">
                                <div class="text-gray-900 font-bold text-3xl "> {props.pass.firstName}</div>
                                <p> `</p>
                                <div class="text-gray-900 font-bold text-3xl "> {props.pass.lastName}</div>
                            </div>
                            <p class="pl-1 text-sm text-yellow-400 font-bold flex items-center">
                            Created/ Updated Date : {props.pass.createdDate.substring(0, 10)}
                            </p>
                            <p class="text-gray-900 text-lg ">National ID Number : {props.pass.nic}</p>

                            <div class="text-gray-900 text-xl  flex">
                                <div class="flex">
                                    From : <p className='p-1 ml-2 text-lg font-bold bg-blue-200 rounded-lg'>{props.pass.fromStation}</p>
                                </div>
                                <div class="ml-5 flex">
                                    To : <p className='p-1 ml-2 text-lg font-bold bg-green-200 rounded-lg'>{props.pass.toStation}</p>
                                </div>
                            </div>
                        </div>
                        <div class=" items-center">
                            <div class="text-base ">
                                <p class="text-gray-600 text-xl flex">
                                    Train Class :
                                    <p className='ml-2 text-lg font-bold'>
                                        {props.pass.trainClass}
                                    </p>
                                </p>
                                <p class="flex text-gray-900  text-xl"> Valid Months: <p className='ml-2 text-lg font-bold'> {props.pass.validMonths} </p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-1">
                <div class="flex mt-1 justify-end ">
                    <div class="">
                        <button className='items-center px-2 py-2 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-full hover:bg-blue-200' onClick={() => { props.gotoUpdatePass(props.pass._id) }}>
                            <div class="ml-2">
                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div class="">
                        <button className='items-center px-2 py-2 ml-2 text-sm font-medium text-white duration-100 bg-red-500 rounded-full shadow-lg shadow-black hover:bg-red-200'
                            onClick={() => { props.deletePass(props.pass._id) }}
                        >
                            <div class="ml-2">
                                <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    </tr>
)

export class CusPassList extends Component {
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
            .then(res => {
                console.log(res);
                alert("Pass Deleted");
            });
        this.setState({
            pass: this.state.pass.filter(el => el._id !== id)
        })
    }

    CusPassList() {
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
                    <tr className='text-lg bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <div class="justify-between grid grid-cols-4 gap-2 p-5 m-5 shadow-xl shadow-slate-300 hover:shadow-lg hover:shadow-cyan-500-100 hover:duration-300 rounded-lg max-w-sm lg:max-w-full lg:flex">
                            <div class="col-span-3">
                                <div class="">
                                    <div class=" border-gray-400 bg-white flex flex-col">
                                        <div class="">
                                            <div class="flex">
                                                <div class="text-gray-900 font-bold text-3xl "> {currentPass.firstName}</div>
                                                <div class="text-gray-900 font-bold text-3xl "> {currentPass.lastName}</div>
                                            </div>
                                            <p class="pl-1 text-sm text-yellow-400 font-bold flex items-center">
                                            Created/ Updated Date : {currentPass.createdDate.substring(0, 10)}
                                            </p>
                                            <p class="text-gray-900 text-lg ">National ID Number : {currentPass.nic}</p>

                                            <div class="text-gray-900 text-xl  flex">
                                                <div class="flex">
                                                    From : <p className='p-1 ml-2 text-lg font-bold bg-blue-200 rounded-lg'>{currentPass.fromStation}</p>
                                                </div>
                                                <div class="ml-5 flex">
                                                    To : <p className='p-1 ml-2 text-lg font-bold bg-green-200 rounded-lg'>{currentPass.toStation}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class=" items-center">
                                            <div class="text-base ">
                                                <p class="text-gray-600 text-xl flex">
                                                    Train Class :
                                                    <p className='ml-2 text-lg font-bold'>
                                                        {currentPass.trainClass}
                                                    </p>
                                                </p>
                                                <p class="flex text-gray-900  text-xl"> Valid Months: <p className='ml-2 text-lg font-bold'> {currentPass.validMonths} </p></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-1">
                                <div class="flex mt-1 justify-end ">
                                    <div class="">
                                        <button className='items-center px-2 py-2 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-full hover:bg-blue-200' onClick={() => { this.gotoUpdatePass(currentPass._id) }}>
                                            <div class="ml-2">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                    <div class="">
                                        <button className='items-center px-2 py-2 ml-2 text-sm font-medium text-white duration-100 bg-red-500 rounded-full shadow-lg shadow-black hover:bg-red-200'
                                            onClick={() => {
                                                //Delete the selected record
                                                axios.delete("http://localhost:5000/pass/" + currentPass._id)
                                                    .then(() => {
                                                        alert("Pass Remove Success");
                                                        //Get data again after delete
                                                        axios.get("http://localhost:5000/pass")
                                                            .then((res) => {
                                                                console.log(res.data);
                                                                this.setState({
                                                                    pass: res.data,
                                                                });
                                                            })
                                                            .catch((err) => console.log(err));
                                                    })
                                                    .catch((err) => {
                                                        alert(err);
                                                    });
                                            }}
                                        >
                                            <div class="ml-2">
                                                <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div >
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
                                            <div class="">
                                                <h3>My Season Pass</h3>
                                            </div>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <Link className='font-semibold text-white no-underline' to={"/createPass"}>
                                                        <div class="flex">
                                                            <div class="">
                                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                                </svg>
                                                            </div>
                                                            <div class="">
                                                                Create Season Pass
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </button>
                                                <button class="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => this.exportPass()}>
                                                    <div class="">
                                                        <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                        </svg>
                                                    </div>
                                                    <div class="">
                                                        Download PDF
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
                                <table className='w-full h-full overflow-y-auto text-sm text-left text-gray-500 table-fixed dark:text-gray-400' >

                                    <tbody>
                                        {this.state.searchPass === "" ? this.CusPassList() : this.searchPassList()}
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
